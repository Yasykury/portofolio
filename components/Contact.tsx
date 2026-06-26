"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, IconCheck } from "@/components/ui/icons";

type Status = "idle" | "loading" | "success" | "error";

const budgets = ["< $5k", "$5k – $15k", "$15k – $40k", "$40k+"];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 py-20 lg:py-28">
      <div className="shell container-px">
        <div className="overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-surface to-bg text-ink shadow-lift">
          <div className="bg-noise relative grid gap-12 p-8 sm:p-12 lg:grid-cols-12 lg:gap-16 lg:p-16">
            {/* Intro */}
            <div className="lg:col-span-5">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/70">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" />
                  {site.availability}
                </span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                  Let&apos;s build something worth shipping
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 text-lg leading-relaxed text-white/65">
                  Tell me about your project and goals. I reply to every serious
                  inquiry within 24 hours.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-8 space-y-3 text-sm text-white/60">
                  <a
                    href={`mailto:${site.email}`}
                    className="link-underline block w-fit text-white"
                  >
                    {site.email}
                  </a>
                  <a
                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                    className="link-underline block w-fit text-white"
                  >
                    {site.phone}
                  </a>
                  <p>{site.location}</p>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              {status === "success" ? (
                <div className="flex h-full min-h-[20rem] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-bg">
                    <IconCheck className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold">
                    Message sent — thank you!
                  </h3>
                  <p className="mt-2 max-w-sm text-white/65">
                    I&apos;ve received your message and will be in touch within
                    24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 cursor-pointer text-sm text-white/70 underline-offset-4 hover:text-white hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot — hidden from real users, traps bots */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" name="name" placeholder="Jane Doe" required />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="jane@company.com"
                      required
                    />
                  </div>

                  <Field
                    label="Company / Project"
                    name="company"
                    placeholder="Acme Inc."
                  />

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      Estimated budget
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map((b, i) => (
                        <label
                          key={b}
                          className="cursor-pointer rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition-colors duration-200 hover:border-white/40 has-[:checked]:border-warm has-[:checked]:bg-warm has-[:checked]:text-bg"
                        >
                          <input
                            type="radio"
                            name="budget"
                            value={b}
                            defaultChecked={i === 1}
                            className="sr-only"
                          />
                          {b}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-white/80"
                    >
                      Project details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="A few sentences about what you're building, timeline, and what success looks like."
                      className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ink placeholder:text-white/35 transition-colors duration-200 focus:border-warm focus:outline-none focus:ring-2 focus:ring-warm/40"
                    />
                  </div>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="rounded-lg border border-red-400/40 bg-red-500/15 px-4 py-3 text-sm text-red-200"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-grade group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold uppercase tracking-wide disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {status === "loading" ? (
                      <>
                        <Spinner />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-white/80"
      >
        {label}
        {required && <span className="ml-0.5 text-white/40">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ink placeholder:text-white/35 transition-colors duration-200 focus:border-warm focus:outline-none focus:ring-2 focus:ring-warm/40"
      />
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-90"
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
