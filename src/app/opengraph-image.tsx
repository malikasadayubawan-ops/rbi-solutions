import { ImageResponse } from "next/og";

export const alt = "RBI Solutions — Global Residency & Citizenship Advisory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #eef1f5 0%, #f7f8fa 70%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 30,
            letterSpacing: 6,
            color: "#131a24",
          }}
        >
          <span>RBI</span>
          <span style={{ color: "#2a5c8a" }}>SOLUTIONS</span>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 60,
            color: "#131a24",
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          Global Residency &amp; Citizenship Advisory
        </div>
        <div
          style={{
            marginTop: 30,
            height: 1,
            width: 220,
            background: "linear-gradient(90deg, #2a5c8a, #0e8262)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
