import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    processors: ['yaml'],
});

test('putout: processor: yaml', async ({process}) => {
    await process('travis.yml', ['travis/disable-cache']);
});

test('putout: processor: yaml: actions', async ({noProcess}) => {
    await noProcess('actions.yml');
});

test('putout: processor: yaml: duplicate', async ({comparePlaces}) => {
    await comparePlaces('duplicate.yml', [{
        position: {
            column: 3,
            line: 4,
        },
        message: 'Map keys must be unique',
        rule: 'yaml-parse-error (yaml)',
    }]);
});

test('putout: processor: yaml: no startLine', async ({comparePlaces}) => {
    await comparePlaces('travis.yml', []);
});

test('putout: processor: yaml: duplicate: file content', async ({noProcess}) => {
    await noProcess('duplicate.yml');
});
