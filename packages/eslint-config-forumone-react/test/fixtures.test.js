import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createESLint, lintRuleIds } from "./helpers.js";

/**
 * Each fixture is either known-clean or known-bad. Expectations are the exact
 * sorted `ruleId:severity` list, so a new rule firing on a fixture (e.g. from
 * an upstream preset change) is flagged rather than ignored. Fixtures import
 * React so these tests are independent of the `react-in-jsx-scope` gap below.
 */
const expected = {
  "clean.jsx": [],
  "nested/clean.jsx": [],
  "hooks-conditional.jsx": ["react-hooks/rules-of-hooks:error"],
  // Configured as a warning in index.js (not an error like the preset default).
  "set-state-in-effect.jsx": ["react-hooks/set-state-in-effect:warn"],
  "a11y.jsx": ["jsx-a11y/alt-text:error"],
  // prop-types validation is off for .jsx but still on for other extensions.
  "prop-types.jsx": [],
  "prop-types.js": ["react/prop-types:error"],
};

const setups = [
  ["react config alone", "eslint.react.config.js"],
  ["react config composed with es5", "eslint.config.js"],
];

for (const [name, configFile] of setups) {
  describe(`${name}: fixtures`, () => {
    const eslint = createESLint(configFile);

    for (const [file, rules] of Object.entries(expected)) {
      it(file, async () => {
        assert.deepEqual((await lintRuleIds(eslint, [file]))[file], rules);
      });
    }

    // KNOWN GAP: index.js uses plugin-react's `recommended` preset, which
    // enables react/react-in-jsx-scope. With React 17+ (the peer is >=19.2)
    // that flags every component that doesn't `import React`. Remove `todo`
    // once the config adds plugin-react's `jsx-runtime` preset.
    it(
      "does not require React in scope (modern JSX transform)",
      { todo: "react/react-in-jsx-scope is enabled" },
      async () => {
        const file = "modern-jsx-transform.jsx";
        assert.deepEqual((await lintRuleIds(eslint, [file]))[file], []);
      },
    );
  });
}

describe("react config composed with es5: TypeScript", () => {
  const eslint = createESLint("eslint.config.js");

  it("lints .tsx files without parse errors", async () => {
    assert.deepEqual(
      (await lintRuleIds(eslint, ["component.tsx"]))["component.tsx"],
      [],
    );
  });
});
