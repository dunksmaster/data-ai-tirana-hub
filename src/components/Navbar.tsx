import { useEffect, useState } from "react";
import { Calendar, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn, scrollIntoViewBehavior } from "@/lib/utils";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "organizers", label: "Organizers" },
  { id: "community", label: "Community" },
  { id: "projects", label: "Stories" },
  { id: "meetups", label: "Meetups" },
  { id: "book", label: "Contact" },
];

const BOOKING_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2qh5e6qHdfw3jfFTMcy4BcMY5NP1cEhRBDvrgB4hUQ0u9yFx1Tmw7pbAWGyDkPeGv4n_TO-tpg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: scrollIntoViewBehavior() });
  };

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: scrollIntoViewBehavior() });

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-soft"
          : "bg-transparent",
      )}
    >
      <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 group"
          aria-label="Data and AI Tirana — back to top"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-accent-foreground" />
          </span>
          <span className="font-bold tracking-tight hidden sm:inline">
            <span className="text-hero-heading">Data &amp; AI Tir</span>
            <span className="text-hero-heading-accent">ana</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors rounded-md"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Button variant="accent" size="sm" asChild className="hidden sm:inline-flex">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Calendar className="w-4 h-4" />
              Book a Call
            </a>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-1 mt-8">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.id}>
                    <button
                      onClick={() => scrollTo(link.id)}
                      className="text-left px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-secondary transition-colors"
                    >
                      {link.label}
                    </button>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button variant="accent" size="lg" asChild className="mt-4">
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                      <Calendar className="w-4 h-4" />
                      Book a Call
                    </a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
