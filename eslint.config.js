import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    rules: {
      'prefer-const': 'warn',
      'no-constant-binary-expression': 'error',
    },
  },
];
