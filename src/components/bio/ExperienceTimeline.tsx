/**
 * ExperienceTimeline — one row per workplace, one bar per role, years at
 * the bottom. Bars grow left to right when the chart appears; hovering
 * (or tapping) a bar shows a tooltip with the role.
 *
 * The pure half of the pair (see ResponsiveExperienceTimeline): it gets a
 * width and height and only draws. D3 only does the maths (the time scale
 * and its ticks); React writes the SVG.
 *
 * Each workplace has its own brand colour (`color` in src/data/bio.ts,
 * defined in theme.css) with its name in white inside the bar. The
 * timeline sits on the #EEEEEE chart panel (set by the page), the same in light and
 * dark mode, so gridlines and years use the fixed chart roles.
 */
import { useEffect, useState } from "react";
import { scaleUtc } from "d3-scale";
import type { Experience } from "@/data/bio";
import type { Lang } from "@/blogs";
import { textWidth } from "@/charts/textWidth";

type Props = {
  width: number;
  height: number;
  rows: Experience[];
  /** "YYYY-MM-DD": where ongoing roles end (the build date) */
  today: string;
  /** Language of the tooltips (the page's) */
  lang: Lang;
};

// ── Vertical layout, in px. A row = one bar with its name inside. ──
export const ROW = 34;
const BAR_Y = 4; // top of the bar, from the top of its row
const BAR = 24; // bar thickness: room for the name inside
export const AXIS = 28; // room for the years under the rows
const FONT = 13; // names
const INSET = 8; // name's distance from the start of the bar
const TICK_FONT = 12; // years
const PAD = 16; // left/right, so "2015" isn't cut at the edge
const SPLIT = 2; // gap between two roles at the same place
const SWEEP = 1500; // ms for the growth to cross the whole width
const TIP_W = 288; // tooltip width (narrower on small screens)

export const timelineHeight = (rows: number) => rows * ROW + AXIS;

// "2022-06" → 1 Jun 2022, UTC so the date never shifts
const monthStart = (ym: string) => new Date(`${ym}-01T00:00:00Z`);
// A role that "ends in April" lasts until May 1st
const monthEnd = (ym: string) => {
  const d = monthStart(ym);
  d.setUTCMonth(d.getUTCMonth() + 1);
  return d;
};

// Month names written out (not Intl) so Spanish gets "jun" and not "jun."
const MONTHS = {
  es: [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sept",
    "oct",
    "nov",
    "dic",
  ],
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};
function period(from: string, to: string | undefined, lang: Lang) {
  const fmt = (ym: string) => {
    const [y, m] = ym.split("-");
    return `${MONTHS[lang][Number(m) - 1]} ${y}`;
  };
  const end = to ? fmt(to) : lang === "es" ? "hoy" : "present";
  return `${fmt(from)} – ${end}`;
}

type Active = { row: number; role: number };

