# CLAUDE.md

Static marketing + legal site for the FocusQuest iOS app, built with Astro 6 + MDX, deployed to GitHub Pages. See `README.md` for full setup, page list, and deployment details.

## Open work

`notes/TODO.md` (local-only — `notes/` is gitignored) tracks pending items before/around App Store launch. Currently:

1. Set `APP_STORE_URL` in `src/consts.ts` once the iOS app is live.
2. Replace the `support@example.com` placeholder across the site with the real support address once it exists (e.g. `support@focus-quest.app`).

Read `notes/TODO.md` for file-by-file pointers.

## Branding convention

The app's display name is the **compound** `FocusQuest` — used everywhere user-facing (pages, legal copy, OG image, footer, layouts).

The two-word `Focus Quest` is intentionally retained for internal/source surfaces:

- The GitHub org and repo URL (`focus-quest.github.io/focusquest-web`)
- `README.md`
- The CSS file-header comment in `src/styles/global.css`
- Any backend identifiers (bundle ID, RevenueCat, Convex, Clerk, database)

Don't "fix" those to the compound form — the split is deliberate (App Store 4.1(c) review risk vs. internal stability). The reasoning lives in `notes/FocusQuest-naming-final.md` if needed.

## Conventions

- After editing `scripts/generate-og-image.mjs`, run `npm run og:gen` to regenerate `public/og-image.png` and commit both.
- The brand mark across the site is `<img class="brand-icon" src=".../icon.png">` + plain "FocusQuest" text — don't reintroduce the pixel-art `logo.png` wordmark in the topbar/footer; it was tested and rejected as hard to read at small sizes. `logo.png` is kept in `public/` for other uses (social, screenshots).
- `notes/` is gitignored. Anything inside is the user's local scratchpad — never `git add` it, and don't reference its contents in committed code.
