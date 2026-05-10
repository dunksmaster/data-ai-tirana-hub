import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Layers } from "lucide-react";

export type ParallaxProjectItem = {
  src: string;
  alt: string;
  title: string;
  blurb: string;
};

type ParallaxProjectStripProps = {
  items: ParallaxProjectItem[];
};

/** Round-robin split so columns stay visually balanced. */
function columnsFor(items: ParallaxProjectItem[], columnCount: number): ParallaxProjectItem[][] {
  const cols: ParallaxProjectItem[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, i) => {
    cols[i % columnCount]!.push(item);
  });
  return cols;
}

const ParallaxProjectStrip = memo(function ParallaxProjectStrip({ items }: ParallaxProjectStripProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [reduceMotion, setReduceMotion] = useState(
    () => globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false,
  );

  const columns = useMemo(() => columnsFor(items, 3), [items]);

  useEffect(() => {
    const mq = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const track = trackRef.current;
    if (!track) return;

    /** Per-column vertical multipliers — different speeds create depth while scrolling. */
    const speeds = [0.42, -0.28, 0.55];
    const maxShiftPx = 160;

    let raf = 0;
    const apply = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const vh = globalThis.innerHeight || 1;
      const center = rect.top + rect.height * 0.45;
      const offset = (center - vh * 0.5) / vh;

      colRefs.current.forEach((el, i) => {
        if (!el) return;
        const s = speeds[i % speeds.length] ?? 0.35;
        const y = offset * maxShiftPx * s;
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      });
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    };

    globalThis.addEventListener("scroll", schedule, { passive: true });
    globalThis.addEventListener("resize", schedule, { passive: true });
    apply();

    return () => {
      globalThis.removeEventListener("scroll", schedule);
      globalThis.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <section
      id="projects"
      className="scroll-section-anchor relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background py-16 md:py-24 px-4"
      aria-labelledby="projects-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--accent)/0.12),transparent)]" />

      <div className="container relative z-10 max-w-6xl mx-auto mb-10 md:mb-14 text-center">
        <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent mb-3">
          <Layers className="w-4 h-4" aria-hidden />
          Community
        </span>
        <h2
          id="projects-heading"
          className="text-3xl md:text-4xl font-bold text-foreground mb-4 max-w-2xl mx-auto"
        >
          Stories in motion — not a static grid
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A parallax strip layers meetup moments at different scroll speeds so the page feels more
          spatial than a flat gallery. Hover each card for a closer look.
        </p>
      </div>

      {reduceMotion ? (
        <div className="container max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ProjectCard key={item.src} item={item} />
          ))}
        </div>
      ) : (
        <div
          ref={trackRef}
          className="relative mx-auto max-w-6xl min-h-[62vh] md:min-h-[76vh] px-1 sm:px-2 py-6 md:py-10"
        >
          <div className="flex gap-3 sm:gap-4 md:gap-5 justify-center items-start">
            {columns.map((colItems, colIndex) => (
              <div
                key={colIndex}
                ref={(el) => {
                  colRefs.current[colIndex] = el;
                }}
                className="flex w-[min(32%,11rem)] sm:w-[min(30%,13rem)] md:w-[min(28%,15rem)] flex-col gap-5 sm:gap-6 md:gap-8 will-change-transform"
                style={{ paddingTop: colIndex === 1 ? "2.5rem" : colIndex === 2 ? "4.5rem" : "0" }}
              >
                {colItems.map((item) => (
                  <ProjectCard key={item.src} item={item} />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
});

function ProjectCard({ item }: { item: ParallaxProjectItem }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:z-20 hover:shadow-xl hover:border-[#3B82F6]/35 motion-safe:hover:-translate-y-1 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={item.src}
          alt={item.alt}
          className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-95 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
          <h3 className="font-semibold text-foreground text-sm sm:text-base leading-snug">{item.title}</h3>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {item.blurb}
          </p>
        </div>
      </div>
    </article>
  );
}

export default ParallaxProjectStrip;
