"use client";

import { useMemo } from "react";
import { coordinates, latLonToXY } from "@/data/geo";
import { continents } from "@/data/continents";

// The 15 countries called out for the Hero specifically — a curated subset
// of the full program list (mirrors the interactive World Map section
// further down the page, which shows all destinations plus offices).
const HERO_SLUGS = [
  "brazil",
  "portugal",
  "spain",
  "france",
  "malta",
  "uae",
  "saudi-arabia",
  "oman",
  "united-kingdom",
  "azerbaijan",
  "georgia",
  "dominica",
  "st-kitts-and-nevis",
  "grenada",
  "vanuatu",
];

// Rounded to 2dp so SSR and client hydration produce byte-identical strings
// — see WorldMap.tsx for the full rationale.
const round2 = (n: number) => Math.round(n * 100) / 100;

function generateDots(cx: number, cy: number, rx: number, ry: number, count: number) {
  const dots: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const a = (i * 137.508 * Math.PI) / 180;
    const r = Math.sqrt((i + 0.5) / count);
    const jitterX = Math.sin(i * 12.9898) * 0.06;
    const jitterY = Math.cos(i * 78.233) * 0.06;
    const x = cx + (r + jitterX) * rx * Math.cos(a);
    const y = cy + (r + jitterY) * ry * Math.sin(a);
    dots.push([round2(x), round2(y)]);
  }
  return dots;
}

export default function HeroWorldMap() {
  const dots = useMemo(
    () => continents.flatMap((c) => generateDots(c.cx, c.cy, c.rx, c.ry, 110)),
    [],
  );

  const markers = useMemo(
    () =>
      HERO_SLUGS.map((slug) => {
        const [lat, lon] = coordinates[slug];
        const [x, y] = latLonToXY(lat, lon);
        return { slug, x: round2(x), y: round2(y) };
      }),
    [],
  );

  return (
    <svg
      viewBox="0 0 1000 500"
      className="h-full w-full"
      role="img"
      aria-label="World map highlighting RBI Solutions' program countries"
    >
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.6} fill="var(--color-brand-dim)" opacity={0.5} />
      ))}

      {markers.map(({ slug, x, y }, i) => (
        <g key={slug}>
          <circle cx={x} cy={y} r={10} fill="var(--color-brand)" opacity={0.22}>
            <animate
              attributeName="r"
              values="8;14;8"
              dur="3.2s"
              begin={`${(i * 0.22).toFixed(2)}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0.08;0.3"
              dur="3.2s"
              begin={`${(i * 0.22).toFixed(2)}s`}
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={x} cy={y} r={3.8} fill="var(--color-emerald)" stroke="white" strokeWidth={1.2} />
        </g>
      ))}
    </svg>
  );
}
