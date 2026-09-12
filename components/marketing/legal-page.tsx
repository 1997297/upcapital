import Link from "next/link";
import { PublicPage } from "./public-page";
const links = [
  ["Terms", "/legal/terms"],
  ["Privacy", "/legal/privacy"],
  ["Risk disclosure", "/legal/risk"],
  ["AML / KYC", "/legal/aml"],
  ["Cookies", "/legal/cookies"],
];
export function LegalPage({
  title,
  description,
  sections,
}: {
  title: string;
  description: string;
  sections: string[][];
}) {
  return (
    <PublicPage eyebrow="Legal & information" title={title} description={description}>
      <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Legal pages" className="flex flex-wrap content-start gap-3 lg:flex-col">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-xl border border-white/10 px-4 py-3 text-sm text-text-secondary hover:border-white/25 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="max-w-3xl space-y-10">
          {sections.map(([heading, text], index) => (
            <section key={heading}>
              <h2 className="text-xl font-semibold">
                <span className="mr-3 text-sm text-[#b8ff00]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {heading}
              </h2>
              <p className="mt-4 leading-8 text-text-secondary">{text}</p>
            </section>
          ))}
        </div>
      </div>
    </PublicPage>
  );
}
