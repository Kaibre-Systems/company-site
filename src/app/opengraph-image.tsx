import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";
import { RAW } from "@/lib/raw-colors";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — ${SITE.positioning}`;

/**
 * Shared social card. Typographic, generated at build time — no raster asset
 * ships in the repository.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: RAW.ink950,
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 3, background: RAW.brand500 }} />
          <div
            style={{
              color: RAW.ink400,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {SITE.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            color: RAW.ink100,
            fontSize: 76,
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 940,
          }}
        >
          Software for work that has to be right.
        </div>

        <div
          style={{
            display: "flex",
            color: RAW.ink400,
            fontSize: 26,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Products, partnerships, and a small number of commissioned production
          systems.
        </div>
      </div>
    ),
    size,
  );
}
