Forum One JavaScript Coding Style
================================

Our JavaScript code style conventions are based on:
- [ESLint's Recommended Config](https://eslint.org/docs/latest/rules/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Prettier](https://prettier.io/docs/related-projects#eslint-integrations)
- [Prettier Plugin: Organize Imports](https://github.com/simonhaenisch/prettier-plugin-organize-imports)
- [Storybook ESLint](https://storybook.js.org/docs/configure/integration/eslint-plugin)
with customizations for specific environments and team practices.

Usage
-----
1. Run `npm install eslint-config-forumone-es5`.
2. Add `extends: 'forumone-es5'` to your ESLint configuration file.

### Storybook

Storybook-specific linting (via `eslint-plugin-storybook`) is not included by
default, so projects that don't use Storybook aren't required to install it.

For projects that do use Storybook:
1. Run `npm install --save-dev eslint-plugin-storybook storybook`.
2. Import and spread the `/storybook` subpath into your flat config alongside
   the base config:

```js
import forumoneEs5 from "@forumone/eslint-config-es5";
import forumoneEs5Storybook from "@forumone/eslint-config-es5/storybook";

export default [...forumoneEs5, ...forumoneEs5Storybook];
```
