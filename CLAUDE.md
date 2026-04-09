# CLAUDE.md — dataviz.ar

## Project Overview

Personal website for **Franco Guiragossian**, a data analyst specialized in data analysis, survey design, programming and analysis for market research and other purposes. The site showcases interactive data visualizations, professional work, and a blog.

- **Domain:** dataviz.ar
- **Author credit:** Franco Guiragossian

## Site Structure

| Route                        | Purpose                                        |
|------------------------------|-------------------------------------------------|
| `/`                          | Landing page (highlight reel + contact footer)  |
| `/franco-guiragossian`       | Full about / bio page                           |
| `/about`                     | Redirects to `/franco-guiragossian`             |
| `/portfolio`                 | All projects with descriptions & interactive demos |
| `/blog`                      | All blog posts                                  |

### Landing Page Sections (in order)
1. **Hero** — Name, concise tagline, subtle data visualization element, CTA to portfolio or about.
2. **Featured Work** — 2–3 best visualization projects as interactive previews. Links to full projects in `/portfolio`.
3. **What I Do** — Brief elevator pitch of core competencies (data analysis, survey design, visualization, market research). Links to `/franco-guiragossian`.
4. **Blog Preview** — Latest 2–3 posts with titles and dates. "Read more" links to `/blog`.
5. **Contact Footer** — Email, LinkedIn, GitHub. Persistent across all pages.

### Navigation
- Consistent nav bar across all pages.
- Contact lives in the footer (no dedicated `/contact` page).

## Multilingual (ES / EN)

- Language is determined automatically by the visitor's IP geolocation.
- Only two languages: Spanish and English.
- All user-facing text must be translatable — never hardcode strings inline. Use a translation key system (e.g., i18n keys or a dictionary object).
- Spanish is the primary language; English is the secondary/fallback.

## Design System

### Typography
- **Primary font:** Under consideration — **Jost** (modern, geometric, warm personality, Futura-inspired) or **DM Sans** (clean, neutral). Final decision TBD.
- Use clear typographic hierarchy: distinct sizes/weights for headings, body, captions.

### Color Palette

#### Website UI
| Token            | Hex       | Usage                                      |
|------------------|-----------|---------------------------------------------|
| `dark-base`      | `#222831` | Primary dark background, nav, footer        |
| `dark-gray`      | `#393E46` | Cards/surfaces on dark backgrounds          |
| `light-gray`     | `#EEEEEE` | Light mode backgrounds, chart backgrounds   |
| `off-white`      | `#F7F7F7` | Page background (light mode)                |
| `teal`           | `#00ADB5` | Primary accent — links, buttons, highlights |
| `teal-dark`      | `#00838A` | Hover/active states                         |
| `teal-light`     | `#B2DFDB` | Subtle teal backgrounds, tags               |

#### Data Visualization Palette (for chart series)
| Order | Hex       | Name   |
|-------|-----------|--------|
| 1     | `#00ADB5` | Teal   |
| 2     | `#FF6B6B` | Coral  |
| 3     | `#FFD93D` | Gold   |
| 4     | `#6C5CE7` | Purple |
| 5     | `#A8E6CF` | Mint   |

- All charts and visualizations must use `#EEEEEE` as their background color, regardless of the page theme.
- Never introduce new colors without asking Franco first.

### General Style
- Clean, minimal, modern aesthetic.
- Generous whitespace.
- No unnecessary decoration — let data and content breathe.
- **Rounded corners** on cards, buttons, and containers (use consistent border-radius, e.g., 8px–12px).

### Images & Assets
- Store images in `/public/images/` (or equivalent static assets folder for the chosen framework).
- Hero photo: `/public/images/franco.webp` — use WebP format for best compression/quality balance. Keep a high-res source file outside the repo.
- Always use optimized formats: WebP for photos, SVG for icons/logos.
- Use responsive image techniques (`srcset`, `<picture>`) where appropriate.

## Data Visualization Conventions

### Library
- **D3.js** for standalone/vanilla visualizations (primary).
- React-based visualizations are a secondary track (learning in progress).

### Formatting (Argentine conventions)
- **Thousands separator:** dot (`.`) → e.g., `1.000.000`
- **Decimal separator:** comma (`,`) → e.g., `3,14`
- **Millions:** display without decimals when showing population-scale numbers (e.g., `45 millones`, not `45,0 millones`).
- **Currency:** Argentine peso (`$`) where applicable, with dot thousands separator.

### Data Sources
- Always attribute data sources (e.g., "Fuente: INDEC" / "Source: INDEC").
- **INDEC** (Instituto Nacional de Estadística y Censos) is the primary data source for Argentine demographic data.

### Chart Best Practices
- Include clear axis labels and titles.
- Tooltips for interactive charts.
- Smooth transitions/animations where appropriate.
- Responsive design — charts should work on mobile.

## Technical Skills (for context)

Franco works with: **R, Python, D3.js, Power BI**. When suggesting solutions or alternatives, these are the tools in play.

## Code Style

- Write detailed code comments explaining **why**, not just what.
- When Franco is learning a concept, explain the underlying principles (coordinate systems, DOM structure, data binding, etc.) rather than just providing a solution.
- Franco prefers to implement some changes personally — offer guidance over fully finished code when the change is a learning opportunity.

## Datasets

- CSV files are hosted on GitHub.
- Always verify file paths and column names before building visualizations.

## Workflow

- Franco works iteratively: start with a working base, then refine through targeted requests.
- He catches subtle bugs independently — respect his debugging ability.
- He pays close attention to fine-grained styling details (spacing, alignment, label positioning).
