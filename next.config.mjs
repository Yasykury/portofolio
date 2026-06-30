/** @type {import('next').NextConfig} */

// Security headers applied to every response. These harden the site against
// clickjacking, MIME-sniffing, protocol downgrade, and referrer leakage —
// independent of (and complementary to) the Cloudflare proxy/WAF.
const securityHeaders = [
  // Force HTTPS for 2 years, including subdomains. Vercel already serves
  // HTTPS-only, so this is safe.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  // Disallow the site being embedded in an <iframe> elsewhere (clickjacking).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
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
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
