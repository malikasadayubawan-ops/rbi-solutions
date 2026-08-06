"use client";

import type { Country } from "@/types/country";

interface StampProps {
  country: Country;
  className?: string;
}

const label = (kind: Country["programKind"]) =>
  kind === "citizenship" ? "CITIZENSHIP GRANTED" : "RESIDENCY APPROVED";

export default function Stamp({ country, className }: StampProps) {
  const ink = country.accent;
  const id = `stamp-arc-${country.slug}`;

  if (country.stampShape === "circle") {
    return (
      <svg viewBox="0 0 200 200" className={className} aria-hidden>
        <defs>
          <path id={id} d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0" />
        </defs>
        <circle cx="100" cy="100" r="92" fill="none" stroke={ink} strokeWidth="2.5" opacity="0.9" />
        <circle cx="100" cy="100" r="80" fill="none" stroke={ink} strokeWidth="1" opacity="0.6" />
        <text fill={ink} fontSize="12.5" letterSpacing="3" fontFamily="var(--font-mono)">
          <textPath href={`#${id}`} startOffset="2%">
            {label(country.programKind)} • {country.name.toUpperCase()} •
          </textPath>
        </text>
        <text
          x="100"
          y="94"
          textAnchor="middle"
          fill={ink}
          fontSize="15"
          fontFamily="var(--font-display)"
          fontStyle="italic"
        >
          RBI
        </text>
        <text
          x="100"
          y="114"
          textAnchor="middle"
          fill={ink}
          fontSize="9"
          letterSpacing="2"
          fontFamily="var(--font-mono)"
        >
          SOLUTIONS
        </text>
      </svg>
    );
  }

  const clip =
    country.stampShape === "hex"
      ? "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)"
      : country.stampShape === "shield"
        ? "polygon(50% 0%, 100% 15%, 100% 60%, 50% 100%, 0% 60%, 0% 15%)"
        : "none";

  return (
    <div
      className={className}
      style={{
        border: `2.5px solid ${ink}`,
        clipPath: clip !== "none" ? clip : undefined,
        borderRadius: clip === "none" ? 8 : undefined,
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-4 text-center">
        <span
          className="font-display text-sm italic"
          style={{ color: ink }}
        >
          RBI Solutions
        </span>
        <span
          className="font-mono-figures text-[9px] tracking-[0.15em]"
          style={{ color: ink }}
        >
          {label(country.programKind)}
        </span>
      </div>
    </div>
  );
}
