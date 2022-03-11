import {createTest} from '@putout/test/eslint';
const test = createTest(import.meta.url);

test('eslint-config: operator-linebreak', async ({process}) => {
    await process('operator-linebreak');
});

test('eslint-config: padding-export', async ({process}) => {
    await process('padding-export');
});

test('eslint-config: padding-import', async ({process}) => {
    await process('padding-import');
});

test('eslint-config: padding-function', async ({process}) => {
    await process('padding-function');
});

