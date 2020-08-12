// noinspection JSUnresolvedVariable
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    // node: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  // extends: 'standard',
  // required to lint *.vue files
  // plugins: [
  //   'html'
  // ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': ['warn', {
      'vars': 'all',
      'args': 'after-used',
      'ignoreRestSiblings': false
    }],
    'comma-dangle': [2],
    'no-trailing-spaces': ['warn'],
    'space-before-function-paren': [0],
    'padded-blocks': [0],
    // "vue/no-parsing-error": [2, {
    //   "x-invalid-end-tag": false
    // }
  // ]
}
}