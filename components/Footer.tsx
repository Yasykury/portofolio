import { nav, site } from "@/lib/site";
import { ArrowUpRight } from "@/components/ui/icons";

export function Footer() {
  const year = new Date().getFullYear();
  // Only show social links that point at a real URL (not the "#" placeholder).
  const socials = site.socials.filter((s) => (s.href as string) !== "#");

  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell container-px py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5" aria-label={`${site.name} — home`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-bg">
                {site.monogram}
              </span>
              <span className="font-display text-base font-semibold tracking-tight">
                {site.name}
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {site.role} crafting elegant, high-converting digital products for
              ambitious teams.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <nav aria-label="Sections">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
                Explore
              </p>
              <ul className="mt-4 space-y-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="link-underline text-sm text-ink-soft hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {socials.length > 0 && (
              <nav aria-label="Social">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
                  Elsewhere
                </p>
                <ul className="mt-4 space-y-3">
                  {socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink"
                      >
                        {social.label}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
                Get in touch
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="link-underline text-sm text-ink-soft hover:text-ink"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="link-underline text-sm text-ink-soft hover:text-ink"
                  >
                    Start a project
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-ink-muted sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Designed &amp; built with care.</p>
        </div>
      </div>
    </footer>
  );
}
