import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/constants";

// DEVELOPER NOTE (not rendered on the page): the governing-law section
// below is deliberately left general because RBI Solutions&rsquo; registered
// legal entity and operating jurisdiction have not been supplied. It
// should receive a legal review — and be updated with jurisdiction-
// specific detail — before being relied on as jurisdiction-specific legal
// advice or a compliance guarantee.

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms governing use of the RBI Solutions website, including important disclaimers about the informational nature of the content.",
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "14 September 2026";

export default function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="relative bg-paper focus:outline-none">
      <section className="px-6 pb-16 pt-32 md:px-14 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Legal</p>
          <h1 className="mt-5 text-balance font-display text-4xl font-light italic text-ink md:text-6xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-6 text-sm text-ink-dim">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="border-t border-line px-6 py-16 md:px-14">
        <div className="mx-auto flex max-w-3xl flex-col gap-10 text-sm leading-relaxed text-ink-dim md:text-base">
          <p>
            These Terms &amp; Conditions govern your use of this website. By using this website,
            you agree to these terms. If you do not agree, please do not use this website.
          </p>

          <div>
            <h2 className="font-display text-xl italic text-ink md:text-2xl">
              Informational Purpose Only
            </h2>
            <p className="mt-4">
              This website is provided for general informational purposes about RBI Solutions&rsquo;
              residency, citizenship, and investment migration advisory services. Nothing on this
              website constitutes legal, tax, immigration, financial, or investment advice, and
              should not be relied upon as such. You should seek advice from licensed, qualified
              professionals before making any decision related to residency, citizenship,
              investment, or immigration.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-ink md:text-2xl">
              No Guarantee of Approval or Outcome
            </h2>
            <p className="mt-4">
              We do not guarantee that any visa, residency, citizenship, or other government
              approval will be granted. Every application is subject to the eligibility criteria,
              due diligence review, and discretion of the relevant government authority. We also do
              not guarantee any financial return, property appreciation, or investment performance
              in connection with any program referenced on this website.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-ink md:text-2xl">
              Program Terms May Change
            </h2>
            <p className="mt-4">
              Investment thresholds, government fees, processing times, eligibility requirements,
              and other program terms described on this website are indicative and are set by the
              relevant government authorities. They may change without notice. You should confirm
              current terms with us, and independently verify them with licensed counsel, before
              proceeding with any application.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-ink md:text-2xl">
              Third-Party Services and External Links
            </h2>
            <p className="mt-4">
              This website may link to, or integrate with, third-party services — including our
              live chat provider, WhatsApp, and email-delivery provider — and may reference
              government or other third-party websites. We do not control and are not responsible
              for the content, accuracy, or privacy practices of any third-party service or
              website. Your use of any third-party service is governed by that provider&rsquo;s own
              terms and privacy policy.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-ink md:text-2xl">
              Intellectual Property
            </h2>
            <p className="mt-4">
              The content, design, layout, and branding of this website — including text, graphics,
              and the RBI Solutions name and marks — are the property of RBI Solutions or its
              licensors and are protected by applicable intellectual-property law. You may not
              reproduce, distribute, or create derivative works from this website&rsquo;s content without
              our prior written permission.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-ink md:text-2xl">
              Limitation of Reliance
            </h2>
            <p className="mt-4">
              This website&rsquo;s content is provided &ldquo;as is,&rdquo; without warranty of any kind, and should
              not be relied upon as a complete or current statement of any program&rsquo;s terms. To the
              fullest extent permitted by law, RBI Solutions is not liable for any loss or damage
              arising from reliance on information found on this website, including outdated or
              inaccurate program figures. Nothing in these Terms excludes any liability that cannot
              be excluded under applicable law.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-ink md:text-2xl">
              Governing Law
            </h2>
            <p className="mt-4">
              RBI Solutions&rsquo; registered legal entity and operating jurisdiction have not yet been
              specified for the purpose of these Terms. Until a specific governing jurisdiction is
              confirmed, these Terms should be read as a general statement of the basis on which
              this website is provided, and should be interpreted reasonably and in good faith by
              both parties. This section will be updated once a specific governing jurisdiction has
              been confirmed.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-ink md:text-2xl">
              Contact Us
            </h2>
            <p className="mt-4">
              For any question about these Terms &amp; Conditions, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand hover:text-brand-bright">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>

          <p className="text-xs text-ink-dim/70">
            See also our{" "}
            <Link href="/privacy" className="text-brand hover:text-brand-bright">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
