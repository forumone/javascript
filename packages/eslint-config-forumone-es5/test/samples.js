/**
 * Representative file paths (relative to fixtures/) used by the snapshot and
 * smoke tests. Each represents a distinct resolved-config "shape". The nested
 * TypeScript file matters: it checks that `files` globs apply below the root.
 */
export const baseSamples = [
  "sample.js",
  "sample.mjs",
  "sample.ts",
  "sample.tsx",
  "nested/sample.ts",
  "nested/sample.tsx",
];

export const storybookSamples = [
  "sample.js",
  "Button.stories.js",
  "Button.stories.ts",
  ".storybook/main.js",
  ".storybook/main.ts",
];
