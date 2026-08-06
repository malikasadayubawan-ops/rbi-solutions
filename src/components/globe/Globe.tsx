"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { coordinates, latLonToVector3 } from "@/data/geo";
import { countries } from "@/data/countries";
import { offices, type Office } from "@/data/offices";

const RADIUS = 2.35;
const GOLD = "#c6a15b";
const BEACON = "#fff2d1";
const PLATINUM = "#d8dfe8";

// Countries where RBI Solutions currently offers programs/services — these
// get the glowing beacon treatment on the globe. The rest still show as
// regular (smaller, dimmer) markers so the map stays fully navigable.
const HIGHLIGHTED_SLUGS = new Set([
  "brazil",
  "portugal",
  "spain",
  "france",
  "malta",
  "uae",
  "saudi-arabia",
  "oman",
  "united-kingdom",
  "azerbaijan",
  "dominica",
  "st-kitts-and-nevis",
  "grenada",
  "vanuatu",
  "georgia",
]);

function Graticule() {
  const geometry = useMemo(() => {
    const points: number[] = [];
    const segments = 24;

    for (let lat = -60; lat <= 60; lat += 30) {
      for (let i = 0; i < segments; i++) {
        const lon1 = (i / segments) * 360 - 180;
        const lon2 = ((i + 1) / segments) * 360 - 180;
        const [x1, y1, z1] = latLonToVector3(lat, lon1, RADIUS);
        const [x2, y2, z2] = latLonToVector3(lat, lon2, RADIUS);
        points.push(x1, y1, z1, x2, y2, z2);
      }
    }

    for (let lon = -180; lon < 180; lon += 30) {
      for (let i = 0; i < segments; i++) {
        const lat1 = (i / segments) * 180 - 90;
        const lat2 = ((i + 1) / segments) * 180 - 90;
        const [x1, y1, z1] = latLonToVector3(lat1, lon, RADIUS);
        const [x2, y2, z2] = latLonToVector3(lat2, lon, RADIUS);
        points.push(x1, y1, z1, x2, y2, z2);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={GOLD} transparent opacity={0.45} />
    </lineSegments>
  );
}

function Outline() {
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(RADIUS + 0.03, 1), []);
  return (
    <lineSegments>
      <edgesGeometry args={[geometry]} attach="geometry" />
      <lineBasicMaterial color={GOLD} transparent opacity={0.18} />
    </lineSegments>
  );
}

function Atmosphere() {
  return (
    <mesh scale={1.12}>
      <sphereGeometry args={[RADIUS, 24, 24]} />
      <meshBasicMaterial
        color={GOLD}
        transparent
        opacity={0.18}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Core() {
  return (
    <mesh>
      <sphereGeometry args={[RADIUS - 0.01, 32, 32]} />
      <meshStandardMaterial color="#242a34" roughness={0.75} metalness={0.25} />
    </mesh>
  );
}

interface BeaconRingProps {
  position: [number, number, number];
  quaternion: THREE.Quaternion;
  phase: number;
}

// A soft expanding-and-fading ring lying flush against the globe surface —
// the "beacon" pulse for highlighted countries. Two of these per marker,
// half a cycle out of phase, read as one continuous gentle glow rather than
// a blinking ring.
function BeaconRing({ position, quaternion, phase }: BeaconRingProps) {
  const ref = useRef<THREE.Mesh>(null);
  const CYCLE = 2.6;

  useFrame((state) => {
    if (!ref.current) return;
    const t = ((state.clock.getElapsedTime() + phase) % CYCLE) / CYCLE;
    ref.current.scale.setScalar(0.8 + t * 2.4);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.5 * (1 - t);
  });

  return (
    <mesh position={position} quaternion={quaternion} renderOrder={1}>
      <ringGeometry args={[0.017, 0.024, 24]} />
      <meshBasicMaterial
        color={BEACON}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

interface MarkerProps {
  slug: string;
  active: boolean;
  interactive: boolean;
  highlighted: boolean;
  phase: number;
  onSelect?: (slug: string) => void;
}

function Marker({ slug, active, interactive, highlighted, phase, onSelect }: MarkerProps) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Mesh>(null);
  const wasLive = useRef(false);
  const [lat, lon] = coordinates[slug];
  const position = latLonToVector3(lat, lon, RADIUS + 0.02);
  const baseScale = highlighted ? 1.25 : 0.8;

  const quaternion = useMemo(() => {
    const normal = new THREE.Vector3(...position).normalize();
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  useFrame((state) => {
    if (!ref.current) return;
    const live = active || hovered;
    if (live) {
      const t = state.clock.getElapsedTime();
      const pulse = 1 + Math.sin(t * 4) * 0.15;
      ref.current.scale.setScalar(pulse * 1.8);
      wasLive.current = true;
    } else if (wasLive.current) {
      ref.current.scale.setScalar(baseScale);
      wasLive.current = false;
    }
  });

  return (
    <group>
      <mesh
        ref={ref}
        position={position}
        scale={baseScale}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (interactive) setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          if (interactive) onSelect?.(slug);
        }}
      >
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshBasicMaterial
          color={active || hovered ? "#e0bd7c" : highlighted ? BEACON : GOLD}
        />
      </mesh>
      {highlighted && (
        <>
          <BeaconRing position={position} quaternion={quaternion} phase={phase} />
          <BeaconRing position={position} quaternion={quaternion} phase={phase + 1.3} />
        </>
      )}
    </group>
  );
}

// A distinct, cooler-toned marker for RBI Solutions' own regional offices —
// visually separate from the warm gold program/beacon markers so the two
// meanings ("we operate a program here" vs "we have an office here") never
// get confused at a glance.
function OfficeMarker({ office }: { office: Office }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const position = latLonToVector3(office.lat, office.lon, RADIUS + 0.022);
  const quaternion = useMemo(() => {
    const normal = new THREE.Vector3(...position).normalize();
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [office.lat, office.lon]);

  useFrame((state) => {
    if (!ringRef.current) return;
    const CYCLE = 3.4;
    const t = (state.clock.getElapsedTime() % CYCLE) / CYCLE;
    ringRef.current.scale.setScalar(0.8 + t * 2.1);
    const mat = ringRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.4 * (1 - t);
  });

  return (
    <group>
      <mesh position={position} rotation={[0, 0, Math.PI / 4]} scale={0.9}>
        <boxGeometry args={[0.03, 0.03, 0.03]} />
        <meshBasicMaterial color={PLATINUM} />
      </mesh>
      <mesh ref={ringRef} position={position} quaternion={quaternion} renderOrder={1}>
        <ringGeometry args={[0.016, 0.021, 20]} />
        <meshBasicMaterial
          color={PLATINUM}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function FlightArcs({ activeSlug }: { activeSlug?: string | null }) {
  const slugs = countries.map((c) => c.slug);
  const lineRefs = useRef<(THREE.Object3D & { material?: THREE.Material & { dashOffset?: number } })[]>([]);

  const arcs = useMemo(() => {
    return slugs.map((slug, i) => {
      const next = slugs[(i + 1) % slugs.length];
      const [lat1, lon1] = coordinates[slug];
      const [lat2, lon2] = coordinates[next];
      const start = new THREE.Vector3(...latLonToVector3(lat1, lon1, RADIUS));
      const end = new THREE.Vector3(...latLonToVector3(lat2, lon2, RADIUS));
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const midLength = mid.length();
      mid.setLength(midLength + 0.55);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      return curve.getPoints(20).map((p) => [p.x, p.y, p.z] as [number, number, number]);
    });
  }, [slugs]);

  const activeIndex = activeSlug ? slugs.indexOf(activeSlug) : -1;

  useFrame((_, delta) => {
    // Only the active/highlighted arc animates its dash offset — idle arcs
    // stay static (they're at 28% opacity and the motion isn't perceptible),
    // which avoids 17 per-frame material writes on every tick.
    if (activeIndex === -1) return;
    const mat = lineRefs.current[activeIndex]?.material;
    if (mat && typeof mat.dashOffset === "number") {
      mat.dashOffset -= delta * 0.35;
    }
  });

  return (
    <group>
      {arcs.map((points, i) => {
        const isActiveArc = activeSlug && slugs[i] === activeSlug;
        return (
          <Line
            key={i}
            ref={(el) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              lineRefs.current[i] = el as any;
            }}
            points={points}
            color={GOLD}
            transparent
            opacity={isActiveArc ? 0.85 : 0.28}
            lineWidth={isActiveArc ? 1.5 : 0.75}
            dashed
            dashScale={12}
            dashSize={1}
            gapSize={2}
          />
        );
      })}
    </group>
  );
}

interface GlobeProps {
  activeSlug?: string | null;
  onSelect?: (slug: string) => void;
  interactive?: boolean;
  autoRotate?: boolean;
  showMarkers?: boolean;
  showOffices?: boolean;
}

export default function Globe({
  activeSlug = null,
  onSelect,
  interactive = false,
  autoRotate = true,
  showMarkers = true,
  showOffices = false,
}: GlobeProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current && autoRotate) {
      group.current.rotation.y += delta * 0.045;
    }
  });

  return (
    <group ref={group}>
      <Core />
      <Graticule />
      <Outline />
      <Atmosphere />
      <FlightArcs activeSlug={activeSlug} />
      {showMarkers &&
        countries.map((c, i) => (
          <Marker
            key={c.slug}
            slug={c.slug}
            active={activeSlug === c.slug}
            interactive={interactive}
            highlighted={HIGHLIGHTED_SLUGS.has(c.slug)}
            phase={i * 0.35}
            onSelect={onSelect}
          />
        ))}
      {showOffices &&
        offices.map((office) => <OfficeMarker key={office.city} office={office} />)}
    </group>
  );
}
