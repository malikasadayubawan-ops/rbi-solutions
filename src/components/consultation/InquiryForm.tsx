"use client";

import { useId, useState, type FormEvent } from "react";
import { countries } from "@/data/countries";
import { CONTACT_EMAIL } from "@/lib/constants";
import Button from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-md border border-line bg-ink px-4 py-3 text-sm text-parchment placeholder:text-parchment-dim/50 transition-colors focus:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-card";

const labelClasses = "text-xs uppercase tracking-[0.2em] text-gold-dim";

export default function InquiryForm() {
  const formId = useId();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const interest = String(data.get("interest") ?? "General inquiry");
    const message = String(data.get("message") ?? "");

    const subject = `Consultation Request — ${interest}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
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
            className={`${inputClasses} mt-2`}
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
            className={`${inputClasses} mt-2`}
            placeholder="you@example.com"
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
          className={`${inputClasses} mt-2 appearance-none`}
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
          className={`${inputClasses} mt-2 resize-none`}
          placeholder="Tell us about your goals — timeline, family, investment range."
        />
      </div>

      <div className="mt-7 flex flex-col items-center gap-3">
        <Button type="submit" variant="solid" size="lg" className="w-full sm:w-auto">
          Send Inquiry
        </Button>
        <p className="text-xs text-parchment-dim/60">
          {submitted
            ? "Opening your email client — thank you."
            : `Opens your email client, addressed directly to ${CONTACT_EMAIL}.`}
        </p>
      </div>
    </form>
  );
}
