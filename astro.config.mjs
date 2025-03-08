// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { browserslistToTargets } from "lightningcss";
import browserslist from "browserslist";

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
});
