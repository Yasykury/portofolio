import type { Metadata, Viewport } from "next";
// Self-hosted variable fonts (no external/runtime Google Fonts request —
// faster first paint and reproducible, offline-capable builds).
import "@fontsource-variable/archivo";
import "@fontsource-variable/space-grotesk";
import "@fontsource/anton"; // heavy poster font for the chrome hero headline
import "./globals.css";

// Set NEXT_PUBLIC_SITE_URL to your real domain in Vercel once you have it.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yasykury.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yasykury Sulistyo — Multimedia Designer",
    template: "%s · Yasykury Sulistyo",
  },
  description:
    "Yasykury Sulistyo is a motion designer and video editor crafting bold video, motion graphics, and brand visuals for studios, brands, and creators.",
  keywords: [
    "Yasykury Sulistyo",
    "Motion Designer",
    "Video Editor",
    "Motion Graphics",
    "Graphic Designer",
    "After Effects",
    "Premiere Pro",
    "Portfolio",
  ],
  authors: [{ name: "Yasykury Sulistyo" }],
  creator: "Yasykury Sulistyo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Yasykury Sulistyo — Multimedia Designer",
    description:
      "Bold video, motion graphics, and brand visuals for studios, brands, and creators.",
    siteName: "Yasykury Sulistyo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yasykury Sulistyo — Multimedia Designer",
    description:
      "Bold video, motion graphics, and brand visuals for studios, brands, and creators.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafafa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
