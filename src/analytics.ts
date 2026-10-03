/**
 * Google Analytics 4 — the measurement ID lives here.
 *
 * Replace the placeholder with the real ID from GA4 (Admin → Data streams
 * → your web stream → "Measurement ID", looks like G-AB12CD34EF).
 * PUBLIC_GA_ID in the environment overrides it (handy for testing).
 *
 * Analytics only loads when the ID is real AND the site is a production
 * build: nothing is sent while it's the placeholder, and your own visits
 * while running `npm run dev` don't pollute the stats.
 */
const PLACEHOLDER = "G-XXXXXXX";

export const GA_MEASUREMENT_ID: string =
  import.meta.env.PUBLIC_GA_ID || PLACEHOLDER;

export const analyticsEnabled =
  import.meta.env.PROD &&
  GA_MEASUREMENT_ID !== PLACEHOLDER &&
  /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID);
