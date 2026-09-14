import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants";

// rbis.global is verified in Resend, so this is a real, deliverable sender
// by default — RESEND_FROM_EMAIL remains available as an override (e.g. a
// different verified rbis.global address) but no longer needs to be set.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "RBI Solutions Website <website@rbis.global>";

// Hard cap on the raw request body, checked before JSON.parse ever runs —
// this is the actual received byte count (not the client-reported
// Content-Length header, which can be absent or wrong), so it's the one
// check that reliably rejects an oversized/malformed payload cheaply.
const MAX_BODY_BYTES = 20_000;

// Per-field caps, generous enough for genuine use but well short of what a
// scripted flood would submit. Enforced server-side — the matching
// `maxLength` attributes in InquiryForm.tsx are a UX nicety, not the real
// boundary, since any direct POST to this route bypasses HTML entirely.
const MAX_LENGTHS = {
  name: 200,
  email: 320,
  dialCode: 10,
  phoneNumber: 30,
  interest: 200,
  message: 5000,
  website: 200, // honeypot
} as const;

interface InquiryPayload {
  name?: string;
  email?: string;
  dialCode?: string;
  phoneNumber?: string;
  interest?: string;
  message?: string;
  privacyConsent?: boolean;
  consentTimestamp?: string;
  /** Honeypot field — see InquiryForm.tsx. Real visitors never populate
   * this; any non-empty value here means the request came from a bot. */
  website?: string;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function tooLong(value: string, max: number) {
  return value.length > max;
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
  }

  let body: InquiryPayload;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const dialCode = (body.dialCode ?? "").trim();
  const phoneNumber = (body.phoneNumber ?? "").trim();
  const interest = (body.interest ?? "General inquiry").trim();
  const message = (body.message ?? "").trim();
  const website = (body.website ?? "").trim(); // honeypot

  if (
    tooLong(name, MAX_LENGTHS.name) ||
    tooLong(email, MAX_LENGTHS.email) ||
    tooLong(dialCode, MAX_LENGTHS.dialCode) ||
    tooLong(phoneNumber, MAX_LENGTHS.phoneNumber) ||
    tooLong(interest, MAX_LENGTHS.interest) ||
    tooLong(message, MAX_LENGTHS.message) ||
    tooLong(website, MAX_LENGTHS.website)
  ) {
    return NextResponse.json({ ok: false, error: "One or more fields exceed the maximum length." }, { status: 400 });
  }

  // Honeypot trip: a genuine visitor never sees or fills this field, so any
  // non-empty value is a reliable bot signal. Responding exactly like a
  // successful submission (same shape, same 200 status) — rather than a
  // 4xx or a distinct error — means a bot's own success/failure heuristics
  // can't easily learn that this is a trap and adapt around it.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  // Consent is validated server-side regardless of what the client claims —
  // the browser-side checkbox and its `required` attribute are only a UX
  // convenience; a direct POST to this endpoint bypasses them entirely, so
  // this is the actual enforcement point. Never inferred, never defaulted.
  if (body.privacyConsent !== true) {
    return NextResponse.json(
      { ok: false, error: "Privacy Policy consent is required before an inquiry can be submitted." },
      { status: 400 },
    );
  }

  if (!name || !email || !phoneNumber) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and phone are required." },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — inquiry email was not sent.");
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 },
    );
  }

  // The server's own clock, not the client-submitted `consentTimestamp` —
  // a client value is useful context but isn't trustworthy as the record
  // of when consent was actually received and accepted.
  const consentReceivedAt = new Date();
  const submittedAt = consentReceivedAt.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });
  const phone = `${dialCode} ${phoneNumber}`.trim();

  const text = [
    "New RBI Solutions Inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Program of Interest: ${interest}`,
    `Message: ${message || "—"}`,
    "",
    `Privacy Policy consent: Given`,
    `Consent recorded at: ${submittedAt}`,
    `Date/Time: ${submittedAt}`,
  ].join("\n");

  const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

  const html = `
    <div style="font-family: Georgia, serif; color: #131a24; max-width: 560px;">
      <h2 style="font-weight: 400; margin-bottom: 24px;">New RBI Solutions Inquiry</h2>
      <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;">
        <tbody>
          <tr><td style="padding: 6px 12px 6px 0; color: #5b6472;">Name</td><td style="padding: 6px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
          <tr><td style="padding: 6px 12px 6px 0; color: #5b6472;">Email</td><td style="padding: 6px 0;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; color: #5b6472;">Phone</td><td style="padding: 6px 0;">${escapeHtml(phone)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; color: #5b6472;">Program of Interest</td><td style="padding: 6px 0;">${escapeHtml(interest)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; color: #5b6472; vertical-align: top;">Message</td><td style="padding: 6px 0; white-space: pre-wrap;">${escapeHtml(message || "—")}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; color: #5b6472;">Privacy Policy consent</td><td style="padding: 6px 0;">Given</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; color: #5b6472;">Consent recorded at</td><td style="padding: 6px 0;">${escapeHtml(submittedAt)}</td></tr>
        </tbody>
      </table>
      <p style="margin-top: 24px; font-size: 12px; color: #5b6472;">Date/Time: ${escapeHtml(submittedAt)}</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New RBI Solutions Inquiry — ${interest}`,
      text,
      html,
    });

    if (error) {
      // Logs the actual Resend error server-side (visible in Hostinger's
      // app logs) for debugging — `error` is Resend's { name, message }
      // shape, never the API key itself, so this is safe to log in full.
      console.error("Resend send error:", error);
      return NextResponse.json({ ok: false, error: "Failed to send inquiry." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending inquiry:", err);
    return NextResponse.json({ ok: false, error: "Failed to send inquiry." }, { status: 500 });
  }
}
