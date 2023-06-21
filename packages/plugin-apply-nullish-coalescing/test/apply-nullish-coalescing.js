'use strict';

const {createTest} = require('@putout/test');
const applyNullishCoalescing = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-nullish-coalescing', applyNullishCoalescing],
    ],
});

test('plugin-apply-nullish-coalescing: transform: report', (t) => {
    t.report('null', 'Nullish coalescing should be used');
    t.end();
});

test('plugin-apply-nullish-coalescing: transform: null', (t) => {
    t.transform('null');
    t.end();
});

test('plugin-apply-nullish-coalescing: transform: typeof', (t) => {
    t.transform('typeof');
    t.end();
});

test('plugin-apply-nullish-coalescing: transform: undefined', (t) => {
    t.transform('undefined');
    t.end();
});
