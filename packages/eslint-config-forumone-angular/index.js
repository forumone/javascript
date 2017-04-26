/* eslint-env node, commonjs */

exports.extends = require.resolve('./legacy');

exports.rules = {
  // Ban deprecated behaviors
  'angular/deferred': 'error',
  'angular/no-http-callback': 'error',
  'angular/no-cookiestore': 'error',
  'angular/no-directive-replace': 'error',

  // The rules below encourage (but do not require) certain best practices. The entry point
  // forumone-angular/strict upgrades these to hard errors.

  // Naming conventions
  'angular/controller-name': 'warn',
  'angular/module-name': ['warn', 'app'],
  'angular/file-name': ['warn', {
    typeSeparator: 'dot',
  }],

  // Structural conventions
  'angular/component-limit': ['warn', 1],
  'angular/module-dependency-order': ['warn', {
    grouped: true,
    prefix: 'app',
  }],

  // Mandate components when possible, and sane directives when not.
  'angular/prefer-component': 'warn',
  'angular/directive-restrict': 'warn',

  // Typo avoidance
  'angular/on-destroy': 'warn',
  // We would like to enable this rule, but it generates false positives for e.g., Function#apply
  'angular/avoid-scope-typos': 'off',
};
