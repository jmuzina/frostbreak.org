// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { browserslistToTargets } from "lightningcss";
import browserslist from "browserslist";

const { PR_PREVIEW_PREFIX } = process.env;

const base = PR_PREVIEW_PREFIX?.length ? `/${PR_PREVIEW_PREFIX}/` : "/";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    css: {
      transformer: "lightningcss",
      lightningcss: {
        targets: browserslistToTargets(browserslist(">= 0.25%")),
        drafts: {
          customMedia: true,
        },
      },
    },
    build: {
      cssMinify: "lightningcss",
    },
  },
  base,
});
