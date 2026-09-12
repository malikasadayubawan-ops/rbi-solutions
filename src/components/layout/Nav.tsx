"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { countriesByCategory } from "@/data/countries";
import type { ProgramCategory } from "@/types/country";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#compare", label: "Compare" },
  { href: "#founder", label: "About Us" },
  { href: "#consultation", label: "Contact" },
];

const megaMenuColumns: { category: ProgramCategory; title: string }[] = [
  { category: "citizenship-by-investment", title: "Citizenship by Investment" },
  { category: "residency-by-investment", title: "Residency by Investment" },
  { category: "golden-visa-pr", title: "Golden Visa & Permanent Residency" },
  { category: "work-business-visa", title: "Work & Business Visas" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const programsWrapRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setSolid(window.scrollY > 40);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click-outside + Escape close the mega-menu, so keyboard/mouse users
  // both get a reliable way to dismiss it beyond just moving the pointer
  // off the trigger (which the onMouseLeave delay below already handles).
  useEffect(() => {
    if (!programsOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!programsWrapRef.current?.contains(e.target as Node)) setProgramsOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProgramsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [programsOpen]);

  // A short delay before closing on mouseleave — moving the cursor from the
  // trigger down into the dropdown panel below it briefly leaves both, and
  // an instant close would make the panel unreachable by mouse.
  const scheduleClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => setProgramsOpen(false), 150);
  };
  const cancelClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "glass shadow-[0_1px_0_0_rgba(19,26,36,0.04),0_8px_30px_-15px_rgba(19,26,36,0.15)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="font-display text-lg tracking-[0.08em] text-ink">
          RBI <span className="text-brand">Solutions</span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <div
            ref={programsWrapRef}
            className="relative"
            onMouseEnter={() => {
              cancelClose();
              setProgramsOpen(true);
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={programsOpen}
              onClick={() => setProgramsOpen((v) => !v)}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                programsOpen ? "text-brand" : "text-ink-dim hover:text-brand"
              }`}
            >
              Programs
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className={`transition-transform duration-200 ${programsOpen ? "rotate-180" : ""}`}
              >
                <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {programsOpen && (
              <div className="glass absolute left-1/2 top-full mt-3 w-[720px] -translate-x-1/2 rounded-2xl border border-line p-8 shadow-[0_30px_70px_-30px_rgba(19,26,36,0.35)]">
                <div className="grid grid-cols-4 gap-8">
                  {megaMenuColumns.map((col) => (
                    <div key={col.category}>
                      <p className="text-[11px] font-medium uppercase leading-snug tracking-[0.14em] text-brand">
                        {col.title}
                      </p>
                      <ul className="mt-4 flex flex-col gap-3">
                        {countriesByCategory(col.category).map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={c.programPagePath}
                              onClick={() => setProgramsOpen(false)}
                              className="text-sm text-ink-dim transition-colors hover:text-brand"
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-dim transition-colors hover:text-brand"
            >
              {l.label}
            </a>
          ))}
        </div>

        <Button
          href="#consultation"
          variant="outline"
          size="sm"
          className="hidden md:inline-flex"
        >
          Book Consultation
        </Button>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="max-h-[calc(100svh-72px)] overflow-y-auto border-t border-line bg-paper px-6 py-6 md:hidden">
          <div className="flex flex-col gap-1">
            <button
              type="button"
              aria-expanded={mobileProgramsOpen}
              onClick={() => setMobileProgramsOpen((v) => !v)}
              className="flex items-center justify-between py-3 text-base text-ink-dim"
            >
              Programs
              <svg
                width="12"
                height="12"
                viewBox="0 0 10 10"
                fill="none"
                className={`transition-transform duration-200 ${mobileProgramsOpen ? "rotate-180" : ""}`}
              >
                <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {mobileProgramsOpen && (
              <div className="flex flex-col gap-5 border-l border-line py-2 pl-4">
                {megaMenuColumns.map((col) => (
                  <div key={col.category}>
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand">
                      {col.title}
                    </p>
                    <ul className="mt-2.5 flex flex-col gap-2.5">
                      {countriesByCategory(col.category).map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={c.programPagePath}
                            onClick={() => {
                              setOpen(false);
                              setMobileProgramsOpen(false);
                            }}
                            className="text-sm text-ink-dim hover:text-brand"
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-t border-line py-3 text-base text-ink-dim hover:text-brand"
              >
                {l.label}
              </a>
            ))}
            <Button
              href="#consultation"
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
              className="mt-4"
            >
              Book Consultation
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
