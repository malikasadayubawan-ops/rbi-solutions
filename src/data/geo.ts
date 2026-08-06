export const coordinates: Record<string, [number, number]> = {
  brazil: [-14.2, -51.9],
  portugal: [39.5, -8.0],
  spain: [40.2, -3.7],
  france: [46.6, 2.3],
  malta: [35.9, 14.4],
  uae: [23.5, 53.9],
  "saudi-arabia": [23.9, 45.1],
  oman: [21.5, 55.9],
  qatar: [25.3, 51.2],
  bahrain: [26.0, 50.5],
  kuwait: [29.3, 47.5],
  "united-kingdom": [54.0, -2.9],
  azerbaijan: [40.1, 47.6],
  dominica: [15.4, -61.4],
  grenada: [12.1, -61.7],
  "st-kitts-and-nevis": [17.3, -62.7],
  vanuatu: [-15.4, 166.9],
};

export function latLonToVector3(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}
