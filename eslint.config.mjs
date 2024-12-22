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
            'no-unused-vars': 'error',
            // 'no-console': 'error',
            'dot-notation': 'error',
        },
    },
    {
        ignores: ['dist/**', 'node_modules/**', 'eslint.config.mjs'],
    }
);
