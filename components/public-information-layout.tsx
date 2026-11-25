import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { ReactNode } from "react";

export function PublicInformationLayout({
  eyebrow,
  title,
  introduction,
  children,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  children: ReactNode;
}) {
  return (
    <div className="product-shell public-information-shell">
      <SiteHeader />
      <main>
        <div className="public-information-wrap">
          <header className="public-information-header">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{introduction}</p>
          </header>
          <div className="public-information-content">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
