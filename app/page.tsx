import { promises as fs, existsSync } from "node:fs";
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
        const files = (await fs.readdir(dir)).sort();
        // Prefer a real image; otherwise use the first video's poster.
        const img = files.find((f) => /\.(jpe?g|png|webp|gif)$/i.test(f));
        if (img) return [p.slug, `/work/${p.slug}/${img}`] as const;
        const vid = files.find((f) => /\.(mp4|webm)$/i.test(f));
        if (vid) {
          const poster = vid.replace(/\.(mp4|webm)$/i, ".jpg");
          if (existsSync(path.join(dir, "posters", poster)))
            return [p.slug, `/work/${p.slug}/posters/${poster}`] as const;
        }
        return [p.slug, null] as const;
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
