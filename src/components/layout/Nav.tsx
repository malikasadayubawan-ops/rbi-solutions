"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "#programs", label: "Programs" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#compare", label: "Compare" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-ink/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="font-display text-lg tracking-[0.08em] text-parchment">
          RBI <span className="text-gold">Solutions</span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-parchment-dim transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#consultation"
          className="hidden rounded-full border border-gold-dim px-5 py-2 text-sm text-gold transition-colors hover:border-gold hover:bg-gold hover:text-ink md:inline-block"
        >
          Book Consultation
        </a>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center text-parchment md:hidden"
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
        <div className="border-t border-line bg-ink px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base text-parchment-dim hover:text-gold"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#consultation"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-gold-dim px-5 py-2 text-center text-sm text-gold"
            >
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
