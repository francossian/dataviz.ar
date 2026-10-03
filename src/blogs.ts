/**
 * The two blogs — one per language — and the helpers that tie a URL or a
 * post to its blog. This file is the single source of truth: routes,
 * navigation, RSS and UI language all derive from BLOGS.
 *
 * Posts choose their blog by FOLDER, not frontmatter:
 *   src/content/posts/es/…  →  /datos-y-relatos/…
 *   src/content/posts/en/…  →  /data-stories/…
 * so a post can never be tagged with one language and filed in the other.
 */
export type Lang = "es" | "en";

export interface Blog {
  lang: Lang;
  /** URL segment, e.g. "datos-y-relatos" → dataviz.ar/datos-y-relatos/ */
  slug: string;
  /** Proper name — not translated, like a publication's name */
  title: string;
  /** Subtitle shown under the name, in the blog's own language */
  description: string;
}

export const BLOGS: Record<Lang, Blog> = {
  es: {
    lang: "es",
    slug: "datos-y-relatos",
    title: "Datos y relatos",
    description: "Notas sobre datos, encuestas y visualización.",
  },
  en: {
    lang: "en",
    slug: "data-stories",
    title: "Data Stories",
    description: "Notes on data, surveys and visualization.",
  },
};

export const BLOG_LIST: Blog[] = Object.values(BLOGS);

/** Language of pages outside the blogs (home, portfolio, bio) at build time */
export const DEFAULT_LANG: Lang = "es";

export const otherLang = (lang: Lang): Lang => (lang === "es" ? "en" : "es");

/** The blog a pathname belongs to, judged by its first segment */
export function blogFromPath(pathname: string): Blog | undefined {
  const first = pathname.split("/").find(Boolean);
  return BLOG_LIST.find(blog => blog.slug === first);
}

/** UI language for a page: its blog's language, else the site default */
export function langFromUrl(url: URL): Lang {
  return blogFromPath(url.pathname)?.lang ?? DEFAULT_LANG;
}

/** Root-relative URL inside a blog, e.g. blogUrl("en", "tags/") → "/data-stories/tags/" */
export function blogUrl(lang: Lang, path = ""): string {
  return `/${BLOGS[lang].slug}/${path.replace(/^\/+/, "")}`;
}

/**
 * Language of a post, from the folder it lives in (its id starts with it).
 * Throws — failing the build — for a post outside es/ or en/, which would
 * otherwise have no blog to appear in.
 */
export function langFromPostId(id: string): Lang {
  const folder = id.split("/")[0];
  if (folder === "es" || folder === "en") return folder;
  throw new Error(
    `Post "${id}" must live in src/content/posts/es/ or src/content/posts/en/ — the folder decides which blog it belongs to.`
  );
}
