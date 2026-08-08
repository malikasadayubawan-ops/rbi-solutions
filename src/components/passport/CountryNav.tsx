"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { countries } from "@/data/countries";

// Minimum scroll delta (px) before flipping hide/show — filters out
// sub-pixel/momentum jitter so the bar doesn't flicker on tiny scrolls.
const SCROLL_DELTA_THRESHOLD = 8;
// A smooth scrollIntoView() fires the same 'scroll' events a manual
// downward scroll would, which would otherwise hide the very bar the user
// just clicked. Suppressed for a window generously longer than the jump
// itself, then normal auto-hide resumes for real user scrolling.
const PROGRAMMATIC_SCROLL_SUPPRESS_MS = 1000;

function scrollToCountry(slug: string) {
  document.getElementById(`country-${slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function CountryNav() {
  const [active, setActive] = useState<string | null>(null);
  // Whether any passport card is currently in the viewport — the proxy for
  // "user is inside the Passport Programs section", deliberately excluding
  // the intro copy above the cards so the bar only appears once there's
  // actually something to navigate between.
  const [regionVisible, setRegionVisible] = useState(false);
  // Independent of regionVisible: within the region, the bar additionally
  // hides while the user is actively scrolling down (so it never sits
  // fixed over a passport's content) and reappears the moment they scroll
  // back up — a standard auto-hiding header pattern.
  const [hiddenByScroll, setHiddenByScroll] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const suppressHideUntilRef = useRef(0);

  useEffect(() => {
    const sections = countries
      .map((c) => document.getElementById(`country-${c.slug}`))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    const activeObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id.replace("country-", ""));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((el) => activeObserver.observe(el));

    // A separate observer on a single sentinel spanning every card (but
    // not the intro copy above them) drives show/hide — simpler and more
    // reliable than unioning per-card entries, which could drift out of
    // sync across a single large programmatic scroll jump.
    let visibilityObserver: IntersectionObserver | undefined;
    const region = document.getElementById("passport-cards");
    if (region) {
      visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          setRegionVisible(entry.isIntersecting);
          // Always resurface the bar the instant the section becomes
          // relevant again, rather than carrying over whatever scroll
          // direction it last hid on from a previous visit — matches
          // "visible normally" the moment there's something to navigate.
          if (entry.isIntersecting) {
            setHiddenByScroll(false);
            lastScrollYRef.current = window.scrollY;
          }
        },
        { threshold: 0 },
      );
      visibilityObserver.observe(region);
    }

    lastScrollYRef.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastScrollYRef.current;
        if (Math.abs(delta) > SCROLL_DELTA_THRESHOLD) {
          if (Date.now() >= suppressHideUntilRef.current) {
            setHiddenByScroll(delta > 0);
          }
          lastScrollYRef.current = y;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      activeObserver.disconnect();
      visibilityObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const visible = regionVisible && !hiddenByScroll;

  const handleNavClick = useCallback((slug: string) => {
    setHiddenByScroll(false);
    suppressHideUntilRef.current = Date.now() + PROGRAMMATIC_SCROLL_SUPPRESS_MS;
    scrollToCountry(slug);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`nav-fade sticky top-[64px] z-40 border-b border-line bg-paper/90 backdrop-blur-md md:top-[76px] ${
        visible ? "nav-fade-visible" : ""
      }`}
    >
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
              onClick={() => handleNavClick(c.slug)}
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
