# Data & AI Tirana Hub

The official landing page for **Data & AI Tirana Hub** — a community bringing together data scientists, AI engineers, and tech enthusiasts in Tirana, Albania.

🌐 **Live site:** https://data-ai-tirana-hub.lovable.app

## About

Data & AI Tirana Hub is a local community focused on knowledge sharing, networking, and collaboration around data science and artificial intelligence. We host meetups, workshops, and events to help members grow their skills and connect with peers.

## Page sections

In-page navigation (navbar and footer) scrolls to these anchors:

| Anchor (`id`) | In nav as | What it covers |
| --- | --- | --- |
| *(top)* | Logo | Hero with CTAs |
| `about` | About | Mission, pillars (meetups, workshops, projects, mentorship) |
| `organizers` | Organizers | Organizer cards and LinkedIn links |
| `community` | Community | WhatsApp QR, **How it works** steps, LinkedIn |
| `meetups` | Meetups | Animated intro strip, Embla carousel of event photos |
| `book` | Contact | Book-a-call CTA and collaboration ideas |

The **FAQ** and standalone **Connect** blocks from earlier versions are no longer separate sections; contact and channels are folded into **Community** and **Contact**.

## Visual and motion features

- **Hero background** — `HeroMetaballs.tsx` renders a lightweight **WebGL** metaball field behind the hero (skipped when `prefers-reduced-motion: reduce` is set; canvas is non-interactive).
- **Hero title** — **anime.js** `splitText` + staggered character motion on the main heading; static split styling (`text-hero-heading` / `text-hero-heading-accent`) when reduced motion is requested.
- **Meetups block** — `MeetupsIntroMotion`: small shape animation driven by **anime.js** timelines, only while the block is in view (`IntersectionObserver`).
- **About block** — Optional scroll-scrubbed demo (`ScrollSyncedSquare`) using **anime.js** `onScroll` with `body.scroll-container` as the scroll root.
- **How it works** — Optional **scramble** text on headings and lines (hover on fine pointers, click or focus otherwise), via `scrambleText` from anime.js; falls back to plain copy when reduced motion is preferred.

Typography: **Inter** is the default stack font (`tailwind.config.ts` `fontFamily.sans` and `src/index.css`). **Nunito** and **Tilt Neon** are additionally linked from Google Fonts in `index.html` if you want to wire them into Tailwind or use them in custom CSS.

Hero and UI accents use an updated palette (e.g. blue `#3B82F6`, WhatsApp-style green `#22C55E`, hero surface gradient in CSS variables).

## Accessibility

- **`scrollIntoViewBehavior()`** (`src/lib/utils.ts`) — Navbar and footer use `smooth` scrolling only when the user has not requested reduced motion; otherwise behavior is `auto`.
- **CSS** — `prefers-reduced-motion: reduce` turns off global smooth scrolling, disables key CSS animations (e.g. `fade-in-up`, floating/pulse), and components above skip or simplify motion.
- **Anchors** — Sections that are scroll targets use `scroll-section-anchor` for consistent offset below the fixed header.

## Join the community

- 💬 [WhatsApp group](https://chat.whatsapp.com/F5pFiV0oEBn0V2QF1SSDAx)
- 📅 [Upcoming events (Google Calendar)](https://calendar.google.com/)
- 💼 [LinkedIn](https://www.linkedin.com/)

## Tech stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **anime.js** (^4.x) — timelines, scroll-linked animation, text utilities (`splitText`, `scrambleText`, `onScroll`, etc.)
- **WebGL** (custom shaders) — hero metaballs only
- **Embla Carousel** (+ autoplay) — meetup photo carousel
- **Lovable Cloud** (Supabase) — backend, auth, database where used
- **Lovable AI** — AI features via the AI Gateway where configured

## Project layout (high level)

- `src/pages/Index.tsx` — Main landing composition, meetup photo data, and motion-heavy subcomponents (hero title, how-it-works, meetups intro, scroll demo).
- `src/components/HeroMetaballs.tsx` — WebGL metaball background.
- `src/components/Navbar.tsx` / `Footer.tsx` — Navigation, shared anchor list, reduced-motion-aware scrolling.
- `src/index.css` — Theme tokens, hero typography utilities, scroll anchor utility, reduced-motion overrides.

## Local development

Requirements: Node.js and npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

```sh
git clone <YOUR_GIT_URL>
cd data-ai-tirana-hub
npm install
npm run dev
```

Changes pushed to GitHub sync automatically with Lovable, and vice versa.

## Editing

- **Lovable:** open the [project](https://lovable.dev/projects/c9c0eb56-43cb-443d-a723-c0ee93689daf) and start prompting
- **Your IDE:** clone the repo, edit, and push — changes sync back to Lovable
- **GitHub:** edit files directly via the GitHub web UI or Codespaces

### Meetup images

Photos are served from `public/meetups/`. The carousel reads from `MEETUP_PHOTOS` in `Index.tsx`; update paths there when you add or replace shots.

## Deployment

Open the project in Lovable and click **Publish** (top right). To attach a custom domain, go to **Project → Settings → Domains → Connect Domain**. [Docs](https://docs.lovable.dev/features/custom-domain).

---

Built with ❤️ by the Data & AI Tirana Hub organizers.
