import mockRequire from 'mock-require';

test('', async t => {
    mockImport('fs/promises', {
        unlink: stub(),
    });
    
    const fn = await reImport('..');
    fn();
    
    stopAll();
    t.end();
});

test('', async t => {
    mockImport('fs/promises', {
        unlink: stub(),
    });
    
    const fn = await reImport('..');
    fn();
    
    stopAll();
    t.end();
});
