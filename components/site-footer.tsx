import Link from "next/link";

export function SiteFooter() {
  return <footer className="wai-site-footer">
    <Link href="/" className="brand">WORKOUT APP <b>INDEX</b></Link>
    <p>Understand the apps. Find your fit.</p>
    <nav aria-label="Footer navigation">
      <Link href="/apps">Browse apps</Link><Link href="/find">Find an app</Link>
      <Link href="/reviews">Reviews &amp; Comparisons</Link><Link href="/about">About Workout App Index</Link>
      <Link href="/editorial-standards">Research standards</Link><Link href="/how-we-score">How matching works</Link>
      <Link href="/corrections">Corrections</Link><Link href="/submit-app">Submit an app</Link>
      <Link href="/services">Testing &amp; Research</Link><Link href="/partnerships">Partnerships</Link>
      <Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link>
    </nav>
    <small>© 2026 Turf King LLC. App names and trademarks belong to their respective owners. Commercial relationships do not buy recommendations.</small>
  </footer>;
}
