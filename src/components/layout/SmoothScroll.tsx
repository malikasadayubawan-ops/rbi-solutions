"use client";

import { useEffect } from "react";
import { getGsap } from "@/lib/gsap";

/**
 * Scrolling is native — no smoothing library. A JS-driven smooth-scroll
 * (Lenis, etc.) adds a small but constant layer of input lag between wheel
 * input and visual response, which reads as "heavy" no matter how short its
 * duration is tuned to. Native scroll is zero-overhead and perfectly synced
 * to the display, which is how Stripe/Linear/Apple actually do it — element
 * reveal animations (GSAP ScrollTrigger) still run on top, decoupled from
 * scroll physics entirely.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    getGsap();
  }, []);

  return <>{children}</>;
}
