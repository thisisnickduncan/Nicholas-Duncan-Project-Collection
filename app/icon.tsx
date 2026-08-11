import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Ink square, paper initials — the site's own two colours at favicon scale. */
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
          background: "#1c1a16",
          color: "#e9e6dd",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "-0.05em",
        }}
      >
        ND
      </div>
    ),
    size
  );
}
