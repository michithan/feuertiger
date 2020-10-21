const path = require('path');

module.exports = {
    root: true,
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
        'prettier/babel',
        'prettier/standard',
        'airbnb-typescript-prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: require.resolve(path.resolve(__dirname, 'tsconfig.json'))
    },
    rules: {
        'no-shadow': 'off',
        'no-console': 0,
        'comma-dangle': 0,
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'lf'
            }
        ],
        'import/no-cycle': 0,
        'react/jsx-props-no-spreading': 0,
        'import/prefer-default-export': 0,
        'consistent-return': 0,
        'no-unused-vars': 'off',
        'no-use-before-define': 0,
        '@typescript-eslint/no-unused-vars': 'error'
    },
    plugins: ['prettier', '@typescript-eslint'],
    globals: {
        cy: true,
        Cypress: true
    },
    ignorePatterns: [
        'dist',
        'lib',
        'node_modules',
        'coverage',
        '.next',
        '*.test.*',
        'setupTests.ts',
        'babel.config.js',
        'jest.config.js'
    ]
};
