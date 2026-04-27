// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Deployed via GitHub Pages from the `focus-quest` GitHub organization.
// Live URL: https://focus-quest.github.io/focusquest-web/
// If a custom domain is added later (CNAME in public/), set `site` to that
// domain and DELETE the `base` line entirely.
export default defineConfig({
  site: 'https://focus-quest.github.io',
  base: '/focusquest-web',
  integrations: [react(), mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
});
