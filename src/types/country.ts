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
  /** Per-country call to action shown on its passport. Defaults to the
   * global "Book Consultation" CTA when omitted. */
  cta?: CountryCTA;
  /** Optional per-country legal note shown on the passport itself, in
   * addition to (not instead of) the site-wide footer disclaimer. Use this
   * for programs whose terms are still in flux. */
  legalDisclaimer?: string;
}

export interface CompareRow {
  key: keyof Country | "programKind";
  label: string;
}
