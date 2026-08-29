import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The hero's moving background: falling streaks of light, built entirely from
 * stacked radial gradients. See `.rain` in index.css for the effect itself and
 * for what was changed from the original.
 *
 * This component exists only to switch it off. The effect is one long
 * `background-position` animation plus an animated `backdrop-filter`, and a
 * backdrop-filter that never stops is the single most expensive thing on this
 * page. It runs while the hero is on screen and the tab is in front, and is
 * paused the rest of the time; `prefers-reduced-motion` is handled globally in
 * index.css, which pins every animation to one frame.
 *
 * It replaced a canvas flow field. This costs no JavaScript beyond the observer
 * below, where the canvas cost a per-frame particle loop.
 */
export function HeroBackdrop({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "80px" }
    );
    observer.observe(node);

    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-active={onScreen && tabVisible}
      className={cn("rain", className)}
    >
      <div className="rain__field" />
      <div className="rain__dots" />
    </div>
  );
}
