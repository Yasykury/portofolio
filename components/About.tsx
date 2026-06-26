import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ContactButton } from "@/components/ui/buttons";

const ABOUT_TEXT =
  "With more than seven years of experience in multimedia, I focus on video editing, motion graphics, and brand design. I genuinely enjoy working with teams and creators who want to stand out and tell bold, memorable stories. Let's build something incredible together!";

export function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-20 sm:px-8 md:px-10"
    >
      {/* Decorative corner shapes (CSS — no external assets) */}
      <FadeIn
        x={-80}
        duration={0.9}
        delay={0.1}
        className="animate-float-soft pointer-events-none absolute left-[1%] top-[6%] h-[110px] w-[110px] rounded-full bg-gradient-to-br from-indigo-400/70 to-violet-700/40 blur-[2px] sm:left-[2%] sm:h-[150px] sm:w-[150px] md:left-[4%] md:h-[200px] md:w-[200px]"
      >
        <span className="sr-only">decoration</span>
      </FadeIn>
      <FadeIn
        x={80}
        duration={0.9}
        delay={0.15}
        className="animate-float-soft pointer-events-none absolute right-[1%] top-[6%] h-[100px] w-[100px] rotate-12 rounded-[28px] bg-gradient-to-br from-fuchsia-400/70 to-purple-700/40 blur-[2px] sm:right-[2%] sm:h-[140px] sm:w-[140px] md:right-[4%] md:h-[190px] md:w-[190px]"
      >
        <span className="sr-only">decoration</span>
      </FadeIn>
      <FadeIn
        x={-80}
        duration={0.9}
        delay={0.25}
        className="animate-float-soft pointer-events-none absolute bottom-[8%] left-[3%] h-[90px] w-[90px] rounded-[40%_60%_55%_45%] bg-gradient-to-br from-pink-400/60 to-rose-700/40 blur-[2px] sm:left-[6%] sm:h-[120px] sm:w-[120px] md:left-[10%] md:h-[160px] md:w-[160px]"
      >
        <span className="sr-only">decoration</span>
      </FadeIn>
      <FadeIn
        x={80}
        duration={0.9}
        delay={0.3}
        className="animate-float-soft pointer-events-none absolute bottom-[8%] right-[3%] h-[100px] w-[100px] rounded-[60%_40%_45%_55%] bg-gradient-to-br from-cyan-400/60 to-blue-700/40 blur-[2px] sm:right-[6%] sm:h-[140px] sm:w-[140px] md:right-[10%] md:h-[180px] md:w-[180px]"
      >
        <span className="sr-only">decoration</span>
      </FadeIn>

      {/* Heading */}
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight"
      >
        About me
      </FadeIn>

      {/* Scroll-revealed paragraph */}
      <div className="mt-10 max-w-[560px] sm:mt-14 md:mt-16">
        <AnimatedText
          text={ABOUT_TEXT}
          className="text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-mist"
        />
      </div>

      <div className="mt-16 sm:mt-20 md:mt-24">
        <FadeIn delay={0.1} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
