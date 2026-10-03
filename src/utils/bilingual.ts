/**
 * General pages (home, portfolio, bio, 404) are BILINGUAL: they are built
 * once with both languages in the HTML, and the visitor's language decides
 * which one shows. Blog pages are not — each blog is in its own language.
 *
 * How the switch works (no flash, no separate /en/ URLs):
 *  1. Text is rendered twice — <span data-lang-only="es"> and "en" — by
 *     UIText.astro, straight from the es.ts / en.ts dictionaries.
 *  2. An inline script in Layout.astro's <head> sets <html lang> from the
 *     stored choice or the browser language BEFORE the first paint.
 *  3. A CSS rule in global.css hides whichever language doesn't match
 *     <html lang>.
 * Attributes (aria-label, title) can't be rendered twice, so they carry
 * both values in data-i18n-attrs and the same script applies the right one.
 */
import { blogFromPath, type Lang } from "@/blogs";
import { useTranslations } from "@/i18n";
import type { UIStrings } from "@/i18n/types";

/** localStorage key for the visitor's explicit ES/EN choice */
export const LANG_STORAGE_KEY = "dataviz-lang";

/** Pages outside the two blogs switch language on the client */
export function isBilingualPage(url: URL): boolean {
  return !blogFromPath(url.pathname);
}

export type PickString = (t: UIStrings) => string;

/**
 * Value for a data-i18n-attrs attribute: each attribute's text in both
 * languages, e.g. { "aria-label": t => t.a11y.openMenu }
 * → '{"aria-label":{"es":"Abrir menú","en":"Open menu"}}'
 */
export function i18nAttrs(attrs: Record<string, PickString>): string {
  const both = (pick: PickString) =>
    Object.fromEntries(
      (["es", "en"] as Lang[]).map(lang => [lang, pick(useTranslations(lang))])
    );
  return JSON.stringify(
    Object.fromEntries(
      Object.entries(attrs).map(([attr, pick]) => [attr, both(pick)])
    )
  );
}
