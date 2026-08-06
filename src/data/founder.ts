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
  bio: "Malik Asad founded RBI Solutions with the vision of helping investors and families navigate global residency and citizenship opportunities through transparent advice and carefully selected investment pathways. Rather than promoting a single destination, the firm focuses on understanding each client's objectives and recommending the most suitable long-term solution through its international network of trusted professionals and partners.",
};
