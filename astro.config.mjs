import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  site: "https://kartjim.netlify.app/",
  integrations: [mdx(), sitemap(), markdoc()],
  markdown: {
    shikiConfig: {
      themes: {
        light: "slack-ochin",
        dark: "slack-dark",
      },
      langs: [],
      // 启用自动换行，以防止水平滚动
      wrap: true,
      transformers: [],
    },
  },
});
