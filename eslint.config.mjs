import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "assets/**",
    "public/**",
    "*.js",
    "log.js",
    "api-server.js",
    "visitor-tracker.js",
    "visitor-stats-display.js",
  ]),
]);

export default eslintConfig;
