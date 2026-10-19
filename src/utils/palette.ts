/**
 * The palette from src/styles/theme.css, for code that can't use CSS
 * variables — e.g. the social-share images, which satori renders to PNG
 * at build time.
 *
 * It reads the CSS file itself, so theme.css stays the ONE place where
 * colours are defined: change a hex there and these images follow.
 */
import fs from "node:fs";
import path from "node:path";

const css = fs.readFileSync(
  path.join(process.cwd(), "src/styles/theme.css"),
  "utf8"
);

// Every "--color-<name>: #hex;" declaration in the file
const colors: Record<string, string> = {};
for (const [, name, hex] of css.matchAll(
  /--color-([\w-]+):\s*(#[0-9a-f]{3,8})\s*;/gi
)) {
  colors[name] = hex;
}

/** Palette colour by name, e.g. paletteColor("navy") → "#1b4965" */
export function paletteColor(name: string): string {
  const hex = colors[name];
  if (!hex) {
    throw new Error(
      `Colour "--color-${name}" is not defined in src/styles/theme.css`
    );
  }
  return hex;
}
