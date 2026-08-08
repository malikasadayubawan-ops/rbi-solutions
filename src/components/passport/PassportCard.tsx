"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Country } from "@/types/country";
import { getGsap } from "@/lib/gsap";
import { formatFigure } from "@/lib/utils";
import CountryIllustration from "./CountryIllustration";
import CountryOutlineMap from "./CountryOutlineMap";
import Stamp from "./Stamp";
import {
  ClockIcon,
  UsersIcon,
  CoinsIcon,
  AwardIcon,
  PlaneIcon,
  MapPinIcon,
} from "@/components/ui/Icons";

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
      gsap.set(passportRef.current, { xPercent: 14, opacity: 0, rotateZ: 2, scale: 0.96 });
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

      // The passport is deliberately NOT pinned (see note above) — it
      // keeps scrolling with the page for the whole time it's "open", so
      // its on-screen position drifts continuously rather than holding
      // still. That makes the size of the open *window* (start→end) the
      // real lever for "never cut off at top": too wide, like the
      // previous "center top" (~half a viewport of continued scroll), and
      // a normal scroll gesture carries the still-"open" card's top edge
      // well past the fixed header before the reveal reverses.
      //
      // Both bounds are recomputed on every ScrollTrigger.refresh() (load,
      // resize, and the image-load refresh in SmoothScroll.tsx) from the
      // actual viewport height, the passport's own CSS-derived size, and
      // the fixed header's real height — never a fixed pixel guess, so it
      // stays correct from small laptops to large monitors.
      //
      // - `start` fires a touch before mathematical center (offset by
      //   half the header height) so the settled position already clears
      //   the header, rather than landing flush against it.
      // - `end` is capped so continued scrolling can only carry the card
      //   up by however much headroom it actually has (plus that same
      //   start bias) before the reveal closes again — the card is
      //   guaranteed to still be fully below the header for the entire
      //   time it reads as "open".
      const headerHeight = () =>
        document.querySelector("header")?.getBoundingClientRect().height ?? 0;

      // Mirrors the CSS `width: min(88vw, calc(78svh * 5/7), 500px)` /
      // `aspect-[5/7]` on passportRef — computed from viewport dimensions
      // rather than measured off the element, since GSAP's rest-state
      // `scale: 0.96` would otherwise shrink the *visual* bounding box
      // slightly below the card's true CSS size.
      const passportHeight = () => {
        const width = Math.min(
          0.88 * window.innerWidth,
          ((0.78 * window.innerHeight) * 5) / 7,
          500,
        );
        return (width * 7) / 5;
      };

      const toCenterOffset = (px: number) => {
        const rounded = Math.round(px);
        return `center center${rounded >= 0 ? "+=" : "-="}${Math.abs(rounded)}`;
      };

      ScrollTrigger.create({
        trigger: section,
        start: () => toCenterOffset(-headerHeight() / 2),
        end: () => {
          const bias = headerHeight() / 2;
          const topMargin = (window.innerHeight - passportHeight()) / 2;
          const topSlack = Math.max(0, topMargin - headerHeight());
          const activeWindow = Math.max(24, (topSlack + bias) * 0.85);
          return toCenterOffset(activeWindow - bias);
        },
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

  const cta = country.cta ?? DEFAULT_CTA;

  return (
    <section
      ref={sectionRef}
      id={`country-${country.slug}`}
      className="relative flex min-h-[100svh] w-full scroll-mt-16 flex-col justify-center overflow-hidden bg-paper py-10 md:scroll-mt-[76px] md:py-16"
      style={{ contentVisibility: "auto", containIntrinsicSize: "100vw 100svh" }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 pb-6 md:px-14 md:pb-8">
        <div>
          <p className="font-mono-figures text-xs text-brand-dim">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-ink-dim">
            {country.region}
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-brand">
          {country.programKind === "citizenship" ? "Citizenship" : "Residency"}
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-2 lg:gap-10 md:px-14">
        {/* Passport */}
        <div
          className="relative mx-auto flex w-full justify-center lg:order-1"
          style={{ perspective: "1800px" }}
        >
          {/*
            Fits inside BOTH a viewport-height budget and a viewport-width
            budget at once, whichever is tighter — not just a height clamp,
            which on narrow/short devices (most phones) let the card get
            taller than it was wide enough to hold, overflowing sideways.
            calc(72svh * 5/7) converts the height budget into its equivalent
            width via the fixed aspect ratio, then min() picks whichever of
            the three caps actually binds; aspect-ratio derives the height
            from that resolved width, so it's automatically correct on both
            axes with no breakpoint ladder needed.
          */}
          <div
            ref={passportRef}
            className="relative aspect-[5/7]"
            style={{ width: "min(88vw, calc(78svh * 5 / 7), 500px)" }}
          >
            {/* inside spread */}
            <div
              ref={insideRef}
              className="passport-scroll absolute inset-0 flex flex-col justify-between gap-1.5 overflow-y-auto rounded-lg border border-line bg-card p-4 shadow-[0_24px_60px_-24px_rgba(19,26,36,0.25)] md:p-5"
            >
              <div className="reveal-item flex items-start justify-between">
                <div>
                  <h3 className="font-display text-2xl italic text-ink md:text-3xl">
                    {country.name}
                  </h3>
                  <p className="mt-1 text-sm text-brand">{country.programName}</p>
                </div>
                <div className="flex gap-1">
                  {country.flagColors.slice(0, 4).map((c, i) => (
                    <span key={i} className="h-8 w-1.5 rounded-full" style={{ background: c }} />
                  ))}
                </div>
              </div>

              <p className="reveal-item text-sm italic text-ink-dim">
                {country.tagline}
              </p>

              <div className="reveal-item brand-rule" />

              <div className="reveal-item grid grid-cols-2 gap-x-4 gap-y-2 text-xs md:text-sm">
                {country.investmentRoutes.slice(0, 3).map((route) => (
                  <div key={route.label} className="flex items-start gap-1.5">
                    <CoinsIcon className="mt-0.5 h-3 w-3 shrink-0 text-brand-dim" />
                    <div>
                      <p className="text-ink-dim">{route.label}</p>
                      <p className="font-mono-figures text-brand-bright">
                        {formatFigure(route.amount, route.currency)}
                      </p>
                    </div>
                  </div>
                ))}
                {country.serviceFee && (
                  <div className="flex items-start gap-1.5">
                    <CoinsIcon className="mt-0.5 h-3 w-3 shrink-0 text-emerald" />
                    <div>
                      <p className="text-ink-dim">{country.serviceFee.label}</p>
                      <p className="font-mono-figures text-emerald">
                        {formatFigure(country.serviceFee.amount, country.serviceFee.currency)}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-1.5">
                  <ClockIcon className="mt-0.5 h-3 w-3 shrink-0 text-brand-dim" />
                  <div>
                    <p className="text-ink-dim">Processing time</p>
                    <p className="font-mono-figures text-ink">{country.processingTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <MapPinIcon className="mt-0.5 h-3 w-3 shrink-0 text-brand-dim" />
                  <div>
                    <p className="text-ink-dim">Minimum stay</p>
                    <p className="font-mono-figures text-ink">{country.minStay}</p>
                  </div>
                </div>
              </div>

              <div className="reveal-item">
                <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-brand-dim">
                  <UsersIcon className="h-3.5 w-3.5" /> Family Eligibility
                </p>
                <p className="mt-1 text-xs text-ink-dim md:text-sm">
                  {country.familyEligibility.join(" · ")}
                </p>
              </div>

              {(country.passportRank || country.visaFreeAccess) && (
                <div className="reveal-item flex flex-col gap-1 rounded-md bg-card-raised p-2 text-xs md:text-sm">
                  {country.passportRank && (
                    <div className="flex items-center gap-1.5">
                      <AwardIcon className="h-3.5 w-3.5 shrink-0 text-brand" />
                      <span className="text-ink-dim">Passport rank</span>
                      <span className="font-mono-figures text-ink">#{country.passportRank}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-1.5">
                    <PlaneIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                    <p className="text-ink">{country.visaFreeAccess}</p>
                  </div>
                </div>
              )}

              <ul className="reveal-item space-y-1">
                {country.benefits.slice(0, 2).map((b) => (
                  <li key={b} className="flex gap-2 text-xs text-ink-dim md:text-sm">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="reveal-item flex flex-col items-start gap-2 pr-16">
                <a
                  href={cta.href}
                  className="text-xs font-medium text-brand underline decoration-brand-dim underline-offset-4 transition-colors hover:text-brand-bright md:text-sm"
                >
                  {cta.label} →
                </a>
                {country.legalDisclaimer && (
                  <p className="text-[10px] italic leading-snug text-ink-dim/70">
                    {country.legalDisclaimer}
                  </p>
                )}
              </div>
            </div>

            {/*
              A sibling of the scrollable inside-spread div, not a
              descendant — its GSAP rest state (scale: 1.8, invisible) still
              produces a large post-transform visual footprint, and Chrome
              folds a scrolling container's descendants' post-transform
              bounds into its scrollHeight even while opacity: 0. Sitting
              outside insideRef keeps that phantom size from ever inflating
              its scrollable area.
            */}
            <div
              ref={stampRef}
              className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 md:h-28 md:w-28"
            >
              <Stamp country={country} className="h-full w-full" />
            </div>

            {/* cover */}
            <div
              ref={coverRef}
              className="absolute inset-0 origin-left rounded-lg"
              style={{ transformStyle: "preserve-3d" }}
            >
              {country.passportImage ? (
                <div
                  className="absolute inset-0 overflow-hidden rounded-lg border border-brand-dim/60 shadow-[0_20px_50px_-20px_rgba(19,26,36,0.4)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Image
                    src={country.passportImage}
                    alt={`${country.name} passport cover`}
                    fill
                    sizes="(max-width: 768px) 340px, 420px"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(10,12,16,0.85) 0%, rgba(10,12,16,0) 30%, rgba(10,12,16,0) 78%, rgba(10,12,16,0.35) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 top-0 pt-4 text-center">
                    <p className="text-[9px] uppercase tracking-[0.35em] text-white/85">
                      {country.programKind === "citizenship"
                        ? "Citizenship Dossier"
                        : "Residency Dossier"}
                    </p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 pb-4 text-center">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white">
                      RBI Solutions
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-between rounded-lg border border-brand-dim/60 p-7 shadow-[0_20px_50px_-20px_rgba(19,26,36,0.4)]"
                  style={{
                    background: `linear-gradient(155deg, ${country.accent} 0%, #10131a 120%)`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="w-full text-center">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/75">
                      {country.programKind === "citizenship"
                        ? "Citizenship Dossier"
                        : "Residency Dossier"}
                    </p>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 md:h-20 md:w-20">
                    <span className="font-display text-xl italic text-white md:text-2xl">
                      {country.name.slice(0, 1)}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-lg text-white md:text-xl">{country.name}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-white/70">
                      RBI Solutions
                    </p>
                  </div>
                </div>
              )}

              <div
                className="absolute inset-0 rounded-lg border border-brand-dim/40"
                style={{
                  background: "linear-gradient(200deg, #1c2027 0%, #0f1116 100%)",
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6">
                  <span className="h-px w-16 bg-white/30" />
                  <p className="text-center text-[10px] uppercase tracking-[0.3em] text-white/70">
                    Prepared exclusively for
                    <br />
                    discerning applicants
                  </p>
                  <span className="h-px w-16 bg-white/30" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero image / map panel */}
        <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-2xl border border-line shadow-[0_30px_70px_-30px_rgba(19,26,36,0.3)] lg:order-2">
          {country.heroImage ? (
            <Image
              src={country.heroImage}
              alt={`${country.name} — RBI Solutions`}
              fill
              sizes="(max-width: 1024px) 560px, 50vw"
              className="object-cover"
            />
          ) : country.outlinePath ? (
            <CountryOutlineMap path={country.outlinePath} name={country.name} />
          ) : (
            <CountryIllustration scene={country.scene} accent={country.accent} />
          )}
        </div>
      </div>
    </section>
  );
}
