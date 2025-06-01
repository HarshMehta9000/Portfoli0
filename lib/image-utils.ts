/**
 * Resolve the first existing file called  /public/Gallery/gimg{n}.{ext}
 * where {ext} is in the allowed list.  Returns  null  when no file exists.
 *
 * Example:  gimg3.jpeg → "/Gallery/gimg3.jpeg"
 */
import fs from "fs";
import path from "path";

const exts = ["jpg", "jpeg", "png", "gif", "pdf"];   // add / remove at will

export function buildGalleryPath(n: number): string | null {
  for (const ext of exts) {
    const rel = `/Gallery/gimg${n}.${ext}`;
    const abs = path.join(process.cwd(), "public", rel);
    if (fs.existsSync(abs)) {
      return rel;                 // first hit wins – immediately return
    }
  }
  return null;                    // nothing found for that index
}
