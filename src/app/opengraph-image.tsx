import { ImageResponse } from "next/og";

/**
 * Dynamic Open Graph image — generated at the edge, no designer needed.
 * Shows up when the site is shared on LinkedIn / X / WhatsApp / Slack etc.
 * Next.js auto-uses this for og:image (and we point twitter at it too).
 */
export const runtime = "edge";
export const alt = "404 DAMNED — Premium Digital Agency Amsterdam";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(900px 500px at 75% 15%, rgba(214,0,28,0.22), transparent 60%), #050505",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* top row: logo lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#D6001C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            404
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 8,
            }}
          >
            DAMNED
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#fff",
              fontSize: 76,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: -1,
              textTransform: "uppercase",
            }}
          >
            We don&apos;t build websites.
          </div>
          <div
            style={{
              color: "#D6001C",
              fontSize: 76,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: -1,
              textTransform: "uppercase",
            }}
          >
            We build digital weapons.
          </div>
        </div>

        {/* bottom row: tagline + location */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 24 }}>
            Web · E-commerce · AI Automation · Branding · SEO
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Amsterdam
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
