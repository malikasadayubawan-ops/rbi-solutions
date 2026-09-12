import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import { countries, getCountryByPath } from "@/data/countries";
import { buildProgramMetadata } from "@/lib/programPage";
import { SITE_URL } from "@/lib/constants";
import ProgramPage from "@/components/programs/ProgramPage";

const PREFIX = "/residency";

export function generateStaticParams() {
  return countries
    .filter((c) => c.programPagePath.startsWith(`${PREFIX}/`))
    .map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryByPath(`${PREFIX}/${slug}`);
  if (!country) return {};
  return buildProgramMetadata(country);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountryByPath(`${PREFIX}/${slug}`);
  if (!country) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: country.programName,
    name: `${country.name} — ${country.programName}`,
    description: country.tagline,
    provider: { "@type": "Organization", name: "RBI Solutions", url: SITE_URL },
    areaServed: country.name,
    url: `${SITE_URL}${country.programPagePath}`,
  };

  return (
    <>
      <Script
        id={`ld-json-${country.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProgramPage country={country} />
    </>
  );
}
