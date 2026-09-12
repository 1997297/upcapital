import Image from "next/image";
import Link from "next/link";

const groups = [
  {
    title: "Platform",
    links: [
      ["How it works", "/how-it-works"],
      ["Performance", "/performance"],
      ["Technology", "/technology"],
      ["Security", "/security"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
      ["FAQ", "/faq"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Terms", "/legal/terms"],
      ["Privacy", "/legal/privacy"],
      ["Risk disclosure", "/legal/risk"],
      ["AML / KYC", "/legal/aml"],
      ["Cookies", "/legal/cookies"],
    ],
  },
];
export function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="up-container">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image src="/brand/upcapital-mark.png" alt="" width={28} height={28} />
              <span className="text-lg font-extrabold">UPCapital</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-text-secondary">
              Multi-asset strategy access, portfolio intelligence and transparent account reporting.
            </p>
            <a
              href="mailto:hello@upcapital.com"
              className="mt-5 inline-block text-sm text-text-secondary hover:text-white"
            >
              hello@upcapital.com
            </a>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-text-secondary transition hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs leading-6 text-text-secondary md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} UPCAPITAL. All rights reserved.</p>
          <p>Investing involves risk. Capital may be lost.</p>
        </div>
      </div>
    </footer>
  );
}
