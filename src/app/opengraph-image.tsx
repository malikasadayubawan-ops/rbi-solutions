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
            "radial-gradient(ellipse 70% 60% at 50% 40%, #1a1508 0%, #0b0d10 70%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 30,
            letterSpacing: 6,
            color: "#f1e9d8",
          }}
        >
          <span>RBI</span>
          <span style={{ color: "#c6a15b" }}>SOLUTIONS</span>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 60,
            color: "#f1e9d8",
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
            background: "#c6a15b",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
