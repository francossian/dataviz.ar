# Charts

Chart templates in the dataviz.ar house style. Rendered at build time to
plain SVG — no JavaScript on the page.

Preview them all at <http://localhost:4321/lab/graficos/> while `npm run dev`
is running (the lab page is never built for production).

## Using a chart in a post

Write the post as `.mdx` and import the template:

```mdx
import BarChart from "@/charts/BarChart.astro";

<BarChart
  id="apuestas-estrategias"
  title="A largo plazo, ninguna estrategia le gana a la casa"
  subtitle="Rendimiento apostando $1 a cada partido, %"
  source="football-data.co.uk"
  data={[
    { label: "Siempre al favorito", value: -6.8 },
    { label: "Siempre al local", value: -5.1 },
  ]}
  values="all"
  format={{ decimals: 1, suffix: " %" }}
/>
```

## House rules (built into the templates)

- **Title = the conclusion** ("X triples Y"), subtitle = what is measured.
- **Context in navy, the story in terracota** (`highlight`).
- **Always a source**; numbers in the page's language (es: `1.234,5`).
- **Signature**: a 3×3 dot grid + "dataviz.ar". The lit dots are this
  chart's fingerprint, seeded by `id` — keep `id` stable (a slug, not the
  title) so the pattern never changes.

## BarChart options

| Prop          | Default       | What it does                                                  |
| ------------- | ------------- | ------------------------------------------------------------- |
| `id`          | — (required)  | Stable slug; seeds the signature                              |
| `data`        | — (required)  | `{ label, value }[]`; negative values grow to the left        |
| `title`       | — (required)  | The conclusion                                                |
| `subtitle`    | —             | What is measured, units, period                               |
| `source`      | —             | Shown as "Fuente: …" / "Source: …"                            |
| `lang`        | page language | `"es"` or `"en"`: number format and "Fuente/Source"           |
| `highlight`   | `"max"`       | `"max"`, `"min"`, `"none"` or a list of labels                |
| `values`      | `"highlight"` | Which bars show their value: `"highlight"`, `"all"`, `"none"` |
| `axis`        | `"top"`       | Value axis on `"top"` or `"bottom"`                           |
| `sort`        | `"desc"`      | `"desc"`, `"asc"` or `"none"` (keep data order)               |
| `domain`      | auto          | `[min, max]` of the value axis                                |
| `ticks`       | `5`           | Approximate number of gridlines                               |
| `format`      | `{}`          | `{ decimals, prefix, suffix }` for values and the axis        |
| `annotations` | `[]`          | `{ label, text }[]`: a short note after that bar              |
| `labels`      | `"auto"`      | Category label `"inside"`/`"outside"` the bar, or `"auto"`    |

## Colours

No colour is written in the chart code. Marks use CSS classes
(`src/styles/charts.css`) that read the chart roles (`--chart-*`) in
`src/styles/theme.css`, which point at the palette. To recolour every
chart, edit the palette there.

Keep `--chart-primary` and `--chart-highlight` dark enough to read as text:
labels placed next to a bar take the bar's colour.

## Files

| File                   | Role                                                      |
| ---------------------- | --------------------------------------------------------- |
| `BarChart.astro`       | Bar chart template (layout maths + SVG)                   |
| `ChartFrame.astro`     | Shared frame: panel, title, source, signature, a11y table |
| `ChartSignature.astro` | The 3×3 fingerprint + "dataviz.ar"                        |
| `fingerprint.ts`       | Seeded pattern from `id`                                  |
| `format.ts`            | es-AR / en-US numbers, true minus sign                    |
| `textWidth.ts`         | Text width estimate (labels inside/outside decisions)     |
