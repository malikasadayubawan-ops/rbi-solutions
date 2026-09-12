import type { Metadata } from "next";
import type { Country } from "@/types/country";
import { SITE_URL } from "@/lib/constants";

/**
 * `"${country.name} ${country.programName}"`, except when programName
 * already contains the country name (e.g. Malta's "Malta Permanent
 * Residence Programme (MPRP)") — prefixing it again reads as a doubled
 * word ("Malta Malta ..."). Shared so the page title and the on-page
 * "Program Overview" copy never drift out of sync on this rule.
 */
export function programDisplayName(country: Country): string {
  const programNameLower = country.programName.toLowerCase();
  if (programNameLower.includes(country.name.toLowerCase())) return country.programName;

  // Catches the abbreviation case a plain substring check misses — e.g.
  // "UK Work Visa" doesn't contain "united kingdom", but "UK" is still the
  // country's own acronym, so prefixing "United Kingdom" again reads just
  // as redundant as the exact-name case above.
  const acronym = country.name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toLowerCase();
  const firstWord = country.programName.split(/\s+/)[0]?.toLowerCase() ?? "";
  if (acronym.length >= 2 && firstWord === acronym) return country.programName;

  return `${country.name} ${country.programName}`;
}

export function buildProgramMetadata(country: Country): Metadata {
  // Plain title, not pre-suffixed — the root layout's `title.template`
  // ("%s — RBI Solutions") already appends the suffix to whatever string a
  // page returns here; appending it again produced a doubled
  // "— RBI Solutions — RBI Solutions" tab title. openGraph/twitter titles
  // are NOT run through that template, so those still need the full
  // standalone string.
  const title = programDisplayName(country);
  const fullTitle = `${title} — RBI Solutions`;
  const description = `${country.tagline} ${country.outcomeLabel} — starting from ${country.startingAmount}. Processing time: ${country.processingTime}.`;
  const url = `${SITE_URL}${country.programPagePath}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "RBI Solutions",
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/**
 * Generic, non-invented FAQ copy derived entirely from fields already on the
 * country record (processing time, family eligibility, minimum stay,
 * outcome/pathway) — never a fabricated country-specific legal claim.
 */
export function programFaqs(country: Country): { question: string; answer: string }[] {
  const faqs = [
    {
      question: `How long does the ${programDisplayName(country)} process take?`,
      answer: `Processing time is ${country.processingTime}. Timelines depend on your individual application and current government processing volumes — confirm the latest estimate with our team before proceeding.`,
    },
    {
      question: "Can my family be included in the application?",
      answer: `This program's eligible family members include: ${country.familyEligibility.join(", ")}. Family members are typically included as part of the same application.`,
    },
    {
      question: "Is there a minimum stay requirement?",
      answer: `${country.minStay}. Confirm current requirements with our team, as government rules can change.`,
    },
  ];

  if (country.pathwayToCitizenship) {
    faqs.push({
      question: "Does this program lead to citizenship?",
      answer: country.pathwayToCitizenship,
    });
  } else if (country.programKind === "citizenship") {
    faqs.push({
      question: "Does this program lead to citizenship?",
      answer: "Yes — this program grants citizenship directly, subject to a successful application and due diligence review.",
    });
  } else {
    faqs.push({
      question: "Does this program lead to citizenship?",
      answer: "This program grants residency. It does not include a defined pathway to citizenship — confirm current options with our team.",
    });
  }

  faqs.push({
    question: "Is approval guaranteed?",
    answer:
      "No program guarantees approval. Every application is subject to government due diligence, documentation requirements, and eligibility review. We support you through the full process but cannot guarantee an outcome.",
  });

  return faqs;
}
