t.deepEqual(result, {});
t.deepEqual(result, []);

const expected = {};

t.deepEqual(result, expected);

const expected2 = [];

t.equal(result, expected2);
t.equal(result, expected3);
t.equal(result, a.b);

t.notDeepEqual(result, {});
t.notDeepEqual(result, []);
