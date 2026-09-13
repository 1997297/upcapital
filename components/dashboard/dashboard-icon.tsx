import type { SVGProps } from "react";

const paths = {
  overview: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  account: "M20 21v-2a7 7 0 0 0-14 0v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  shield: "M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7z M8 12l3 3 5-6",
  support: "M4 13V10a8 8 0 0 1 16 0v3 M4 12H2v7h4v-7z M20 12h2v7h-4v-7z M20 19c0 3-4 3-7 3",
  menu: "M4 6h16 M4 12h16 M4 18h16",
  chevron: "m14 6-6 6 6 6",
  logout: "M9 4H4v16h5 M9 12h12 m-4-4 4 4-4 4",
  chart: "M4 4v16h16 M7 15l4-5 4 3 5-7",
  wallet: "M3 6h17v14H3z M3 6V3h14v3 M16 11h5v5h-5z",
  arrow: "M5 12h14 m-5-5 5 5-5 5",
  allocation: "M12 3v9h9 M9 3.5A9 9 0 1 0 20.5 15",
} as const;
export type DashboardIconName = keyof typeof paths;
export function DashboardIcon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: DashboardIconName }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
