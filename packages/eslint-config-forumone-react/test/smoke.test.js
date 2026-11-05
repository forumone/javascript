import assert from "node:assert/strict";
import { describe, it } from "node:test";
import es5 from "@forumone/eslint-config-es5";
import react from "../index.js";
import {
  createESLint,
  findRule,
  pluginsFromConfig,
  resolvedRules,
} from "./helpers.js";
import { composedSamples, reactOnlySamples } from "./samples.js";

// Deprecated rules we knowingly still use. Add an entry (with a reason) rather
// than ignoring a failure; remove the entry when the rule is replaced.
const KNOWN_DEPRECATED = new Set([
]);

const setups = [
  ["react config alone", react, "eslint.react.config.js", reactOnlySamples],
  [
    "react config composed with es5",
    [...es5, ...react],
    "eslint.config.js",
    composedSamples,
  ],
];

describe("index.js entry point", () => {
  it("exports a non-empty flat config array of objects", () => {
    assert.ok(Array.isArray(react), "export is an array");
    assert.ok(react.length > 0, "array is not empty");
    react.forEach((entry, index) => {
      assert.equal(
        typeof entry,
        "object",
        `entry ${index} is ${String(entry)}; a renamed upstream preset path usually produces undefined here`,
      );
      assert.notEqual(entry, null, `entry ${index} is null`);
    });
  });
});

for (const [name, config, configFile, samples] of setups) {
  describe(name, () => {
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

describe("settings", () => {
  // Without settings.react.version, eslint-plugin-react prints "React version
  // not specified" on every run.
  it(
    "sets the React version for eslint-plugin-react",
    async () => {
      const config = await createESLint("eslint.react.config.js").calculateConfigForFile(
        "sample.jsx",
      );
      assert.ok(config.settings?.react?.version);
    },
  );
});
