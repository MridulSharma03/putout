'use strict';

module.exports.report = () => `Useless async should be avoided`;

module.exports.fix = (path) => {
    path.node.async = false;
};

module.exports.include = () => [
    'async function __() {}',
    'async () => {}',
];

module.exports.filter = (path) => {
    let illegal = true;
    
    path.traverse({
        'ReturnStatement'() {
            illegal = false;
        },
        
        'ThrowStatement'() {
            illegal = false;
        },
        
        'AwaitExpression'() {
            illegal = false;
        },
    });
    
    return illegal;
};

