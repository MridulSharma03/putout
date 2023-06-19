'use strict';

const {compareAny} = require('@putout/compare');
const {template} = require('@putout/engine-parser');

const {
    ObjectPattern,
    ObjectProperty,
    isBlockStatement,
    isFunction,
    isLabeledStatement,
    isObjectPattern,
    isCallExpression,
} = require('@babel/types');

const {entries} = Object;

const COMPUTED = true;
const SHORTHAND = true;

const isCallOrStatement = (path) => path.isCallExpression() || path.isStatement();

const isCall = (path) => {
    return isCallExpression(path.find(isCallOrStatement));
};

const report = ({name}) => `Argument '${name}' is missing`;

module.exports.addArgs = (args) => ({
    report,
    fix,
    traverse: traverse(args),
});

const fix = ({declaration, path, pattern, params}) => {
    const declarationNode = template.ast.fresh(declaration);
    
    if (isBlockStatement(declarationNode)) {
        const prop = createProperty(declarationNode.body[0]);
        pattern.properties.push(prop);
        
        const n = params.length - 1;
        
        if (isObjectPattern(params[n]))
            params[n] = pattern;
        else
            params.push(pattern);
        
        return;
    }
    
    path.scope.block.params = [
        declarationNode,
    ];
};

const traverse = (args) => ({push, options}) => {
    const allArgs = {
        ...options.args,
        ...args,
    };
    
    return {
        ReferencedIdentifier(path) {
            for (const [name, [declaration, pattern]] of entries(allArgs)) {
                if (path.node.name !== name)
                    continue;
                
                if (path.scope.hasBinding(name))
                    continue;
                
                if (!isCall(path))
                    continue;
                
                const fnPath = path.find(isFunction);
                
                if (!fnPath)
                    continue;
                
                const {block} = fnPath.scope;
                
                if (!compareAny(path.scope.path, pattern))
                    continue;
                
                const {params} = block;
                const lastParam = params.at(-1);
                
                if (isObjectPattern(lastParam)) {
                    push({
                        name,
                        declaration,
                        path,
                        params,
                        pattern: lastParam,
                    });
                    return;
                }
                
                push({
                    name,
                    declaration,
                    path,
                    params,
                    pattern: ObjectPattern([]),
                });
            }
        },
    };
};

function createProperty(node) {
    if (!isLabeledStatement(node)) {
        const {expression} = node;
        return ObjectProperty(expression, expression, !COMPUTED, SHORTHAND);
    }
    
    const {label, body} = node;
    
    return ObjectProperty(label, body.expression, !COMPUTED, SHORTHAND);
}
