"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Country } from "@/types/country";
import Stamp from "@/components/passport/Stamp";

interface Props {
  country: Country;
  passportImage?: string;
}

// A static homage to the homepage's passport-flip cards — same cover
// treatment, flag bars, and Stamp component — but deliberately without the
// GSAP ScrollTrigger pin/reveal sequence that PassportCard.tsx uses. That
// mechanism exists to choreograph one card among many in a scrolling stack;
// a program page shows exactly one, on its own route, so a simple
// fade/scale-in on mount reads just as premium without any of that
// stacking-specific complexity (or its mobile viewport-height fragility).
export default function ProgramHeroPassport({ country, passportImage }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto aspect-[5/7] w-full max-w-[380px]"
    >
      {passportImage ? (
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-brand-dim/60 shadow-[0_30px_70px_-30px_rgba(19,26,36,0.45)]">
          <Image
            src={passportImage}
            alt={`${country.name} passport cover`}
            fill
            sizes="380px"
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(10,12,16,0.85) 0%, rgba(10,12,16,0) 30%, rgba(10,12,16,0) 78%, rgba(10,12,16,0.35) 100%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 pt-5 text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/85">
              {country.programKind === "citizenship" ? "Citizenship Dossier" : "Residency Dossier"}
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-0 pb-5 text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white">RBI Solutions</p>
          </div>
        </div>
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-between rounded-xl border border-brand-dim/60 p-8 shadow-[0_30px_70px_-30px_rgba(19,26,36,0.45)]"
          style={{ background: `linear-gradient(155deg, ${country.accent} 0%, #10131a 130%)` }}
        >
          <p className="w-full text-center text-[11px] uppercase tracking-[0.4em] text-white/75">
            {country.programKind === "citizenship" ? "Citizenship Dossier" : "Residency Dossier"}
          </p>
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/40">
            <span className="font-display text-2xl italic text-white">{country.name.slice(0, 1)}</span>
          </div>
          <div className="text-center">
            <p className="font-display text-xl text-white">{country.name}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-white/70">RBI Solutions</p>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute -bottom-5 -right-5 h-24 w-24 md:h-28 md:w-28">
        <Stamp country={country} className="h-full w-full" />
      </div>

      <div className="absolute -left-3 top-8 flex flex-col gap-1.5">
        {country.flagColors.slice(0, 4).map((c, i) => (
          <span key={i} className="h-6 w-1.5 rounded-full shadow-sm" style={{ background: c }} />
        ))}
      </div>
    </motion.div>
  );
}
