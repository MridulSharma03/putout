'use strict';

const traverse = require('@babel/traverse').default;
const template = require('@babel/template').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

const cutShebang = require('./cut-shebang');
const getPlugins = require('./get-plugins');

const runPlugins = require('./run-plugins');
const print = require('./print');
const parse = require('./parse');

const isUndefined = (a) => typeof a === 'undefined';
const {assign} = Object;

const defaultOpts = (opts = {}) => {
    const newOpts = {
        ...opts,
    };
    
    if (isUndefined(opts.parser))
        assign(newOpts, {
            parser: 'babel',
        });
    
    if (isUndefined(opts.fix))
        assign(newOpts, {
            fix: true,
        });
    
    if (isUndefined(opts.fixCount))
        assign(newOpts, {
            fixCount: 2,
        });
    
    return newOpts;
};

module.exports = (source, opts) => {
    opts = defaultOpts(opts);
    const {
        parser,
        isTS,
        isFlow,
        isJSX,
    } = opts;
    
    const [clearSource, shebang] = cutShebang(source);
    const ast = parse(clearSource, {
        parser,
        isTS,
        isFlow,
        isJSX,
    });
    
    const places = transform(ast, source, opts);
    
    if (!opts.fix)
        return {
            code: source,
            places,
        };
    
    const printed = print(ast);
    const code = `${shebang}${printed}`;
    
    return {
        code,
        places,
    };
};

module.exports.findPlaces = (ast, source, opts) => {
    return transform(ast, source, {
        ...opts,
        fix: false,
    });
};

module.exports.transform = transform;
function transform(ast, source, opts) {
    opts = defaultOpts(opts);
    
    const {
        plugins: pluginNames,
        cache,
        rules,
        fix,
        fixCount,
        parser,
    } = opts;
    
    const [, shebang] = cutShebang(source);
    const plugins = getPlugins({
        pluginNames,
        cache,
        rules,
    });
    
    const places = [
        ...runPlugins({
            ast,
            shebang,
            fix,
            fixCount,
            plugins,
            parser,
        }),
    ];
    
    return places;
}

module.exports.parse = parse;
module.exports.print = print;
module.exports.traverse = traverse;
module.exports.types = types;
module.exports.template = template;
module.exports.generate = generate;
module.exports.initReport = require('./report');
module.exports.operate = require('@putout/operate');

module.exports.ignores = require('./ignores');
module.exports.parseOptions = require('./parse-options');

