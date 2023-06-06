'use strict';

const tryCatch = require('try-catch');
const {test} = require('supertape');
const {validateOptions} = require('./index.js');

test('putout: parse-options: validateOptions: valid', (t) => {
    const [error] = tryCatch(validateOptions, {
        plugins: [],
    });
    
    t.notOk(error);
    t.end();
});

test('putout: parse-options: validateOptions: plugins: duplicates', (t) => {
    const [error] = tryCatch(validateOptions, {
        plugins: [
            'putout',
            'putout',
        ],
    });
    
    t.equal(error.message, '.putout.json: plugins: must NOT have duplicate items (items ## 0 and 1 are identical)');
    t.end();
});

test('putout: parse-options: validateOptions', (t) => {
    const [error] = tryCatch(validateOptions, {
        hello: 'world',
    });
    
    t.equal(error.message, '.putout.json: hello: must NOT have additional properties');
    t.end();
});

test('putout: parse-options: validateOptions: parser', (t) => {
    const [error] = tryCatch(validateOptions, {
        parser: ['world'],
    });
    
    t.equal(error.message, '.putout.json: parser: must be string');
    t.end();
});

test('putout: parse-options: validateOptions: formatter', (t) => {
    const [error] = tryCatch(validateOptions, {
        formatter: {},
    });
    
    t.equal(error.message, '.putout.json: formatter: must be string or array');
    t.end();
});

test('putout: parse-options: validateOptions: processors: not array', (t) => {
    const [error] = tryCatch(validateOptions, {
        processors: {},
    });
    
    t.equal(error.message, '.putout.json: processors: must be array');
    t.end();
});

test('putout: parse-options: validateOptions: processors: duplicates', (t) => {
    const [error] = tryCatch(validateOptions, {
        processors: [
            'markdown',
            'markdown',
        ],
    });
    
    t.equal(error.message, '.putout.json: processors: must NOT have duplicate items (items ## 0 and 1 are identical)');
    t.end();
});

test('putout: parse-options: validateOptions: processors: items', (t) => {
    const [error] = tryCatch(validateOptions, {
        processors: [1, 2],
    });
    
    t.equal(error.message, '.putout.json: processors/0: must be array');
    t.end();
});

test('putout: parse-options: validateOptions: match', (t) => {
    const [error] = tryCatch(validateOptions, {
        match: [],
    });
    
    t.equal(error.message, '.putout.json: match: must be object');
    t.end();
});

test('putout: parse-options: validateOptions: ignore', (t) => {
    const [error] = tryCatch(validateOptions, {
        ignore: {},
    });
    
    t.equal(error.message, '.putout.json: ignore: must be array');
    t.end();
});

test('putout: parse-options: validateOptions: ignore: items', (t) => {
    const [error] = tryCatch(validateOptions, {
        ignore: [1, 2],
    });
    
    t.equal(error.message, '.putout.json: ignore/0: must be string');
    t.end();
});

test('putout: parse-options: validateOptions: ignore: duplicate', (t) => {
    const [error] = tryCatch(validateOptions, {
        ignore: [
            'a',
            'a',
        ],
    });
    
    t.equal(error.message, '.putout.json: ignore: must NOT have duplicate items (items ## 1 and 0 are identical)');
    t.end();
});

test('putout: parse-options: validateOptions: rules: item', (t) => {
    const [error] = tryCatch(validateOptions, {
        rules: {
            'remove-unused-variables': 0,
        },
    });
    
    t.equal(error.message, '.putout.json: rules/remove-unused-variables: must be equal to one of the allowed values (on/off)');
    t.end();
});

test('putout: parse-options: validateOptions: rules: item: options', (t) => {
    const [error] = tryCatch(validateOptions, {
        rules: {
            'remove-unused-variables': ['on', {}],
        },
    });
    
    t.notOk(error);
    t.end();
});

test('putout: parse-options: validateOptions: rules: item: message', (t) => {
    const [error] = tryCatch(validateOptions, {
        rules: {
            'remove-unused-variables': ['on', 'hello'],
        },
    });
    
    t.notOk(error);
    t.end();
});

test('putout: parse-options: validateOptions: rules: item: message, options', (t) => {
    const [error] = tryCatch(validateOptions, {
        rules: {
            'remove-unused-variables': ['on', 'hello', {}],
        },
    });
    
    t.notOk(error);
    t.end();
});

test('putout: parse-options: validateOptions: rules: item: boolean', (t) => {
    const [error] = tryCatch(validateOptions, {
        rules: {
            'remove-debugger': false,
            'tape': [true, {}],
            'remove-unused-variables': [true, 'hello', {}],
        },
    });
    
    t.notOk(error);
    t.end();
});

test('putout: parse-options: validateOptions: rules: match: options', (t) => {
    const [error] = tryCatch(validateOptions, {
        match: {
            '*.md': {
                'remove-unused-variables': 1,
            },
        },
    });
    
    t.equal(error.message, '.putout.json: match/*.md/remove-unused-variables: must be equal to one of the allowed values (on/off)');
    t.end();
});

test('putout: parse-options: validateOptions: processors: not on/off', (t) => {
    const [error] = tryCatch(validateOptions, {
        processors: [
            ['html', 'abc'],
        ],
    });
    
    t.equal(error.message, '.putout.json: processors/0/1: must be equal to one of the allowed values (on/off)');
    t.end();
});

test('putout: parse-options: validateOptions: processors', (t) => {
    const [error] = tryCatch(validateOptions, {
        processors: [
            ['html', 'off'],
        ],
    });
    
    t.notOk(error);
    t.end();
});

test('putout: parse-options: validateOptions: printer', (t) => {
    const [error] = tryCatch(validateOptions, {
        printer: 'putout',
    });
    
    t.notOk(error);
    t.end();
});
