"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className={`shell flex items-center justify-between rounded-full border transition-all duration-300 ${
          scrolled
            ? "border-line bg-surface/80 px-4 py-2.5 shadow-soft backdrop-blur-xl"
            : "border-transparent bg-transparent px-2 py-2.5"
        }`}
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 pl-1"
          aria-label={`${site.name} — home`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-bg transition-transform duration-300 group-hover:-rotate-6">
            {site.monogram}
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            {site.shortName}
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex lg:gap-9">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-soft transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="btn-glow hidden cursor-pointer rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wide md:inline-flex"
          >
            Let&apos;s talk
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line bg-surface/80 backdrop-blur-xl md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-0.5 w-4 bg-ink transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-4 bg-ink transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-4 bg-ink transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 top-0 z-40 origin-top bg-bg/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex h-full flex-col justify-center gap-2 px-8">
          {[...nav, { label: "Contact", href: "#contact" }].map((item, i) => (
            <li
              key={item.href}
              style={{ transitionDelay: open ? `${i * 60 + 80}ms` : "0ms" }}
              className={`transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-4xl font-bold uppercase tracking-tight"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
