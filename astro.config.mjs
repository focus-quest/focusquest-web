// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

function rehypeWrapTables() {
  return (tree) => {
    const walk = (node) => {
      if (!node || !Array.isArray(node.children)) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child && child.type === 'element' && child.tagName === 'table') {
          node.children[i] = {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-wrap'] },
            children: [child],
          };
        } else {
          walk(child);
        }
      }
    };
    walk(tree);
  };
}

// Deployed via GitHub Pages from the `focus-quest` GitHub organization.
// Served from the custom domain https://focus-quest.app (CNAME in public/).
// `base` is intentionally omitted — the site lives at the domain root, not a
// project sub-path. If you ever revert to the github.io URL, restore
// `base: '/focusquest-web'` and point `site` back at the github.io host.
export default defineConfig({
  site: 'https://focus-quest.app',
  integrations: [react(), mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light' },
    rehypePlugins: [rehypeWrapTables],
  },
});
