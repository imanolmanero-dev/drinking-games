"use client";

import { useEffect, useRef } from "react";

const ADSENSE_CLIENT = "ca-pub-2015657577739632";
const VERDAD_RETO_EXPERIMENT_SLOT = "5189742299";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export default function VerdadRetoExperimentAd() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    initialized.current = true;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <aside
      aria-label="Publicidad"
      className="not-prose mx-auto my-12 w-full max-w-3xl"
    >
      <div className="mb-2 text-center text-[10px] uppercase tracking-wider text-muted">
        Publicidad
      </div>
      <div className="min-h-[100px] w-full sm:min-h-[120px]">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={VERDAD_RETO_EXPERIMENT_SLOT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
