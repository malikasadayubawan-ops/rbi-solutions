import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  );
}

export function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
      <circle cx="17" cy="8.5" r="2.4" />
      <path d="M15.6 13.7c2.7.6 4.9 3 4.9 6.3" />
    </svg>
  );
}

export function CoinsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="9" cy="7" rx="6" ry="3.2" />
      <path d="M3 7v5c0 1.77 2.69 3.2 6 3.2s6-1.43 6-3.2V7" />
      <path d="M3 12v5c0 1.77 2.69 3.2 6 3.2 1.1 0 2.13-.18 3-.5" />
      <ellipse cx="17.5" cy="14" rx="4" ry="2.1" />
      <path d="M13.5 14v3c0 1.16 1.79 2.1 4 2.1s4-.94 4-2.1v-3" />
    </svg>
  );
}

export function AwardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8.5" r="5.5" />
      <path d="M8.3 13.2 6.5 21l5.5-3 5.5 3-1.8-7.8" />
    </svg>
  );
}

export function PlaneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M10.5 20.5 12 17l1.5 3.5M2 12l20-8-8 20-2.5-8.5L2 12Z" />
    </svg>
  );
}

export function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}
