'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-template-literals', plugin],
    ],
});

test('plugin-apply-template-literals: transform: report', (t) => {
    t.report('binary', `Use template literals instead of binary expressions`);
    t.end();
});

test('plugin-apply-template-literals: transform: instanceof', (t) => {
    t.transform('binary');
    t.end();
});

test('plugin-apply-template-literals: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-apply-template-literals: no transform: nested', (t) => {
    t.noTransform('nested');
    t.end();
});

test('plugin-apply-template-literals: no transform: only-string', (t) => {
    t.noTransform('only-string');
    t.end();
});

test('plugin-apply-template-literals: no transform: binary-template', (t) => {
    t.noTransform('binary-template');
    t.end();
});
