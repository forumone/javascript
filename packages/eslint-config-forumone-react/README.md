Forum One React Coding Style
================================

Our JavaScript code style conventions are based on:
- [ESLint's Recommended Config](https://eslint.org/docs/latest/rules/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Prettier](https://prettier.io/docs/related-projects#eslint-integrations)
- [Prettier Plugin: Organize Imports](https://github.com/simonhaenisch/prettier-plugin-organize-imports)
  with customizations for specific environments and team practices.

For best results, mix with a base style guide of your choice. We recommend `eslint-config-forumone-es5`:
```js
import { defineConfig } from 'eslint/config';
import f1Config from 'eslint-config-forumone-es5';
import f1ReactConfig from 'eslint-config-forumone-react';

const config = defineConfig([
  {
    extends: [f1Config, f1ReactConfig]
  }
]);

export default config;
```

Usage
-----
1. Run `eslint-config-forumone-react`.
2. Add `extends: 'forumone-es5'` to your ESLint configuration file.
