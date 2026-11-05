// Composed exactly as documented in the package README.
import f1Config from "@forumone/eslint-config-es5";
import { defineConfig } from "eslint/config";
import f1ReactConfig from "../../index.js";

export default defineConfig([
  {
    extends: [f1Config, f1ReactConfig],
  },
]);
