"use client";

import { motion } from "framer-motion";

export default function Consultation() {
  return (
    <section
      id="consultation"
      className="relative overflow-hidden bg-ink px-6 py-32 text-center md:px-14"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, #c6a15b14 0%, transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-2xl"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-gold">By Appointment Only</p>
        <h2 className="mt-6 text-balance font-display text-3xl font-light italic text-parchment md:text-5xl">
          Begin with a private consultation.
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-parchment-dim md:text-base">
          Every engagement starts with a confidential conversation about
          your goals. No obligation, no generic pitch — just a clear view of
          which programs genuinely fit your situation.
        </p>
        <a
          href="mailto:advisory@rbisolutions.com?subject=Private%20Consultation%20Request"
          className="mt-10 inline-block rounded-full bg-gold px-10 py-4 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
        >
          Request a Consultation
        </a>
      </motion.div>
    </section>
  );
}
