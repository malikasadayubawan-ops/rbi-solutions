"use client";

import { useEffect, useRef, useState } from "react";
import { countries } from "@/data/countries";

function scrollToCountry(slug: string) {
  document.getElementById(`country-${slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function CountryNav() {
  const [active, setActive] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = countries
      .map((c) => document.getElementById(`country-${c.slug}`))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id.replace("country-", ""));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-[64px] z-40 border-b border-line bg-paper/90 backdrop-blur-md md:top-[76px]">
      <div
        ref={railRef}
        className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 md:px-10"
        style={{ scrollbarWidth: "thin" }}
      >
        {countries.map((c) => {
          const isActive = active === c.slug;
          return (
            <button
              key={c.slug}
              onClick={() => scrollToCountry(c.slug)}
              aria-current={isActive ? "true" : undefined}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-all md:text-sm ${
                isActive
                  ? "border-brand bg-brand text-paper shadow-[0_4px_14px_-4px_rgba(42,92,138,0.5)]"
                  : "border-line text-ink-dim hover:border-brand-dim hover:text-ink"
              }`}
            >
              <span className="flex h-3.5 w-3.5 overflow-hidden rounded-full ring-1 ring-black/5">
                {c.flagColors.slice(0, 3).map((color, i) => (
                  <span key={i} className="h-full flex-1" style={{ background: color }} />
                ))}
              </span>
              {c.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
