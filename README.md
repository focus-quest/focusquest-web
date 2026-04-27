# focusquest-web

Focus Quest's web presence — legal pages today, marketing site as it grows.

Built with Astro 6, React 19, and MDX. Static-rendered, deployed to GitHub Pages.

## Pages

- `/` — landing page
- `/privacy` — Privacy Policy (Markdown via content collection)
- `/terms` — Terms & Conditions (Markdown via content collection)
- `/support` — Support page (static)
- `/faq` — Frequently Asked Questions
- `/impressum` — Legal disclosure required under German law (§5 TMG, §18 MStV)

## Local development

```sh
npm install
npm run dev    # serves at http://localhost:4321/focusquest-web/
npm run build  # outputs to ./dist
npm run preview
```

Requires Node ≥ 22.12.

## Adding a new legal page

1. Drop a Markdown file into `src/content/legal/` with this frontmatter:
   ```yaml
   ---
   title: "Page Title"
   description: "One-line summary."
   effectiveDate: 2026-04-27
   lastUpdated: 2026-04-27
   ---
   ```
2. Create a matching route in `src/pages/<slug>.astro` mirroring `privacy.astro`:
   ```astro
   ---
   import { getEntry, render } from 'astro:content';
   import LegalLayout from '../layouts/LegalLayout.astro';
   const entry = await getEntry('legal', '<slug>');
   if (!entry) throw new Error('Missing legal/<slug> entry');
   const { Content } = await render(entry);
   const { title, description, effectiveDate, lastUpdated } = entry.data;
   const fmt = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
   ---
   <LegalLayout title={title} lede={description} effective={fmt(effectiveDate)} updated={fmt(lastUpdated)}>
     <Content />
   </LegalLayout>
   ```
3. Add a link to it in `src/components/Footer.astro`.

The Table of Contents auto-builds from `h2[id]` headings — Markdown headings get IDs automatically.

## Design system

- Tokens and the full production stylesheet live in `src/styles/global.css`.
- Layouts: `src/layouts/BaseLayout.astro` (chrome) and `src/layouts/LegalLayout.astro` (doc body + ToC + last-updated badge).
- Components: `TopBar`, `Footer`, `ProgressBar`, `ToC`, `LastUpdated` (in `src/components/`).
- Inter and JetBrains Mono are loaded from Google Fonts via `<link>` in `BaseLayout`.

## Deployment

Hosted from the [`focus-quest`](https://github.com/focus-quest) GitHub organization at:

**https://focus-quest.github.io/focusquest-web/**

Push to `main` and the GitHub Actions workflow at `.github/workflows/deploy.yml` (using `withastro/action`) builds and deploys to GitHub Pages.

If a custom domain is added later (CNAME in `public/`), set `site` in `astro.config.mjs` to that domain and **delete the `base` line entirely**.

### One-time GitHub setup

1. Create a repository named `focusquest-web` under the `focus-quest` org and push this code.
2. In the repo settings → Pages → Source: **GitHub Actions**.
3. The first push to `main` will trigger the workflow and publish to the URL above.

## TODO before launch

- **Set `APP_STORE_URL`** in `src/consts.ts` once the iOS app is live on the App Store. While `null` in production, all "Download on the App Store" buttons and the Apple trademark line are hidden; setting the URL re-enables them everywhere. Dev mode (`npm run dev`) always shows them so the design stays reviewable locally.

## Polish backlog

Non-blocking items to pick up when there's time. None of these gate launch.

- **Replace the placeholder OG image with a hand-designed one.** The current `public/og-image.png` is generated from `scripts/generate-og-image.mjs` (a 1200×630 SVG rasterized via Sharp) — clean but plain. When a pixel-art hero scene is ready, just drop the new PNG at `public/og-image.png` and the existing meta tags pick it up. To tweak the placeholder, edit the SVG in the script and run `npm run og:gen`. Test cards with [opengraph.xyz](https://www.opengraph.xyz/) or by sharing into Slack/iMessage after deploy.
- **Update `withastro/action`** when a Node 24 release ships. The current build emits a Node 20 deprecation warning; non-blocking until **September 2026** when Node 20 is removed from runners.

> Note on `robots.txt`: it's served at `https://focus-quest.github.io/focusquest-web/robots.txt`, but crawlers fetch robots.txt from the *host root* (`focus-quest.github.io/robots.txt`) which we don't control. So the current robots.txt is effectively decorative — it becomes authoritative only after a custom domain is added. In the meantime, submit the sitemap directly via Google Search Console / Bing Webmaster Tools at launch.

## What's not here

No analytics, no tracking pixels, no third-party scripts, no cookies. The privacy policy says so — keep it true.
