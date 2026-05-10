import { useEffect, useRef } from "react";

/**
 * Lightweight scroll-based parallax. Translates the element on Y axis
 * proportionally to its distance from viewport center.
 *
 * speed: positive = moves slower than scroll (drifts down as you scroll up),
 *        negative = moves opposite direction. Typical range: -0.4 .. 0.4
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.2) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = globalThis.innerHeight || document.documentElement.clientHeight;
      // distance of element center from viewport center, normalized
      const offset = (rect.top + rect.height / 2) - vh / 2;
      const y = offset * speed * -1;
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    update();
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    globalThis.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      globalThis.removeEventListener("scroll", onScroll);
      globalThis.removeEventListener("resize", onScroll);
      el.style.transform = "";
    };
  }, [speed]);

  return ref;
}
