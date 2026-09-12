"use client";

import Link from "next/link";
import type { Country } from "@/types/country";
import { ClockIcon, CoinsIcon, UsersIcon } from "@/components/ui/Icons";

interface ProgramCardProps {
  country: Country;
}

// A compact, catalog-style card — deliberately not the full passport-flip
// experience (that lives on the individual program page, and previously
// dominated the homepage as an overcrowded full-screen sequence). It keeps
// the same accent-color and typography language as the passport cards
// (font-display italic names, brand-colored program name, mono figures for
// numbers) so it still reads as part of the same visual family, but shows
// only what a visitor needs to decide whether to click through.
export default function ProgramCard({ country }: ProgramCardProps) {
  return (
    <Link
      href={country.programPagePath}
      className="group flex flex-col rounded-xl border border-line bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-dim hover:shadow-[0_20px_40px_-24px_rgba(19,26,36,0.25)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink-dim">{country.region}</p>
          <h3 className="mt-1 font-display text-xl italic text-ink">{country.name}</h3>
          <p className="mt-0.5 text-sm text-brand">{country.programName}</p>
        </div>
        <div className="flex shrink-0 gap-1 pt-1">
          {country.flagColors.slice(0, 3).map((c, i) => (
            <span key={i} className="h-6 w-1.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
      </div>

      <p
        className="mt-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em]"
        style={{ background: `${country.accent}14`, color: country.accent }}
      >
        {country.outcomeLabel}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2 border-y border-line py-4 text-xs">
        <div className="flex flex-col items-start gap-1">
          <CoinsIcon className="h-3.5 w-3.5 text-brand-dim" />
          <span className="text-ink-dim">Starting</span>
          <span className="font-mono-figures text-ink">{country.startingAmount}</span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <ClockIcon className="h-3.5 w-3.5 text-brand-dim" />
          <span className="text-ink-dim">Processing</span>
          <span className="font-mono-figures text-ink">{country.processingTime}</span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <UsersIcon className="h-3.5 w-3.5 text-brand-dim" />
          <span className="text-ink-dim">Family</span>
          <span className="text-ink">{country.familyEligibility.length} eligible</span>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {country.benefits.slice(0, 3).map((b) => (
          <li key={b} className="flex items-start gap-2 text-xs text-ink-dim">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-brand" />
            {b}
          </li>
        ))}
      </ul>

      <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-brand">
        Explore Program
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
