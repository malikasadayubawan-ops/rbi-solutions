export const coordinates: Record<string, [number, number]> = {
  brazil: [-14.2, -51.9],
  greece: [39.07, 21.82],
  spain: [40.2, -3.7],
  france: [46.6, 2.3],
  malta: [35.9, 14.4],
  latvia: [56.88, 24.6],
  uae: [23.5, 53.9],
  "saudi-arabia": [23.9, 45.1],
  "united-kingdom": [54.0, -2.9],
  azerbaijan: [40.1, 47.6],
  dominica: [15.4, -61.4],
  grenada: [12.1, -61.7],
  "st-kitts-and-nevis": [17.3, -62.7],
  vanuatu: [-15.4, 166.9],
  georgia: [41.7, 44.8],
};

/** Equirectangular projection onto a 1000x500 viewBox for the flat map. */
export function latLonToXY(lat: number, lon: number): [number, number] {
  const x = ((lon + 180) / 360) * 1000;
  const y = ((90 - lat) / 180) * 500;
  return [x, y];
}
