"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { countries } from "@/data/countries";
import type Lenis from "lenis";

const GlobeCanvas = dynamic(() => import("./GlobeCanvas"), { ssr: false });

function scrollToCountry(slug: string) {
  const el = document.getElementById(`country-${slug}`);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function WorldMap() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const handleSelect = (slug: string) => {
    setActiveSlug(slug);
    scrollToCountry(slug);
  };

  return (
    <section className="relative overflow-hidden bg-ink px-6 py-28 md:px-14">
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
        <GlobeCanvas
          interactive
          autoRotate
          activeSlug={activeSlug}
          onSelect={handleSelect}
          className="aspect-square w-full max-w-[560px] justify-self-center"
        />

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
