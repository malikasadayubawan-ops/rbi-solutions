"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONTACT_EMAIL } from "@/lib/constants";
import Button from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-md border border-line bg-ink px-3.5 py-2.5 text-sm text-parchment placeholder:text-parchment-dim/50 transition-colors focus:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const formId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `Quick Message from ${name || "website visitor"}`;
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-[calc(100%+16px)] right-0 w-[calc(100vw-3rem)] max-w-[340px] rounded-lg border border-line bg-card p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]"
            role="dialog"
            aria-label="Quick message"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="font-display text-lg italic text-parchment">Start a conversation</p>
                <p className="mt-1 text-xs text-parchment-dim">
                  We typically respond within one business day.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-parchment-dim transition-colors hover:text-gold"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor={`${formId}-name`} className="sr-only">
                  Name
                </label>
                <input
                  id={`${formId}-name`}
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor={`${formId}-email`} className="sr-only">
                  Email
                </label>
                <input
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor={`${formId}-message`} className="sr-only">
                  Message
                </label>
                <textarea
                  id={`${formId}-message`}
                  name="message"
                  rows={3}
                  placeholder="How can we help?"
                  className={`${inputClasses} resize-none`}
                />
              </div>
              <Button type="submit" variant="solid" size="sm" className="w-full">
                Send Message
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink shadow-[0_12px_30px_-8px_rgba(198,161,91,0.6)] transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
