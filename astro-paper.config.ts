import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    // Custom domain (public/CNAME) → served from the root, no base path
    url: "https://dataviz.ar/",
    title: "dataviz.ar",
    description:
      "Franco Guiragossian — análisis de datos, encuestas y visualización.",
    author: "Franco Guiragossian",
    profile: "https://dataviz.ar/franco-guiragossian",
    ogImage: "default-og.jpg",
    // Build-time language for AstroPaper's UI strings. Spanish for now;
    // the two blogs (ES / EN) get their own language in a later step.
    lang: "es",
    timezone: "America/Argentina/Buenos_Aires",
    dir: "ltr",
  },
  posts: {
    perPage: 10,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    // No "edit this page on GitHub" link — this is a personal site, not docs
    editPost: { enabled: false },
    search: "pagefind",
  },
  // `name` must match an SVG in src/assets/icons/socials/
  socials: [
    { name: "linkedin", url: "https://www.linkedin.com/in/fguiragossian" },
    { name: "github", url: "https://github.com/francossian" },
    { name: "bluesky", url: "https://bsky.app/profile/dataviz.ar" },
    { name: "x", url: "https://x.com/francossian" },
    {
      name: "upwork",
      url: "https://www.upwork.com/freelancers/~01421a29502b0160f8",
    },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "linkedin", url: "https://www.linkedin.com/sharing/share-offsite/?url=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "bluesky", url: "https://bsky.app/intent/compose?text=" },
    { name: "mail", url: "mailto:?subject=Mir%C3%A1%20esto&body=" },
  ],
});
