import { defineConfig } from "eslint/config";
import reactPlugin from "eslint-plugin-react";
import * as reactHooks from "eslint-plugin-react-hooks";
import jsxAlly from "eslint-plugin-jsx-a11y";

const config = defineConfig([
  reactPlugin.configs.flat.recommended,
  reactHooks.configs["recommended-latest"],
  jsxAlly.flatConfigs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxAlly,
    },
  },
]);

export default config;
