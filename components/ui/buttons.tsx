import { ArrowUpRight } from "@/components/ui/icons";

export function ContactButton({
  label = "Contact Me",
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
      className={`btn-glow inline-flex cursor-pointer items-center gap-2 rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
    >
      {label}
    </a>
  );
}

export function LiveProjectButton({
  href = "#",
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={href !== "#" ? "_blank" : undefined}
      rel={href !== "#" ? "noopener noreferrer" : undefined}
      className={`group inline-flex cursor-pointer items-center gap-1.5 rounded-full border-2 border-mist/80 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-mist transition-colors duration-200 hover:bg-mist/10 sm:px-8 sm:py-3 sm:text-sm ${className}`}
    >
      Live Project
      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
