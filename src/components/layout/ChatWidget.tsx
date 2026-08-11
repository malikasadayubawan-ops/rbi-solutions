"use client";

import Script from "next/script";

// Tawk.to's own JS API object — populated once the embed script below
// finishes loading. Declared loosely (not Tawk's full SDK surface) since
// this integration only ever calls a couple of documented methods.
declare global {
  interface Window {
    Tawk_API?: {
      toggle?: () => void;
      hideWidget?: () => void;
      onLoad?: () => void;
      [key: string]: unknown;
    };
    Tawk_LoadStart?: Date;
  }
}

const TAWK_PROPERTY_ID = "6a7a8a780ef5611d48e8fbf4";
const TAWK_WIDGET_ID = "1jvnapqes";

export default function ChatWidget() {
  return (
    <>
      {/*
        Two scripts, matching Tawk's own snippet split into its Next.js-safe
        equivalents: `next/script` (not a raw <script> tag or manual DOM
        insertion) is what makes this SSR/hydration-safe under the App
        Router — it only ever runs client-side, after the tag it's attached
        to is actually in the DOM. `afterInteractive` loads it once the
        page is usable rather than blocking the initial render.

        The inline script also registers `onLoad: hideWidget()` before the
        embed script runs, so Tawk's own default launcher bubble never
        renders — only the existing RBI button below does. `toggle()` still
        opens/closes the real chat window regardless; hiding the widget
        only affects its own launcher icon, not the underlying chat.
      */}
      <Script id="tawk-to-init" strategy="afterInteractive">
        {`
          var Tawk_API = window.Tawk_API || {};
          window.Tawk_API = Tawk_API;
          window.Tawk_LoadStart = new Date();
          Tawk_API.onLoad = function () {
            if (Tawk_API.hideWidget) Tawk_API.hideWidget();
          };
        `}
      </Script>
      <Script
        id="tawk-to-embed"
        src={`https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      <div className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8">
        <button
          type="button"
          onClick={() => window.Tawk_API?.toggle?.()}
          aria-label="Open chat"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-paper shadow-[0_12px_30px_-8px_rgba(42,92,138,0.5)] transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
