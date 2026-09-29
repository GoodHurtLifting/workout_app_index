import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOriginalityProfile, getTrainingRelationship } from "@/lib/catalog";
import { getPublicCatalog } from "@/lib/catalog-repository";
import { AdSlot } from "@/components/ad-slot";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { apps } = await getPublicCatalog();
  const app = apps.find((candidate) => candidate.id === id);
  if (!app) return {};
  const title = `${app.name} Review, Pricing & Best Fit | Workout App Index`;
  const description = `${app.description} See pricing, platforms, AI use, training style, tradeoffs, and who ${app.name} fits best.`;
  return { title, description, alternates: { canonical: `/apps/${app.id}` }, openGraph: { title, description, type: "article", url: `/apps/${app.id}`, siteName: "Workout App Index" } };
}

export default async function AppProfilePage({ params }: Props) {
  const { id } = await params;
  const { apps } = await getPublicCatalog();
  const app = apps.find((candidate) => candidate.id === id);
  if (!app) notFound();
  const relationship = getTrainingRelationship(app.id);
  const originality = getOriginalityProfile(app.id);
  const related = apps.filter((candidate) => candidate.id !== app.id && candidate.goals.some((goal) => app.goals.includes(goal))).sort((a, b) => b.legit - a.legit).slice(0, 3);
  const structuredData = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: app.name, description: app.description, applicationCategory: "HealthApplication", operatingSystem: app.platforms.join(", "), url: `https://workoutappindex.com/apps/${app.id}` };

  return <main className="product-shell public-profile-shell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <section className="profile-page">
      <nav className="public-profile-nav" aria-label="Profile navigation"><Link href="/">Workout App Index</Link><Link href="/">Browse all apps</Link></nav>
      <div className="profile-hero"><div className="profile-title"><span className="app-logo profile-logo" style={{ background: app.color }}>{app.initials}</span><div><p className="eyebrow">{app.type}</p><h1>{app.name}</h1><p>{app.description}</p></div></div><div className="profile-score"><span>LEGIT SCORE</span><strong>{app.legit}</strong><small>{app.researchStatus}</small></div></div>
      <div className="profile-verdict"><div><p className="eyebrow">QUICK VERDICT</p><h2>Best for {app.bestFor.toLowerCase()}.</h2><p>{app.caveat}</p></div><Link className="profile-finder-link" href="/">Find my app</Link></div>
      <div className="profile-grid">
        <article><p className="eyebrow">AT A GLANCE</p><dl><div><dt>Price</dt><dd>{app.price}</dd></div><div><dt>Platforms</dt><dd>{app.platforms.join(", ")}</dd></div><div><dt>Programming</dt><dd>{app.authorship}</dd></div><div><dt>AI status</dt><dd>{app.ai}</dd></div><div><dt>Experience</dt><dd>{app.level.join(", ")}</dd></div></dl></article>
        <article><p className="eyebrow">NOTABLE FEATURES</p><div className="feature-list">{app.features.map((feature) => <span key={feature}>✓ {feature}</span>)}</div></article>
        <article className="relationship-card"><p className="eyebrow">HOW THIS APP EXPECTS YOU TO TRAIN</p><div className="relationship-summary"><div><span>Planning</span><strong>{relationship.planningStyle}</strong></div><div><span>Choice load</span><strong>{relationship.choiceLoad}</strong></div><div><span>Continuity</span><strong>{relationship.continuity}</strong></div><div><span>Customization</span><strong>{relationship.customization}</strong></div></div><div className="relationship-decisions"><div><h3>Decisions it makes easier</h3><p>{relationship.decisionsRemoved}</p></div><div><h3>Decisions you still own</h3><p>{relationship.decisionsRemaining}</p></div><div><h3>The tradeoff</h3><p>{relationship.tradeoff}</p></div></div><div className="relationship-fit"><div><h3>This may sound like you</h3><p>{relationship.idealUser}</p></div><div><h3>Probably not your fit</h3><p>{relationship.notFor}</p></div></div></article>
        <article className="quality-card"><p className="eyebrow">ORIGINALITY &amp; IDENTITY</p><h2>{originality.score}/100 · {originality.level}</h2><p>{originality.summary}</p><small className="evidence-note">{originality.evidenceNote}</small></article>
      </div>
      {app.people?.length ? <section className="related-apps people-connections" aria-labelledby="people-heading"><p className="eyebrow">DOCUMENTED PEOPLE CONNECTIONS</p><h2 id="people-heading">Creators and trainers</h2><div>{app.people.map((person) => <article key={`${person.name}-${person.role}`}><strong>{person.name}</strong><span>{person.role}: {person.relationship}</span><a href={person.sourceUrl} target="_blank" rel="noopener noreferrer">View source</a></article>)}</div></section> : null}
      <AdSlot placement="profile" />
      <section className="related-apps"><p className="eyebrow">RELATED OPTIONS</p><h2>Compare nearby fits</h2><div>{related.map((candidate) => <Link href={`/apps/${candidate.id}`} key={candidate.id}><strong>{candidate.name}</strong><span>{candidate.bestFor}</span></Link>)}</div></section>
      <div className="verification-note"><strong>Research status: {app.researchStatus}</strong><p>{app.verifiedSections} of {app.totalSections} research sections currently have evidence.</p></div>
      <nav className="public-information-links" aria-label="Editorial information"><Link href="/editorial-standards">Editorial standards</Link><Link href="/corrections">Suggest a correction</Link><Link href="/submit-app">Submit an app</Link></nav>
    </section>
  </main>;
}
