import type { ReactNode } from "react";
import { getPublishedRoute, type RouteId } from "@/lib/i18n/routes";

// Plain anchors also make crossing the two independent document roots explicit.
export default function EnglishLink({ routeId, id, children, className, fragment = "" }: {
  routeId: RouteId; id: string; children?: ReactNode; className?: string; fragment?: string;
}) {
  const route = getPublishedRoute(routeId, "en-US");
  if (!route) return null;
  return <a id={id} href={`${route.pathname}${fragment}`} className={className}>{children ?? route.label}</a>;
}
