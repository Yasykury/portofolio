import { ArrowRight } from "@/components/ui/icons";

export function ContactButton({
  label = "Start a project",
  href = "#contact",
  className = "",
}: {
  label?: string;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`btn-grade group inline-flex cursor-pointer items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide ${className}`}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  );
}

export function GhostButton({
  label,
  href,
  className = "",
}: {
  label: string;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex cursor-pointer items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-sm font-medium uppercase tracking-wide text-ink transition-colors duration-200 hover:border-ink ${className}`}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  );
}
