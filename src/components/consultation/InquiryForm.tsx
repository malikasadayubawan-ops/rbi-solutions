"use client";

import { useId, useState, type FormEvent } from "react";
import { countries } from "@/data/countries";
import { dialCodes } from "@/data/dialCodes";
import { CONTACT_EMAIL } from "@/lib/constants";
import Button from "@/components/ui/Button";

// Deliberately excludes width so every call site sets its own — mixing a
// shared `w-full` with a per-instance width override (e.g. the dial-code
// select) is a real Tailwind footgun: both are separate utility classes
// targeting `width`, and whichever lands later in the generated stylesheet
// wins — not whichever is later in the className string. Explicit per-field
// widths sidestep that entirely.
const inputClasses =
  "rounded-md border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-dim/50 transition-colors focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-card";

const labelClasses = "text-xs uppercase tracking-[0.2em] text-brand-dim";

export default function InquiryForm() {
  const formId = useId();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const dialCode = String(data.get("dialCode") ?? "");
    const phoneNumber = String(data.get("phoneNumber") ?? "");
    const interest = String(data.get("interest") ?? "General inquiry");
    const message = String(data.get("message") ?? "");

    const subject = `Consultation Request — ${interest}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${dialCode} ${phoneNumber}`,
      `Program of interest: ${interest}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl text-left">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className={labelClasses}>
            Name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`${inputClasses} mt-2 w-full`}
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className={labelClasses}>
            Email
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${inputClasses} mt-2 w-full`}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`${formId}-phoneNumber`} className={labelClasses}>
          Phone
        </label>
        <div className="mt-2 flex gap-2">
          <select
            id={`${formId}-dialCode`}
            name="dialCode"
            required
            defaultValue="+971"
            aria-label="Country code"
            className={`${inputClasses} w-[136px] shrink-0 appearance-none`}
          >
            {dialCodes.map((d) => (
              <option key={`${d.iso}-${d.code}`} value={d.code}>
                {d.iso} {d.code}
              </option>
            ))}
          </select>
          <input
            id={`${formId}-phoneNumber`}
            name="phoneNumber"
            type="tel"
            required
            autoComplete="tel-national"
            inputMode="tel"
            className={`${inputClasses} min-w-0 flex-1`}
            placeholder="555 123 4567"
            style={{ width: 0 }}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`${formId}-interest`} className={labelClasses}>
          Program of Interest
        </label>
        <select
          id={`${formId}-interest`}
          name="interest"
          defaultValue="General inquiry"
          className={`${inputClasses} mt-2 w-full appearance-none`}
        >
          <option>General inquiry</option>
          {countries.map((c) => (
            <option key={c.slug} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor={`${formId}-message`} className={labelClasses}>
          Message
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          className={`${inputClasses} mt-2 w-full resize-none`}
          placeholder="Tell us about your goals — timeline, family, investment range."
        />
      </div>

      <div className="mt-7 flex flex-col items-center gap-3">
        <Button type="submit" variant="solid" size="lg" className="w-full sm:w-auto">
          Send Inquiry
        </Button>
        <p className="text-xs text-ink-dim/60">
          {submitted
            ? "Opening your email client — thank you."
            : `Opens your email client, addressed directly to ${CONTACT_EMAIL}.`}
        </p>
      </div>
    </form>
  );
}
