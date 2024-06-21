module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended', 
    'plugin:react-native/all'
  ],
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
};