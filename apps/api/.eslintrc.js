/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: ['jsdoc', 'jest'],
  extends: ['plugin:jsdoc/recommended', 'plugin:jest/recommended'],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-returns-type': 'off',
    'jsdoc/require-returns-description': 'off',
  },
};
