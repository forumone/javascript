/* eslint-env node, commonjs */

exports.plugins = [
  'angular',
];

exports.rules = {
  // We use ng-annotate everywhere
  'angular/di': ['error', 'function'],

  // Tidy up your injected values
  'angular/di-unused': 'error',

  // Don't leak application variables into the global scope
  'angular/module-getter': 'error',
  'angular/module-setter': 'error',
};
