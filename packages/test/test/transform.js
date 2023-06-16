'use strict';

const {stub} = require('supertape');
const fs = require('fs');
const {reRequire} = require('mock-require');
const {writeFileSync} = fs;

fs.writeFileSync = stub();
process.env.UPDATE = 1;

const NO_CHECK_ASSERTIONS_COUNT = {
    checkAssertionsCount: false,
};

const test = reRequire('..')(__dirname, {
    'remove-console': require('@putout/plugin-remove-console'),
});

test('transform: with PUTOUT_PRINTER: env variable', (t) => {
    const {PUTOUT_PRINTER} = process.env;
    
    process.env.PUTOUT_PRINTER = 'putout';
    
    t.transform('putout-printer');
    
    if (PUTOUT_PRINTER)
        process.env.PUTOUT_PRINTER = PUTOUT_PRINTER;
    else
        delete process.env.PUTOUT_PRINTER;
    
    t.end();
});

test('transform: with UPDATE env variable', (t) => {
    const {UPDATE} = process.env;
    
    process.env.UPDATE = 1;
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    t.transform('typescript');
    
    process.env.UPDATE = UPDATE;
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.ok(writeFileSyncStub.called, 'should write fixture');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('transform: with UPDATE env variable: pass', (t) => {
    const {UPDATE} = process.env;
    
    process.env.UPDATE = 1;
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    const result = t.transform('typescript');
    
    process.env.UPDATE = UPDATE;
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.equal(result.message, 'fixed fixture updated');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('test: no transform: with UPDATE env variable: pass', (t) => {
    const {UPDATE} = process.env;
    
    process.env.UPDATE = 1;
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    const result = t.noTransform('no-transform');
    
    process.env.UPDATE = UPDATE;
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.equal(result.message, 'source fixture updated');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('transform: with UPDATE env variable: js', (t) => {
    const {UPDATE} = process.env;
    
    process.env.UPDATE = 1;
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    t.transform('update');
    
    process.env.UPDATE = UPDATE;
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.ok(writeFileSyncStub.called, 'should write fixture');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('transform: with UPDATE env variable: with arg', (t) => {
    const {UPDATE} = process.env;
    
    process.env.UPDATE = 1;
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    t.transform('typescript', '\n');
    
    process.env.UPDATE = UPDATE;
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.notCalled(writeFileSyncStub);
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('noTransform: with UPDATE env variable', (t) => {
    const {UPDATE} = process.env;
    
    process.env.UPDATE = 1;
    
    const {writeFileSync, unlinkSync} = global.__putout_test_fs;
    
    const writeFileSyncStub = stub();
    const unlinkSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    global.__putout_test_fs.unlinkSync = unlinkSyncStub;
    
    t.noTransform('const');
    
    process.env.UPDATE = UPDATE;
    global.__putout_test_fs.writeFileSync = writeFileSync;
    global.__putout_test_fs.unlinkSync = unlinkSync;
    
    t.calledOnce(writeFileSyncStub);
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('transformWithOptions: with UPDATE env variable', (t) => {
    const {UPDATE} = process.env;
    
    process.env.UPDATE = 1;
    
    const {writeFileSync, unlinkSync} = global.__putout_test_fs;
    
    const unlinkSyncStub = stub();
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    global.__putout_test_fs.unlinkSync = unlinkSyncStub;
    
    t.transformWithOptions('const', {});
    
    process.env.UPDATE = UPDATE;
    global.__putout_test_fs.writeFileSync = writeFileSync;
    global.__putout_test_fs.unlinkSync = unlinkSync;
    
    t.ok(writeFileSyncStub.called);
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('transformWithOptions: with UPDATE env variable: pass', (t) => {
    const {UPDATE} = process.env;
    
    process.env.UPDATE = 1;
    
    const {writeFileSync, unlinkSync} = global.__putout_test_fs;
    
    const unlinkSyncStub = stub();
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    global.__putout_test_fs.unlinkSync = unlinkSyncStub;
    
    const result = t.transformWithOptions('const', {});
    
    process.env.UPDATE = UPDATE;
    global.__putout_test_fs.writeFileSync = writeFileSync;
    global.__putout_test_fs.unlinkSync = unlinkSync;
    
    t.equal(result.message, 'fixed fixture updated');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

fs.writeFileSync = writeFileSync;

delete process.env.UPDATE;
