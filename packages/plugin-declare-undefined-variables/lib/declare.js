'use strict';

const {types} = require('putout');
const {
    addDeclaration,
    checkDeclaration,
} = require('./record');

const {isImportDeclaration} = types;
const {entries} = Object;

const crawl = (path) => path.scope.getProgramParent().path.scope.crawl();
const cutName = (a) => a.split('.').shift();

module.exports = (declarations) => ({
    report,
    match: match(declarations),
    replace: replace(declarations),
});

const report = (path) => {
    const name = getName(path);
    const cutedName = cutName(name);
    
    return `Declare '${cutedName}'`;
};

const match = (declarations) => ({options}) => {
    const {dismiss = []} = options;
    const traverseObject = {};
    
    for (const [name] of entries(declarations)) {
        if (dismiss.includes(name))
            continue;
        
        traverseObject[`${name}(__args)`] = isUndefined(name);
        traverseObject[`${name}\`__a\``] = isUndefined(name);
        traverseObject[`const __a = ${name}`] = isUndefined(name);
    }
    
    return traverseObject;
};

const replace = (declarations) => ({options}) => {
    const {dismiss = []} = options;
    const traverseObject = {};
    
    for (const [name, buildNode] of entries(declarations)) {
        if (dismiss.includes(name))
            continue;
        
        const node = buildNode();
        
        traverseObject[`${name}(__args)`] = declare(name, node);
        traverseObject[`${name}\`__a\``] = declare(name, node);
        traverseObject[`const __a = ${name}`] = declare(name, node);
    }
    
    return traverseObject;
};

const isUndefined = (name) => (vars, path) => {
    const {scope} = path;
    const cutedName = cutName(name);
    
    if (checkDeclaration(name, path))
        return false;
    
    return !scope.hasBinding(cutedName);
};

const declare = (name, node) => (vars, path) => {
    const scope = path.scope.getProgramParent();
    const programPath = scope.path;
    const bodyPath = programPath.get('body');
    
    for (const currentPath of bodyPath) {
        if (isUseStrict(currentPath)) {
            continue;
        }
        
        if (isImportDeclaration(node)) {
            currentPath.insertBefore(node);
            break;
        }
        
        if (currentPath.isVariableDeclaration()) {
            continue;
        }
        
        if (currentPath.isImportDeclaration()) {
            continue;
        }
        
        currentPath.insertBefore(node);
        break;
    }
    
    addDeclaration(name, path);
    
    crawl(path);
    return path;
};

function isUseStrict(path) {
    if (!path.isExpressionStatement())
        return false;
    
    const expressionPath = path.get('expression');
    
    return expressionPath.isStringLiteral({
        value: 'use strict',
    });
}

function getName(path) {
    if (path.isTaggedTemplateExpression())
        return path.node.tag.name;
    
    if (path.isVariableDeclaration())
        return path.get('declarations.0.init').node.name;
    
    return path.get('callee').toString();
}

