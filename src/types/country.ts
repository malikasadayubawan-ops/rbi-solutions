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
}

export interface CompareRow {
  key: keyof Country | "programKind";
  label: string;
}
