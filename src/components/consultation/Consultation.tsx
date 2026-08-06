"use client";

import { motion } from "framer-motion";
import { CONTACT_EMAIL } from "@/lib/constants";
import InquiryForm from "./InquiryForm";

export default function Consultation() {
  return (
    <section
      id="consultation"
      className="relative overflow-hidden bg-paper px-6 py-32 text-center md:px-14"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, #2a5c8a14 0%, transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-2xl"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-brand">By Appointment Only</p>
        <h2 className="mt-6 text-balance font-display text-3xl font-light italic text-ink md:text-5xl">
          Begin with a private consultation.
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-ink-dim md:text-base">
          Every engagement starts with a confidential conversation about
          your goals. No obligation, no generic pitch — just a clear view of
          which programs genuinely fit your situation.
        </p>

        <div className="mt-12 rounded-lg border border-line bg-card p-6 text-left shadow-[0_20px_50px_-24px_rgba(19,26,36,0.2)] md:p-10">
          <InquiryForm />
        </div>

        <p className="mt-8 text-sm text-ink-dim">
          Prefer email directly?{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand hover:text-brand-bright">
            {CONTACT_EMAIL}
          </a>
        </p>
      </motion.div>
    </section>
  );
}
