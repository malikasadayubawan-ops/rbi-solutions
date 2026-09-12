import { countriesByCategory } from "@/data/countries";
import type { ProgramCategory } from "@/types/country";
import ProgramCard from "./ProgramCard";

const sections: { category: ProgramCategory; title: string; description: string }[] = [
  {
    category: "citizenship-by-investment",
    title: "Citizenship by Investment",
    description: "A qualifying government-approved contribution or investment, leading to direct citizenship.",
  },
  {
    category: "residency-by-investment",
    title: "Residency by Investment",
    description: "Property, bank deposit or business investment routes to legal residency.",
  },
  {
    category: "golden-visa-pr",
    title: "Golden Visa & Permanent Residency",
    description: "A long-term international base for you and your family.",
  },
  {
    category: "work-business-visa",
    title: "Work & Business Visas",
    description: "Relocation through employment, entrepreneurship, or business activity.",
  },
];

// Replaces the previous homepage full-screen passport sequence (all 15
// countries as consecutive scroll-hijacking sections) with grouped,
// scannable sections — each capped at a moderate grid rather than one
// undifferentiated 15-card wall, per the brief to keep this browsable
// rather than an overcrowded grid. The full passport-visual experience
// still exists, just on each program's own page (see the passport
// components reused there) rather than gating the homepage on all 15.
export default function ProgramsByCategory() {
  return (
    <div className="relative bg-paper px-6 py-8 md:px-14">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-brand">All Programs</p>
        <h2 className="mt-6 text-balance font-display text-3xl font-light italic text-ink md:text-5xl">
          Browse every program by category.
        </h2>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-20">
        {sections.map((s) => {
          const items = countriesByCategory(s.category);
          return (
            <div key={s.category} id={s.category} className="scroll-mt-24">
              <div className="mb-8 flex flex-col gap-2 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="font-display text-2xl italic text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-dim">{s.description}</p>
                </div>
                <p className="font-mono-figures text-xs uppercase tracking-[0.15em] text-brand-dim">
                  {items.length} program{items.length === 1 ? "" : "s"}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((c) => (
                  <ProgramCard key={c.slug} country={c} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
