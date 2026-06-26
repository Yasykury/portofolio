/**
 * Single source of truth for site content.
 * Identity, work, and skills below are taken from Yasykury's CV.
 * Items marked "// PLACEHOLDER" are illustrative and should be replaced with
 * real assets/numbers when available (testimonials, exact stats, social links).
 */

export const site = {
  name: "Yasykury Sulistyo",
  shortName: "Yasykury",
  monogram: "YS",
  role: "Multimedia Designer",
  email: "yasykury@outlook.com",
  phone: "0882 9955 1111",
  location: "Pondok Aren, Tangerang Selatan, Indonesia",
  availability: "Open to video, motion & design projects",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yasykury-sulistyo-2a09882ba/" },
  ],
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Craft", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

// All figures are grounded in the CV (years since 2019, 5 employers/clients,
// 2 self-owned studios). "100+ videos edited" is a conservative estimate across
// 7 years of professional editing — adjust if you have an exact number.
export const stats = [
  { value: 7, suffix: "+", label: "Years in multimedia" },
  { value: 5, suffix: "", label: "Brands & studios" },
  { value: 100, suffix: "+", label: "Videos edited" },
  { value: 2, suffix: "", label: "Studios founded" },
] as const;

// Real brands/employers from the CV.
export const clients = [
  "Circle Media Entertainment",
  "Dupoin Futures (GRW)",
  "Crownsy",
  "Washsins Shoes Care",
  "Natasha Wilona",
] as const;

export type Project = {
  /** URL slug — also the media folder name: public/work/<slug>/ */
  slug: string;
  title: string;
  category: string;
  year: string;
  blurb: string;
  tags: string[];
  /** Tailwind gradient classes used as the card cover. */
  cover: string;
};

export const projects: Project[] = [
  {
    slug: "polestar",
    title: "PT Dupoin Futures Indonesia (Polestar Indonesia)",
    category: "Multimedia · Branding",
    year: "2026",
    blurb:
      "Producing video and graphic assets for company branding and community marketing — plus contributing to the Polestar community website and podcast studio setup.",
    tags: ["Video", "Motion Graphics", "Web"],
    cover: "from-sky-500 via-blue-500 to-indigo-600",
  },
  {
    slug: "grw",
    title: "PT Dupoin Futures Indonesia (GRW)",
    category: "Multimedia · Branding",
    year: "2025",
    blurb:
      "Producing video and graphic assets for company branding and community marketing — plus contributing to the GRW community website and podcast studio setup.",
    tags: ["Video", "Motion Graphics", "Web"],
    cover: "from-blue-500 via-indigo-500 to-violet-600",
  },
  {
    slug: "circle-media",
    title: "Circle Media Entertainment",
    category: "Event · Post-Production",
    year: "2024",
    blurb:
      "Specialized event video editing — capturing and highlighting key moments with professional post-production for engaging, high-quality recaps.",
    tags: ["Video Editing", "Post-Production", "Events"],
    cover: "from-emerald-400 via-teal-500 to-cyan-600",
  },
  {
    slug: "washsins",
    title: "Washsins Shoes Care",
    category: "Brand · Marketing",
    year: "2023",
    blurb:
      "Founded and ran the brand's content — promotional videos and consistent graphic design to strengthen identity and drive marketing campaigns.",
    tags: ["Branding", "Graphic Design", "Video"],
    cover: "from-rose-400 via-pink-500 to-fuchsia-600",
  },
  {
    slug: "crownsy",
    title: "Crownsy Screen Printing",
    category: "Brand · Apparel",
    year: "2020",
    blurb:
      "Owned and directed visual branding — creative promotional video and high-quality graphics for screen-printed apparel and marketing.",
    tags: ["Branding", "Graphic Design", "Video"],
    cover: "from-amber-400 via-orange-500 to-red-500",
  },
  {
    slug: "natasha-wilona",
    title: "Natasha Wilona YouTube",
    category: "YouTube · Video",
    year: "2019",
    blurb:
      "End-to-end production and editing for a high-traffic channel — narrative-driven edits with After Effects and Premiere Pro to boost viewer retention.",
    tags: ["Video Editing", "After Effects", "Storytelling"],
    cover: "from-fuchsia-500 via-purple-500 to-indigo-600",
  },
];

export type Service = {
  title: string;
  description: string;
  points: string[];
  icon: "research" | "interface" | "system" | "prototype";
};

export const services: Service[] = [
  {
    title: "Video Editing & Post-Production",
    description:
      "From raw footage to a finished story. Event coverage, YouTube content, and promotional videos with professional pacing, color, and sound.",
    points: ["Event & promo videos", "YouTube content", "Color & audio"],
    icon: "interface",
  },
  {
    title: "Motion Graphics & VFX",
    description:
      "Eye-catching motion and visual effects built in After Effects that bring brands and stories to life on screen.",
    points: ["Animated graphics", "VFX & compositing", "Title & logo animation"],
    icon: "prototype",
  },
  {
    title: "Graphic Design & Branding",
    description:
      "Cohesive visual identities and marketing assets — from apparel graphics to social and print campaigns that stay on-brand.",
    points: ["Brand identity", "Marketing assets", "Social & print"],
    icon: "system",
  },
  {
    title: "Content & Creative Direction",
    description:
      "End-to-end creative ownership: concept, production, and delivery for campaigns and communities — including studio and podcast setups.",
    points: ["Concept & scripting", "Studio / podcast setup", "Campaign direction"],
    icon: "research",
  },
];

export const process = [
  {
    step: "01",
    title: "Discover",
    description:
      "We align on goals, audience, and message. I review references and footage, then map out the story worth telling.",
  },
  {
    step: "02",
    title: "Create",
    description:
      "From edit to motion graphics — rapid drafts, shared early and often, refined with your feedback at every stage.",
  },
  {
    step: "03",
    title: "Deliver",
    description:
      "Polished final exports in every format you need, on schedule, with the source files and support through launch.",
  },
];

export const skills = [
  "Video Editing",
  "Motion Graphics",
  "After Effects",
  "Premiere Pro",
  "Graphic Design",
  "Branding",
  "CapCut",
  "Canva",
  "Agentic AI",
  "VS Code",
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  initials: string;
};

// PLACEHOLDER testimonials — replace with real client quotes.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Yasykury turned our raw event footage into a recap that wowed the whole team — fast, reliable, and a real sense of pacing.",
    name: "Andi Pratama",
    title: "Event Producer",
    initials: "AP",
  },
  {
    quote:
      "His motion graphics gave our brand a completely new energy. Creative, detail-obsessed, and genuinely easy to work with.",
    name: "Dewi Rahmawati",
    title: "Marketing Lead",
    initials: "DR",
  },
  {
    quote:
      "From concept to final cut, Yasykury owns the whole process. Our content has never looked this polished.",
    name: "Sandi Wijaya",
    title: "Community Manager",
    initials: "SW",
  },
];
