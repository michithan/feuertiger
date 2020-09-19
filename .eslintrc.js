module.exports = {
    extends: [
        'airbnb-typescript',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
        'prettier/babel',
        'prettier/standard',
        'airbnb-typescript-prettier'
    ],
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
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
        '@typescript-eslint/no-var-requires': 0
    },
    plugins: ['prettier'],
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
