// Rough elliptical bounding regions (in the 1000x500 equirectangular map
// viewBox) used to scatter a dot-matrix landmass texture. Deliberately
// stylized rather than geographically precise coastlines — consistent with
// the rest of the site's generative-art visual language.
export const continents = [
  { cx: 195, cy: 130, rx: 165, ry: 95 }, // North America
  { cx: 330, cy: 320, rx: 90, ry: 110 }, // South America
  { cx: 540, cy: 105, rx: 75, ry: 55 }, // Europe
  { cx: 545, cy: 250, rx: 100, ry: 105 }, // Africa
  { cx: 760, cy: 140, rx: 175, ry: 100 }, // Asia
  { cx: 870, cy: 320, rx: 65, ry: 45 }, // Australia
];
