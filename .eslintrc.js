module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-plusplus': 'off',
    curly: 'error',
    'no-alert': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'prefer-destructuring': 'off',
  },
  ignorePatterns: [
    'main.js', // Exclude main.js file
  ],
};
