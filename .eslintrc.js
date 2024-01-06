module.exports = {
    parser: '@typescript-eslint/parser', extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', // Ajusta algumas regras do ESLint para TypeScript
        'plugin:@typescript-eslint/recommended'
    ], parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    }, rules: {
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
    }
};
