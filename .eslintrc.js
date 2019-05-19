module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },

  rules: {
<<<<<<< HEAD
    'no-unused-vars': ['error', { args: 'none' }],
    'no-underscore-dangle': [0],
    // configure the prettier plugin
    'prettier/prettier': [
      'error',
||||||| merged common ancestors
    "no-unused-vars": ["error", { "args": "none" }],
    "no-underscore-dangle": [0],
     // configure the prettier plugin
    "prettier/prettier": [
      "error",
=======
    "no-unused-vars": ["error", { "args": "none" }],
    "no-underscore-dangle": [0],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
     // configure the prettier plugin
    "prettier/prettier": [
      "error",
>>>>>>> master
      {
        trailingComma: 'es5',
        singleQuote: true
      }
    ]
  },
  plugins: ['prettier']
};
