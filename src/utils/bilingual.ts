/**
 * General pages (home, portfolio, bio) exist in BOTH languages, each at its
 * own URL:
 *
 *   Spanish (default)        English
 *   /                        /en/
 *   /portfolio/              /en/portfolio/
 *   /franco-guiragossian/    /en/franco-guiragossian/
 *
 * One .astro file per page, under src/pages/[...lang]/: its
 * getStaticPaths (generalPagePaths below) builds it twice, and the page
 * reads its language from the URL (langFromUrl in src/blogs.ts). Every
 * text then comes out in that one language — UIText picks it.
 *
 * Why separate URLs (and not one page that switches on the client): search
 * engines index each language on its own, with its own title and
 * description, and the two versions are linked with hreflang. Blogs work
 * the same way already (/datos-y-relatos/ vs /data-stories/).
 *
 * The visitor's browser language is never used to redirect (Google
 * advises against it: its crawler would never see the other version).
 * Instead a small notice offers the other language — see LangSuggest.
 */
import { DEFAULT_LANG, type Lang } from "@/blogs";

/** localStorage key for the visitor's explicit ES/EN choice */
export const LANG_STORAGE_KEY = "dataviz-lang";

/** URL prefix of the English general pages */
export const EN_PREFIX = "en";

/** The general pages, by path without language prefix ("" = home) */
export const GENERAL_PAGES = ["", "portfolio", "franco-guiragossian"];

/** getStaticPaths for a page under src/pages/[...lang]/: one per language */
export function generalPagePaths() {
  return [
    { params: { lang: undefined } }, // Spanish, no prefix
    { params: { lang: EN_PREFIX } },
  ];
}

/**
 * URL of a general page in a language:
 * pageUrl("en", "portfolio") → "/en/portfolio/", pageUrl("es", "") → "/"
 */
export function pageUrl(lang: Lang, path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const prefix = lang === DEFAULT_LANG ? "" : `/${EN_PREFIX}`;
  return clean ? `${prefix}/${clean}/` : `${prefix}/`;
}

/**
 * The general page a pathname is, without its language prefix
 * ("/en/portfolio/" → "portfolio"), or undefined if it isn't one
 * (blogs, 404, the chart lab…).
 */
export function generalPageFromPath(pathname: string): string | undefined {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === EN_PREFIX) segments.shift();
  const path = segments.join("/");
  return GENERAL_PAGES.includes(path) ? path : undefined;
}
