import { CONTACT_EMAIL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper px-6 pb-10 pt-16 md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="brand-rule mb-14" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-xl tracking-[0.08em] text-ink">
              RBI <span className="text-brand">Solutions</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-dim">
              Global residency and citizenship advisory for investors and
              families. We structure access — you decide where the world
              opens next.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-dim">Explore</p>
            <ul className="mt-4 space-y-3 text-sm text-ink-dim">
              <li><a href="#programs" className="hover:text-brand">Programs</a></li>
              <li><a href="#how-it-works" className="hover:text-brand">How It Works</a></li>
              <li><a href="#compare" className="hover:text-brand">Compare Countries</a></li>
              <li><a href="#presence" className="hover:text-brand">Global Presence</a></li>
              <li><a href="#founder" className="hover:text-brand">About the Founder</a></li>
              <li><a href="#consultation" className="hover:text-brand">Book Consultation</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-dim">Firm</p>
            <ul className="mt-4 space-y-3 text-sm text-ink-dim">
              <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand">{CONTACT_EMAIL}</a></li>
              <li className="text-ink-dim">By appointment only</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-ink-dim/70">
            Investment thresholds, processing times, and eligibility criteria
            shown throughout this site are indicative starting points drawn
            from published program guidance and are subject to change without
            notice by the issuing government. Nothing on this site
            constitutes legal, tax, or immigration advice. Figures should be
            independently verified with licensed counsel before any
            investment or application decision.
          </p>
          <p className="mt-6 text-xs text-ink-dim/50">
            © {new Date().getFullYear()} RBI Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
