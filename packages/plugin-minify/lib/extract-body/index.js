'use strict';

const {
    types,
    operator,
} = require('putout');

const {
    isExpressionStatement,
    isReturnStatement,
    isArrowFunctionExpression,
} = types;

const {replaceWith} = operator;
const isArrow = isArrowFunctionExpression;

module.exports.report = () => `Avoid blocks with one statement`;

module.exports.fix = (path) => {
    const {parentPath} = path;
    const [first] = path.node.body;
    
    if (parentPath.isArrowFunctionExpression() && isReturnStatement(first)) {
        replaceWith(path, first.argument);
        return;
    }
    
    if (parentPath.isArrowFunctionExpression() && isExpressionStatement(first)) {
        replaceWith(path, first.expression);
        return;
    }
    
    replaceWith(path, first);
};

module.exports.include = () => [
    'BlockStatement',
];

module.exports.filter = ({node, parentPath}) => {
    const {body} = node;
    
    if (body.length !== 1)
        return false;
    
    if (parentPath.isFunctionDeclaration())
        return false;
    
    if (parentPath.isFunctionExpression())
        return false;
    
    if (parentPath.isTryStatement())
        return false;
    
    if (parentPath.isCatchClause())
        return false;
    
    const [first] = body;
    
    if (isArrow(parentPath) && !expressionOrReturn(first))
        return false;
    
    return true;
};

const expressionOrReturn = (node) => {
    if (isExpressionStatement(node))
        return true;
    
    if (isReturnStatement(node))
        return true;
    
    return false;
};
