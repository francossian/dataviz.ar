/**
 * Approximate rendered width of a text in DM Sans, in px.
 *
 * Charts are drawn at BUILD time (no browser, so no getComputedTextLength()),
 * yet some decisions depend on text size — e.g. "does this label fit inside
 * its bar?". These per-character widths (in em) are close enough for that;
 * callers add a safety padding.
 */
const NARROW = new Set([..."iljtfrI.,:;'|!()[] "]);
const WIDE = new Set([..."mwMW@%"]);

export function textWidth(
  text: string,
  fontSize: number,
  bold = false
): number {
  let em = 0;
  for (const ch of text) {
    if (NARROW.has(ch)) em += 0.3;
    else if (WIDE.has(ch)) em += 0.86;
    else if (/[0-9]/.test(ch)) em += 0.57;
    else if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) em += 0.66;
    else em += 0.53;
  }
  return em * fontSize * (bold ? 1.06 : 1);
}
