# Changelog

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
