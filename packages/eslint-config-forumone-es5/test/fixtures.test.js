import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createESLint, lintRuleIds } from "./helpers.js";

/**
 * Each fixture in fixtures/ is either known-clean or known-bad. Expectations
 * are the exact sorted `ruleId:severity` list, so a new rule firing on a
 * fixture (e.g. from an upstream preset change) is flagged, not ignored.
 */
const expected = {
  "clean.js": [],
  "clean.ts": [],
  "no-var.js": ["no-var:error"],
  "eqeqeq.js": ["eqeqeq:error"],
  // Only console.log is reported; console.warn and console.error are allowed.
  "no-console.js": ["no-console:error"],
  "prettier.js": ["prettier/prettier:error"],
  "style.js": [
    "no-duplicate-imports:error",
    "no-lonely-if:error",
    "no-param-reassign:error", // `flag = ...` flagged; `other.prop = ...` allowed
    "no-shadow:error",
    "no-useless-assignment:error",
    "object-shorthand:error",
    "object-shorthand:error",
    "prefer-const:error",
  ],
  "no-explicit-any.ts": ["@typescript-eslint/no-explicit-any:error"],
  // `_`-prefixed vars, args and caught errors are ignored; `reported` is not.
  "unused-vars.ts": ["@typescript-eslint/no-unused-vars:error"],
  "explicit-boundary.ts": [
    "@typescript-eslint/explicit-module-boundary-types:error",
  ],
  // Needs type information, so this proves the type-checked block applies.
  "floating-promise.ts": ["@typescript-eslint/no-floating-promises:error"],
};

describe("base config fixtures", () => {
  const eslint = createESLint();

  for (const [file, rules] of Object.entries(expected)) {
    it(file, async () => {
      assert.deepEqual((await lintRuleIds(eslint, [file]))[file], rules);
    });
  }

  // Regression: `files: ["*.ts"]` only matched the config's root directory, so
  // nested TypeScript files skipped the type-checked rules.
  it(
    "applies type-checked rules to nested TypeScript files",
    async () => {
      const file = "nested/floating-promise.ts";
      assert.deepEqual((await lintRuleIds(eslint, [file]))[file], [
        "@typescript-eslint/no-floating-promises:error",
      ]);
    },
  );
});

describe("storybook config fixtures", () => {
  const eslint = createESLint("eslint.storybook.config.js");

  // Regression: eslint-plugin-storybook <10.6 called context.getFilename(),
  // removed in ESLint 10, so linting any story file threw.
  it(
    "reports stories without a default export",
    async () => {
      const file = "Button.stories.js";
      assert.deepEqual((await lintRuleIds(eslint, [file]))[file], [
        "storybook/default-exports:error",
      ]);
    },
  );

  it("does not ignore the .storybook directory", async () => {
    assert.equal(await eslint.isPathIgnored(".storybook/main.js"), false);
  });
});
