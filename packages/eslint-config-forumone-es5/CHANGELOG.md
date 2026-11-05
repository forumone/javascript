# Changelog

## 5.0.1
- Dependency bumps within existing majors: `typescript-eslint` ^8.72.1,
  `@eslint/js` ^9.39.5 (kept on 9.x because 10.x only supports ESLint 10),
  `eslint-plugin-prettier` ^5.5.7. Clears the high-severity `minimatch` ReDoS and the `ajv`/`flatted`
  advisories that came in through older `typescript-eslint`. One moderate
  `minimatch` advisory (GHSA-g3hv-75wg-m249) remains: ESLint 10 and
  `@typescript-eslint/typescript-estree` pin `minimatch ^10`, so it can only be
  fixed upstream.
- Peer dependency ranges now match what is tested: `eslint` `^9.22.0 || ^10.0.0`,
  `prettier` `^3.8.0`, and `typescript` `>=5.9.0 <6.1.0` (the `typescript-eslint`
  ceiling; the open-ended range could auto-install an unsupported TypeScript 7).

## 5.0.0
**Breaking Change**: Type-checked TypeScript rules now apply to nested files.
The `files` globs were `*.ts`/`*.tsx`, which in flat config only match the
config's own directory, so `src/**/*.ts` never got `recommendedTypeChecked`
or `explicit-module-boundary-types`. They are now `**/*.ts`/`**/*.tsx`, so
expect new errors such as `no-floating-promises`, `no-unsafe-*` and
`await-thenable` in existing projects. Requires `parserOptions.projectService`
to find a tsconfig that includes your files.

**Breaking Change**: `@typescript-eslint/no-empty-interface` (deprecated in
typescript-eslint v8) is replaced by `@typescript-eslint/no-empty-object-type`
with `allowInterfaces: "with-single-extends"`. This also flags empty object
type literals (`{}`).

Dependency bump: `eslint-plugin-storybook`/`storybook` 10.6.5, which fixes a
crash on ESLint 10 (`context.getFilename is not a function`).

## 4.0.0
**Breaking Change**: Storybook linting is no longer included by default.
`eslint-plugin-storybook` (and its `storybook` peer dependency) has moved out
of the base config into a separate `@forumone/eslint-config-es5/storybook`
subpath, so projects that don't use Storybook no longer see a `storybook`
peer dependency warning. Projects using Storybook must now install
`eslint-plugin-storybook` themselves and add the `/storybook` subpath to
their flat config — see the README for usage.

## 3.0.0
**Breaking Changes**: Basically everything. Requires ESLint 9 and switches to
eslint:recommended as the base config. You probably aren't using version 2, but
if you are, this amounts to a new start.
