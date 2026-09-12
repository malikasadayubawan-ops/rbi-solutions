export type ProgramKind = "residency" | "citizenship";

/**
 * Marketing/navigation grouping — orthogonal to `programKind`. `programKind`
 * answers "what legal outcome does this program grant" (drives labels like
 * "Citizenship Dossier" vs "Residency Dossier" and the comparison tool's
 * citizenship-path logic); `category` answers "which browsing bucket does a
 * visitor find this under" (drives the mega-menu, the homepage category
 * sections, and program-page URL grouping). A residency-kind program like
 * the UAE Golden Visa sits in the "golden-visa-pr" category, not
 * "residency-by-investment" — the split exists because visitors browse by
 * marketing category, not legal mechanism.
 */
export type ProgramCategory =
  | "citizenship-by-investment"
  | "residency-by-investment"
  | "golden-visa-pr"
  | "work-business-visa";

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
  /** Optional longer explanation shown beneath the label/amount on the
   * program page — for a route whose figure needs context to avoid
   * misrepresentation (e.g. clarifying an estimated package cost is not a
   * property price, or that a USD figure is a converted marketing point). */
  description?: string;
  /** Optional bullet list shown under the description — e.g. named example
   * cities/markets, or an itemized fee breakdown. */
  details?: string[];
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
  /** Marketing/navigation bucket — see `ProgramCategory` doc comment for why
   * this is separate from `programKind`. Drives the mega-menu, the
   * homepage's "All Programs by Category" grouping, and which URL prefix a
   * program page falls under (though the prefix itself is always taken from
   * `programPagePath`, never derived from this field — see its doc comment). */
  category: ProgramCategory;
  /** Optional finer-grained label shown under the category heading on
   * program pages/cards (e.g. "Caribbean Citizenship"). Purely descriptive —
   * nothing keys off its value. */
  subcategory?: string;
  /** Marks this as one of the homepage's "Our Signature Programs" — exactly
   * three should be true at any time (Brazil, Greece, UAE per current
   * approval). */
  featured?: boolean;
  /** Sort position among featured programs only (1 = shown first). Ignored
   * when `featured` is false/undefined. */
  featuredOrder?: number;
  /** The prominent "what this leads to" label shown on cards and the
   * program page — distinct from `programName` (which is the *route in*).
   * E.g. Grenada's programName is "Citizenship by Investment" but its
   * outcomeLabel is "Direct Citizenship"; Brazil's is "Pathway to
   * Citizenship". Never state citizenship as guaranteed for a
   * residency-kind program — use "subject to eligibility" phrasing. */
  outcomeLabel: string;
  /** Whether/how this program leads toward citizenship, shown on the
   * program page's dedicated "Pathway to Citizenship" section. Omitted for
   * citizenship-kind programs (the outcome is direct, no separate pathway
   * to describe) and for programs with no citizenship pathway at all. */
  pathwayToCitizenship?: string;
  /** Short descriptor of the immigration status itself, e.g. "10-Year
   * Renewable Residency", "Citizenship (by investment)", "Sponsored Work
   * Visa". Shown on the program page; distinct from `outcomeLabel`, which
   * is the marketing-facing headline rather than the formal status name. */
  residenceType: string;
  /** Marketing-facing "starting from" figure shown on cards, e.g. "USD
   * 150,000" or "Contact Us" for programs without a confirmed public
   * figure. Always derived from real `investmentRoutes`/`serviceFee` data
   * already on the record — never a number invented independently of it. */
  startingAmount: string;
  /** Canonical route to this program's individual page, e.g.
   * "/citizenship/grenada". Explicit per-record (not derived from
   * `category`) because categories don't map 1:1 onto URL prefixes — Work &
   * Business Visas splits across /work-visas and /business-visas. */
  programPagePath: string;
  /** Sort position within this program's `category` group on the homepage
   * and in the mega-menu (1 = shown first). */
  displayOrder: number;
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
