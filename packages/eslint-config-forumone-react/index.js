import { defineConfig } from "eslint/config";
import reactPlugin from "eslint-plugin-react";
import * as reactHooks from "eslint-plugin-react-hooks";
import jsxAlly from "eslint-plugin-jsx-a11y";

const config = defineConfig([
  reactPlugin.configs.flat.recommended,
  reactHooks.configs.flat.recommended,
  jsxAlly.flatConfigs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default config;
