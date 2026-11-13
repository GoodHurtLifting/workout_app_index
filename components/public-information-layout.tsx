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
          <Link href="/apps">Browse app profiles</Link>
        </nav>
        <header className="public-information-header">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{introduction}</p>
        </header>
        <div className="public-information-content">{children}</div>
        <nav className="public-information-links" aria-label="More information">
          <Link href="/apps">Browse apps</Link>
          <Link href="/find">Find an app</Link>
          <Link href="/how-we-score">How matching works</Link>
          <Link href="/editorial-standards">Editorial standards</Link>
          <Link href="/corrections">Corrections</Link>
          <Link href="/submit-app">Submit an app</Link>
          <Link href="/services">Testing &amp; Research</Link>
          <Link href="/partnerships">Partnerships</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/apps">Browse app profiles</Link>
        </nav>
      </div>
    </main>
  );
}
