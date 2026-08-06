export type ProgramKind = "residency" | "citizenship";

export type Region =
  | "Americas"
  | "Europe"
  | "Middle East"
  | "Caribbean"
  | "Pacific"
  | "Caucasus";

export interface InvestmentRoute {
  label: string;
  amount: string;
  currency: string;
}

export interface CountryCTA {
  label: string;
  href: string;
}

export interface Country {
  slug: string;
  name: string;
  region: Region;
  programKind: ProgramKind;
  programName: string;
  tagline: string;
  flagColors: string[];
  accent: string;
  investmentRoutes: InvestmentRoute[];
  processingTime: string;
  minStay: string;
  familyEligibility: string[];
  benefits: string[];
  lifestyle: string;
  visaFreeAccess: string;
  taxNotes: string;
  propertyEligible: boolean;
  businessEligible: boolean;
  stampShape: "circle" | "hex" | "square" | "shield";
  scene: "coastal" | "desert" | "alpine" | "island" | "urban";
  /**
   * Path to a real passport cover photo under /public (e.g. "/passports/uk.jpg").
   * When omitted, the card falls back to the generative gradient cover —
   * this is the single switch that lets a country "go live" with real
   * artwork without touching any component code.
   */
  passportImage?: string;
  /**
   * Path to a real hero photo/map for this country under /public. When
   * omitted, falls back to the generative CountryIllustration scene.
   */
  heroImage?: string;
  /** Per-country call to action shown on its passport. Defaults to the
   * global "Book Consultation" CTA when omitted. */
  cta?: CountryCTA;
  /** Optional per-country legal note shown on the passport itself, in
   * addition to (not instead of) the site-wide footer disclaimer. Use this
   * for programs whose terms are still in flux. */
  legalDisclaimer?: string;
  /** RBI Solutions' own advisory/service fee, shown distinctly from the
   * government investment threshold when a program has one (e.g. a
   * recognition-based visa with no government minimum). */
  serviceFee?: InvestmentRoute;
  /** Henley Passport Index-style rank of this country's own passport, where
   * relevant (citizenship outcomes, or residency with a citizenship path).
   * Omitted for residency-only programs where the client never acquires
   * this passport. */
  passportRank?: number;
  /** ISO 3166-1 alpha-3 code, used to look up this country's real outline
   * shape from geographic boundary data for the passport-side map. */
  isoA3?: string;
  /**
   * SVG path "d" data for this country's real geographic outline, sized to
   * `OUTLINE_VIEWBOX` in src/lib/countryOutline.ts. Computed server-side
   * (see PassportStory.tsx) from `isoA3` — never authored by hand — and
   * used as the hero-panel fallback when no `heroImage` is set.
   */
  outlinePath?: string;
}

export interface CompareRow {
  key: keyof Country | "programKind";
  label: string;
}
