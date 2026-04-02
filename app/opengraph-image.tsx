import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "BeberGames — Juegos para beber con amigos";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0f 0%, #16161f 50%, #0a0a0f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Background gradient orb */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(236,72,153,0.15) 50%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Emoji row */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: "48px",
            marginBottom: "24px",
          }}
        >
          <span>🍺</span>
          <span>🎲</span>
          <span>🎡</span>
          <span>🔥</span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#f0f0f5",
              letterSpacing: "-2px",
            }}
          >
            Beber
          </span>
          <span
            style={{
              fontSize: "72px",
              fontWeight: 800,
              background: "linear-gradient(90deg, #a855f7, #ec4899)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-2px",
            }}
          >
            Games
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "28px",
            color: "#71717a",
            margin: 0,
            textAlign: "center",
          }}
        >
          Juegos para beber con amigos · Yo Nunca · Verdad o Reto · Triman · La Ruleta
        </p>

        {/* Bottom badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "40px",
            padding: "10px 24px",
            borderRadius: "9999px",
            border: "1px solid rgba(168,85,247,0.3)",
            background: "rgba(168,85,247,0.08)",
            fontSize: "18px",
            color: "#a855f7",
          }}
        >
          🍻 drinking-games-lemon.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
