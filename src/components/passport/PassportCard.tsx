"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Country } from "@/types/country";
import { getGsap } from "@/lib/gsap";
import { formatFigure } from "@/lib/utils";
import CountryIllustration from "./CountryIllustration";
import Stamp from "./Stamp";

const DEFAULT_CTA = { label: "Request Details", href: "#consultation" };

interface PassportCardProps {
  country: Country;
  index: number;
  total: number;
}

export default function PassportCard({ country, index, total }: PassportCardProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const passportRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const insideRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const items = insideRef.current?.querySelectorAll(".reveal-item");

      gsap.set(coverRef.current, { rotateY: 0 });
      gsap.set(passportRef.current, { xPercent: 22, opacity: 0, rotateZ: 3, scale: 0.95 });
      if (items) gsap.set(items, { opacity: 0, y: 10 });
      gsap.set(stampRef.current, { opacity: 0, scale: 1.8, rotate: -14 });

      const setWillChange = (on: boolean) => {
        const value = on ? "transform" : "auto";
        if (passportRef.current) passportRef.current.style.willChange = value;
        if (coverRef.current) coverRef.current.style.willChange = value;
      };

      // No pin, no scrub: the passport plays a short, fixed-duration reveal
      // once when it enters the viewport, and reverses on the way back up.
      // Scroll speed and animation speed are fully decoupled, so a normal
      // scroll/wheel gesture is never held hostage by the animation.
      const tl = gsap.timeline({
        paused: true,
        onStart: () => setWillChange(true),
        onReverseComplete: () => setWillChange(false),
        onComplete: () => setWillChange(false),
      });

      tl.to(passportRef.current, {
        xPercent: 0,
        opacity: 1,
        rotateZ: 0,
        scale: 1,
        duration: 0.45,
        ease: "power2.out",
      })
        .to(
          coverRef.current,
          { rotateY: -155, duration: 0.5, ease: "power2.inOut" },
          "-=0.2",
        )
        .to(
          items ?? [],
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.03, ease: "power2.out" },
          "-=0.3",
        )
        .to(
          stampRef.current,
          { opacity: 1, scale: 1, rotate: -8, duration: 0.3, ease: "back.out(1.8)" },
          "-=0.1",
        );

      // Stays fully closed while the card is entering the screen; the
      // reveal only begins once the passport is roughly centered (its own
      // center crossing the viewport's center), and it closes again — both
      // if the user continues on to the next country, or scrolls back up.
      ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: "center top",
        toggleActions: "play reverse play reverse",
        animation: tl,
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={`country-${country.slug}`}
      className="relative h-[100svh] w-full overflow-hidden bg-ink"
      style={{ contentVisibility: "auto", containIntrinsicSize: "100vw 100svh" }}
    >
      <CountryIllustration scene={country.scene} accent={country.accent} />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-6 pt-24 md:px-14 md:pt-28">
        <div>
          <p className="font-mono-figures text-xs text-gold-dim">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-parchment-dim">
            {country.region}
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-gold">
          {country.programKind === "citizenship" ? "Citizenship" : "Residency"}
        </p>
      </div>

      <div
        className="relative z-10 flex h-full items-center justify-center px-6"
        style={{ perspective: "1800px" }}
      >
        <div
          ref={passportRef}
          className="relative w-[300px] h-[420px] sm:w-[340px] sm:h-[470px] md:w-[400px] md:h-[560px]"
        >
          {/* inside spread */}
          <div
            ref={insideRef}
            className="absolute inset-0 flex flex-col justify-between rounded-md border border-line bg-card p-6 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.7)] md:p-9"
          >
            <div className="reveal-item flex items-start justify-between">
              <div>
                <h3 className="font-display text-2xl italic text-parchment md:text-3xl">
                  {country.name}
                </h3>
                <p className="mt-1 text-sm text-gold">{country.programName}</p>
              </div>
              <div className="flex gap-1">
                {country.flagColors.slice(0, 4).map((c, i) => (
                  <span key={i} className="h-8 w-1.5 rounded-full" style={{ background: c }} />
                ))}
              </div>
            </div>

            <p className="reveal-item -mt-2 text-sm italic text-parchment-dim">
              {country.tagline}
            </p>

            <div className="reveal-item gold-rule" />

            <div className="reveal-item grid grid-cols-2 gap-x-4 gap-y-3 text-xs md:text-sm">
              {country.investmentRoutes.slice(0, 2).map((route) => (
                <div key={route.label}>
                  <p className="text-parchment-dim">{route.label}</p>
                  <p className="font-mono-figures text-gold-bright">
                    {formatFigure(route.amount, route.currency)}
                  </p>
                </div>
              ))}
              <div>
                <p className="text-parchment-dim">Processing time</p>
                <p className="font-mono-figures text-parchment">{country.processingTime}</p>
              </div>
              <div>
                <p className="text-parchment-dim">Minimum stay</p>
                <p className="font-mono-figures text-parchment">{country.minStay}</p>
              </div>
            </div>

            <div className="reveal-item">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dim">
                Family Eligibility
              </p>
              <p className="mt-1 text-xs text-parchment-dim md:text-sm">
                {country.familyEligibility.join(" · ")}
              </p>
            </div>

            <ul className="reveal-item space-y-1.5">
              {country.benefits.slice(0, 3).map((b) => (
                <li key={b} className="flex gap-2 text-xs text-parchment-dim md:text-sm">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="reveal-item flex flex-col items-start gap-2 pr-16">
              <a
                href={(country.cta ?? DEFAULT_CTA).href}
                className="text-xs font-medium text-gold underline decoration-gold-dim underline-offset-4 transition-colors hover:text-gold-bright md:text-sm"
              >
                {(country.cta ?? DEFAULT_CTA).label} →
              </a>
              {country.legalDisclaimer && (
                <p className="text-[10px] italic leading-snug text-parchment-dim/60">
                  {country.legalDisclaimer}
                </p>
              )}
            </div>

            <div
              ref={stampRef}
              className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 md:h-28 md:w-28"
            >
              <Stamp country={country} className="h-full w-full" />
            </div>
          </div>

          {/* cover */}
          <div
            ref={coverRef}
            className="absolute inset-0 origin-left rounded-md"
            style={{ transformStyle: "preserve-3d" }}
          >
            {country.passportImage ? (
              <div
                className="absolute inset-0 overflow-hidden rounded-md border border-gold-dim/60 shadow-[0_16px_36px_-14px_rgba(0,0,0,0.8)]"
                style={{ backfaceVisibility: "hidden" }}
              >
                <Image
                  src={country.passportImage}
                  alt={`${country.name} passport cover`}
                  fill
                  sizes="(max-width: 768px) 340px, 400px"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(11,13,16,0.85) 0%, rgba(11,13,16,0) 30%, rgba(11,13,16,0) 78%, rgba(11,13,16,0.35) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 top-0 pt-4 text-center">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-parchment/80">
                    {country.programKind === "citizenship"
                      ? "Citizenship Dossier"
                      : "Residency Dossier"}
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 pb-4 text-center">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                    RBI Solutions
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="absolute inset-0 flex flex-col items-center justify-between rounded-md border border-gold-dim/60 p-7 shadow-[0_16px_36px_-14px_rgba(0,0,0,0.8)]"
                style={{
                  background: `linear-gradient(155deg, ${country.accent} 0%, #0e1015 115%)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="w-full text-center">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-parchment/70">
                    {country.programKind === "citizenship"
                      ? "Citizenship Dossier"
                      : "Residency Dossier"}
                  </p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/70 md:h-20 md:w-20">
                  <span className="font-display text-xl italic text-gold md:text-2xl">
                    {country.name.slice(0, 1)}
                  </span>
                </div>
                <div className="text-center">
                  <p className="font-display text-lg text-parchment md:text-xl">{country.name}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                    RBI Solutions
                  </p>
                </div>
              </div>
            )}

            <div
              className="absolute inset-0 rounded-md border border-gold-dim/40"
              style={{
                background: "linear-gradient(200deg, #191d23 0%, #0b0d10 100%)",
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6">
                <span className="h-px w-16 bg-gold-dim" />
                <p className="text-center text-[10px] uppercase tracking-[0.3em] text-parchment-dim">
                  Prepared exclusively for
                  <br />
                  discerning applicants
                </p>
                <span className="h-px w-16 bg-gold-dim" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
