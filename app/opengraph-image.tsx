import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          backgroundColor: "#6E7C5C",
          padding: "80px",
        }}
      >
        {/* Decorative ellipse pair — mirrors the logo concept */}
        <div
          style={{
            display: "flex",
            marginBottom: "40px",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "72px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255,255,255,0.25)",
            }}
          />
          <div
            style={{
              width: "48px",
              height: "72px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255,255,255,0.15)",
              marginTop: "16px",
            }}
          />
        </div>

        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            textAlign: "center",
            fontFamily: "Georgia, serif",
          }}
        >
          Espacio Interior
        </div>

        <div
          style={{
            marginTop: "20px",
            fontSize: "28px",
            fontWeight: 400,
            color: "#d4e0d4",
            letterSpacing: "0.01em",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Terapia psicológica en línea
        </div>
      </div>
    ),
    { ...size }
  );
}
