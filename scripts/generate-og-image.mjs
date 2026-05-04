// Generates public/og-image.png from an inline SVG composited with the app icon.
// Run with: npm run og:gen
//
// To tweak the look, edit the SVG below and re-run.

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, '..', 'public', 'og-image.png');
const iconPath = join(root, '..', 'public', 'icon.png');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#fbf5e3"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#e9d99b" stroke-width="2"/>

  <g transform="translate(96, 130)">
    <rect x="0" y="-8" width="10" height="10" fill="#b8860b" transform="rotate(45 5 -3)"/>
    <text x="26" y="2" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          font-size="18" font-weight="600" fill="#b8860b" letter-spacing="3">A FOCUS APP FOR ADVENTURERS</text>
  </g>

  <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        font-size="96" font-weight="600" fill="#0f1115" letter-spacing="-3">
    <tspan x="96" y="290">Turn focus sessions</tspan>
    <tspan x="96" y="395">into quests.</tspan>
  </text>

  <text x="96" y="475" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        font-size="28" font-weight="400" fill="#3d424d">A pixel-art productivity RPG for iOS.</text>

  <text x="172" y="546" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        font-size="22" font-weight="600" fill="#0f1115">FocusQuest</text>

  <text x="1104" y="561" text-anchor="end"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        font-size="14" font-weight="400" fill="#6b7280">focus-quest.github.io/focusquest-web</text>
</svg>
`;

const baseLayer = await sharp(Buffer.from(svg)).png().toBuffer();
const iconLayer = await sharp(iconPath)
  .resize(56, 56, { kernel: 'nearest' })
  .toBuffer();

await sharp(baseLayer)
  .composite([{ input: iconLayer, top: 510, left: 96 }])
  .png()
  .toFile(out);

console.log(`✓ Wrote ${out}`);
