import Link from "next/link";
import type { AppRecord } from "@/lib/catalog";
import { coverageDescriptions, factLabel, profileCoverage } from "@/lib/catalog-coverage";

export function CoverageLabels({ app }: { app: AppRecord }) {
  return <div className="coverage-labels" aria-label="WAI coverage">{profileCoverage(app).labels.map(label =>
    <span key={label} title={coverageDescriptions[label]}>{label}</span>)}</div>;
}

export function ProfileCoverage({ app }: { app: AppRecord }) {
  const coverage = profileCoverage(app);
  return <section className="profile-coverage" aria-labelledby="coverage-heading">
    <p className="eyebrow">ABOUT WAI’S COVERAGE</p><h2 id="coverage-heading">What we researched and tested</h2>
    <CoverageLabels app={app}/>
    <p>Product descriptions and listed features are researched claims unless a specific hands-on finding below says otherwise. Coverage is not an endorsement or a reliability guarantee.</p>
    <p>{coverage.sourceDate ? `Latest recorded evidence check: ${coverage.sourceDate}.` : "Some source dates are not recorded; older references may have changed."} {coverage.labels.includes("Hands-on verified findings") ? "Hands-on coverage is limited to the scope below; other features remain untested." : "Hands-on verification is not established for this profile."}</p>
    {coverage.handsOn ? <div className="coverage-scope"><h3>Historical hands-on scope</h3><p>{coverage.handsOn.scope}</p><dl><div><dt>Testing date</dt><dd>{coverage.handsOn.testedAt}</dd></div><div><dt>Context and limits</dt><dd>{coverage.handsOn.context}</dd></div></dl></div> : null}
    {coverage.claims.length ? <div className="coverage-scope"><h3>Hands-on verified findings</h3><ul>{coverage.claims.map(claim => <li key={claim.field}><strong>{factLabel(claim.field)}</strong><p>{claim.statement}</p><small>Tested {claim.checkedAt}. {claim.context}</small></li>)}</ul></div> : null}
    <p><Link href="/editorial-standards#coverage">What the three coverage categories mean</Link></p>
  </section>;
}

export function EditorialCoverage({ app }: { app: AppRecord }) {
  const review = profileCoverage(app).editorialReview;
  if (!review) return null;
  return <section className="profile-sources"><p className="eyebrow">EDITORIAL REVIEW</p><h2>{review.title}</h2><p>Published {review.publishedAt}. Testing scope: {review.scope}</p>{review.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>;
}
