import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://upcapital.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/auth/", "/dashboard", "/admin", "/design-system"],
    },
    sitemap: new URL("/sitemap.xml", base).toString(),
  };
}
