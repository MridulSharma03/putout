'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-exponentiation'),
    ...getRule('apply-multiplication'),
    ...getRule('apply-numeric-separators'),
    ...getRule('convert-sqrt-to-hypot'),
    ...getRule('declare'),
};
