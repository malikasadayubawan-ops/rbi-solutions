"use client";

import type { Country } from "@/types/country";

interface Props {
  scene: Country["scene"];
  accent: string;
}

function SceneLines({ scene }: { scene: Country["scene"] }) {
  switch (scene) {
    case "coastal":
      return (
        <svg viewBox="0 0 1200 500" preserveAspectRatio="none" className="h-full w-full">
          <path d="M0,320 C150,290 300,350 450,320 C600,290 750,350 900,320 C1050,290 1150,330 1200,315" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <path d="M0,370 C180,340 320,390 500,365 C650,345 820,395 1000,368 C1100,355 1160,375 1200,365" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
          <path d="M0,420 C200,400 380,435 560,412 C720,392 880,432 1060,415 C1120,408 1160,418 1200,412" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        </svg>
      );
    case "desert":
      return (
        <svg viewBox="0 0 1200 500" preserveAspectRatio="none" className="h-full w-full">
          <path d="M0,380 Q200,300 420,370 T820,350 T1200,390 V500 H0 Z" fill="currentColor" opacity="0.08" />
          <path d="M0,380 Q200,300 420,370 T820,350 T1200,390" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <path d="M0,430 Q260,370 480,420 T900,400 T1200,435" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        </svg>
      );
    case "alpine":
      return (
        <svg viewBox="0 0 1200 500" preserveAspectRatio="none" className="h-full w-full">
          <polyline points="0,420 140,260 260,360 400,200 540,340 680,240 820,380 960,270 1100,360 1200,300" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <polyline points="0,460 180,350 340,420 520,320 700,410 900,340 1080,420 1200,380" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        </svg>
      );
    case "urban":
      return (
        <svg viewBox="0 0 1200 500" preserveAspectRatio="none" className="h-full w-full">
          {[60, 140, 220, 310, 400, 500, 600, 700, 800, 900, 1000, 1100].map((x, i) => {
            const h = 90 + ((i * 47) % 160);
            return (
              <rect
                key={x}
                x={x}
                y={430 - h}
                width="52"
                height={h}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity={0.35 + (i % 3) * 0.08}
              />
            );
          })}
          <line x1="0" y1="430" x2="1200" y2="430" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        </svg>
      );
    case "island":
    default:
      return (
        <svg viewBox="0 0 1200 500" preserveAspectRatio="none" className="h-full w-full">
          <path d="M300,400 Q420,340 560,395 Q680,430 780,400" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <path d="M0,440 C160,415 300,455 460,432 C620,410 760,450 940,428 C1040,415 1140,432 1200,425" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
          <path d="M420,395 C440,360 470,345 500,395" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
          <path d="M540,398 C555,370 580,358 600,398" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        </svg>
      );
  }
}

export default function CountryIllustration({ scene, accent }: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-card-raised">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 90% 60% at 50% 100%, ${accent}22 0%, transparent 65%), linear-gradient(180deg, #ffffff 0%, #f7f8fa 55%, ${accent}18 100%)`,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[55%]" style={{ color: accent }}>
        <SceneLines scene={scene} />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, transparent 0%, rgba(255,255,255,0.4) 85%)",
        }}
      />
    </div>
  );
}
