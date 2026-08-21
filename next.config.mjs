/** @type {import('next').NextConfig} */

// Security headers applied to every response. These harden the site against
// clickjacking, MIME-sniffing, protocol downgrade, and referrer leakage —
// independent of (and complementary to) the Cloudflare proxy/WAF.
const securityHeaders = [
  // Force HTTPS for 2 years, including subdomains. Registered in the browser
  // HSTS preload list so even first-time visitors are protected.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Disallow the site being embedded in any <iframe> (clickjacking).
  // DENY is stricter than SAMEORIGIN — this site has no need to embed itself.
  { key: "X-Frame-Options", value: "DENY" },
  // Don't let the browser guess content types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send origin only on cross-site navigations (privacy).
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Turn off powerful browser features the site doesn't use.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Content-Security-Policy — restricts what resources the browser may load.
  // Allowlist:
  //   • script-src  — self + Cloudflare Turnstile (bot protection widget).
  //   • frame-src   — YouTube embeds (work pages) + Turnstile challenge iframe.
  //   • img-src     — self, data URIs, blobs, and remote HTTPS images
  //                   (YouTube thumbnails, OG images, etc.).
  //   • style-src   — 'unsafe-inline' required for Tailwind / Framer Motion.
  //   • connect-src — self + Resend API (contact form) + Turnstile verify.
  //   • object-src  — none (block Flash / plugins completely).
  //   • base-uri    — self (prevent base-tag hijacking).
  //   • form-action — self (forms may only submit to this origin).
  //   • frame-ancestors — none (supersedes X-Frame-Options in modern browsers).
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self'",
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://challenges.cloudflare.com",
      "connect-src 'self' https://api.resend.com https://challenges.cloudflare.com",
      "media-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/:path*/README.md",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/:path*/readme.md",
        destination: "/404",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
