import { promises as fs, existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, site } from "@/lib/site";
import { Footer } from "@/components/Footer";
import { WorkGallery } from "@/components/WorkGallery";
import { ContactButton } from "@/components/ui/buttons";
import { ArrowRight } from "@/components/ui/icons";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.blurb };
}

type MediaItem = { src: string; type: "image" | "video"; poster?: string };

// Auto-collect everything dropped into public/work/<slug>/ at build time —
// no code edit needed to add work samples.
async function getMedia(slug: string): Promise<MediaItem[]> {
  try {
    const dir = path.join(process.cwd(), "public", "work", slug);
    const files = await fs.readdir(dir);
    return files
      .filter((f) => /\.(jpe?g|png|webp|gif|mp4|webm)$/i.test(f))
      .sort()
      .map((f) => {
        const isVideo = /\.(mp4|webm)$/i.test(f);
        const item: MediaItem = {
          src: `/work/${slug}/${f}`,
          type: isVideo ? "video" : "image",
        };
        if (isVideo) {
          const poster = f.replace(/\.(mp4|webm)$/i, ".jpg");
          if (existsSync(path.join(dir, "posters", poster)))
            item.poster = `/work/${slug}/posters/${poster}`;
        }
        return item;
      });
  } catch {
    return [];
  }
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const media = await getMedia(slug);
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      {/* Top bar */}
      <header className="shell container-px flex items-center justify-between py-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink font-display text-sm font-extrabold text-bg">
            {site.monogram}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            {site.shortName}
          </span>
        </Link>
        <Link
          href="/#work"
          className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink"
        >
          ← All work
        </Link>
      </header>

      <main className="shell container-px pb-24 pt-8">
        {/* Project header */}
        <div className="border-b border-line pb-10">
          <p className="mono-label">
            {project.category} // {project.year}
          </p>
          <h1 className="mt-4 font-display text-[11vw] font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {project.blurb}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-ink-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Gallery */}
        <section className="mt-12">
          {media.length > 0 ? (
            <WorkGallery media={media} />
          ) : (
            <div className="rounded-2xl border border-dashed border-line-strong bg-surface p-10 text-center sm:p-16">
              <p className="font-display text-2xl font-bold">
                Portfolio coming soon
              </p>
              <p className="mx-auto mt-3 max-w-md text-ink-soft">
                Work samples for this project will appear here once they&apos;re
                added.
              </p>
              <p className="mt-5 font-mono text-xs text-ink-muted">
                images &amp; videos go in{" "}
                <span className="text-warm">public/work/{slug}/</span>
              </p>
            </div>
          )}
        </section>

        {/* Footer CTA + next project */}
        <div className="mt-16 flex flex-col items-start gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <ContactButton label="Start a project" />
          <Link
            href={`/work/${next.slug}`}
            className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-ink-soft transition-colors hover:text-ink"
          >
            Next: {next.title}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
