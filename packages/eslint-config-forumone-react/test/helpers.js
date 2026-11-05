import { builtinRules } from "eslint/use-at-your-own-risk";
import { ESLint } from "eslint";
import { fileURLToPath } from "node:url";
import path from "node:path";

export const fixturesDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "fixtures",
);

/**
 * Create an ESLint instance that uses one of the flat config files in
 * `fixtures/`. Those files just re-export the package's entry points, so this
 * exercises the config exactly as a consumer would.
 */
export function createESLint(configFile = "eslint.config.js") {
  return new ESLint({
    cwd: fixturesDir,
    overrideConfigFile: path.join(fixturesDir, configFile),
  });
}

/**
 * Lint fixture files and return a sorted list of `ruleId:severity` strings per
 * file. Asserting on rule IDs (not messages) keeps tests stable across patch
 * releases that reword messages. Parse errors show up as `parse-error`.
 */
export async function lintRuleIds(eslint, files) {
  const results = await eslint.lintFiles(files);
  return Object.fromEntries(
    results.map((result) => [
      path.relative(fixturesDir, result.filePath),
      result.messages
        .map(
          (m) => `${m.ruleId ?? "parse-error"}:${m.severity === 2 ? "error" : "warn"}`,
        )
        .sort(),
    ]),
  );
}

/** Convert a resolved rule entry ([2, {opts}] / 2 / "error") to stable JSON. */
const SEVERITIES = ["off", "warn", "error"];
function normalizeRuleEntry(entry) {
  const [severity, ...options] = Array.isArray(entry) ? entry : [entry];
  const name = typeof severity === "number" ? SEVERITIES[severity] : severity;
  return options.length ? [name, ...options] : name;
}

/** Resolved rules for a file, sorted by rule name, with normalized severities. */
export async function resolvedRules(eslint, file) {
  const config = await eslint.calculateConfigForFile(path.join(fixturesDir, file));
  return Object.fromEntries(
    Object.entries(config.rules ?? {})
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, entry]) => [name, normalizeRuleEntry(entry)]),
  );
}

/**
 * Map every plugin prefix (e.g. `@typescript-eslint`, `react-hooks`) to its
 * plugin object, by reading the exported flat config array directly.
 */
export function pluginsFromConfig(configArray) {
  const plugins = {};
  for (const entry of configArray) {
    Object.assign(plugins, entry.plugins);
  }
  return plugins;
}

/** Look up a rule definition by ID in core rules or the given plugins. */
export function findRule(ruleId, plugins) {
  const slash = ruleId.lastIndexOf("/");
  if (slash === -1) {
    return builtinRules.get(ruleId);
  }
  const prefix = ruleId.slice(0, slash);
  const name = ruleId.slice(slash + 1);
  return plugins[prefix]?.rules?.[name];
}
