"use client";

import { motion } from "framer-motion";
import { ChecklistIcon, NetworkIcon, SupportIcon, LockIcon } from "@/components/ui/Icons";

const reasons = [
  {
    icon: ChecklistIcon,
    title: "Carefully Selected Programs",
    description:
      "We only advise on programs we understand in depth — chosen for genuine fit, not the widest commission.",
  },
  {
    icon: NetworkIcon,
    title: "International Partner Network",
    description:
      "Local counsel, licensed agents, and government-approved partners across every destination we advise on.",
  },
  {
    icon: SupportIcon,
    title: "End-to-End Application Support",
    description:
      "From the first consultation through documentation, filing, and approval — one point of contact throughout.",
  },
  {
    icon: LockIcon,
    title: "Confidential Client Service",
    description: "Every engagement is handled discreetly, by appointment, with no shared or public case details.",
  },
];

export default function WhyRBISolutions() {
  return (
    <section className="relative bg-card-raised px-6 py-24 md:px-14">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-brand">Why RBI Solutions</p>
        <h2 className="mt-6 text-balance font-display text-3xl font-light italic text-ink md:text-5xl">
          Advisory built on trust.
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brand bg-card">
              <r.icon className="h-5 w-5 text-brand" />
            </div>
            <h3 className="mt-4 font-display text-lg italic text-ink">{r.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">{r.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
