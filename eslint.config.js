import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import * as tseslint from "typescript-eslint";
import jseslint from "@eslint/js";

import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "node_modules/",
    "dist/",
    ".astro/",
    ".vscode/",
    ".idea/",
    "public/",
  ]),
  // ...tseslint.config(
  //   tseslint.configs.recommended,
  //   jseslint.configs.recommended
  // ),
  ...eslintPluginAstro.configs.recommended,
  // {
  //   files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
  //   plugins: {
  //     "jsx-a11y": jsxA11y,
  //   },
  //   languageOptions: {
  //     parserOptions: {
  //       ecmaFeatures: {
  //         jsx: true,
  //       },
  //     },
  //   },
  //   rules: {
  //     "jsx-a11y/alt-text": "error",
  //   },
  // },
]);
