"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { getGsap } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import HeroWorldMap from "./HeroWorldMap";

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
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-paper"
    >
      {/*
        Two separate nodes on purpose: GSAP's scroll-scrubbed parallax and
        Framer's one-shot entrance fade both animate `opacity` via inline
        styles, and letting them share a single element means whichever
        library last wrote `style.opacity` wins — at rest that was GSAP's
        captured scroll-start value (0), permanently hiding the map.
      */}
      <div ref={globeWrapRef} className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="aspect-[2/1] w-[145vw] max-w-[1500px] md:w-[92vw]"
        >
          <HeroWorldMap />
        </motion.div>
      </div>

      {/*
        Inverted from a typical vignette: solid near the center (where the
        headline sits, so text stays crisp against a flat backdrop) fading
        to transparent toward the frame edges, where the map reads clearly
        as ambient context rather than a wash directly under the copy.
      */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 58% at center, #f7f8fa 0%, #f7f8fa 40%, transparent 82%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-xs uppercase tracking-[0.35em] text-brand"
        >
          Investment Migration Advisory
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance font-display text-4xl font-light leading-[1.1] text-ink sm:text-6xl md:text-7xl"
        >
          Global Residency &amp;
          <br />
          <span className="italic text-brand">Citizenship</span> Advisory
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-8 max-w-xl text-balance text-base leading-relaxed text-ink-dim md:text-lg"
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
          <Button href="#programs" variant="solid" size="md">
            Explore Programs
          </Button>
          <Button href="#consultation" variant="outline" size="md">
            Book Consultation
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="mx-auto h-10 w-px bg-gradient-to-b from-brand to-transparent" />
        <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-ink-dim">
          Scroll
        </p>
      </motion.div>
    </section>
  );
}
