/* eslint-env node, commonjs */

exports.ecmaFeatures = {
  impliedStrict: true,
};

// Our ES5 projects are exclusively browser-focused
exports.env = {
  browser: true,
  node: false,
  commonjs: false,
};

exports.extends = 'airbnb-base/legacy';

exports.rules = {
  // Overrides of airbnb-base/legacy

  // IE8 is dead, we can require trailing commas safely
  'comma-dangle': ['error', 'always-multiline'],

  // block-scoped-var and no-use-before-define cover the use cases here
  // no need to manually hoist as well
  'vars-on-top': ['off'],

  // Style guidance left to the programmer
  'no-else-return': ['off'],
  'func-names': ['off'],

  // Function hoisting is always safe
  'no-use-before-define': ['error', {
    functions: false,
  }],

  // Allow conditionals in loops (but only if you promise that you know what you're doing)
  'no-cond-assign': ['error', 'except-parens'],

  // Unconditionally require curly braces
  curly: ['error', 'all'],

  // Additional rules

  // Disallow superfluous parentheses, unless you need to disambiguate precedence
  'no-extra-parens': ['error', 'all', {
    conditionalAssign: false,
    nestedBinaryExpressions: false,
  }],

  // Eventually, this will be an error (and also require parameter descriptions)
  'valid-jsdoc': ['warn', {
    requireReturn: false,
    requireParamDescription: false,
    requireReturnDescription: false,

    prefer: {
      arg: 'param',
      argument: 'param',

      returns: 'return',
    },
  }],
};
