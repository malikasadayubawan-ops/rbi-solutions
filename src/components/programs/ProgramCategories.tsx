"use client";

import { motion } from "framer-motion";
import type { ProgramCategory } from "@/types/country";

const categories: { category: ProgramCategory; title: string; description: string }[] = [
  {
    category: "citizenship-by-investment",
    title: "Citizenship by Investment",
    description:
      "Obtain citizenship directly through a qualifying government-approved contribution or investment.",
  },
  {
    category: "residency-by-investment",
    title: "Residency by Investment",
    description:
      "Secure residency through qualifying property, bank deposit or business investment.",
  },
  {
    category: "golden-visa-pr",
    title: "Golden Visa & Permanent Residency",
    description: "Establish a long-term international base for yourself and your family.",
  },
  {
    category: "work-business-visa",
    title: "Work & Business Visas",
    description: "Relocate through employment, entrepreneurship, startup formation or business activity.",
  },
];

function scrollToCategory(category: ProgramCategory) {
  document.getElementById(category)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ProgramCategories() {
  return (
    <section className="relative bg-card-raised px-6 py-24 md:px-14">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-brand">Choose Your Program Type</p>
        <h2 className="mt-6 text-balance font-display text-3xl font-light italic text-ink md:text-5xl">
          Four pathways to a global future.
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => (
          <motion.button
            key={c.category}
            type="button"
            onClick={() => scrollToCategory(c.category)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col rounded-xl border border-line bg-card p-6 text-left transition-all hover:-translate-y-1 hover:border-brand-dim hover:shadow-[0_20px_40px_-24px_rgba(42,92,138,0.35)]"
          >
            <h3 className="font-display text-lg italic text-ink">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-dim">{c.description}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-brand">
              View Programs
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
