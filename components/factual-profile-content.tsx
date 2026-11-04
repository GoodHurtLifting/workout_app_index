import Link from "next/link";
import type { AppRecord } from "@/lib/catalog";
import { currentClaim, latestFactDate, supportedFact, factLabel, relatedOptions } from "@/lib/catalog-facts";
import { getTrainingRelationship } from "@/lib/catalog";
import { OutboundAppButton } from "@/components/outbound-app-button";

export function CommercialDisclosure({app}:{app:AppRecord}) {
  return <>{app.commercialDisclosure?.status==="material"?<div className="verification-note"><strong>Commercial relationship</strong><p>{app.commercialDisclosure.statement}</p></div>:null}{app.id==="lift-league"||app.id==="caliper-cal"?<div className="verification-note"><strong>Ownership disclosure</strong><p>This product and Workout App Index share an owner, Turf King LLC. Ownership adds no finder points.</p></div>:null}</>;
}

export function FactSourceLog({app}:{app:AppRecord}) {
  return app.factClaims?.length?<section className="profile-sources"><p className="eyebrow">DATED FACTS AND SOURCES</p><h2>What supports this profile</h2><ul>{app.factClaims.map(claim=><li key={claim.field}><strong>{factLabel(claim.field)}: {claim.status}</strong><span>{claim.statement}</span><small>Checked {claim.checkedAt}. {claim.context}{currentClaim(app,claim.field)?"":" The recorded value has changed; this claim needs rechecking."}</small>{claim.url?<a href={claim.url} target="_blank" rel="noopener noreferrer">View supporting source</a>:null}</li>)}</ul></section>:null;
}

export function FactualProfileContent({app,apps,destinations={official_site:null,store:null}}:{app:AppRecord;apps:AppRecord[];destinations?:{official_site:string|null;store:string|null}}) {
  const relationship=getTrainingRelationship(app);
  const show=(field:string,value:string)=>supportedFact(app,field)&&value&&value!=="Not assessed"?value:"Not established";
  const related=relatedOptions(app,apps);
  return <section className="profile-page factual-profile">
    <nav className="public-profile-nav" aria-label="Profile navigation"><Link href="/">Workout App Index</Link><Link href="/">Browse all apps</Link></nav>
    <div className="profile-title"><span className="app-logo profile-logo" style={{background:app.color}}>{app.initials}</span><div><p className="eyebrow">FACTUAL PROFILE · UNRATED</p><h1>{app.name}</h1><p>{app.description}</p></div></div>
    <div className="verification-note"><strong>Sourced product information</strong><p>This profile has no editorial rating. Documentation describes what the publisher states; firsthand observations are identified separately. A factual profile does not imply a completed hands-on review. {latestFactDate(app)?`Latest recorded fact check: ${latestFactDate(app)}.`:""}</p></div>
    <CommercialDisclosure app={app}/>
    <div className="profile-verdict"><div><h2>Who it may suit</h2><p>{app.bestFor}</p><p>{app.caveat}</p><div className="profile-outbound-actions">{destinations.official_site?<OutboundAppButton appSlug={app.id} url={destinations.official_site} destinationType="official_site"/>:null}{destinations.store?<OutboundAppButton appSlug={app.id} url={destinations.store} destinationType="store"/>:null}</div></div></div>
    <div className="profile-grid"><article><h2>At a glance</h2><dl>{[["Price",show("pricing",app.price)],["Platforms",show("platforms",app.platforms.join(", "))],["AI use",show("ai",app.ai)],["Programming authorship",show("authorship",app.authorship)],["Experience",show("level",app.level.join(", "))]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></article>
    <article><h2>Documented features</h2><p>{show("features",app.features.join(" · "))}</p></article>
    <article className="relationship-card"><p className="eyebrow">HOW THIS APP EXPECTS YOU TO TRAIN</p><h2>{show("trainingRelationship",relationship.planningStyle)}</h2><div className="relationship-decisions">{[["Decisions it makes easier",relationship.decisionsRemoved],["Decisions you still own",relationship.decisionsRemaining],["The tradeoff",relationship.tradeoff]].map(([label,value])=><div key={label}><h3>{label}</h3><p>{show("trainingRelationship",value??"")}</p></div>)}</div></article></div>
    <FactSourceLog app={app}/>
    {related.length?<section className="related-apps"><h2>Related options</h2><div>{related.map(candidate=><Link href={`/apps/${candidate.id}`} key={candidate.id}>{candidate.name}</Link>)}</div></section>:null}
    <nav className="public-information-links" aria-label="More information"><Link href="/editorial-standards">Editorial standards</Link><Link href="/corrections">Suggest a correction</Link><Link href="/services">Testing &amp; Research</Link><Link href="/partnerships">Partnerships</Link></nav>
  </section>;
}
