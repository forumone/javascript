import assert from "node:assert/strict";
import { describe, it } from "node:test";
import base from "../index.js";
import storybook from "../storybook.js";
import {
  createESLint,
  findRule,
  pluginsFromConfig,
  resolvedRules,
} from "./helpers.js";
import { baseSamples, storybookSamples } from "./samples.js";

// Deprecated rules we knowingly still use. Add an entry (with a reason) rather
// than ignoring a failure; remove the entry when the rule is replaced.
const KNOWN_DEPRECATED = new Set([]);

const entryPoints = [
  ["index.js", base, "eslint.config.js", baseSamples],
  [
    "storybook.js",
    [...base, ...storybook],
    "eslint.storybook.config.js",
    storybookSamples,
  ],
];

for (const [name, config, configFile, samples] of entryPoints) {
  describe(`${name} entry point`, () => {
    it("exports a non-empty flat config array of objects", () => {
      assert.ok(Array.isArray(config), "export is an array");
      assert.ok(config.length > 0, "array is not empty");
      config.forEach((entry, index) => {
        assert.equal(
          typeof entry,
          "object",
          `entry ${index} is ${String(entry)}; a renamed upstream preset path usually produces undefined here`,
        );
        assert.notEqual(entry, null, `entry ${index} is null`);
      });
    });

    it("resolves (rules exist and options validate) for every sample file", async () => {
      const eslint = createESLint(configFile);
      for (const file of samples) {
        // calculateConfigForFile throws on unknown rules or invalid options.
        const rules = await resolvedRules(eslint, file);
        assert.ok(Object.keys(rules).length > 0, `${file}: no rules resolved`);
      }
    });

    it("does not enable deprecated rules", async () => {
      const eslint = createESLint(configFile);
      const plugins = pluginsFromConfig(config);
      const deprecated = new Set();
      for (const file of samples) {
        const rules = await resolvedRules(eslint, file);
        for (const [ruleId, entry] of Object.entries(rules)) {
          const severity = Array.isArray(entry) ? entry[0] : entry;
          if (severity === "off") {
            continue;
          }
          const rule = findRule(ruleId, plugins);
          assert.ok(rule, `${file}: rule ${ruleId} is enabled but not found`);
          if (rule.meta?.deprecated && !KNOWN_DEPRECATED.has(ruleId)) {
            deprecated.add(ruleId);
          }
        }
      }
      assert.deepEqual(
        [...deprecated].sort(),
        [],
        "deprecated rules are enabled; replace them or add to KNOWN_DEPRECATED",
      );
    });
  });
}
