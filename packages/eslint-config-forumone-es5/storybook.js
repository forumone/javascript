// @ts-check

import { globalIgnores } from "eslint/config";
import storybook from "eslint-plugin-storybook";

/**
 * @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile}
 */
const config = [
  globalIgnores(["!.storybook"], "Include Storybook Directory"),
  ...storybook.configs["flat/recommended"],
];

export default config;
