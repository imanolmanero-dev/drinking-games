import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "BeberGames — Good company. Your pace.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function EnglishOpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 90, background: "#0a0a0f", color: "#f0f0f5", fontFamily: "sans-serif", borderBottom: "16px solid #a855f7" }}>
      <div style={{ display: "flex", fontSize: 34, color: "#d8b4fe", marginBottom: 40 }}>BeberGames</div>
      <div style={{ display: "flex", fontSize: 76, fontWeight: 700 }}>Good company.</div>
      <div style={{ display: "flex", fontSize: 76, fontWeight: 700 }}>Your pace.</div>
      <div style={{ display: "flex", marginTop: 44, fontSize: 28, color: "#d4d4d8" }}>Friends first. Alcohol optional. · bebergames.com/en</div>
    </div>,
    size,
  );
}
