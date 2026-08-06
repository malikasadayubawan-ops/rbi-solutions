"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Globe from "./Globe";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/useInView";

interface GlobeCanvasProps {
  activeSlug?: string | null;
  onSelect?: (slug: string) => void;
  interactive?: boolean;
  autoRotate?: boolean;
  showOffices?: boolean;
  className?: string;
}

export default function GlobeCanvas({
  activeSlug,
  onSelect,
  interactive = false,
  autoRotate = true,
  showOffices = false,
  className,
}: GlobeCanvasProps) {
  const { ref, inView } = useInView<HTMLDivElement>("30% 0px");

  return (
    <div ref={ref} className={cn("relative", className)}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.4, 5.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        performance={{ min: 0.5 }}
        frameloop={inView ? "always" : "never"}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[4, 3, 5]} intensity={2.2} color="#f1e9d8" />
        <pointLight position={[-4, -2, -3]} intensity={1.1} color="#c6a15b" />
        <Suspense fallback={null}>
          <Globe
            activeSlug={activeSlug}
            onSelect={onSelect}
            interactive={interactive}
            autoRotate={autoRotate}
            showOffices={showOffices}
          />
        </Suspense>
        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={(2 * Math.PI) / 3}
            rotateSpeed={0.35}
          />
        )}
      </Canvas>
    </div>
  );
}
