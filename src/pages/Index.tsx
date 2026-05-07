import { useState } from "react";
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
import dhimiterPhoto from "@/assets/dhimiter-gero.png";
import dorianPhoto from "@/assets/dorian-kane.png";
import whatsappQr from "@/assets/whatsapp-qr.svg";

const BOOKING_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2qh5e6qHdfw3jfFTMcy4BcMY5NP1cEhRBDvrgB4hUQ0u9yFx1Tmw7pbAWGyDkPeGv4n_TO-tpg";
const WHATSAPP_URL = "https://chat.whatsapp.com/F5pFiV0oEBn0V2QF1SSDAx";
const LINKEDIN_URL = "https://www.linkedin.com/company/89613705/";

/** Public folder URLs must respect Vite `base` (e.g. GitHub Pages under /repo/). */
function publicAssetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

/** Photos in public/meetups/ — add or remove entries when you change files. */
const MEETUP_PHOTOS = [
  { src: publicAssetUrl("/meetups/IMG_4444.JPG"), alt: "Data and AI Tirana community meetup" },
  { src: publicAssetUrl("/meetups/IMG_4458.JPG"), alt: "Community event in Tirana" },
  { src: publicAssetUrl("/meetups/IMG_4478.JPG"), alt: "Workshop at Data and AI Tirana" },
  { src: publicAssetUrl("/meetups/IMG_4490.JPG"), alt: "Meetup attendees in Tirana" },
  { src: publicAssetUrl("/meetups/IMG_4517.JPG"), alt: "Networking at a Tirana meetup" },
  { src: publicAssetUrl("/meetups/IMG_4526.JPG"), alt: "Data and AI Tirana gathering" },
];

const Index = () => {
  const [autoplay] = useState(() =>
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20 bg-gradient-hero">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 max-w-4xl mx-auto text-center">
          <div className="fade-in-up inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-8 shadow-soft">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">
              Community-driven AI in Albania
            </span>
          </div>

          <h1 className="fade-in-up stagger-1 text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
            Data and AI <span className="text-gradient">Tirana</span>
          </h1>

          <p className="fade-in-up stagger-2 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            Connecting beginners &amp; experts in data science and AI across Albania.
          </p>
          <p className="fade-in-up stagger-2 text-sm text-muted-foreground/80 mb-10">
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
              className="bg-[#25D366] hover:bg-[#25D366]/90 text-primary-foreground shadow-soft hover:shadow-lg h-14 rounded-xl px-10 text-lg"
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
      <section id="about" className="py-20 md:py-28 px-4 bg-card">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-14">
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
          </div>
        </div>
      </section>

      {/* Organizers Section */}
      <section id="organizers" className="py-20 md:py-28 px-4 bg-background">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-14">
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
      <section id="community" className="py-20 md:py-28 px-4 bg-card">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-14">
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
                    className="bg-[#25D366] hover:bg-[#25D366]/90 text-primary-foreground"
                  >
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4" />
                      Open group
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground mb-2">
                How it works
              </h3>
              {[
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
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border"
                >
                  <span className="shrink-0 w-9 h-9 rounded-full bg-gradient-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}

              <Button
                variant="linkedin"
                size="lg"
                asChild
                className="w-full sm:w-auto mt-2"
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
      <section id="meetups" className="py-20 md:py-28 px-4 bg-background">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-12">
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

          <Carousel
            opts={{ align: "start", loop: true }}
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
      <section id="book" className="py-20 md:py-28 px-4 bg-card">
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
