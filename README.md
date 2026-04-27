# focusquest-web

Focus Quest's web presence — legal pages today, marketing site as it grows.

Built with Astro 6, React 19, and MDX. Static-rendered, deployed to GitHub Pages.

## Pages

- `/` — landing page
- `/privacy` — Privacy Policy (Markdown via content collection)
- `/terms` — Terms & Conditions (Markdown via content collection)
- `/support` — Support page (static)
- `/faq` — Frequently Asked Questions (placeholder)
- `/impressum` — Legal disclosure required under German law (**placeholder — must be filled in before launch**)

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

Push to `main`. The GitHub Actions workflow at `.github/workflows/deploy.yml` (using `withastro/action`) builds and deploys to GitHub Pages.

**Before the first deploy, confirm both values in `astro.config.mjs`:**

```js
site: 'https://kaumon-aung.github.io',  // <-- confirm GitHub username
base: '/focusquest-web',                 // <-- confirm repository name
```

If a custom domain is added later (CNAME in `public/`), set `site` to that domain and **delete the `base` line entirely**.

## TODO before launch

- **Impressum** (`src/content/legal/impressum.md`) is a placeholder. Required under §5 TMG and §18 MStV for German-based operators — must include the operator's full legal name, postal address (no P.O. box), contact email, and tax ID (or note that none is held) before publishing.
- **FAQ** (`src/content/legal/faq.md`) is a placeholder.
- Confirm `site` and `base` in `astro.config.mjs`.

## What's not here

No analytics, no tracking pixels, no third-party scripts, no cookies. The privacy policy says so — keep it true.
