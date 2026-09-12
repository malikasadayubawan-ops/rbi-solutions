export interface Founder {
  name: string;
  title: string;
  bio: string;
  /** Path under /public, e.g. "/founder/malik-asad.jpg". Falls back to a
   * generative placeholder frame when omitted. */
  portraitSrc?: string;
}

export const founder: Founder = {
  name: "Malik Asad",
  title: "Founder",
  bio: "With more than 12 years of experience across international real estate, banking, investment advisory and residency solutions, Malik Asad brings extensive knowledge of cross-border property transactions and global investment opportunities. He has handled millions of dollars in property sales, with professional experience spanning Dubai, the United Kingdom and Brazil. His personal experience with international residency processes gives him a practical understanding of the financial, legal and relocation considerations faced by globally mobile investors and families. His expertise covers cross-border real estate, international bank deposits, commodity-related investments, residency planning and investment migration. This combination of market knowledge and first-hand international experience enables him to advise clients seeking to diversify their assets, pursue international residency and build a secure global future.",
  portraitSrc: "/founder/malik-asad.jpg",
};
