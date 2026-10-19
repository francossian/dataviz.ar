/**
 * The responsive half of the pair: takes the full width the page gives
 * it, measures it, and hands that width to ExperienceTimeline, which only
 * draws. The height is fixed by the number of rows, and reserved in CSS
 * so the page doesn't jump when the chart appears.
 *
 * Used as an island: <ResponsiveExperienceTimeline client:visible … />.
 * React and this code are only downloaded when the chart scrolls into
 * view — which is also the moment the bars start growing.
 */
import { useRef, type ComponentProps } from "react";
import { useDimensions } from "@/hooks/useDimensions";
import ExperienceTimeline, { timelineHeight } from "./ExperienceTimeline";

type Props = Omit<
  ComponentProps<typeof ExperienceTimeline>,
  "width" | "height"
>;

export default function ResponsiveExperienceTimeline(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(ref);
  const height = timelineHeight(props.rows.length);

  return (
    <div ref={ref} style={{ width: "100%", height }}>
      {width > 0 && (
        <ExperienceTimeline width={width} height={height} {...props} />
      )}
    </div>
  );
}
