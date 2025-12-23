import { Linkedin, Calendar, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import NetworkIllustration from "@/components/NetworkIllustration";
import DataVisualization from "@/components/DataVisualization";

const Index = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <NetworkIllustration className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-60 hidden lg:block floating-animation" />
        </div>

        <div className="container relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="fade-in-up inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-8 shadow-soft">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">Community-driven AI in Albania</span>
          </div>

          {/* Main heading */}
          <h1 className="fade-in-up stagger-1 text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
            Data and AI{" "}
            <span className="text-gradient">Tirana</span>
          </h1>

          {/* Subtitle */}
          <p className="fade-in-up stagger-2 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Connecting beginners & experts in data science and AI across Albania.
          </p>

          {/* CTA Button */}
          <div className="fade-in-up stagger-3 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="hero"
              size="xl"
              asChild
            >
              <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2qh5e6qHdfw3jfFTMcy4BcMY5NP1cEhRBDvrgB4hUQ0u9yFx1Tmw7pbAWGyDkPeGv4n_TO-tpg" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-5 h-5" />
                Book a Call
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("about")}
            >
              Learn More
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Floating data visualization */}
          <div className="mt-16 fade-in-up stagger-4">
            <DataVisualization className="w-full max-w-md mx-auto opacity-80" />
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors cursor-pointer"
        >
          <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 bg-card">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About Our Community
            </h2>
            <div className="w-20 h-1 bg-gradient-accent mx-auto rounded-full" />
          </div>

          <div className="bg-background rounded-2xl p-8 md:p-12 shadow-soft border border-border">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
              We're a growing community of data enthusiasts, ML engineers, researchers, and learners — hosting meetups, workshops, and collaborative projects to advance AI literacy in Albania.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {[
                { icon: "🎯", title: "Meetups", desc: "Regular community gatherings" },
                { icon: "🛠️", title: "Workshops", desc: "Hands-on learning sessions" },
                { icon: "🤝", title: "Collaboration", desc: "Project partnerships" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="py-24 px-4 bg-gradient-hero">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Connect With Us
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Follow our journey and stay updated with the latest events, insights, and opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="linkedin"
              size="xl"
              asChild
              className="group"
            >
              <a
                href="https://www.linkedin.com/company/89613705/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Follow on LinkedIn
              </a>
            </Button>

            <Button
              size="xl"
              asChild
              className="group bg-[#25D366] hover:bg-[#25D366]/90 text-primary-foreground shadow-soft hover:shadow-lg"
            >
              <a
                href="https://chat.whatsapp.com/F5pFiV0oEBn0V2QF1SSDAx"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Join WhatsApp Group
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Book a Call Section */}
      <section id="book" className="py-24 px-4 bg-card">
        <div className="container max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 md:p-16 text-center">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Want to collaborate, speak, or join?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
                Schedule a short call with our team to discuss partnerships, events, or how you can contribute.
              </p>

              <Button
                variant="accent"
                size="xl"
                asChild
                className="bg-card text-foreground hover:bg-card/90 shadow-xl"
              >
                <a
                  href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2qh5e6qHdfw3jfFTMcy4BcMY5NP1cEhRBDvrgB4hUQ0u9yFx1Tmw7pbAWGyDkPeGv4n_TO-tpg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="w-5 h-5" />
                  Book a 15-Min Call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-foreground">
        <div className="container max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-background/80 text-sm text-center md:text-left">
              © 2025 Data and AI Tirana — Building the future of AI in the Balkans.
            </p>

            <a
              href="https://www.linkedin.com/company/89613705/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 hover:text-background transition-colors"
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
