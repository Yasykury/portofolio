import type { SVGProps } from "react";

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function IconResearch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function IconInterface(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M7 6.5h.01M10 6.5h.01" />
    </svg>
  );
}

export function IconSystem(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function IconPrototype(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="m13 2-3 7h5l-3 7" />
      <circle cx="12" cy="12" r="9" opacity="0.35" />
    </svg>
  );
}

export function IconCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function IconQuote(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M7 7H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v2a3 3 0 0 1-3 3H3v2a5 5 0 0 0 5-5V9a2 2 0 0 0-1-2Zm12 0h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v2a3 3 0 0 1-3 3h0v2a5 5 0 0 0 5-5V9a2 2 0 0 0-1-2Z" />
    </svg>
  );
}

export const serviceIcons = {
  research: IconResearch,
  interface: IconInterface,
  system: IconSystem,
  prototype: IconPrototype,
} as const;
