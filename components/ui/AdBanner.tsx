"use client";

import { useEffect } from "react";

interface AdBannerProps {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
}

export default function AdBanner({
  dataAdSlot,
  dataAdFormat = "auto",
  dataFullWidthResponsive = true,
}: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Adsense error", err);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden flex justify-center my-4">
      {/* 
        This is a placeholder component for AdSense.
        Replace data-ad-client with the actual ID once approved.
      */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", minWidth: "250px", minHeight: "50px", textAlign: "center" }}
        data-ad-client="ca-pub-2015657577739632"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      />
    </div>
  );
}
