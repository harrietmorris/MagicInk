// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      indent: ['error', 2],
      'keyword-spacing': 'error',
      'linebreak-style': 'error',
      quotes: ['error', 'single'],
      semi: 'error',
      'space-before-blocks': 'error',
      'space-before-function-paren': 'error',
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  }
);
