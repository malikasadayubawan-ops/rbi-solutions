import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hostinger's Node.js App hosting runs whatever startup file you point
  // it at directly with `node`, rather than orchestrating `next start`
  // itself — standalone output produces a self-contained server.js (with
  // only the production deps it actually needs traced in) that's built
  // for exactly that kind of deployment, instead of assuming the full
  // project + node_modules will be present at runtime.
  output: "standalone",
};

export default nextConfig;
