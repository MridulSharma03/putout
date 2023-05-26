'use strict';

const {createTest} = require('@putout/test');
const setSetupNodeVersion = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['github/set-setup-node-version', setSetupNodeVersion],
    ],
});

test('plugin-github: set-setup-node-versions: report', (t) => {
    t.report('setup-node', `Latest version of 'actions/setup-node' is missing`);
    t.end();
});

test('plugin-github: set-setup-node-versions: transform', (t) => {
    t.transform('setup-node');
    t.end();
});

test('plugin-github: set-setup-node-versions: transform: v2', (t) => {
    t.transform('v2');
    t.end();
});

test('plugin-github: set-setup-node-version: no report: latest', (t) => {
    t.noReport('latest');
    t.end();
});

test('plugin-github: set-setup-node: no report: no-uses', (t) => {
    t.noReport('no-uses');
    t.end();
});
