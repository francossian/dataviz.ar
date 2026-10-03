import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";

// Posts live in a language sub-folder: posts/es/ (Datos y relatos) or
// posts/en/ (Data Stories). See src/blogs.ts.
export const BLOG_PATH = "src/content/posts";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
      // The same post in the other blog, by its id: the path under
      // src/content/posts/ without extension, e.g. "en/how-i-built-it".
      // Adds a "Read in English" / "Leer en español" link; an id that
      // doesn't exist fails the build.
      translation: z.string().optional(),
    }),
});

/**
 * Portfolio — interactive projects that live on their own subdomains.
 * One Markdown file per project, frontmatter only.
 *
 * Bilingual INLINE: both languages are stored and both are always shown
 * on the portfolio page (they don't follow the ES/EN switch).
 */
const portfolio = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/portfolio" }),
  // `image()` resolves the path relative to the .md file and feeds it to
  // Astro's image pipeline (resized WebP + srcset at build time).
  schema: ({ image }) =>
    z.object({
      title_es: z.string(),
      title_en: z.string(),
      // Short: both are shown, one under the other
      description_es: z.string().max(240),
      description_en: z.string().max(240),
      url: z.url(),
      image: image(),
      tools: z.array(z.string()).default([]),
      year: z.number().int().optional(),
      // Lower = earlier on the page
      order: z.number().int().default(100),
      // Optional "how I made it" post, by its id (e.g. "es/simulador").
      // A wrong id fails the build.
      post: z.string().optional(),
    }),
});

/**
 * Visualizations — static chart images, shown as a thumbnail grid on the
 * portfolio page; clicking one opens it full size with its note.
 * One Markdown file per chart (frontmatter only), image next to it.
 */
const visualizations = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.md",
    base: "./src/content/visualizations",
  }),
  schema: ({ image }) =>
    z.object({
      title_es: z.string(),
      title_en: z.string(),
      image: image(),
      // What the chart shows, for people who can't see it
      alt_es: z.string(),
      alt_en: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      tools: z.array(z.string()).default([]),
      // Author's note, ~2 sentences — shown in the enlarged view
      note_es: z.string().max(400),
      note_en: z.string().max(400),
      // Data source, e.g. "INDEC" → "Fuente: INDEC" / "Source: INDEC"
      source: z.string().optional(),
    }),
});

export const collections = { posts, portfolio, visualizations };
