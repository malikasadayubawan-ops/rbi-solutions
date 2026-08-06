import fs from "fs";
import path from "path";

// Server-only (relies on Node's fs) — never import this from a "use client"
// component. Checks /public/<dir>/<slug>.<ext> for each candidate extension
// and returns the first match as a public URL path, or undefined if none
// exists yet. This is the whole "drop a file in, it just works" mechanism:
// no data file edits needed when a real image is supplied.
const EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

export function detectImage(dir: string, slug: string): string | undefined {
  for (const ext of EXTENSIONS) {
    const filePath = path.join(process.cwd(), "public", dir, `${slug}.${ext}`);
    if (fs.existsSync(filePath)) {
      return `/${dir}/${slug}.${ext}`;
    }
  }
  return undefined;
}
