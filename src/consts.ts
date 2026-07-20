// Set this to the App Store URL once the iOS app is live.
// While null in production, all "Download on the App Store" buttons
// (top bar, hero CTA, footer link) and the Apple trademark line
// are hidden. In dev mode they are always shown so the design can
// be reviewed locally.
export const APP_STORE_URL: string | null =
  'https://apps.apple.com/us/app/focusquest-focus-timer-rpg/id6766097236';

export const SHOW_APP_STORE_LINK = import.meta.env.DEV || APP_STORE_URL !== null;
export const APP_STORE_HREF = APP_STORE_URL ?? '#';
