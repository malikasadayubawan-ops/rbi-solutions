"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { countries } from "@/data/countries";
import { dialCodes } from "@/data/dialCodes";
import { CONTACT_EMAIL } from "@/lib/constants";
import Button from "@/components/ui/Button";

type Status = "idle" | "sending" | "success" | "error";

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
  const [status, setStatus] = useState<Status>("idle");
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const consentInputId = `${formId}-consent`;
  const honeypotId = `${formId}-company-website`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Defense in depth: the checkbox's own `required` attribute already
    // blocks the native submit, but a manual check here means a styled,
    // on-brand message is shown instead of relying solely on the browser's
    // default validation bubble (and covers any path that bypasses it).
    if (!consentChecked) {
      setConsentError(true);
      return;
    }
    setConsentError(false);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      dialCode: String(data.get("dialCode") ?? ""),
      phoneNumber: String(data.get("phoneNumber") ?? ""),
      interest: String(data.get("interest") ?? "General inquiry"),
      message: String(data.get("message") ?? ""),
      privacyConsent: true,
      consentTimestamp: new Date().toISOString(),
      // Honeypot — see the hidden field below. Real visitors never see or
      // fill this in, so any non-empty value here is a strong bot signal.
      website: String(data.get("website") ?? ""),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      setConsentChecked(false);
    } catch {
      // Deliberately leaves the form's entered values untouched — the user
      // shouldn't have to retype everything after a failed send.
      setStatus("error");
    }
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
            maxLength={200}
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
            maxLength={320}
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
            maxLength={30}
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
          maxLength={5000}
          className={`${inputClasses} mt-2 w-full resize-none`}
          placeholder="Tell us about your goals — timeline, family, investment range."
        />
      </div>

      {/*
        Honeypot: visually and semantically hidden from real visitors
        (aria-hidden removes it from the accessibility tree; tabIndex=-1
        keeps keyboard users from ever tabbing into it) but still a normal,
        named input a naive bot's form-filler will happily populate. Off-
        canvas positioning rather than display:none/visibility:hidden —
        some bots specifically skip fields hidden that way, but still fill
        in ones that are merely moved off-screen.
      */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor={honeypotId}>Company website</label>
        <input id={honeypotId} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id={consentInputId}
          name="privacyConsent"
          type="checkbox"
          required
          checked={consentChecked}
          onChange={(e) => {
            setConsentChecked(e.target.checked);
            if (e.target.checked) setConsentError(false);
          }}
          onInvalid={(e) => {
            e.preventDefault();
            setConsentError(true);
          }}
          aria-describedby={consentError ? `${consentInputId}-error` : undefined}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-line text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        />
        <label htmlFor={consentInputId} className="text-xs leading-relaxed text-ink-dim">
          I consent to RBI Solutions processing my personal information to respond to my enquiry,
          in accordance with the{" "}
          <Link href="/privacy" className="text-brand underline underline-offset-2 hover:text-brand-bright">
            Privacy Policy
          </Link>
          .
        </label>
      </div>
      {consentError && (
        <p id={`${consentInputId}-error`} role="alert" className="mt-2 text-xs text-red-600">
          Please confirm you consent to our Privacy Policy before sending your inquiry.
        </p>
      )}

      <div className="mt-7 flex flex-col items-center gap-3">
        <Button
          type="submit"
          variant="solid"
          size="lg"
          className="w-full sm:w-auto"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send Inquiry"}
        </Button>
        <p
          className={`text-xs ${status === "error" ? "text-red-600" : "text-ink-dim/60"}`}
          role={status === "success" || status === "error" ? "status" : undefined}
        >
          {status === "success"
            ? "Thank you. Your inquiry has been received. Our team will contact you shortly."
            : status === "error"
              ? "We couldn't send your inquiry. Please try again."
              : `Sent directly to our team at ${CONTACT_EMAIL}.`}
        </p>
      </div>
    </form>
  );
}
