"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { getGsap } from "@/lib/gsap";

const GlobeCanvas = dynamic(() => import("@/components/globe/GlobeCanvas"), {
  ssr: false,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const globeWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.to(globeWrapRef.current, {
        yPercent: 12,
        opacity: 0.35,
        scale: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-ink"
    >
      <div
        ref={globeWrapRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <GlobeCanvas
          autoRotate
          className="h-[130vw] w-[130vw] max-h-[900px] max-w-[900px] opacity-90 md:h-[70vw] md:w-[70vw]"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, #0b0d10 78%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-xs uppercase tracking-[0.35em] text-gold"
        >
          Investment Migration Advisory
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance font-display text-4xl font-light leading-[1.1] text-parchment sm:text-6xl md:text-7xl"
        >
          Global Residency &amp;
          <br />
          <span className="italic text-gold">Citizenship</span> Advisory
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-8 max-w-xl text-balance text-base leading-relaxed text-parchment-dim md:text-lg"
        >
          Helping investors and families secure international residency
          through carefully selected investment and immigration programs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#programs"
            className="rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
          >
            Explore Programs
          </a>
          <a
            href="#consultation"
            className="rounded-full border border-gold-dim px-8 py-3.5 text-sm text-parchment transition-colors hover:border-gold hover:text-gold"
          >
            Book Consultation
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="mx-auto h-10 w-px bg-gradient-to-b from-gold to-transparent" />
        <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-parchment-dim">
          Scroll
        </p>
      </motion.div>
    </section>
  );
}
