import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0d10",
          border: "1px solid #c6a15b",
          borderRadius: 4,
          color: "#c6a15b",
          fontSize: 18,
          fontStyle: "italic",
        }}
      >
        R
      </div>
    ),
    { ...size },
  );
}
