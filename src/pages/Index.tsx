import { memo, useEffect, useRef, useState } from "react";
import {
  animate,
  createTimeline,
  onScroll,
  scrambleText,
  stagger,
  splitText,
} from "animejs";
import {
  Linkedin,
  Calendar,
  MessageCircle,
  Users,
  GraduationCap,
  Code2,
  HeartHandshake,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  Images,
  Github,
  Globe,
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroMetaballs from "@/components/HeroMetaballs";
import dhimiterPhoto from "@/assets/dhimiter-gero.png";
import dorianPhoto from "@/assets/dorian-kane.png";
import whatsappQr from "@/assets/whatsapp-qr.svg";

const BOOKING_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2qh5e6qHdfw3jfFTMcy4BcMY5NP1cEhRBDvrgB4hUQ0u9yFx1Tmw7pbAWGyDkPeGv4n_TO-tpg";
const WHATSAPP_URL = "https://chat.whatsapp.com/F5pFiV0oEBn0V2QF1SSDAx";
const LINKEDIN_URL = "https://www.linkedin.com/company/89613705/";
const GITHUB_REPO_URL = "https://github.com/dunksmaster/data-ai-tirana-hub";
const LIVE_SITE_URL = "https://dunksmaster.github.io/data-ai-tirana-hub/";

/** Public folder URLs must respect Vite `base` (e.g. GitHub Pages under /repo/). */
function publicAssetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

/** Photos in public/meetups/ — add or remove entries when you change files. */
const HOW_IT_WORKS_STEPS = [
  {
    step: "1",
    title: "Join the group",
    desc: "Hop into the WhatsApp chat and say hi.",
  },
  {
    step: "2",
    title: "Come to a meetup",
    desc: "Attend our next event in Tirana — beginners welcome.",
  },
  {
    step: "3",
    title: "Build & share",
    desc: "Collaborate on projects and share what you're learning.",
  },
] as const;

const SCRAMBLE_LINE_CLASS =
  "rounded-md px-1 -mx-1 py-0.5 touch-manipulation cursor-pointer transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/** Scramble one line on hover (fine pointer) or tap / focus (touch & keyboard). */
const HowItWorksScramble = memo(function HowItWorksScramble() {
  const rootRef = useRef<HTMLDivElement>(null);
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

    const root = rootRef.current;
    if (!root) return;

    const els = [...root.querySelectorAll<HTMLElement>("[data-scramble-block]")];
    if (!els.length) return;

    const anims = new WeakMap<HTMLElement, ReturnType<typeof animate>>();
    const lastStart = new WeakMap<HTMLElement, number>();
    const DEBOUNCE_MS = 280;

    const scrambleLine = (el: HTMLElement) => {
      const now = performance.now();
      const prev = lastStart.get(el) ?? 0;
      if (now - prev < DEBOUNCE_MS) return;
      lastStart.set(el, now);

      anims.get(el)?.revert();
      const anim = animate(el, {
        innerHTML: scrambleText({ ease: "inOutQuad", override: false }),
      });
      anims.set(el, anim);
    };

    const mqHover = globalThis.matchMedia?.("(hover: hover)") ?? { matches: true };
    const usePointerEnter = mqHover.matches;

    const cleanups: Array<() => void> = [];

    for (const el of els) {
      const onActivate = () => scrambleLine(el);

      if (usePointerEnter) {
        el.addEventListener("pointerenter", onActivate);
        cleanups.push(() => el.removeEventListener("pointerenter", onActivate));
      } else {
        // `click` avoids firing on scroll gestures; `pointerdown` runs at touchstart and feels sticky on mobile.
        el.addEventListener("click", onActivate);
        cleanups.push(() => el.removeEventListener("click", onActivate));
      }

      el.addEventListener("focusin", onActivate);
      cleanups.push(() => el.removeEventListener("focusin", onActivate));
    }

    return () => {
      cleanups.forEach((fn) => fn());
      for (const el of els) {
        anims.get(el)?.revert();
      }
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground mb-2">How it works</h3>
        {HOW_IT_WORKS_STEPS.map((item) => (
          <div
            key={item.step}
            className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border"
          >
            <span className="shrink-0 w-9 h-9 rounded-full bg-gradient-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
              {item.step}
            </span>
            <div>
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="space-y-4">
      <h3
        className={`text-xl font-bold text-foreground mb-2 ${SCRAMBLE_LINE_CLASS}`}
        data-scramble-block
        tabIndex={0}
      >
        How it works
      </h3>
      {HOW_IT_WORKS_STEPS.map((item) => (
        <div
          key={item.step}
          className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border"
        >
          <span className="shrink-0 w-9 h-9 rounded-full bg-gradient-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
            {item.step}
          </span>
          <div>
            <p className={`font-semibold text-foreground ${SCRAMBLE_LINE_CLASS}`} data-scramble-block tabIndex={0}>
              {item.title}
            </p>
            <p className={`text-sm text-muted-foreground mt-0.5 ${SCRAMBLE_LINE_CLASS}`} data-scramble-block tabIndex={0}>
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
});

const MEETUP_PHOTOS = [
  { src: publicAssetUrl("/meetups/IMG_4444.JPG"), alt: "Data and AI Tirana community meetup" },
  { src: publicAssetUrl("/meetups/IMG_4458.JPG"), alt: "Community event in Tirana" },
  { src: publicAssetUrl("/meetups/IMG_4478.JPG"), alt: "Workshop at Data and AI Tirana" },
  { src: publicAssetUrl("/meetups/IMG_4490.JPG"), alt: "Meetup attendees in Tirana" },
  { src: publicAssetUrl("/meetups/IMG_4517.JPG"), alt: "Networking at a Tirana meetup" },
  { src: publicAssetUrl("/meetups/IMG_4526.JPG"), alt: "Data and AI Tirana gathering" },
];

const HERO_HEADING = "Data and AI Tirana";
/** Last three letters "ana" — blue; "Data and AI Tir" — navy per design. */
const HERO_HEADING_ACCENT_START = HERO_HEADING.length - 3;
const HERO_HEADING_MAIN = HERO_HEADING.slice(0, HERO_HEADING_ACCENT_START);
const HERO_HEADING_ACCENT = HERO_HEADING.slice(HERO_HEADING_ACCENT_START);

/**
 * Memoized so Index re-renders do not reset DOM after splitText().
 * Character animation matches animejs stagger + y/rotate keyframes.
 */
const HeroAnimatedTitle = memo(function HeroAnimatedTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);
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

    const el = titleRef.current;
    if (!el) return;

    const splitter = splitText(el, {
      words: false,
      chars: true,
    });

    const { chars } = splitter;

    chars.forEach((node: HTMLElement, i: number) => {
      node.classList.add("inline-block");
      if (i >= HERO_HEADING_ACCENT_START) {
        node.classList.add("text-hero-heading-accent");
      } else {
        node.classList.add("text-hero-heading");
      }
    });

    const animation = animate(chars, {
      y: [
        { to: "-2.75rem", ease: "outExpo", duration: 600 },
        { to: 0, ease: "outBounce", duration: 800, delay: 100 },
      ],
      rotate: {
        from: "-1turn",
        delay: 0,
      },
      delay: stagger(50),
      ease: "inOutCirc",
      loopDelay: 1000,
      loop: true,
    });

    return () => {
      animation.revert();
      splitter.revert();
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-5 tracking-tight">
        <span className="text-hero-heading">{HERO_HEADING_MAIN}</span>
        <span className="text-hero-heading-accent">{HERO_HEADING_ACCENT}</span>
      </h1>
    );
  }

  return (
    <h1
      ref={titleRef}
      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-5 tracking-tight"
    >
      {HERO_HEADING}
    </h1>
  );
});

/** Timeline choreography for the meetups intro strip (keeps sync pattern; short durations for snappy UI). */
const MEETUPS_SHAPE_X = "10rem";
const MEETUPS_MOTION_MS = 650;

/**
 * Scroll-scrubbed motion: `onScroll` + `animate` linked (see animejs scroll docs).
 * `body.scroll-container` is the scroll root so window scroll drives progress.
 */
const ScrollSyncedSquare = memo(function ScrollSyncedSquare() {
  const squareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;

    const el = squareRef.current;
    if (!el) return;

    const animation = animate(el, {
      x: "15rem",
      rotate: "1turn",
      ease: "linear",
    });

    const scrollObserver = onScroll({
      container: ".scroll-container",
      enter: "bottom-=50 top",
      leave: "top+=60 bottom",
      sync: true,
      // `debug: true` draws the ruler + red enter/leave lines (dev-only before). Off by default.
      debug: false,
    });

    scrollObserver.link(animation);

    return () => {
      scrollObserver.revert();
      animation.revert();
    };
  }, []);

  return (
    <div className="flex justify-center mt-10 md:mt-12 motion-reduce:hidden" aria-hidden>
      <div
        ref={squareRef}
        className="square h-10 w-10 shrink-0 rounded-md bg-[#3B82F6]/15 border border-[#3B82F6]/40 shadow-sm"
      />
    </div>
  );
});

const MeetupsIntroMotion = memo(function MeetupsIntroMotion() {
  const trackRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;

    const track = trackRef.current;
    const circle = circleRef.current;
    const triangle = triangleRef.current;
    const square = squareRef.current;
    if (!track || !circle || !triangle || !square) return;

    let tlMain: ReturnType<typeof createTimeline> | null = null;

    const start = () => {
      if (tlMain) return;
      const circleAnimation = animate(circle, {
        x: MEETUPS_SHAPE_X,
        duration: MEETUPS_MOTION_MS,
        ease: "inOutQuad",
      });

      const tlA = createTimeline()
        .sync(circleAnimation)
        .add(triangle, {
          x: MEETUPS_SHAPE_X,
          duration: MEETUPS_MOTION_MS,
          ease: "inOutQuad",
        })
        .add(square, {
          x: MEETUPS_SHAPE_X,
          duration: Math.round(MEETUPS_MOTION_MS * 0.75),
          ease: "inOutQuad",
        });

      const tlB = createTimeline({ defaults: { duration: MEETUPS_MOTION_MS, ease: "inOutQuad" } })
        .add([triangle, square], { rotate: 360 }, 0)
        .add(circle, { scale: [1, 1.45, 1] }, 0);

      tlMain = createTimeline({
        loop: true,
        loopDelay: 350,
      })
        .sync(tlA)
        .sync(tlB, `-=${MEETUPS_MOTION_MS}`);
    };

    const stop = () => {
      tlMain?.revert();
      tlMain = null;
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) start();
        else stop();
      },
      { root: null, rootMargin: "80px", threshold: 0.05 },
    );
    io.observe(track);

    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="w-full max-w-lg mx-auto mb-8 px-1 motion-reduce:hidden"
      aria-hidden
    >
      <div className="relative h-14 overflow-hidden rounded-2xl border border-border/70 bg-muted/15 shadow-inner">
        <div className="absolute inset-y-0 left-0 flex items-center gap-5 pl-5">
          <div
            ref={circleRef}
            className="h-3 w-3 shrink-0 rounded-full bg-[#3B82F6] shadow-sm"
            style={{ transformOrigin: "50% 50%" }}
          />
          <div
            ref={triangleRef}
            className="h-0 w-0 shrink-0 border-l-[7px] border-r-[7px] border-b-[12px] border-l-transparent border-r-transparent border-b-[#2D2D44]"
            style={{ transformOrigin: "50% 65%" }}
          />
          <div
            ref={squareRef}
            className="h-3 w-3 shrink-0 rounded-[3px] bg-[#3B82F6]/85 shadow-sm"
            style={{ transformOrigin: "50% 50%" }}
          />
        </div>
      </div>
    </div>
  );
});

