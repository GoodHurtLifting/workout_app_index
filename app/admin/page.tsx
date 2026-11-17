import Link from "next/link";
import { ChevronRight, LogOut } from "lucide-react";
import { SubmissionInboxCard } from "@/components/submission-inbox-card";
import { catalogVersion } from "@/lib/catalog";
import { requireCatalogAdmin } from "@/lib/admin-auth";
import { listCatalogRecords, listPublications, getPublicCatalog, listAllEvidence, type EvidenceRow } from "@/lib/catalog-repository";
import { listEditorialRequests } from "@/lib/editorial-requests";
import { createFactualCatalogDraft, importPreliminaryCatalog } from "./actions";
import { catalogResearchDrafts } from "@/lib/catalog-research-drafts";
import { getCatalogEntryProposal } from "@/lib/catalog-maintenance-proposals";
import { catalogEntryProposalChanges } from "@/lib/catalog-proposals";
import { catalogMissingItems, hasCatalogPublicSource } from "@/lib/catalog-entry-editing";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { commercialProducts, type CommercialProduct } from "@/lib/developer-offers";
import { PartnerPlacementAdmin } from "@/components/partner-placement-admin";
import "./admin.css";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ cursor?: string; workflow?: string; deleted?: string }> }) {
  const user = await requireCatalogAdmin("/admin");
  const { cursor, workflow, deleted } = await searchParams;
  const [catalogEntries, evidence] = await Promise.all([listCatalogRecords(), listAllEvidence()]);
  const apps = catalogEntries.map(entry => entry.app);
  const evidenceByApp = new Map<string, EvidenceRow[]>();
  for (const source of evidence) {
    const sources = evidenceByApp.get(source.app_id) ?? [];
    sources.push(source);
    evidenceByApp.set(source.app_id, sources);
  }
  const publications = await listPublications();
  const { requests: editorialRequests, nextCursor } = await listEditorialRequests(cursor, deleted === "1");
  const publicIds=new Set((await getPublicCatalog()).apps.map(app=>app.id));
  const purchasedByApp = new Map<string, Set<string>>();
  const commerceRows = await getAdminFirestore().collection("editorialRequests").select("candidateAppId", "commercialCatalogAppId", "engagement", "listingPurchasedAt", "listingPaymentStatus").get();
  for (const row of commerceRows.docs) {
    const data = row.data(); const appId = data.commercialCatalogAppId || data.candidateAppId;
    if (!appId) continue;
    const purchased = purchasedByApp.get(appId) ?? new Set<string>();
    if (data.listingPurchasedAt && data.listingPaymentStatus !== "refunded") purchased.add("Get listed");
    for (const product of (data.engagement?.purchasedProducts ?? []) as CommercialProduct[]) if (commercialProducts[product]) purchased.add(commercialProducts[product]);
    purchasedByApp.set(appId, purchased);
  }
  const listed=apps.filter(app=>publicIds.has(app.id)).length;

  return <main className="admin-page standalone-admin">
    <div className="admin-utility"><Link href="/">← Public preview</Link><span>{user.displayName}</span><form action="/api/auth/logout" method="post"><button type="submit"><LogOut/> Sign out</button></form></div>
    <div className="admin-head"><div><p className="eyebrow">INTERNAL CATALOG · {catalogVersion}</p><h1>Research dashboard</h1><p>The operating surface for building a trustworthy public index.</p></div><form action={importPreliminaryCatalog}><button className="admin-primary" type="submit">Import missing preliminary apps</button></form></div>
    <form action={createFactualCatalogDraft} className="submission-decision"><h2>Start a factual profile</h2><p>Research a public product without developer participation. This creates a private Candidate with unknown facts and no rating.</p><label>App name<input name="name" required maxLength={120}/></label><button type="submit">Create private factual draft</button></form>
    <nav className="admin-section-nav" aria-label="Dashboard sections">
      <a href="#editorial-inbox">Requests <span>{editorialRequests.length} on this page</span></a>
      <a href="#app-evaluations">Catalog entries <span>{apps.length} total · {listed} public · {apps.length-listed} not public</span></a>
      <a href="#publication-history">Publication history</a>
    </nav>
    <section className="editorial-inbox" id="editorial-inbox">
      {workflow === "decision" ? <p className="admin-action-message" role="status">Owner decision saved. The catalog has not been published.</p> : null}
      {workflow === "round" ? <p className="admin-action-message" role="status">New review round started. Earlier findings remain in the history.</p> : null}
      {workflow === "service" ? <p className="admin-action-message" role="status">Private-work stage saved. No contract, payment, or message was created.</p> : null}
      <p><Link href={deleted === "1" ? "/admin#editorial-inbox" : "/admin?deleted=1#editorial-inbox"}>{deleted === "1" ? "Return to active inbox" : "Deleted submissions and retained billing history"}</Link></p>
      <div><p className="eyebrow">EDITORIAL INBOX</p><h2>Submissions, corrections, and private inquiries</h2><p className="editor-help">Verify eligibility, prepare factual catalog entries and track purchased work separately. Ordinary listings need public-source research and owner publication approval. Larger services follow their signed scope and verified deposit. No developer messages are sent by these saves.</p></div>
      {editorialRequests.length ? editorialRequests.map(request => <SubmissionInboxCard key={request.id} request={request} catalogOptions={apps.map(app => ({id:app.id,name:app.name}))}/>) : <p>No submissions on this page.</p>}
      <nav className="submission-pagination" aria-label="Submission pages"><Link href={deleted === "1" ? "/admin?deleted=1#editorial-inbox" : "/admin#editorial-inbox"}>Newest</Link>{nextCursor ? <Link href={`/admin?cursor=${nextCursor}${deleted === "1" ? "&deleted=1" : ""}#editorial-inbox`}>Older submissions →</Link> : null}</nav>
    </section>
    <div className="admin-stats"><article><span>{apps.length}</span><p>Catalog entries</p></article><article><span>{listed}</span><p>Public listings</p></article><article><span>{apps.length-listed}</span><p>Not public</p></article></div>
    <div className="admin-work" id="app-evaluations"><div className="admin-list"><div className="admin-list-head"><h2>Catalog entries</h2><span>Listing</span></div>{catalogEntries.map(({ app, saved }) => {
      const record = saved?.record ?? app;
      const proposed = saved ? getCatalogEntryProposal(saved.record, catalogResearchDrafts[app.id]) : undefined;
      const editCount = proposed ? catalogEntryProposalChanges(record, proposed).length : 0;
      const hasSource = hasCatalogPublicSource(record, evidenceByApp.get(app.id) ?? []);
      const missingItems = catalogMissingItems(record, hasSource);
      const reviewState = saved?.reviewState ?? "not_started";
      const purchased = [...(purchasedByApp.get(app.id) ?? [])];
      const isPublic = publicIds.has(app.id);
      return <div key={app.id}><Link className="admin-row catalog-entry-row" href={`/admin/apps/${app.id}`} key={app.id}>
        <span className="app-logo" style={{background:app.color}}>{app.initials}</span>
        <span><strong>{app.name}</strong><small>{app.type}</small></span>
        <span className="catalog-row-status">
          <i className={isPublic ? "reviewed" : "researching"}>{isPublic ? "Public" : "Not public"}</i>
          {editCount > 0 && <i className="researching">{editCount} edits to approve</i>}
          {missingItems.length > 0 && <i className="candidate">Missing content ({missingItems.length})</i>}
          <i className={reviewState === "complete" ? "reviewed" : "researching"}>{reviewState === "complete" ? "Review complete" : reviewState === "reviewing" ? "Reviewing" : "Not started"}</i>
          {purchased.length > 0 && <i className="reviewed" title={purchased.join(", ")}>Services purchased ({purchased.length})</i>}
        </span>
        <ChevronRight />
      </Link>{missingItems.length > 0 && <details className="catalog-missing-items"><summary>View missing items for {app.name}</summary><ul>{missingItems.map(item => <li key={item}>{item}</li>)}</ul></details>}
      {purchased.length > 0 && <p className="editor-help">Purchased: {purchased.join(", ")}</p>}</div>;
    })}</div><aside><p className="eyebrow">CATALOG EDITING</p><h2>Facts first. Edit each listing.</h2><p>Open an entry to edit its facts, sources, features and disclosure. Save a private draft, update that public listing, or hide it. Use the review status to track your own checks.</p><p>Public updates check identity, platforms, dated sources and disclosure. Optional capabilities can remain unknown. Other listings stay as they are.</p></aside></div>
    <section className="publication-history"><h2>Developer funnel reporting</h2><p>Saved requests and reconciled payments, grouped by the date app details were saved. Test submissions are excluded. Conversion window: seven days.</p><form action="/admin/reports" method="get"><label>From<input name="start" type="date" required /></label><label>Through<input name="end" type="date" required /></label><button type="submit">Open aggregate report</button></form></section>
    <PartnerPlacementAdmin />
    <section className="publication-history" id="publication-history"><div><p className="eyebrow">PUBLICATION HISTORY</p><h2>Versioned catalog snapshots</h2></div>{publications.length?<div>{publications.map(item=><article key={item.id}><strong>{item.catalog_version}</strong><span>{new Date(item.published_at).toLocaleString("en-US")}</span><small>Matching {item.fit_methodology_version}</small></article>)}</div>:<p>No catalog snapshots published yet.</p>}</section>
  </main>;
}
