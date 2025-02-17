'use strict';

const {nanomemoize} = require('nano-memoize');

const {loadPlugin} = require('./load/load');
const {createAsyncLoader} = require('./load/async-loader');
const {parsePluginNames} = require('./plugins/parse-plugin-names');
const parseProcessorNames = require('./processors/parse-processor-names');
const validatePlugin = require('./plugins/validate-plugin');
const {loadPluginsAsync} = require('./plugins/load-plugins-async');

const {
    parseRules,
    validateRules,
    isEnabled,
    getLoadedRules,
} = require('./rules');

const {filterEnabledPlugins} = require('./plugins/filter-enabled-plugins');

const {check, checkRule} = require('./check');

module.exports.loadPluginsAsync = loadPluginsAsync;
module.exports.loadProcessorsAsync = nanomemoize(async (options, load) => {
    check(options);
    
    const {processors = []} = options;
    const parsedProcessors = parseProcessorNames(processors);
    const loadProcessor = createAsyncLoader('processor');
    
    const list = [];
    
    for (const [name, fn] of parsedProcessors) {
        if (fn) {
            list.push(fn);
            continue;
        }
        
        list.push(loadProcessor(name, load));
    }
    
    return await Promise.all(list);
});

module.exports.createAsyncLoader = createAsyncLoader;

module.exports.loadPlugins = (options) => {
    check(options);
    
    const {pluginNames = [], rules = {}} = options;
    
    const cookedRules = parseRules(rules);
    const loadedRules = getLoadedRules(cookedRules);
    
    const items = parsePluginNames(pluginNames);
    
    const plugins = loadPlugins({
        items,
        loadedRules,
    });
    
    validateRules({
        rules,
        items,
    });
    
    return filterEnabledPlugins({
        plugins,
        cookedRules,
    });
};

function splitRule(rule) {
    return [rule, 'putout'];
}

function loadPlugins({items, loadedRules}) {
    const plugins = [];
    
    for (const [rule, itemPlugin] of items) {
        if (!isEnabled(rule, loadedRules))
            continue;
        
        checkRule(rule);
        
        const [name, namespace] = splitRule(rule);
        const plugin = itemPlugin || loadPlugin({
            name,
            namespace,
        });
        
        validatePlugin({
            plugin,
            rule,
        });
        
        const {rules} = plugin;
        
        if (rules) {
            plugins.push(...extendRules(rule, rules));
            continue;
        }
        
        plugins.push([rule, plugin]);
    }
    
    return plugins;
}

function extendRules(rule, plugin) {
    const result = [];
    const entries = Object.entries(plugin);
    
    for (const [name, plugin] of entries) {
        result.push([`${rule}/${name}`, plugin]);
    }
    
    return result;
}
