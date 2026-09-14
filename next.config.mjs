/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Next's own server already sends long-lived immutable caching for
  // /_next/static (content-hashed build output, including the self-hosted
  // next/font files) and its own Cache-Control for /_next/image — neither
  // needs anything here. What Next does NOT cache aggressively on its own
  // is /public, served as-is. gzip compression is also already on by
  // default (`compress` defaults to true) unless explicitly disabled,
  // which it isn't.
  async headers() {
    return [
      {
        // Passport photos and the founder portrait: real files under
        // /public, not content-hashed like Next's build output, so an
        // "immutable" cache would risk serving stale bytes if one is ever
        // swapped in place under the same filename. A week of caching plus
        // a day of stale-while-revalidate still saves nearly every repeat
        // visitor a re-download without that risk.
        source: "/passports/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/founder/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        // Belt-and-braces: POST-only route handlers are never cached by
        // Next itself, but this guarantees no intermediate proxy/CDN in
        // front of the Hostinger deployment ever caches a form-submission
        // response, which could contain another visitor's inquiry data.
        source: "/api/inquiry",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
