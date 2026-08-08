import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants";

// Resend requires the API key to belong to a verified sending domain for
// the `from` address; onboarding@resend.dev works out of the box for
// testing without any domain verification, but should be swapped to a
// verified rbis.global address (via RESEND_FROM_EMAIL) before going live —
// see the deployment notes in the PR/chat for exact setup steps.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "RBI Solutions <onboarding@resend.dev>";

interface InquiryPayload {
  name?: string;
  email?: string;
  dialCode?: string;
  phoneNumber?: string;
  interest?: string;
  message?: string;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: InquiryPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const dialCode = (body.dialCode ?? "").trim();
  const phoneNumber = (body.phoneNumber ?? "").trim();
  const interest = (body.interest ?? "General inquiry").trim();
  const message = (body.message ?? "").trim();

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

  const submittedAt = new Date().toLocaleString("en-US", {
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
      console.error("Resend send error:", error);
      return NextResponse.json({ ok: false, error: "Failed to send inquiry." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending inquiry:", err);
    return NextResponse.json({ ok: false, error: "Failed to send inquiry." }, { status: 500 });
  }
}
