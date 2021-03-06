module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'airbnb-typescript/base'
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'no-undef': 'off',
        'no-console': 'off',
        'no-lonely-if': 'off',
        'arrow-body-style': 'off',
        'no-plusplus': 'off',
        'yoda': 'off',
        'no-bitwise': 'off',
        'padded-blocks': 'off',
        'no-else-return': 'off',
        'no-labels': 'off',
        'no-param-reassign': 'off',
        'no-restricted-syntax': 'off',
        'no-shadow': 'off',
        'guard-for-in': 'off',
        'no-nested-ternary': 'off',
        'no-restricted-properties': 'off',
        'no-mixed-operators': 'off',
        'no-underscore-dangle': 'off',
        'max-len': 'off',
        'consistent-return': 'off',
        'one-var-declaration-per-line': 'off',
        'one-var': 'off',
        'operator-linebreak': 'off',
        'object-curly-newline': 'off',
        'default-case': 'off',
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never'
        }],
        'prefer-destructuring': 'off',
        'prefer-const': 'off',
        'import/no-webpack-loader-syntax': 'off',
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'import/no-cycle': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/quotes': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/indent': ['error', 4, {
            SwitchCase: 1,
        }],
        '@typescript-eslint/keyword-spacing': 'off',
    },
};
