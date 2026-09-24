import Link from "next/link";
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
    <main className="product-shell public-information-shell">
      <div className="public-information-wrap">
        <nav className="public-profile-nav" aria-label="Site navigation">
          <Link href="/">Workout App Index</Link>
          <Link href="/">Back to the index</Link>
        </nav>
        <header className="public-information-header">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{introduction}</p>
        </header>
        <div className="public-information-content">{children}</div>
        <nav className="public-information-links" aria-label="More information">
          <Link href="/editorial-standards">Editorial standards</Link>
          <Link href="/corrections">Corrections</Link>
          <Link href="/submit-app">Submit an app</Link>
          <Link href="/">Back to the index</Link>
        </nav>
      </div>
    </main>
  );
}
