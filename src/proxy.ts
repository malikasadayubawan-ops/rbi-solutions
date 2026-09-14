import { NextRequest, NextResponse } from "next/server";

// Next.js 16 renamed `middleware.ts` to `proxy.ts` (the exported function
// itself is renamed too, `middleware` → `proxy`); this project is on 16.3.0,
// confirmed against node_modules/next's own build-time validation
// (get-page-static-info.js), which now treats `middleware.ts` as the
// deprecated form. `proxy.ts` always runs on the Node.js runtime (not Edge),
// which matches this project's standalone Node deployment on Hostinger
// anyway, so there's no edge-runtime constraint to work around here.

const CANONICAL_HOST = "www.rbis.global";
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);

// Legacy single-page-app paths that used to be their own routes before this
// site became a single homepage with in-page anchor sections. Redirected to
// the matching homepage anchor so old links, bookmarks, and search-engine
// entries land on real content — these must never serve a duplicate copy of
// the homepage at their own URL (they don't today either: no route file
// exists for any of them, so Next's default not-found handling already
// 404s them — this redirect turns that 404 into a clean 308 to the
// equivalent content instead).
const OBSOLETE_SECTION_PATHS: Record<string, string> = {
  "/how-it-works": "/#how-it-works",
  "/programs": "/#programs",
  "/compare": "/#compare",
  "/founder": "/#founder",
  "/contact": "/#consultation",
  "/consultation": "/#consultation",
  "/presence": "/#presence",
};

export default function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const requestHostname = (request.headers.get("host") ?? nextUrl.host).split(":")[0];
  const isLocal = LOCAL_HOSTNAMES.has(requestHostname);
  const isCanonicalHost = requestHostname === CANONICAL_HOST;
  const obsoleteAnchor = OBSOLETE_SECTION_PATHS[nextUrl.pathname];

  // Nothing to do: already on the canonical production host (or running
  // locally, where that host is never enforced — requirement: localhost
  // keeps working normally) AND the path isn't one of the obsolete ones.
  if (obsoleteAnchor === undefined && (isCanonicalHost || isLocal)) {
    return NextResponse.next();
  }

  // The origin to redirect TO. Everywhere except localhost this is always
  // production www — never the incoming (possibly non-www) host, which is
  // exactly the bug being fixed. Locally, redirecting to production would
  // break dev entirely, so the obsolete-path redirect (if any) stays on the
  // current dev origin instead.
  const targetOrigin = isLocal ? nextUrl.origin : `https://${CANONICAL_HOST}`;

  // Obsolete-path redirects intentionally resolve to a fixed anchor path,
  // not the original path+query — there's no query-string equivalent for a
  // homepage section link. A plain host-fix redirect (no obsolete path)
  // preserves the full path and query string untouched.
  const destination = obsoleteAnchor
    ? new URL(obsoleteAnchor, targetOrigin)
    : new URL(`${nextUrl.pathname}${nextUrl.search}`, targetOrigin);

  // Loop guard: only redirect if the computed destination actually differs
  // from the incoming request URL.
  if (destination.toString() === request.url) {
    return NextResponse.next();
  }

  // 308 (Permanent Redirect) rather than 301: it guarantees the method and
  // body of the original request are preserved on redirect (301 leaves that
  // to the client's discretion, and some clients turn a POST into a GET) —
  // which matters here since this redirect applies to every route,
  // including the /api/inquiry POST endpoint, not just GET page requests.
  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
