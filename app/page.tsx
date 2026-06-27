import { promises as fs } from "node:fs";
import path from "node:path";
import { projects } from "@/lib/site";
import { TimelineScrub } from "@/components/TimelineScrub";
import { Hero } from "@/components/Hero";
import { Reel } from "@/components/Reel";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

// First image in each project's media folder → used as the Work hover thumbnail.
async function getThumbs(): Promise<Record<string, string | null>> {
  const entries = await Promise.all(
    projects.map(async (p) => {
      try {
        const dir = path.join(process.cwd(), "public", "work", p.slug);
        const files = (await fs.readdir(dir))
          .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
          .sort();
        return [p.slug, files[0] ? `/work/${p.slug}/${files[0]}` : null] as const;
      } catch {
        return [p.slug, null] as const;
      }
    }),
  );
  return Object.fromEntries(entries);
}

export default async function Home() {
  const thumbs = await getThumbs();

  return (
    <>
      <TimelineScrub />
      <main>
        <Hero />
        <Reel />
        <Work thumbs={thumbs} />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
