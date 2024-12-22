// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // 'no-unused-vars': 'error',
            // 'no-console': 'error',
            'dot-notation': 'error',
            "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
        },
    },
    {
        ignores: ['dist/**', 'node_modules/**', 'eslint.config.mjs'],
    }
);
