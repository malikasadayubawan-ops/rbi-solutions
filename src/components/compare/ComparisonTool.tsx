"use client";

import { useMemo, useState } from "react";
import { countries } from "@/data/countries";
import { formatFigure } from "@/lib/utils";
import type { Country } from "@/types/country";

const MAX_SELECTED = 4;

function citizenshipPath(country: Country) {
  if (country.programKind === "citizenship") return "Direct — this program grants citizenship";
  const hit = country.benefits.find((b) => /citizenship/i.test(b));
  return hit ?? "Residency only, no direct path";
}

const rows: { label: string; render: (c: Country) => string }[] = [
  {
    label: "Investment",
    render: (c) => formatFigure(c.investmentRoutes[0].amount, c.investmentRoutes[0].currency),
  },
  { label: "Processing Time", render: (c) => c.processingTime },
  {
    label: "Residency",
    render: (c) => (c.programKind === "residency" ? "Granted directly" : "Included"),
  },
  { label: "Citizenship", render: (c) => citizenshipPath(c) },
  { label: "Family", render: (c) => c.familyEligibility.join(", ") },
  { label: "Property", render: (c) => (c.propertyEligible ? "Eligible route" : "Not required") },
  { label: "Business", render: (c) => (c.businessEligible ? "Eligible route" : "Not primary route") },
  { label: "Lifestyle", render: (c) => c.lifestyle },
  { label: "Tax", render: (c) => c.taxNotes },
];

export default function ComparisonTool() {
  const [selected, setSelected] = useState<string[]>([
    "portugal",
    "uae",
    "st-kitts-and-nevis",
  ]);

  const toggle = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_SELECTED) return prev;
      return [...prev, slug];
    });
  };

  const selectedCountries = useMemo(
    () => countries.filter((c) => selected.includes(c.slug)),
    [selected],
  );

  return (
    <section
      id="compare"
      className="relative bg-paper px-6 py-28 md:px-14"
    >
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-brand">Side by Side</p>
        <h2 className="mt-6 text-balance font-display text-3xl font-light italic text-ink md:text-5xl">
          Compare Programs
        </h2>
        <p className="mt-6 text-sm text-ink-dim md:text-base">
          Select up to {MAX_SELECTED} countries to compare investment,
          processing time, and family scope side by side.
        </p>
      </div>

      <div className="mx-auto mb-10 flex max-w-5xl flex-wrap justify-center gap-2">
        {countries.map((c) => {
          const active = selected.includes(c.slug);
          return (
            <button
              key={c.slug}
              onClick={() => toggle(c.slug)}
              aria-pressed={active}
              className={`min-h-11 rounded-full border px-4 py-2 text-xs transition-colors md:text-sm ${
                active
                  ? "border-brand bg-brand text-paper"
                  : "border-line text-ink-dim hover:border-brand-dim hover:text-ink"
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      <div className="mx-auto max-w-6xl overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr>
              <th className="w-40 border-b border-line pb-4 pr-4 text-xs uppercase tracking-[0.2em] text-brand-dim">
                Criteria
              </th>
              {selectedCountries.map((c) => (
                <th
                  key={c.slug}
                  className="border-b border-line px-4 pb-4 font-display text-base italic text-ink md:text-lg"
                >
                  {c.name}
                </th>
              ))}
              {selectedCountries.length === 0 && (
                <th className="border-b border-line px-4 pb-4 text-sm text-ink-dim">
                  Select a country above
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-line/60">
                <td className="py-4 pr-4 text-xs uppercase tracking-[0.15em] text-brand-dim">
                  {row.label}
                </td>
                {selectedCountries.map((c) => (
                  <td
                    key={c.slug}
                    className={`px-4 py-4 text-xs text-ink-dim md:text-sm ${
                      row.label === "Investment" ? "font-mono-figures text-brand-bright" : ""
                    }`}
                  >
                    {row.render(c)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
