import { ImageResponse } from "next/og";

// Proper 180×180 PNG touch icon for iOS home-screen bookmarks.
// Next auto-injects <link rel="apple-touch-icon" href="/apple-icon">.
export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            background: "#D6001C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 52,
            fontWeight: 800,
            fontFamily: "sans-serif",
            letterSpacing: 1,
          }}
        >
          404
        </div>
      </div>
    ),
    { ...size }
  );
}
