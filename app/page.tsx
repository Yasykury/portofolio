import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Stats } from "@/components/Stats";
import { Work } from "@/components/Work";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Work />
        <Services />
        <Process />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
