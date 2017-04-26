ForumOne JavaScript Coding Style (Angular Edition)
==================================================

See [forumone/javascript](https://github.com/forumone/javascript) on Github for a longer intro.

For best results, mix with a base style guide of your choice. We recommend `eslint-config-forumone-es5`:

```js
exports.extends = [
  'forumone-es5',
  'forumone-angular',
];
```

Requirements
------------

This package depends on both `eslint` and `eslint-plugin-angular`.

Entry Points
------------

### `forumone-angular/legacy`

For retrofitting existing Angular apps. This config adds some simple lints around DI injection style, unused parameters, and holding on to the return of `angular.module()`.

### `forumone-angular`

The default configuration. This builds on the legacy config and bans deprecated Angular functionality.

It also warns about patterns that go against best practices, such as scope event typos, naming conventions, and having more than one component per file.

### `forumone-angular/strict`

Like the default, but all warnings are hard errors.
