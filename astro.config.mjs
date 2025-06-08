// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { browserslistToTargets } from "lightningcss";
import browserslist from "browserslist";

const { BASE_URL } = process.env;

const base = BASE_URL?.length ? `/${BASE_URL}/` : "/";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  build: {
    assets: "astroAssets",
  },
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
