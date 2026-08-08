// `output: "standalone"` traces only the server code + its actual runtime
// dependencies into .next/standalone — it deliberately does NOT copy
// public/ or .next/static/, since Next assumes a platform (like Vercel)
// that serves those separately via CDN. Self-hosting on a plain Node
// process (Hostinger's Node.js App hosting included) needs them sitting
// next to server.js, or every image/font/CSS 404s at runtime. This runs
// automatically after every `npm run build` so that folder is always
// deploy-ready without a manual copy step.
import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.error('.next/standalone not found — is "output: standalone" set in next.config.ts?');
  process.exit(1);
}

cpSync(join(root, "public"), join(standalone, "public"), { recursive: true });
cpSync(join(root, ".next", "static"), join(standalone, ".next", "static"), { recursive: true });

console.log("Copied public/ and .next/static/ into .next/standalone/ — ready to deploy.");
