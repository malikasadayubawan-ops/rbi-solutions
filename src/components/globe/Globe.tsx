"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { coordinates, latLonToVector3 } from "@/data/geo";
import { countries } from "@/data/countries";

const RADIUS = 2.35;
const GOLD = "#c6a15b";

function Graticule() {
  const geometry = useMemo(() => {
    const points: number[] = [];
    const segments = 48;

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
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(RADIUS + 0.03, 3), []);
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
      <sphereGeometry args={[RADIUS, 48, 48]} />
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
      <sphereGeometry args={[RADIUS - 0.01, 64, 64]} />
      <meshStandardMaterial color="#242a34" roughness={0.75} metalness={0.25} />
    </mesh>
  );
}

interface MarkerProps {
  slug: string;
  active: boolean;
  interactive: boolean;
  onSelect?: (slug: string) => void;
}

function Marker({ slug, active, interactive, onSelect }: MarkerProps) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Mesh>(null);
  const [lat, lon] = coordinates[slug];
  const position = latLonToVector3(lat, lon, RADIUS + 0.02);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const pulse = active || hovered ? 1 + Math.sin(t * 4) * 0.15 : 1;
    ref.current.scale.setScalar(pulse * (active || hovered ? 1.8 : 1));
  });

  return (
    <mesh
      ref={ref}
      position={position}
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
      <meshBasicMaterial color={active || hovered ? "#e0bd7c" : GOLD} />
    </mesh>
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
      return curve.getPoints(40).map((p) => [p.x, p.y, p.z] as [number, number, number]);
    });
  }, [slugs]);

  useFrame((_, delta) => {
    lineRefs.current.forEach((line) => {
      const mat = line?.material;
      if (mat && typeof mat.dashOffset === "number") {
        mat.dashOffset -= delta * 0.35;
      }
    });
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
}

export default function Globe({
  activeSlug = null,
  onSelect,
  interactive = false,
  autoRotate = true,
  showMarkers = true,
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
        countries.map((c) => (
          <Marker
            key={c.slug}
            slug={c.slug}
            active={activeSlug === c.slug}
            interactive={interactive}
            onSelect={onSelect}
          />
        ))}
    </group>
  );
}
