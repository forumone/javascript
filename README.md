# Forum One JavaScript Tools

## Modules

### eslint-config-forumone-es5 (`@forumone/eslint-config-es5`)

Forum One's ESLint configuration for JavaScript and TypeScript.

### eslint-config-forumone-react (`@forumone/eslint-config-react`)

Forum One's ESLint configuration for React.

### tiny-mustache (`@forumone/tiny-mustache`)

Fork of tiny-mustache for Forum One.

## Releasing

Releases are automated by `.github/workflows/publish.yml` on every push to `main`.

1. In your PR, bump `version` in the package's `package.json` and update its `CHANGELOG.md`.
2. Merge to `main`. For each package, CI checks whether that version is already on npm. If it isn't, CI runs the package's tests and publishes it to npm. Packages whose version is unchanged are skipped.
3. If `@forumone/eslint-config-es5` was released, CI also creates a GitHub release tagged `eslint-config-es5-v<version>` and publishes the package to GitHub Packages (`release-eslint-config-es5.yml`).

Pre-release versions (e.g. `1.0.0-alpha.1`) are not supported; the workflow fails if a package version contains a `-`.

npm publishing uses [trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC), so there is no npm token. Each package must have `forumone/javascript` and the workflow filename `publish.yml` configured as a trusted publisher on npmjs.com.
