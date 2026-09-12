import type { Metadata } from "next";
import { HomePage } from "@/components/marketing/home-page";
export const metadata: Metadata = {
  title: "UPCAPITAL | Put your capital to work intelligently",
  alternates: { canonical: "/" },
  openGraph: {
    title: "UPCAPITAL",
    description: "Multi-asset strategy access, portfolio intelligence and transparent reporting.",
    type: "website",
    url: "/",
    images: [{ url: "/brand/upcapital-logo.png", alt: "UPCAPITAL" }],
  },
};
export default function Page() {
  return <HomePage />;
}
