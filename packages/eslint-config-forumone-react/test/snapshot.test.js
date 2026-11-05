import assert from "node:assert/strict";
import { it } from "node:test";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createESLint, resolvedRules } from "./helpers.js";
import { composedSamples, reactOnlySamples } from "./samples.js";

/**
 * Snapshot of the fully resolved rules (severity and options) for sample
 * files. After bumping dependencies, run `npm run snapshot` and review the git
 * diff: every added, removed or re-leveled rule from upstream presets shows up
 * there. Commit the updated snapshot alongside the bump.
 */
const snapshotFile = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "snapshots",
  "resolved-rules.json",
);

async function buildSnapshot() {
  const snapshot = {};
  const groups = [
    ["react config alone", "eslint.react.config.js", reactOnlySamples],
    ["react config composed with es5", "eslint.config.js", composedSamples],
  ];
  for (const [name, configFile, samples] of groups) {
    const eslint = createESLint(configFile);
    snapshot[name] = {};
    for (const file of samples) {
      snapshot[name][file] = await resolvedRules(eslint, file);
    }
  }
  return snapshot;
}

it("resolved rules match the committed snapshot", async () => {
  const actual = `${JSON.stringify(await buildSnapshot(), null, 2)}\n`;

  if (process.env.UPDATE_SNAPSHOT) {
    await writeFile(snapshotFile, actual);
    return;
  }

  const committed = await readFile(snapshotFile, "utf8").catch(() => "");
  assert.equal(
    actual,
    committed,
    "Resolved rules changed. If intended, run `npm run snapshot`, review the diff and commit it.",
  );
});
