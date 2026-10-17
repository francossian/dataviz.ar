/**
 * The chart signature's "fingerprint": which dots of the 3×3 grid are lit.
 *
 * Looks random, but it's fixed per chart: the chart's id (its slug, not its
 * title — so retitling doesn't change it) seeds a pseudo-random generator.
 * Same id → same pattern on every build, like set.seed() in R.
 *
 * Rule: 4 to 6 of the 9 dots are lit, so the mark never looks empty or full
 * (420 possible patterns).
 */

/** FNV-1a: turns a string into a 32-bit number (the seed) */
function hash(text: string): number {
  let h = 0x811c9dc5;
  for (const ch of text) {
    h ^= ch.codePointAt(0) ?? 0;
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32: a tiny seeded PRNG returning numbers in [0, 1) */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * 9 booleans, read left→right, top→bottom: true = lit dot.
 * Shuffles the 9 cells with the seeded generator (Fisher–Yates) and lights
 * the first 4, 5 or 6.
 */
export function fingerprint(id: string): boolean[] {
  const random = seededRandom(hash(id));
  const cells = [...Array(9).keys()];
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  const lit = 4 + Math.floor(random() * 3);
  const pattern = Array<boolean>(9).fill(false);
  for (const cell of cells.slice(0, lit)) pattern[cell] = true;
  return pattern;
}
