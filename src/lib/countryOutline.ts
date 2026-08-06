import fs from "fs";
import path from "path";
import { geoIdentity, geoPath } from "d3-geo";
import { feature } from "topojson-client";

/**
 * Real country boundary shapes (Natural Earth 10m, via world-atlas), used to
 * render an accurate outline map beside each passport — never hand-drawn,
 * so small territories (e.g. island federations) stay geographically true.
 * Server-only: this file touches `fs` and a multi-MB topology, and must
 * never be imported from a "use client" component.
 */

export const OUTLINE_VIEWBOX_SIZE = 200;
const PADDING = 14;

// Natural Earth "id" is the UN M49 numeric code, not ISO alpha-3 — map the
// handful of countries this site uses so country data can stay in the more
// legible alpha-3 form.
const ALPHA3_TO_NUMERIC: Record<string, string> = {
  BRA: "076",
  FRA: "250",
  AZE: "031",
  ARE: "784",
  GBR: "826",
  DMA: "212",
  KNA: "659",
  GEO: "268",
  PRT: "620",
  ESP: "724",
  MLT: "470",
  SAU: "682",
  OMN: "512",
  BHR: "048",
  QAT: "634",
  KWT: "414",
  GRD: "308",
  VUT: "548",
};

type GeoFeature = {
  id?: string | number;
  type: string;
  geometry: unknown;
  properties: unknown;
};

let featuresById: Map<string, GeoFeature> | null = null;

function loadFeatures(): Map<string, GeoFeature> {
  if (featuresById) return featuresById;

  const filePath = path.join(
    process.cwd(),
    "node_modules",
    "world-atlas",
    "countries-10m.json",
  );
  const topology = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const collection: any = feature(topology, topology.objects.countries as never);

  const map = new Map<string, GeoFeature>();
  for (const f of collection.features as GeoFeature[]) {
    if (f.id != null) map.set(String(f.id), f);
  }
  featuresById = map;
  return map;
}

/**
 * Returns an SVG path "d" string for the given country's real outline,
 * fitted (with even padding) into a square OUTLINE_VIEWBOX_SIZE viewBox.
 * Undefined if the country isn't in the boundary dataset.
 */
export function getCountryOutlinePath(isoA3: string): string | undefined {
  const numericId = ALPHA3_TO_NUMERIC[isoA3];
  if (!numericId) return undefined;

  const found = loadFeatures().get(numericId);
  if (!found) return undefined;

  const extent: [[number, number], [number, number]] = [
    [PADDING, PADDING],
    [OUTLINE_VIEWBOX_SIZE - PADDING, OUTLINE_VIEWBOX_SIZE - PADDING],
  ];

  // geoIdentity plots [lon, lat] directly (no map projection distortion) —
  // enough for a recognizable silhouette, and avoids projection edge cases
  // for antimeridian-crossing shapes. reflectY corrects for SVG's
  // downward-increasing y axis vs. latitude's upward-increasing one.
  const projection = geoIdentity()
    .reflectY(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .fitExtent(extent, found as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return geoPath(projection)(found as any) ?? undefined;
}
