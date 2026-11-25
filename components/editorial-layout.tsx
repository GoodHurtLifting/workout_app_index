import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function EditorialLayout({ children }: { children: ReactNode }) {
  return <div className="product-shell editorial-shell"><SiteHeader /><main className="editorial-main" id="main-content">{children}</main><SiteFooter /></div>;
}
