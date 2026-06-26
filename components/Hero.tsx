import Image from "next/image";
import { site } from "@/lib/site";
import { FadeIn } from "@/components/ui/FadeIn";
import { Magnet } from "@/components/ui/Magnet";
import { ContactButton } from "@/components/ui/buttons";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Price", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex h-screen flex-col overflow-x-clip"
    >
      {/* Navbar */}
      <FadeIn playOnMount
        as="nav"
        delay={0}
        y={-20}
        className="relative z-30 flex items-center justify-between px-6 pt-6 text-sm font-medium uppercase tracking-wider text-mist md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]"
      >
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="cursor-pointer transition-opacity duration-200 hover:opacity-70"
          >
            {l.label}
          </a>
        ))}
      </FadeIn>

      {/* Massive gradient heading (sits behind the portrait) */}
      <div className="relative z-0 overflow-hidden px-2">
        <FadeIn playOnMount
          as="h1"
          delay={0.15}
          y={40}
          className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[9.5vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[10.5vw] md:-mt-2 md:text-[11vw] lg:text-[11vw]"
        >
          Hi, I&apos;m {site.shortName}
        </FadeIn>
      </div>

      {/* Magnetic portrait */}
      <Magnet
        padding={150}
        strength={3}
        className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:translate-y-0 sm:w-[360px] md:w-[440px] lg:w-[520px]"
      >
        <FadeIn playOnMount delay={0.6} y={30}>
          <Image
            src="/avatar.png"
            alt={`${site.name} — ${site.role}`}
            width={1024}
            height={1024}
            priority
            draggable={false}
            className="mask-feather h-auto w-full select-none"
          />
        </FadeIn>
      </Magnet>

      {/* Bottom bar */}
      <div className="relative z-30 mt-auto flex items-end justify-between px-6 pb-7 md:px-10 sm:pb-8 md:pb-10">
        <FadeIn playOnMount
          as="p"
          delay={0.35}
          y={20}
          className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-mist sm:max-w-[220px] md:max-w-[260px]"
        >
          a {site.role.toLowerCase()} driven by crafting striking and
          unforgettable visuals
        </FadeIn>
        <FadeIn playOnMount delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
