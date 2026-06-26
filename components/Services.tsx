import { FadeIn } from "@/components/ui/FadeIn";

const services = [
  {
    num: "01",
    name: "Video Editing & Post-Production",
    desc: "From raw footage to a finished story — event coverage, YouTube content, and promo videos with professional pacing, color, and sound.",
  },
  {
    num: "02",
    name: "Motion Graphics",
    desc: "Dynamic animations and motion design that add energy and storytelling to brands, products, and digital experiences.",
  },
  {
    num: "03",
    name: "Visual Effects (VFX)",
    desc: "Eye-catching effects and compositing built in After Effects to bring concepts and brands to life on screen.",
  },
  {
    num: "04",
    name: "Graphic Design & Branding",
    desc: "Cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.",
  },
  {
    num: "05",
    name: "Content & Creative Direction",
    desc: "End-to-end creative ownership: concept, production, and delivery for campaigns and communities, including studio setups.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn
        as="h2"
        y={40}
        className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none sm:mb-20 md:mb-28"
      >
        Services
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {services.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.1} y={30}>
            <div className="flex items-start gap-4 border-t border-[rgba(12,12,12,0.15)] py-8 last:border-b sm:gap-8 sm:py-10 md:py-12">
              <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#0C0C0C]">
                {s.num}
              </span>
              <div className="pt-1 sm:pt-2">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-tight">
                  {s.name}
                </h3>
                <p className="mt-3 max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">
                  {s.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
