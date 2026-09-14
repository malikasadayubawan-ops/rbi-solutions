import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/constants";

// DEVELOPER NOTE (not rendered on the page): this policy is written in
// deliberately general, jurisdiction-neutral language because RBI
// Solutions' registered legal entity, operating jurisdiction, and any
// applicable data-protection registration have not been supplied. It
// should receive a legal review — and be updated with entity/jurisdiction-
// specific detail where applicable — before being relied on as
// jurisdiction-specific legal advice or a compliance guarantee.

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How RBI Solutions collects, uses, and protects the personal information submitted through our consultation form, chat, and WhatsApp.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "14 September 2026";

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="relative bg-paper focus:outline-none">
      <section className="px-6 pb-16 pt-32 md:px-14 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Legal</p>
          <h1 className="mt-5 text-balance font-display text-4xl font-light italic text-ink md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-sm text-ink-dim">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="border-t border-line px-6 py-16 md:px-14">
        <div className="mx-auto flex max-w-3xl flex-col gap-10 text-sm leading-relaxed text-ink-dim md:text-base">
          <p>
            This Privacy Policy explains how RBI Solutions (&ldquo;RBI Solutions,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and protects
            personal information submitted through this website, our consultation form, our live
            chat, and WhatsApp. By submitting information to us through any of these channels, you
            acknowledge this Policy.
          </p>

          <div>
            <h2 className="font-display text-xl italic text-ink md:text-2xl">
              Information We Collect
            </h2>
            <p className="mt-4">
              <strong className="font-medium text-ink">Consultation form.</strong> When you submit
              our consultation form, we collect your name, email address, telephone number and
              country code, the program you have indicated an interest in, and any message you
              choose to include.
            </p>
            <p className="mt-4">
              <strong className="font-medium text-ink">Chat and WhatsApp.</strong> If you contact us
              through our live chat widget or WhatsApp, we receive whatever information you
              voluntarily provide in that conversation — which may include your name, contact
              details, and details about your enquiry.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-ink md:text-2xl">
              Why We Process This Information
            </h2>
            <p className="mt-4">We use the information described above to:</p>
            <ul className="mt-3 flex flex-col gap-2">
              <li className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                Respond to your enquiry and arrange a consultation;
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                Evaluate which residency or citizenship programs may be suitable to discuss with
                you;
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                Maintain the security of our systems, prevent fraud and abuse, and meet applicable
                legal and regulatory obligations.
              </li>
            </ul>
            <p className="mt-4">
              We do not use your consultation-form consent to send you promotional marketing. That
              consent permits us only to respond to your enquiry, as described above.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-ink md:text-2xl">
              Service Providers
            </h2>
            <p className="mt-4">
              We use third-party service providers to help operate this website and communicate
              with you, including an email-delivery provider to send and receive consultation-form
              submissions, and a live-chat provider to power our website chat widget. Where you
              contact us through WhatsApp, that conversation is also subject to WhatsApp&rsquo;s own
              privacy practices. These providers process information on our behalf, only as
              necessary to provide their service to us.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-ink md:text-2xl">
              International Processing
            </h2>
            <p className="mt-4">
              Because RBI Solutions coordinates with an international network of offices and
              partners, and because our service providers may operate infrastructure in more than
              one country, your information may be processed in a country other than the one you
              are contacting us from. Where this applies, we take reasonable steps to protect your
              information in line with this Policy.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-ink md:text-2xl">
              Data Retention
            </h2>
            <p className="mt-4">
              We retain personal information submitted through the consultation form, chat, or
              WhatsApp for as long as reasonably necessary to respond to your enquiry, maintain a
              record of our communications with you, and meet any applicable legal, accounting, or
              reporting obligations. We do not retain information for longer than is reasonably
              necessary for these purposes.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-ink md:text-2xl">
              Your Rights
            </h2>
            <p className="mt-4">
              Depending on where you are located, you may have the right to request access to,
              correction of, or deletion of the personal information we hold about you, and — where
              we rely on your consent to process it — to withdraw that consent at any time.
              Withdrawing consent does not affect the lawfulness of any processing carried out
              before the withdrawal. To make any such request, contact us using the details below.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-ink md:text-2xl">
              A Note on Sensitive Information
            </h2>
            <p className="mt-4">
              Immigration, legal, and investment information can be sensitive. Live chat is not
              necessarily encrypted or logged with the same protections as our consultation form
              and email. Please avoid submitting sensitive personal, financial, passport, or
              government-identification details through chat unless it is necessary — our team can
              arrange a private, appropriate channel for anything sensitive.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-ink md:text-2xl">
              Contact Us
            </h2>
            <p className="mt-4">
              For any question about this Privacy Policy, or to make a request regarding your
              personal information, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand hover:text-brand-bright">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>

          <p className="text-xs text-ink-dim/70">
            See also our{" "}
            <Link href="/terms" className="text-brand hover:text-brand-bright">
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
