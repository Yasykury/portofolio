# Yasykury Sulistyo — Portfolio

A premium, high-converting portfolio landing page for **Yasykury Sulistyo**, UI/UX & Product Designer. Built as a full-stack Next.js app with elegant, performance-first animations.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — Clean Light Minimal design system
- **Framer Motion** — scroll reveals & counters (respects `prefers-reduced-motion`)
- **Fontsource** — self-hosted Archivo + Space Grotesk variable fonts (no external request, no layout shift, builds offline)
- **API route** (`/api/contact`) — server-side validated contact form with honeypot

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build && npm run start   # production build
```

## Project structure

```
app/
  layout.tsx          # fonts, metadata, <html>
  page.tsx            # section composition
  globals.css         # design tokens + animations
  api/contact/route.ts# full-stack contact endpoint
components/           # Navbar, Hero, Work, Services, … Contact, Footer
  ui/                 # Reveal, Counter, icons
lib/site.ts           # ALL site content (edit here)
```

## Make it yours

1. **Content** — edit `lib/site.ts` (name, role, projects, services, testimonials, stats, socials).
2. **Bio & headshot** — update `components/About.tsx`; drop a photo in `public/` and swap the placeholder for `next/image`.
3. **Project covers** — currently gradient placeholders. Add real screenshots to `public/` and replace the gradient `<div>` in `components/Work.tsx`.
4. **Colors / fonts** — adjust the `@theme` tokens in `app/globals.css`.

## Contact form / email

Submissions are validated server-side and saved to `data/contact-submissions.json` (git-ignored) so the demo works out of the box. To send real emails, add a `RESEND_API_KEY` to `.env.local` and uncomment the Resend block in `app/api/contact/route.ts`.

## Performance & accessibility

- Self-hosted fonts (no render-blocking Google Fonts request); home page is statically prerendered.
- Mostly CSS-driven animation; Framer Motion only for viewport reveals.
- `prefers-reduced-motion` honoured globally.
- Keyboard-accessible nav, visible focus rings, labelled form fields, skip link.
- Semantic landmarks and descriptive metadata for SEO/social sharing.
