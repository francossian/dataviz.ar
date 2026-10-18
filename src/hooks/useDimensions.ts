import { useEffect, useState, type RefObject } from "react";

/**
 * Width and height of an element, updated whenever it changes size.
 *
 * Used by the Responsive* chart wrappers: the wrapper's div takes the space
 * the page gives it, this hook reads that space, and the pure chart draws
 * at exactly that size. Starts at 0×0 — nothing is drawn on the server or
 * before the first measurement, which is why the wrapper reserves its
 * height in CSS (no layout jump when the chart appears).
 *
 * ResizeObserver (not the window "resize" event) because the container
 * can change size without the window changing: font loading, a sidebar…
 */
export function useDimensions(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width: Math.round(width), height: Math.round(height) });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}
