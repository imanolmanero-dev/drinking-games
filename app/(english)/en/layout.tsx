import type { ReactNode } from "react";

// This segment owns the generated English OG image. Child metadata reads its
// resolved descriptor (including Next's route-group suffix) from the parent.
export default function EnglishPagesLayout({ children }: { children: ReactNode }) {
  return children;
}
