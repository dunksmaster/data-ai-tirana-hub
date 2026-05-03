import { Linkedin, MessageCircle, ArrowUp, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "organizers", label: "Organizers" },
  { id: "community", label: "Community" },
  { id: "meetups", label: "Meetups" },
  { id: "book", label: "Contact" },
];

const Footer = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-foreground text-background/80">
      <div className="container max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent-foreground" />
              </span>
              <span className="font-bold text-background tracking-tight">
                Data &amp; AI Tirana
              </span>
            </div>
            <p className="text-sm leading-relaxed text-background/70">
              A community for data and AI enthusiasts in Albania — open to beginners and experts alike.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-background font-semibold mb-4 text-sm uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Organizers + socials */}
          <div>
            <h3 className="text-background font-semibold mb-4 text-sm uppercase tracking-wider">
              Run by
            </h3>
            <ul className="space-y-2 mb-5">
              <li>
                <a
                  href="https://www.linkedin.com/in/dorian-kane/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  Dorian Kane
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/dhimitergero/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  Dhimitër Gëro
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/89613705/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-background/10 hover:bg-accent flex items-center justify-center transition-colors"
                aria-label="Follow on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://chat.whatsapp.com/F5pFiV0oEBn0V2QF1SSDAx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-background/10 hover:bg-[#25D366] flex items-center justify-center transition-colors"
                aria-label="Join WhatsApp group"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/60 text-center sm:text-left">
            © 2026 Data and AI Tirana — Building the future of AI in the Balkans.
          </p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs text-background/70 hover:text-background transition-colors"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
