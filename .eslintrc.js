/**
 * @type {import('eslint').Linter.Config}
 */
const opts = {
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    // undefined vars will be handled by the TS compiler
    'no-undef': 'off',
    // unused vars will be handled by the TS compiler
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
      },
    ],
  },
};
module.exports = opts;
