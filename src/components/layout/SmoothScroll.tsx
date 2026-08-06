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
    const { ScrollTrigger } = getGsap();

    // Passport cover/hero photos load asynchronously and can shift page
    // layout well after each PassportCard's ScrollTrigger first calculates
    // its "center center" trigger position — without a refresh, those
    // positions go stale and the reveal animation never fires. Refresh once
    // everything (including images) has actually loaded, and again after
    // any late layout shift settles.
    let debounceId: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(debounceId);
      debounceId = setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh);
    }

    const images = Array.from(document.images);
    const pending = images.filter((img) => !img.complete);
    pending.forEach((img) => img.addEventListener("load", refresh, { once: true }));

    const resizeObserver = new ResizeObserver(() => refresh());
    resizeObserver.observe(document.body);

    return () => {
      clearTimeout(debounceId);
      window.removeEventListener("load", refresh);
      pending.forEach((img) => img.removeEventListener("load", refresh));
      resizeObserver.disconnect();
    };
  }, []);

  return <>{children}</>;
}
