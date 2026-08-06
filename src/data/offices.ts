export interface Office {
  city: string;
  country: string;
  /** ISO 3166-1 alpha-2 code, rendered as a coded badge rather than a flag
   * emoji — emoji flags render inconsistently across platforms (Windows in
   * particular often falls back to plain letters), so this is a deliberate,
   * guaranteed-consistent design choice instead of a font-dependent one. */
  isoCode: string;
  lat: number;
  lon: number;
  blurb: string;
}

export const offices: Office[] = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    isoCode: "AE",
    lat: 25.2,
    lon: 55.3,
    blurb: "Coordinating Gulf investment migration programs and regional client relations.",
  },
  {
    city: "São Paulo",
    country: "Brazil",
    isoCode: "BR",
    lat: -23.55,
    lon: -46.63,
    blurb: "Supporting Latin American investors across residency and citizenship pathways.",
  },
  {
    city: "Karachi",
    country: "Pakistan",
    isoCode: "PK",
    lat: 24.86,
    lon: 67.01,
    blurb: "Advising South Asian families on global mobility and investment structuring.",
  },
  {
    city: "London",
    country: "United Kingdom",
    isoCode: "GB",
    lat: 51.5,
    lon: -0.12,
    blurb: "Our European hub for compliance, documentation, and institutional partnerships.",
  },
];
