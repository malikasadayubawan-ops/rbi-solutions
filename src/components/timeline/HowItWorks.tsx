"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Private Consultation",
    body: "A confidential conversation to understand your goals — mobility, tax position, family, and timeline — before any program is proposed.",
  },
  {
    n: "02",
    title: "Program Selection",
    body: "We shortlist the residency or citizenship routes that genuinely fit your profile, weighing investment size against speed, family scope, and lifestyle.",
  },
  {
    n: "03",
    title: "Investment & Documentation",
    body: "We coordinate due diligence, structure the qualifying investment, and prepare every document to government standard — end to end.",
  },
  {
    n: "04",
    title: "Residency Approval",
    body: "Your application is filed, tracked, and defended through to approval — and beyond, with ongoing compliance support.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative bg-paper px-6 py-28 md:px-14"
    >
      <div className="mx-auto mb-20 max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-brand">The Process</p>
        <h2 className="mt-6 text-balance font-display text-3xl font-light italic text-ink md:text-5xl">
          How It Works
        </h2>
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-brand via-brand-dim to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="flex flex-col gap-16 md:gap-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex items-start gap-6 pl-16 md:w-1/2 md:pl-0 ${
                i % 2 === 0 ? "md:pr-14 md:text-right" : "md:ml-auto md:pl-14"
              }`}
            >
              <div
                className={`absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-brand bg-card font-mono-figures text-sm text-brand md:top-0 ${
                  i % 2 === 0 ? "md:-right-6 md:left-auto" : "md:-left-6"
                }`}
              >
                {step.n}
              </div>
              <div>
                <h3 className="font-display text-xl italic text-ink md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-dim md:text-base">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
