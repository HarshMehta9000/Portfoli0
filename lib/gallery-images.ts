import { buildGalleryPath } from "./image-utils";

export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  tags?: string[];
}

/**
 * How many files *might* exist.  Keep this high; missing numbers are skipped.
 */
const MAX = 70;

export const galleryImages: GalleryImage[] = [];

for (let i = 1; i <= MAX; i++) {
  const src = buildGalleryPath(i);     // null when file doesn’t exist
  if (!src) continue;                  // skip gaps – avoids broken thumbs

  galleryImages.push({
    src,
    alt: `Gallery image ${i}`,
    title: `Gallery Image ${i}`,
    description: "",
    tags: [],
  });
}
