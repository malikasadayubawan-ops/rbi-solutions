import Link from "next/link";
import type { Country } from "@/types/country";
import { detectImage } from "@/lib/detectImage";
import { programFaqs, programDisplayName } from "@/lib/programPage";
import { formatFigure, cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ProgramHeroPassport from "./ProgramHeroPassport";
import { ClockIcon, UsersIcon, MapPinIcon } from "@/components/ui/Icons";

interface Props {
  country: Country;
}

const processSteps = [
  { n: "01", title: "Private Consultation", body: "A confidential conversation to confirm this program fits your goals, timeline, and family situation." },
  { n: "02", title: "Documentation & Due Diligence", body: "We coordinate the required documents and due diligence to government standard." },
  { n: "03", title: "Investment & Filing", body: "Your qualifying investment is structured and the application is filed on your behalf." },
  { n: "04", title: "Approval & Ongoing Support", body: "We track your application through to approval, with ongoing compliance support after." },
];

export default function ProgramPage({ country }: Props) {
  const passportImage = country.passportImage ?? detectImage("passports", country.slug);
  const needsVerification = Boolean(country.legalDisclaimer) &&
    (country.slug === "greece" || country.slug === "latvia" || country.slug === "saudi-arabia");

  return (
    <main id="main-content" tabIndex={-1} className="relative bg-paper focus:outline-none">
      {/* 1. Country hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-32 md:px-14 md:pt-40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink-dim">
              {country.region} · {country.programKind === "citizenship" ? "Citizenship" : "Residency"}
            </p>
            <h1 className="mt-5 text-balance font-display text-4xl font-light italic text-ink md:text-6xl">
              {country.name}
            </h1>
            <p className="mt-3 text-lg text-brand">{country.programName}</p>
            <p className="mt-6 max-w-lg text-balance text-base leading-relaxed text-ink-dim">
              {country.tagline}
            </p>

            <p className="mt-8 inline-flex w-fit items-center rounded-full bg-brand/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-brand">
              {country.outcomeLabel}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/#consultation" variant="solid" size="md">
                Check Eligibility
              </Button>
              <Button href="/#consultation" variant="outline" size="md">
                Book Consultation
              </Button>
            </div>
          </div>

          <ProgramHeroPassport country={country} passportImage={passportImage} />
        </div>
      </section>

      {needsVerification && (
        <div className="mx-auto mb-4 max-w-6xl px-6 md:px-14">
          <div className="rounded-lg border border-brand/40 bg-brand/5 px-5 py-3 text-xs leading-relaxed text-brand">
            The figures on this page require final legal verification before being presented to a client. See the disclosure below.
          </div>
        </div>
      )}

      {/* 2. Program overview */}
      <section className="border-t border-line px-6 py-16 md:px-14">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Program Overview</p>
          <p className="mt-5 text-base leading-relaxed text-ink-dim">
            {/* outcomeLabel is shown verbatim, not case-transformed — it's
                authored as a display label (e.g. "Renewable European
                Residency"), and blindly lowercasing it previously mangled
                any acronym inside it (e.g. "EU" → "eu"). */}
            The {programDisplayName(country)} is a {country.programKind} program offering{" "}
            {country.outcomeLabel}. {country.lifestyle}
          </p>
        </div>
      </section>

      {/* 3 & 4. Investment / available routes */}
      <section className="border-t border-line bg-card-raised px-6 py-16 md:px-14">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Available Routes</p>
          <h2 className="mt-3 font-display text-2xl italic text-ink">Minimum Investment</h2>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {country.investmentRoutes.map((route) => (
              <div key={route.label} className="rounded-lg border border-line bg-card p-5">
                <p className="text-xs text-ink-dim">{route.label}</p>
                <p className="mt-1.5 font-mono-figures text-lg text-brand-bright">
                  {formatFigure(route.amount, route.currency)}
                </p>
                {route.description && (
                  <p className="mt-2.5 text-xs leading-relaxed text-ink-dim">{route.description}</p>
                )}
                {route.details && route.details.length > 0 && (
                  <ul className="mt-2 flex flex-col gap-1">
                    {route.details.map((d) => (
                      <li key={d} className="flex items-start gap-1.5 text-xs text-ink-dim">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-brand-dim" />
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {country.serviceFee && (
              <div className="rounded-lg border border-emerald/30 bg-card p-5">
                <p className="text-xs text-ink-dim">{country.serviceFee.label}</p>
                <p className="mt-1.5 font-mono-figures text-lg text-emerald">
                  {formatFigure(country.serviceFee.amount, country.serviceFee.currency)}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Main benefits */}
      <section className="border-t border-line px-6 py-16 md:px-14">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Main Benefits</p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {country.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-ink-dim">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6, 7, 8 — family / processing time / minimum stay */}
      <section className="border-t border-line bg-card-raised px-6 py-16 md:px-14">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <UsersIcon className="h-5 w-5 text-brand" />
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-ink-dim">Eligible Family Members</p>
            <p className="mt-2 text-sm text-ink">{country.familyEligibility.join(", ")}</p>
          </div>
          <div>
            <ClockIcon className="h-5 w-5 text-brand" />
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-ink-dim">Processing Time</p>
            <p className="mt-2 font-mono-figures text-sm text-ink">{country.processingTime}</p>
          </div>
          <div>
            <MapPinIcon className="h-5 w-5 text-brand" />
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-ink-dim">Minimum Stay</p>
            <p className="mt-2 text-sm text-ink">{country.minStay}</p>
          </div>
        </div>
      </section>

      {/* 9 & 10 — outcome + pathway to citizenship */}
      <section className="border-t border-line px-6 py-16 md:px-14">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Outcome</p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-line bg-card p-6">
              <p className="text-xs uppercase tracking-[0.15em] text-ink-dim">Residence Status Granted</p>
              <p className="mt-2 font-display text-lg italic text-ink">{country.residenceType}</p>
            </div>
            <div className="rounded-lg border border-line bg-card p-6">
              <p className="text-xs uppercase tracking-[0.15em] text-ink-dim">Pathway to Citizenship</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                {country.pathwayToCitizenship ??
                  (country.programKind === "citizenship"
                    ? "Not applicable — citizenship is granted directly through this program."
                    : "This program does not include a defined pathway to citizenship. Confirm current options with our team.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Application process */}
      <section className="border-t border-line bg-card-raised px-6 py-16 md:px-14">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Application Process</p>
          <div className="mt-8 flex flex-col gap-8">
            {processSteps.map((step) => (
              <div key={step.n} className="flex gap-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand bg-card font-mono-figures text-sm text-brand">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-display text-base italic text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Legal disclaimer */}
      <section className="border-t border-line px-6 py-16 md:px-14">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Important Legal Disclaimer</p>
          <div
            className={cn(
              "mt-5 rounded-lg border p-5 text-xs leading-relaxed",
              needsVerification ? "border-brand/50 bg-brand/5 text-brand" : "border-line bg-card text-ink-dim",
            )}
          >
            {country.legalDisclaimer ?? (
              <>
                Investment thresholds, processing times, and eligibility criteria shown on this page are
                indicative starting points and are subject to change without notice by the issuing
                government. Nothing on this page constitutes legal, tax, or immigration advice.
              </>
            )}
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-ink-dim/70">
            Figures should be independently verified with licensed counsel before any investment or
            application decision. Approval is never guaranteed.
          </p>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="border-t border-line bg-card-raised px-6 py-16 md:px-14">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Frequently Asked Questions</p>
          <div className="mt-8 flex flex-col divide-y divide-line">
            {programFaqs(country).map((faq) => (
              <div key={faq.question} className="py-5">
                <h3 className="font-display text-base italic text-ink">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14 & 15. CTAs */}
      <section className="border-t border-line px-6 py-20 text-center md:px-14">
        <div className="mx-auto max-w-xl">
          <h2 className="text-balance font-display text-2xl font-light italic text-ink md:text-3xl">
            Ready to explore the {programDisplayName(country)}?
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/#consultation" variant="solid" size="md">
              Check Eligibility
            </Button>
            <Button href="/#consultation" variant="outline" size="md">
              Book Consultation
            </Button>
          </div>
          <p className="mt-6 text-sm text-ink-dim">
            <Link href="/" className="text-brand hover:text-brand-bright">
              ← Back to all programs
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
