import { countries } from "@/data/countries";
import PassportCard from "./PassportCard";

export default function PassportStory() {
  return (
    <div id="programs" className="relative">
      <div className="relative flex h-[70svh] w-full flex-col items-center justify-center bg-ink px-6 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Seventeen Destinations</p>
        <h2 className="mt-6 max-w-3xl text-balance font-display text-3xl font-light italic text-parchment md:text-5xl">
          Every passport tells a different story.
        </h2>
        <p className="mt-6 max-w-lg text-balance text-sm text-parchment-dim md:text-base">
          Scroll to travel through each program — from Atlantic Europe to the
          Gulf, the Caucasus to the South Pacific.
        </p>
        <div className="mt-10 h-14 w-px bg-gradient-to-b from-gold to-transparent" />
      </div>

      {countries.map((country, i) => (
        <PassportCard
          key={country.slug}
          country={country}
          index={i}
          total={countries.length}
        />
      ))}
    </div>
  );
}
