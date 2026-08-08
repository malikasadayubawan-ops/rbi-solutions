import { countries } from "@/data/countries";
import { detectImage } from "@/lib/detectImage";
import { getCountryOutlinePath } from "@/lib/countryOutline";
import PassportCard from "./PassportCard";
import CountryNav from "./CountryNav";

export default function PassportStory() {
  // Server-side only: real files under /public/passports and /public/heroes
  // automatically override the generative placeholders — no data edits.
  // The outline path is likewise computed here (from real boundary data)
  // rather than in the client component, keeping the heavy geo dataset out
  // of the client bundle entirely.
  const resolved = countries.map((country) => ({
    ...country,
    passportImage: country.passportImage ?? detectImage("passports", country.slug),
    heroImage: country.heroImage ?? detectImage("heroes", country.slug),
    outlinePath: country.isoA3 ? getCountryOutlinePath(country.isoA3) : undefined,
  }));

  return (
    <div id="programs" className="relative">
      <div className="relative flex h-[70svh] w-full flex-col items-center justify-center bg-paper px-6 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-brand">
          {countries.length} Destinations
        </p>
        <h2 className="mt-6 max-w-3xl text-balance font-display text-3xl font-light italic text-ink md:text-5xl">
          Every passport tells a different story.
        </h2>
        <p className="mt-6 max-w-lg text-balance text-sm text-ink-dim md:text-base">
          Scroll to travel through each program — from Atlantic Europe to the
          Gulf, the Caucasus to the South Pacific.
        </p>
        <div className="mt-10 h-14 w-px bg-gradient-to-b from-brand to-transparent" />
      </div>

      {/*
        A single sentinel spanning every passport card (but not the intro
        copy above it) — CountryNav observes this one element to decide
        whether it's inside the Passport Programs section, instead of
        unioning per-card IntersectionObserver entries, which proved
        unreliable across large programmatic scroll jumps.
      */}
      <div id="passport-cards">
        <CountryNav />

        {resolved.map((country, i) => (
          <PassportCard
            key={country.slug}
            country={country}
            index={i}
            total={countries.length}
          />
        ))}
      </div>
    </div>
  );
}
