"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { founder } from "@/data/founder";

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const initials = founder.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <section
      id="founder"
      ref={sectionRef}
      className="relative bg-paper px-6 py-28 md:px-14"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16"
      >
        <div className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-lg border border-brand-dim/50 shadow-[0_30px_70px_-25px_rgba(19,26,36,0.3)]">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <motion.div style={{ y: portraitY }} className="absolute inset-[-6%]">
              {founder.portraitSrc ? (
                <Image
                  src={founder.portraitSrc}
                  alt={`${founder.name}, ${founder.title} of RBI Solutions`}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{
                    background: "linear-gradient(155deg, #eef1f5 0%, #dde6ed 100%)",
                  }}
                >
                  <span className="font-display text-6xl italic text-brand">
                    {initials}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <div className="text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.35em] text-brand">Leadership</p>
          <h2 className="mt-6 text-balance font-display text-3xl font-light italic text-ink md:text-5xl">
            Meet the Founder
          </h2>

          <div className="brand-rule mx-auto mt-8 max-w-[160px] md:mx-0" />

          <p className="mt-8 font-display text-3xl italic text-brand md:text-4xl">
            {founder.name}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-brand-dim">
            {founder.title}
          </p>

          <p className="mt-6 text-sm leading-relaxed text-ink-dim md:text-base">
            {founder.bio}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
