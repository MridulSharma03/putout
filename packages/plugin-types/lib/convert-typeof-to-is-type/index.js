'use strict';

const {operator} = require('putout');
const {compare, getBindingPath} = operator;

const NAMES = {
    function: 'isFn',
    string: 'isString',
    number: 'isNumber',
    boolean: 'isBool',
    undefined: 'isUndefined',
    symbol: 'isSymbol',
};

const GENERAL = 'typeof __a === "__b"';

const BODIES = {
    function: `typeof __a === 'function'`,
    string: `typeof __a === 'string'`,
    number: `typeof __a === 'number'`,
    boolean: `typeof __a === 'boolean'`,
    undefined: `typeof __a === 'undefined'`,
    symbol: `typeof __a === 'symbol'`,
};

module.exports.report = () => `Use function to check type instead of 'typeof'`;
module.exports.match = () => ({
    [GENERAL]: ({__a, __b}, path) => {
        if (path.parentPath.isFunction())
            return false;
        
        if (path.parentPath.isVariableDeclarator())
            return false;
        
        if (isBind(path, __b.value))
            return false;
        
        return Boolean(getBindingPath(path, __a));
    },
});

module.exports.replace = () => ({
    [BODIES.function]: 'isFn(__a)',
    [BODIES.string]: 'isString(__a)',
    [BODIES.number]: 'isNumber(__a)',
    [BODIES.boolean]: 'isBool(__a)',
    [BODIES.undefined]: 'isUndefined(__a)',
    [BODIES.symbol]: 'isSymbol(__a)',
});

function isBind(path, name) {
    const fnName = NAMES[name];
    const fnBody = BODIES[name];
    const bindingPath = getBindingPath(path, fnName);
    
    if (!bindingPath)
        return false;
    
    if (!bindingPath.isVariableDeclarator())
        return false;
    
    const {body} = bindingPath.node.init;
    
    return !compare(body, fnBody);
}
