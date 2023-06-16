'use strict';

const {
    isLiteral,
    isIdentifier,
    isTemplateElement,
    isRegExpLiteral,
    isClassMethod,
    isTemplateLiteral,
    isJSXText,
    isJSXAttribute,
} = require('@babel/types');

module.exports.extract = extract;

function extract(node) {
    node = node.node || node;
    
    if (isIdentifier(node))
        return node.name;
    
    if (isRegExpLiteral(node))
        return node.pattern;
    
    if (isTemplateLiteral(node))
        return extract(node.quasis[0]);
    
    if (isLiteral(node))
        return node.value;
    
    if (isTemplateElement(node))
        return node.value.raw;
    
    if (isJSXText(node))
        return node.value;
    
    if (isJSXAttribute(node))
        return node.name.name;
    
    if (isClassMethod(node))
        return extract(node.key);
    
    throw Error(`"operator.extract(node)" understands only Literals, Identifiers, TemplateLiteral, TemplateElement, RegExpLiteral, JSXAttribute and JSXText 🤷, found: ${node.type}`);
}
