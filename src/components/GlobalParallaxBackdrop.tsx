import { memo, useEffect, useRef, useState } from "react";

/**
 * Site-wide parallax decoration (Method 2: `translate3d` + rAF — not `background-attachment: fixed`, so iOS-friendly).
 * Uses only transform for motion; pauses while the tab is hidden; respects `prefers-reduced-motion`.
 * Scroll listeners use capture: `scroll` does not bubble, so bubble listeners on `window` often never run.
 */
const SCROLL_OPTS: AddEventListenerOptions = { passive: true, capture: true };

function readDocumentScrollY(): number {
  const candidates = [
    globalThis.scrollY,
    globalThis.pageYOffset,
    document.scrollingElement?.scrollTop,
    document.documentElement?.scrollTop,
    document.body?.scrollTop,
  ];
  let max = 0;
  for (const v of candidates) {
    if (typeof v === "number" && !Number.isNaN(v) && v > max) max = v;
  }
  return max;
}

/** Strong enough to read while scrolling; still sub-pixel jitter-free via rAF. */
const SPEED_Y = [0.32, -0.48, 0.26] as const;
const SPEED_X = [0.09, -0.06, 0.1] as const;

const GlobalParallaxBackdrop = memo(function GlobalParallaxBackdrop() {
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const [reduceMotion, setReduceMotion] = useState(
    () => globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false,
  );

  useEffect(() => {
    const mq = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    let raf = 0;
    let lastY = Number.NaN;

    const apply = () => {
      raf = 0;
      const y = readDocumentScrollY();
      if (y === lastY) return;
      lastY = y;

      for (let i = 0; i < SPEED_Y.length; i++) {
        const el = layersRef.current[i];
        if (!el) continue;
        const ty = y * (SPEED_Y[i] ?? 0.2);
        const tx = y * (SPEED_X[i] ?? 0.05);
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      }
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        return;
      }
      schedule();
    };

    globalThis.addEventListener("scroll", schedule, SCROLL_OPTS);
    document.addEventListener("scroll", schedule, SCROLL_OPTS);
    document.addEventListener("visibilitychange", onVisibility);
    schedule();

    return () => {
      globalThis.removeEventListener("scroll", schedule, SCROLL_OPTS);
      document.removeEventListener("scroll", schedule, SCROLL_OPTS);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!reduceMotion) return;
    for (const el of layersRef.current) {
      el?.style.removeProperty("transform");
    }
  }, [reduceMotion]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <div
        ref={(el) => {
          layersRef.current[0] = el;
        }}
        className="global-parallax-layer absolute -left-[15%] -top-[10%] h-[min(100vw,42rem)] w-[min(100vw,42rem)] rounded-full bg-[#3B82F6]/30 blur-3xl will-change-transform dark:bg-[#60a5fa]/20"
      />
      <div
        ref={(el) => {
          layersRef.current[1] = el;
        }}
        className="global-parallax-layer absolute -right-[12%] top-[22%] h-[min(90vw,36rem)] w-[min(90vw,36rem)] rounded-full bg-primary/25 blur-3xl will-change-transform dark:bg-primary/30"
      />
      <div
        ref={(el) => {
          layersRef.current[2] = el;
        }}
        className="global-parallax-layer absolute -bottom-[8%] left-[5%] h-[min(95vw,38rem)] w-[min(110vw,44rem)] rounded-full bg-accent/35 blur-2xl will-change-transform dark:bg-accent/25"
      />
    </div>
  );
});

export default GlobalParallaxBackdrop;
