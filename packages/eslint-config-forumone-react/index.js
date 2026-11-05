import { defineConfig } from "eslint/config";
import reactPlugin from "eslint-plugin-react";
import * as reactHooks from "eslint-plugin-react-hooks";
import jsxAlly from "eslint-plugin-jsx-a11y";

const config = defineConfig([
  reactPlugin.configs.flat.recommended,
  // Modern JSX transform (React 17+): no need to import React in every file.
  reactPlugin.configs.flat["jsx-runtime"],
  reactHooks.configs.flat.recommended,
  jsxAlly.flatConfigs.recommended,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
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
  // Disable prop type validation for JSX files. For prop type validation,
  // use TypeScript in a TSX file. JSX is used for Storybook in non-Next.js
  // projects and doesn't need strict validation.
  {
    files: ["**/*.jsx"],
    rules: {
      "react/prop-types": ["off"],
    },
  },
]);

export default config;