const Index = () => {
  const [autoplay] = useState(() =>
    Autoplay({ delay: 3200, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      {/* Hero Section — padding-based height so CTAs sit closer to About (no full-screen vertical centering). */}
      <section className="relative px-4 pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 bg-[linear-gradient(180deg,rgba(249,250,251,0.78)_0%,rgba(243,244,246,0.72)_100%)] dark:bg-[linear-gradient(180deg,hsl(252_35%_8%/0.82)_0%,hsl(252_30%_12%/0.78)_100%)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <HeroMetaballs />
          <div className="absolute top-16 left-6 w-56 h-56 sm:w-64 sm:h-64 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-6 w-72 h-72 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 isolate max-w-4xl mx-auto text-center">
          <div className="fade-in-up inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-6 shadow-soft">
            <span className="w-2 h-2 bg-accent rounded-full motion-safe:animate-pulse" />
            <span className="text-sm text-hero-meta font-medium">
              Community-driven AI in Albania
            </span>
          </div>

          <HeroAnimatedTitle />

          <p className="fade-in-up stagger-2 text-base md:text-lg text-hero-subtitle max-w-2xl mx-auto mb-3 md:mb-4 leading-relaxed">
            Connecting beginners &amp; experts in data science and AI across Albania.
          </p>
          <p className="fade-in-up stagger-2 text-sm text-hero-meta mb-7 md:mb-8">
            Free to join · Open to all levels · Meetups in Tirana
          </p>

          <div className="fade-in-up stagger-3 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="w-5 h-5" />
                Book a Call
              </a>
            </Button>
            <Button
              size="xl"
              asChild
              className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white shadow-soft hover:shadow-lg h-14 rounded-xl px-10 text-lg"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Join WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-section-anchor py-14 md:py-20 px-4 bg-card/80">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              About
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              A community advancing AI literacy in Albania
            </h2>
            <div className="w-20 h-1 bg-gradient-accent mx-auto rounded-full" />
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center">
              We're a growing community of data enthusiasts, ML engineers,
              researchers, and learners — hosting meetups, workshops, and
              collaborative projects to advance AI literacy in Albania.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Users, title: "Meetups", desc: "Regular community gatherings" },
                { icon: GraduationCap, title: "Workshops", desc: "Hands-on learning sessions" },
                { icon: Code2, title: "Projects", desc: "Open-source collaboration" },
                { icon: HeartHandshake, title: "Mentorship", desc: "Learn from peers & experts" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <span className="shrink-0 w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center text-accent-foreground">
                    <item.icon className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              This site is live at{" "}
              <a
                href={LIVE_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline-offset-2 hover:text-accent hover:underline break-all sm:break-keep"
              >
                dunksmaster.github.io/data-ai-tirana-hub
              </a>
              .
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-border/60 pt-8">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                <Github className="w-4 h-4 shrink-0" aria-hidden />
                Source on GitHub
              </a>
              <a
                href={LIVE_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                <Globe className="w-4 h-4 shrink-0" aria-hidden />
                Open live site
              </a>
            </div>
          </div>

          <ScrollSyncedSquare />
        </div>
      </section>

      {/* Organizers Section */}
      <section id="organizers" className="scroll-section-anchor py-14 md:py-20 px-4 bg-background/80">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet the Organizers
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Two builders working to grow the AI community in Albania.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              {
                name: "Dorian Kane",
                title:
                  "Building Albania's AI & Web3 Dev Community | Cursor Ambassador | Certified Blockchain Expert | Solana Builder | AI Consultant",
                location: "Tirana, Albania",
                linkedin: "https://www.linkedin.com/in/dorian-kane/",
                photo: dorianPhoto,
              },
              {
                name: "Dhimitër Gëro",
                title:
                  "Experienced Business Analyst | Ex Aon & Deloitte | Chevening Scholar 24/25 @UCL",
                location: "London, England, United Kingdom",
                linkedin: "https://www.linkedin.com/in/dhimitergero/",
                photo: dhimiterPhoto,
              },
            ].map((member, index) => (
              <a
                key={index}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl overflow-hidden bg-card border border-border hover:border-accent/40 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-5">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-accent flex items-center justify-center text-accent-foreground font-bold text-xl shadow-soft">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="mt-4">
                    <p className="font-bold text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                      {member.name}
                      <span className="text-xs font-normal text-muted-foreground">
                        · Organizer
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
                      {member.title}
                    </p>
                    <p className="text-xs text-muted-foreground/80 mt-2">
                      {member.location}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-linkedin group-hover:gap-3 transition-all">
                      <Linkedin className="w-4 h-4" />
                      View profile
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Community / Join Section */}
      <section id="community" className="scroll-section-anchor py-14 md:py-20 px-4 bg-card/80">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              Community
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join the conversation
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Scan to jump straight into our WhatsApp group, or follow us on LinkedIn for updates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* QR card */}
            <div className="rounded-3xl bg-gradient-to-br from-secondary/50 to-accent/5 border border-border p-8 md:p-10">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-background p-4 rounded-2xl shadow-soft hover:shadow-lg transition-all hover:scale-105"
                  aria-label="Join WhatsApp group"
                >
                  <img
                    src={whatsappQr}
                    alt="WhatsApp group QR code"
                    className="w-40 h-40"
                  />
                </a>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Scan to join WhatsApp
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Or tap the QR code on mobile to open the group instantly.
                  </p>
                  <Button
                    size="sm"
                    asChild
                    className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white"
                  >
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4" />
                      Open group
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <HowItWorksScramble />

              <Button
                variant="linkedin"
                size="lg"
                asChild
                className="w-full sm:w-auto"
              >
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                  Follow on LinkedIn
                </a>
              </Button>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  Open to everyone
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  Replies within 24h
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  No spam
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meetup photos */}
      <section id="meetups" className="scroll-section-anchor py-14 md:py-20 px-4 bg-background/80">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              <Images className="w-4 h-4" aria-hidden />
              Meetups
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Moments from our events
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Slides advance automatically every few seconds. Hover to pause, or use the arrows and swipe to browse.
            </p>
          </div>

          <MeetupsIntroMotion />

          <Carousel
            opts={{ align: "start", loop: true, duration: 16 }}
            plugins={[autoplay]}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {MEETUP_PHOTOS.map((photo, i) => (
                <CarouselItem key={i} className="pl-2 md:pl-4 basis-full">
                  <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-soft aspect-video">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      {...(i === 0
                        ? { fetchpriority: "high" as const }
                        : { fetchpriority: "low" as const })}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:left-4 border-border bg-background/90 shadow-md hover:bg-background" />
            <CarouselNext className="right-2 md:right-4 border-border bg-background/90 shadow-md hover:bg-background" />
          </Carousel>
        </div>
      </section>

      {/* Book a Call Section */}
      <section id="book" className="scroll-section-anchor py-14 md:py-20 px-4 bg-card/80">
        <div className="container max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 md:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3">
                  Contact
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Want to collaborate, speak, or join?
                </h2>
                <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
                  Schedule a short call with our team to discuss partnerships,
                  events, or how you can contribute.
                </p>

                <Button
                  variant="accent"
                  size="xl"
                  asChild
                  className="bg-card text-foreground hover:bg-card/90 shadow-xl"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    <Calendar className="w-5 h-5" />
                    Book a 15-Min Call
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>

              <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-background/20">
                <p className="text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider">
                  A call is great for
                </p>
                <ul className="space-y-3">
                  {[
                    "Speaking at a meetup",
                    "Sponsoring food, venue, or swag",
                    "Partnering on a workshop",
                    "Volunteering with the community",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-primary-foreground/90"
                    >
                      <span className="shrink-0 w-5 h-5 rounded-full bg-accent flex items-center justify-center mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground" />
                      </span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
