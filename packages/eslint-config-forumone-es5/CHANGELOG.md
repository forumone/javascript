# Changelog

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
