/**
 * Content collections — typed, validated content that lives in src/content/.
 *
 * Each collection = a loader (where the files are) + a Zod schema (what
 * every entry must contain). If an entry is missing a field or has the
 * wrong type, the BUILD fails with a message naming the file — instead of
 * the page silently rendering "undefined".
 */
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Portfolio — interactive projects that live on their own subdomains.
 * One Markdown file per project (frontmatter only; the body is optional
 * room for a longer write-up later).
 *
 * Bilingual INLINE: both languages are stored and both are shown on the
 * card at once — these are not switched by the ES/EN toggle.
 */
const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/portfolio" }),
  // `image()` resolves a path relative to the .md file and hands it to
  // Astro's image pipeline (resizing, WebP, srcset) at build time.
  schema: ({ image }) =>
    z.object({
      title_es: z.string(),
      title_en: z.string(),
      // Keep these short — two of them are stacked on one card.
      description_es: z.string().max(240),
      description_en: z.string().max(240),
      url: z.url(),
      image: image(),
      tools: z.array(z.string()).default([]),
      year: z.number().int().optional(),
      // Lower = earlier in the grid.
      order: z.number().int().default(100),
    }),
});

export const collections = { portfolio };
