export const rootFile = "app/(spanish)/layout.tsx";
export const loadingReplacements = [
  ['import { Geist, Geist_Mono } from "next/font/google";', 'import { Geist, Geist_Mono } from "next/font/google";\nimport Script from "next/script";'],
  ['        <script\n          async', '        {/* Sole AdSense owner: wait for load + idle, not partial hydration. */}\n        <Script\n          id="spanish-adsense"\n          strategy="lazyOnload"'],
];
