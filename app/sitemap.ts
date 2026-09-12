import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://upcapital.com";
  return [
    "",
    "/about",
    "/how-it-works",
    "/performance",
    "/technology",
    "/security",
    "/faq",
    "/contact",
    "/legal/terms",
    "/legal/privacy",
    "/legal/risk",
    "/legal/aml",
    "/legal/cookies",
  ].map((path) => ({ url: new URL(path || "/", base).toString() }));
}
