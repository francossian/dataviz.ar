/**
 * Site-chrome translations (nav, footer, about card).
 *
 * How the two languages reach the page:
 *  - At BUILD time every page is rendered in DEFAULT_LANG (Spanish) using
 *    t(), and each translatable element is tagged data-i18n="<key>".
 *  - At RUN time BaseLayout's inline script reads the visitor's saved choice
 *    (localStorage) and, if it differs, swaps the text of every [data-i18n]
 *    element using these same dictionaries. No /en/ or /es/ routes.
 *
 * Blog posts and portfolio cards are NOT translated here — posts carry their
 * own `lang`, and portfolio cards show both languages side by side.
 */
import es from "./es.json";
import en from "./en.json";

export type Lang = "es" | "en";
export const DEFAULT_LANG: Lang = "es";
export const LANG_STORAGE_KEY = "dataviz-lang";

// `satisfies` makes TypeScript flag en.json if it's missing a key that
// es.json has (or has the wrong shape, e.g. a string instead of a list).
export const dictionaries = { es, en: en satisfies typeof es };

export type I18nKey = keyof typeof es;

/** Build-time lookup in the default language. */
export function t<K extends I18nKey>(key: K): (typeof es)[K] {
  return dictionaries[DEFAULT_LANG][key];
}
