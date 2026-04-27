// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// TODO — confirm both `site` and `base` before the first production deploy.
// For a GitHub Pages project site at https://<user>.github.io/focusquest-web/:
//   site: 'https://<user>.github.io'
//   base: '/focusquest-web'
// If a custom domain is added (CNAME in public/), set `site` to that domain
// and DELETE the `base` line entirely.
export default defineConfig({
  site: 'https://kaumon-aung.github.io',
  base: '/focusquest-web',
  integrations: [react(), mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
});
