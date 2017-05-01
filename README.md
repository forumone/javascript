Forum One JavaScript Coding Style
================================

Our coding conventions are minor modifications of [Airbnb's legacy ES5 configuration](https://github.com/airbnb/javascript/tree/es5-deprecated/es5), with customizations for specific environments.

Usage
-----

1. First, you'll need ESLint. Here's a [quick start guide](http://eslint.org/docs/user-guide/getting-started).
2. For bonus points, get your [editor integrated](http://eslint.org/docs/user-guide/integrations).
3. Since we're extending another config, you'll need to read the installation instructions for [`airbnb-base/legacy`](https://www.npmjs.com/package/eslint-config-airbnb-base#eslint-config-airbnb-baselegacy).
4. Run `npm install eslint-config-forumone-es5`.
5. Add `extends: 'forumone-es5'` to your ESLint configuration file.

Modules
-------

### eslint-config-forumone-es5

Forum One's base ES5 ESLint configuration.
