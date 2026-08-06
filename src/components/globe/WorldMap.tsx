"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { countries } from "@/data/countries";

const GlobeCanvas = dynamic(() => import("./GlobeCanvas"), { ssr: false });

function scrollToCountry(slug: string) {
  const el = document.getElementById(`country-${slug}`);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function WorldMap() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const handleSelect = (slug: string) => {
    setActiveSlug(slug);
    scrollToCountry(slug);
  };

  return (
    <section
      className="relative overflow-hidden bg-ink px-6 py-28 md:px-14"
    >
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">The World, Illuminated</p>
        <h2 className="mt-6 text-balance font-display text-3xl font-light italic text-parchment md:text-5xl">
          Choose your destination on the map
        </h2>
        <p className="mt-6 text-sm text-parchment-dim md:text-base">
          Every illuminated point is a program we advise on. Select one to
          fly there directly.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="justify-self-center">
          <GlobeCanvas
            interactive
            autoRotate
            showOffices
            activeSlug={activeSlug}
            onSelect={handleSelect}
            className="aspect-square w-full max-w-[560px]"
          />
          <div className="mt-4 flex items-center justify-center gap-6 text-[11px] uppercase tracking-[0.15em] text-parchment-dim">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold" /> Program
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rotate-45 bg-[#d8dfe8]" /> Office
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
          {countries.map((c) => (
            <button
              key={c.slug}
              onClick={() => handleSelect(c.slug)}
              onMouseEnter={() => setActiveSlug(c.slug)}
              className={`min-h-11 rounded-md border px-3 py-2.5 text-left text-xs transition-colors md:text-sm ${
                activeSlug === c.slug
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-line text-parchment-dim hover:border-gold-dim hover:text-parchment"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
