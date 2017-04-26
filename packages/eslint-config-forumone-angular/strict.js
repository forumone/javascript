/* eslint-env node, commonjs */

exports.extends = require.resolve('./index');

exports.rules = {
  // These rules inherit the configuration from the default entry point
  'angular/controller-name': 'error',
  'angular/module-name': 'error',
  'angular/file-name': 'error',

  'angular/component-limit': 'error',
  'angular/module-dependency-order': 'error',

  'angular/prefer-component': 'error',
  'angular/directive-restrict': 'error',

  'angular/on-destroy': 'warn',
};
