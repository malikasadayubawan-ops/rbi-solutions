"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { getCountry } from "@/data/countries";

// Bespoke marketing copy for the three Signature Program cards — distinct
// from each country's general `benefits` array (which serves the fuller
// program page and comparison tool). Dynamic fields (starting amount,
// program page route) are still pulled from the single country-data source
// via `getCountry`, so those two never drift out of sync with the rest of
// the site.
const signature = [
  {
    slug: "brazil",
    label: "Residency by Property Investment",
    startingNote: "Investment from USD 150,000 — North and Northeast Regions",
    startingNoteSecondary: "Investment from USD 200,000 — Major Cities and Markets",
    mainLabel: "Brazilian Residency with a Potential Pathway to Citizenship",
    benefits: ["Family Eligible", "Property Ownership", "Renewable Residency", "Access to Latin America"],
    cta: "Explore Brazil",
    legalNote:
      "Any future citizenship application remains subject to individual eligibility, physical-presence requirements, and government approval.",
    accent: "#1E4A3D",
  },
  {
    slug: "greece",
    label: "European Golden Visa",
    startingNote: "€250,000",
    mainLabel: "Renewable European Residency",
    benefits: ["Schengen Area Access", "Family Eligible", "Property Investment", "Potential Pathway to Citizenship"],
    cta: "Explore Greece",
    legalNote:
      "Qualifying investment thresholds depend on property location and current government rules.",
    accent: "#1B4F72",
  },
  {
    slug: "uae",
    label: "UAE Golden Visa",
    displayName: "Dubai",
    startingNote: "AED 2 Million",
    mainLabel: "10-Year Renewable Residency",
    benefits: ["No Minimum Stay Requirement", "Family Sponsorship", "Property Investment", "Global Business Hub"],
    cta: "Explore Dubai",
    accent: "#145A46",
  },
];

export default function SignaturePrograms() {
  return (
    <section id="programs" className="relative bg-paper px-6 py-28 md:px-14 scroll-mt-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-brand">Our Signature Programs</p>
        <h2 className="mt-6 text-balance font-display text-3xl font-light italic text-ink md:text-5xl">
          Our Signature Programs
        </h2>
        <p className="mt-6 text-sm text-ink-dim md:text-base">
          Three carefully selected pathways for investors and families seeking
          residency, mobility and a more secure international future.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
        {signature.map((s, i) => {
          const country = getCountry(s.slug);
          if (!country) return null;
          return (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-[0_30px_70px_-35px_rgba(19,26,36,0.3)] transition-transform duration-500 hover:-translate-y-1.5"
            >
              <div
                className="relative flex h-40 items-end p-6"
                style={{ background: `linear-gradient(155deg, ${s.accent} 0%, #10131a 130%)` }}
              >
                <p className="font-display text-3xl italic text-white">
                  {s.displayName ?? country.name}
                </p>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-brand">{s.label}</p>

                <div className="mt-4">
                  <p className="font-mono-figures text-2xl text-ink">{s.startingNote}</p>
                  {s.startingNoteSecondary && (
                    <p className="mt-1 font-mono-figures text-sm text-ink-dim">{s.startingNoteSecondary}</p>
                  )}
                </div>

                <p className="mt-4 inline-flex w-fit items-center rounded-full bg-brand/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.1em] text-brand">
                  {s.mainLabel}
                </p>

                <ul className="mt-6 flex flex-col gap-2.5">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-ink-dim">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-brand" />
                      {b}
                    </li>
                  ))}
                </ul>

                {s.legalNote && (
                  <p className="mt-5 text-[11px] italic leading-snug text-ink-dim/70">{s.legalNote}</p>
                )}

                <div className="mt-auto pt-7">
                  <Button href={country.programPagePath} variant="solid" size="md" className="w-full justify-center">
                    {s.cta}
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
