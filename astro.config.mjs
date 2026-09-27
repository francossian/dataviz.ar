// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  // Custom domain (public/CNAME) → the site is served from the domain root,
  // so no `base` is needed. `site` is used for canonical URLs and sitemaps.
  site: "https://dataviz.ar",

  // Fully static output: GitHub Pages can only serve files, no server runtime.
  output: "static",

  // Emit /franco-guiragossian/index.html (not franco-guiragossian.html) so
  // clean URLs work on GitHub Pages without extension rewriting.
  build: { format: "directory" },

  // Static redirects become a meta-refresh HTML page at build time — the same
  // mechanism the old hand-written about.html used, now declared in one place.
  redirects: {
    "/about": "/franco-guiragossian",
  },
});
