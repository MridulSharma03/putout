'use strict';

module.exports = {
    plugins: [
        'node',
    ],
    overrides: [{
        files: ['*.md'],
        rules: {
            'no-undef': 'off',
            'no-multi-spaces': 'off',
            'eol-last': 'off',
            'quotes': 'off',
            'node/no-extraneous-require': 'off',
            'node/no-unpublished-require': 'off',
            'node/no-missing-require': 'off',
            'node/no-missing-import': 'off',
            'node/no-unsupported-features/es-syntax': 'off',
        },
    }],
};

