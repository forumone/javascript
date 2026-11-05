# Changelog

## 3.1.1
- Bumped `eslint-plugin-react-hooks` to ^7.1.1 (the removed
  `react-hooks/component-hook-factories` rule no longer appears in resolved rules).
- Peer dependency ranges tightened: `eslint` `^9.22.0`, `prettier`
  `^3.8.0`, `typescript` `>=5.9.0 <6.1.0`.
- Known limitation: `eslint-plugin-react` and `eslint-plugin-jsx-a11y` (latest
  releases) do not yet support ESLint 10, so this config works on ESLint 9 only
  for now.

## 3.1.0
- Enabled the React modern JSX transform config (`jsx-runtime`), so React no
  longer needs to be imported in every JSX file (`react/react-in-jsx-scope` and
  `react/jsx-uses-react` are off).
- Added `settings.react.version: "detect"` so `eslint-plugin-react` picks up
  the installed React version.
- The optional peer dependency was renamed from `eslint-config-forumone-es5`
  to `@forumone/eslint-config-es5`, and its range widened to
  `>=3.0.0 <6.0.0` so it works with es5 config 5.x.
- Only `index.js` is now published (`files` in `package.json`).
- Added a test suite (fixture, smoke and resolved-rules snapshot tests); run it
  with `npm test`.

## 3.0.9
- Disabled prop-type validation for JSX files only.
