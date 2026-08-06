"use client";

import { motion, type Variants } from "framer-motion";
import { offices } from "@/data/offices";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function GlobalPresence() {
  return (
    <section
      id="presence"
      className="relative bg-paper px-6 py-28 md:px-14"
    >
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-brand">Strategic Regional Hubs</p>
        <h2 className="mt-6 text-balance font-display text-3xl font-light italic text-ink md:text-5xl">
          Our Global Presence
        </h2>
        <p className="mt-6 text-sm text-ink-dim md:text-base">
          A network of regional hubs, each coordinating with our international
          partners to support clients across their local market and time zone.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {offices.map((office) => (
          <motion.div
            key={office.city}
            variants={item}
            className="group relative overflow-hidden rounded-lg border border-line bg-card p-6 transition-all hover:border-emerald/50 hover:shadow-[0_20px_40px_-24px_rgba(14,130,98,0.35)] hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald" />
              </span>
              <span className="rounded border border-emerald/40 px-1.5 py-0.5 font-mono-figures text-[10px] text-emerald">
                {office.isoCode}
              </span>
            </div>

            <h3 className="mt-4 font-display text-xl italic text-ink">{office.city}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-emerald">
              {office.country}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-dim">{office.blurb}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
