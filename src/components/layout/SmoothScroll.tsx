"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { getGsap } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
