"use client";

import { useMemo, useState } from "react";
import { countries } from "@/data/countries";
import { offices } from "@/data/offices";
import { coordinates, latLonToXY } from "@/data/geo";
import { continents } from "@/data/continents";

function scrollToCountry(slug: string) {
  document.getElementById(`country-${slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Rounded to 2dp so SSR and client hydration produce byte-identical strings
// — trig functions can differ in their last floating-point digit between
// server (Node/V8) and browser (V8) builds, which otherwise trips React's
// strict hydration match even though the visual difference is sub-pixel.
const round2 = (n: number) => Math.round(n * 100) / 100;

// Deterministic pseudo-random dot scatter within an ellipse — no Math.random
// (stays identical across renders/SSR), just enough irregularity to read as
// an organic landmass rather than a perfect ellipse outline.
function generateDots(cx: number, cy: number, rx: number, ry: number, count: number) {
  const dots: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const a = (i * 137.508 * Math.PI) / 180; // golden-angle spiral
    const r = Math.sqrt((i + 0.5) / count);
    const jitterX = Math.sin(i * 12.9898) * 0.06;
    const jitterY = Math.cos(i * 78.233) * 0.06;
    const x = cx + (r + jitterX) * rx * Math.cos(a);
    const y = cy + (r + jitterY) * ry * Math.sin(a);
    dots.push([round2(x), round2(y)]);
  }
  return dots;
}

export default function WorldMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  const dots = useMemo(
    () => continents.flatMap((c) => generateDots(c.cx, c.cy, c.rx, c.ry, 130)),
    [],
  );

  return (
    <section className="relative overflow-hidden bg-paper px-6 py-28 md:px-14">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-brand">The World, Illuminated</p>
        <h2 className="mt-6 text-balance font-display text-3xl font-light italic text-ink md:text-5xl">
          Choose your destination on the map
        </h2>
        <p className="mt-6 text-sm text-ink-dim md:text-base">
          Every marker is a program we advise on or a regional office. Hover
          to preview, select to fly there directly.
        </p>
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="relative w-full overflow-hidden rounded-2xl border border-line bg-card-raised shadow-[0_30px_70px_-35px_rgba(19,26,36,0.25)]">
          <svg viewBox="0 0 1000 500" className="h-full w-full" role="img" aria-label="World map of RBI Solutions programs and offices">
            {dots.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={1.6} fill="var(--color-brand-dim)" opacity={0.35} />
            ))}

            {countries.map((c) => {
              const [lat, lon] = coordinates[c.slug];
              const [x, y] = latLonToXY(lat, lon);
              const isHovered = hovered === c.slug;
              return (
                <g
                  key={c.slug}
                  className="cursor-pointer"
                  onMouseEnter={() => setHovered(c.slug)}
                  onMouseLeave={() => setHovered((h) => (h === c.slug ? null : h))}
                  onClick={() => scrollToCountry(c.slug)}
                >
                  <circle cx={x} cy={y} r={isHovered ? 9 : 5} fill="var(--color-brand)" opacity={0.15} className="transition-all duration-300" />
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 5.5 : 3.5}
                    fill="var(--color-brand)"
                    stroke="white"
                    strokeWidth={1.2}
                    className="transition-all duration-300"
                  />
                  {isHovered && (
                    <g className="transition-opacity duration-200">
                      <rect
                        x={x + 10}
                        y={y - 12}
                        width={c.name.length * 6.4 + 14}
                        height={22}
                        rx={6}
                        fill="var(--color-ink)"
                      />
                      <text x={x + 17} y={y + 3} fontSize={11} fill="var(--color-paper)" fontFamily="var(--font-sans)">
                        {c.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {offices.map((office) => {
              const [x, y] = latLonToXY(office.lat, office.lon);
              return (
                <g key={office.city}>
                  <rect
                    x={x - 4}
                    y={y - 4}
                    width={8}
                    height={8}
                    rx={1.5}
                    fill="#0e8262"
                    stroke="white"
                    strokeWidth={1.2}
                    transform={`rotate(45 ${x} ${y})`}
                  />
                  <text
                    x={x}
                    y={y - 12}
                    fontSize={10.5}
                    textAnchor="middle"
                    fill="var(--color-emerald)"
                    fontWeight={600}
                    fontFamily="var(--font-sans)"
                  >
                    {office.city}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-[0.15em] text-ink-dim">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand" /> Program country
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rotate-45 bg-emerald" /> Regional office
          </span>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {countries.map((c) => (
          <button
            key={c.slug}
            onClick={() => scrollToCountry(c.slug)}
            onMouseEnter={() => setHovered(c.slug)}
            onMouseLeave={() => setHovered((h) => (h === c.slug ? null : h))}
            className={`min-h-11 rounded-md border px-3 py-2.5 text-left text-xs transition-colors md:text-sm ${
              hovered === c.slug
                ? "border-brand bg-brand/10 text-brand"
                : "border-line text-ink-dim hover:border-brand-dim hover:text-ink"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </section>
  );
}
