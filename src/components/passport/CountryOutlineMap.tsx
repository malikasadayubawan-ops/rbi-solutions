"use client";

interface Props {
  path: string;
  name: string;
}

const VIEWBOX_SIZE = 200;

export default function CountryOutlineMap({ path, name }: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-card-raised">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 65% at 50% 45%, #ffffff 0%, #f7f8fa 60%, #eef1f5 100%)",
        }}
      />
      <svg
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={`Outline map of ${name}`}
      >
        <path
          d={path}
          fill="var(--color-brand)"
          fillOpacity={0.08}
          stroke="var(--color-brand)"
          strokeOpacity={0.65}
          strokeWidth={0.9}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <p className="absolute inset-x-0 bottom-5 text-center text-[10px] uppercase tracking-[0.35em] text-brand-dim">
        {name}
      </p>
    </div>
  );
}