export default function ExperienceTimeline({
  width,
  height,
  rows,
  today,
  lang,
}: Props) {
  const plotBottom = rows.length * ROW;

  const x = scaleUtc()
    .domain([
      new Date(
        Math.min(
          ...rows.flatMap(r =>
            r.roles.map(role => monthStart(role.from).getTime())
          )
        )
      ),
      new Date(`${today}T00:00:00Z`),
    ])
    .range([PAD, width - PAD]);
  const [x0, x1] = x.range();
  // Fewer year labels on a phone: d3 switches to every 2 years by itself
  const years = x.ticks(width < 480 ? 5 : 10);

  // Every bar, with its position and its place in the growth animation
  const bars = rows.flatMap((row, r) =>
    row.roles.map((role, i) => {
      const start = x(monthStart(role.from));
      const end = role.to ? x(monthEnd(role.to)) : x1;
      const last = i === row.roles.length - 1;
      return {
        r,
        i,
        start,
        width: Math.max(1, end - start - (last ? 0 : SPLIT)),
        y: r * ROW + BAR_Y,
        color: row.color,
        // One imaginary cursor sweeps the axis at constant speed; each bar
        // grows while the cursor passes over it. Delay = when the cursor
        // reaches its start, duration = how long it takes to cross it.
        // That's what makes parallel jobs read as "at the same time".
        delay: ((start - x0) / (x1 - x0)) * SWEEP,
        duration: ((end - start) / (x1 - x0)) * SWEEP,
      };
    })
  );

  // Grow on mount. Two frames: the first paints the bars at width 0, the
  // second starts the transition from there. With "reduce motion" the bars
  // are simply drawn full.
  const [reduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [grown, setGrown] = useState(reduced);
  useEffect(() => {
    if (reduced) return;
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => setGrown(true));
    });
    return () => cancelAnimationFrame(id);
  }, [reduced]);

  // Tooltip: hover with a mouse; on touch screens a tap opens it and a tap
  // anywhere else closes it
  const [active, setActive] = useState<Active | null>(null);
  useEffect(() => {
    if (!active) return;
    const close = (e: PointerEvent) => {
      if (!(e.target as Element).closest?.("[data-timeline-bar]"))
        setActive(null);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [active]);

  const activeBar =
    active && bars.find(b => b.r === active.row && b.i === active.role);
  const tipW = Math.min(TIP_W, width);
  const tip = activeBar && {
    row: rows[activeBar.r],
    role: rows[activeBar.r].roles[activeBar.i],
    left: Math.min(
      Math.max(activeBar.start + activeBar.width / 2 - tipW / 2, 0),
      width - tipW
    ),
    // Under the bar for the top rows, above it for the bottom ones, so it
    // never hangs off the bottom of the chart
    top:
      activeBar.r < rows.length / 2 - 0.5
        ? activeBar.y + BAR + 8
        : activeBar.y - 8,
    above: activeBar.r >= rows.length / 2 - 0.5,
  };

  return (
    <div style={{ position: "relative", width, height }}>
      {/* Hidden from screen readers: the page has the same content as a list */}
      <svg width={width} height={height} aria-hidden="true" focusable="false">
        {/* A vertical gridline and its label per year */}
        {years.map(d => (
          <g key={d.getTime()}>
            <line
              x1={x(d)}
              x2={x(d)}
              y1={0}
              y2={plotBottom}
              className="chart-gridline"
            />
            <text
              x={x(d)}
              y={plotBottom + 18}
              textAnchor="middle"
              fontSize={TICK_FONT}
              className="chart-tick tabular-nums"
            >
              {d.getUTCFullYear()}
            </text>
          </g>
        ))}

        {bars.map(b => (
          <g
            key={`${b.r}-${b.i}`}
            data-timeline-bar
            onPointerEnter={e =>
              e.pointerType === "mouse" && setActive({ row: b.r, role: b.i })
            }
            onPointerLeave={e => e.pointerType === "mouse" && setActive(null)}
            onClick={() => setActive({ row: b.r, role: b.i })}
            style={{ cursor: "default" }}
          >
            <rect
              x={b.start}
              y={b.y}
              width={b.width}
              height={BAR}
              rx={3}
              fill={b.color}
              style={{
                transform: `scaleX(${grown ? 1 : 0})`,
                transformOrigin: "left",
                transformBox: "fill-box",
                transition: reduced
                  ? undefined
                  : `transform ${b.duration}ms linear ${b.delay}ms`,
              }}
            />
            {/* Invisible, taller hit area: easier to tap */}
            <rect
              x={b.start}
              y={b.y - 4}
              width={b.width}
              height={BAR + 8}
              fill="transparent"
            />
          </g>
        ))}

        {/* Workplace name in white inside its first bar; in dark text just
            after the row if the bar is too short for it. It fades in once
            its bar has started growing past it. */}
        {rows.map((row, r) => {
          const first = bars.find(b => b.r === r && b.i === 0)!;
          const inside =
            textWidth(row.organization, FONT) + 2 * INSET <= first.width;
          const rowEnd = Math.max(
            ...bars.filter(b => b.r === r).map(b => b.start + b.width)
          );
          return (
            <text
              key={row.organization}
              x={inside ? first.start + INSET : rowEnd + INSET}
              y={first.y + BAR / 2}
              dominantBaseline="central"
              fontSize={FONT}
              fill={inside ? "var(--color-white)" : "var(--chart-ink)"}
              className="font-medium"
              style={{
                pointerEvents: "none",
                opacity: grown ? 1 : 0,
                transition: reduced
                  ? undefined
                  : `opacity 300ms ease ${first.delay + Math.min(first.duration, 300)}ms`,
              }}
            >
              {row.organization}
            </text>
          );
        })}
      </svg>

      {tip && (
        <div
          className="bg-background border-border pointer-events-none absolute z-10 rounded-lg border p-3 text-sm leading-snug shadow-md"
          style={{
            left: tip.left,
            top: tip.top,
            width: tipW,
            transform: tip.above ? "translateY(-100%)" : undefined,
          }}
        >
          <p className="text-heading font-semibold">{tip.row.organization}</p>
          <p>{tip.role.title[lang]}</p>
          <p className="text-muted-foreground tabular-nums">
            {period(tip.role.from, tip.role.to, lang)}
          </p>
          <p className="mt-2">{tip.row.description[lang]}</p>
        </div>
      )}
    </div>
  );
}
