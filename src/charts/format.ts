/**
 * Number formatting for charts, following the page's language:
 *   es → 1.234.567,8   (Argentine convention, CLAUDE.md)
 *   en → 1,234,567.8
 * Negative numbers get a true minus sign (−), not a hyphen.
 */
import type { Lang } from "@/blogs";

export interface NumberFormat {
  /** Fixed decimals (default: none for integers, up to 1 otherwise) */
  decimals?: number;
  /** Text before the number, e.g. "$" */
  prefix?: string;
  /** Text after the number, e.g. " %" or " M" */
  suffix?: string;
}

export function makeFormatter(lang: Lang, format: NumberFormat = {}) {
  const intl = new Intl.NumberFormat(lang === "es" ? "es-AR" : "en-US", {
    minimumFractionDigits: format.decimals ?? 0,
    maximumFractionDigits: format.decimals ?? 1,
    // es-AR leaves 4-digit numbers ungrouped by default ("1000"); CLAUDE.md
    // asks for "1.000", so always group.
    useGrouping: "always",
  });
  return (value: number) => {
    const sign = value < 0 ? "−" : "";
    return `${sign}${format.prefix ?? ""}${intl.format(Math.abs(value))}${format.suffix ?? ""}`;
  };
}
