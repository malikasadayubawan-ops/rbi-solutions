"use client";

import { useCallback, useState } from "react";
import Script from "next/script";

// Tawk.to's own JS API object — populated once the embed script loads.
// Declared loosely (not Tawk's full SDK surface) since this integration
// only ever calls a couple of documented methods.
declare global {
  interface Window {
    Tawk_API?: {
      toggle?: () => void;
      maximize?: () => void;
      hideWidget?: () => void;
      onLoad?: () => void;
      [key: string]: unknown;
    };
    Tawk_LoadStart?: Date;
    __onTawkChatReady?: () => void;
  }
}

const TAWK_PROPERTY_ID = "6a7a8a780ef5611d48e8fbf4";
const TAWK_WIDGET_ID = "1jvnapqes";

type ChatStatus = "idle" | "loading" | "ready" | "error";

export default function ChatWidget() {
  const [status, setStatus] = useState<ChatStatus>("idle");
  // Bumped on a retry-after-error click so the embed <Script> gets a fresh
  // `key` and actually re-requests the file instead of no-opping against
  // the errored tag already in the DOM.
  const [loadAttempt, setLoadAttempt] = useState(0);

  const handleReady = useCallback(() => setStatus("ready"), []);

  const handleClick = () => {
    if (status === "idle") {
      // Tawk's script isn't in the DOM at all yet — this first click is
      // what triggers it to mount below, keeping the ~200KB of chat JS
      // (and the cookies Tawk sets on load) out of every visitor's initial
      // page load, not just the ones who never open chat.
      window.__onTawkChatReady = handleReady;
      setStatus("loading");
      return;
    }
    if (status === "ready") {
      window.Tawk_API?.toggle?.();
      return;
    }
    if (status === "error") {
      window.__onTawkChatReady = handleReady;
      setLoadAttempt((n) => n + 1);
      setStatus("loading");
    }
    // status === "loading": ignore repeat clicks until Tawk finishes.
  };

  return (
    <>
      {status !== "idle" && (
        <>
          {/*
            Same Tawk snippet as before (see git history), just no longer
            mounted unconditionally: `next/script` still only ever runs
            client-side, `afterInteractive` still avoids blocking render,
            and `onLoad: hideWidget()` still keeps Tawk's own launcher
            bubble from appearing — only the button below is ever shown.
            The addition is `__onTawkChatReady`, called once Tawk's own
            onLoad fires, and `maximize()`, which opens the chat window
            automatically the first time it's ready.
          */}
          <Script id="tawk-to-init" strategy="afterInteractive">
            {`
              var Tawk_API = window.Tawk_API || {};
              window.Tawk_API = Tawk_API;
              window.Tawk_LoadStart = new Date();
              Tawk_API.onLoad = function () {
                if (Tawk_API.hideWidget) Tawk_API.hideWidget();
                if (Tawk_API.maximize) Tawk_API.maximize();
                if (window.__onTawkChatReady) window.__onTawkChatReady();
              };
            `}
          </Script>
          <Script
            key={loadAttempt}
            id="tawk-to-embed"
            src={`https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
            onError={() => setStatus("error")}
          />
        </>
      )}

      <div className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8">
        <button
          type="button"
          onClick={handleClick}
          aria-label={
            status === "loading"
              ? "Loading chat"
              : status === "error"
                ? "Retry loading chat"
                : "Open chat"
          }
          aria-busy={status === "loading"}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-paper shadow-[0_12px_30px_-8px_rgba(42,92,138,0.5)] transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          {status === "loading" ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="animate-spin"
              aria-hidden="true"
            >
              <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
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
    </>
  );
}
