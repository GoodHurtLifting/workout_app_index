import Link from "next/link";
import { Check, ChevronRight, LogOut } from "lucide-react";
import { catalogVersion } from "@/lib/catalog";
import { requireCatalogAdmin } from "@/lib/admin-auth";
import { listCatalogRecords, listPublications } from "@/lib/catalog-repository";
import { listEditorialRequests } from "@/lib/editorial-requests";
import { CopyResearchBrief } from "@/components/copy-research-brief";
import { acceptAppSubmissionForResearch, deleteAppSubmission, importPreliminaryCatalog, markEditorialRequestSeen, publishApprovedCatalog } from "./actions";
import "./admin.css";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireCatalogAdmin("/admin");
  const apps = await listCatalogRecords();
  const publications = await listPublications();
  const editorialRequests = await listEditorialRequests();
  const newRequests = editorialRequests.filter(request => request.status === "new").length;
  const reviewed = apps.filter(app => app.researchStatus === "Reviewed").length;
  const verified = apps.reduce((sum, app) => sum + app.verifiedSections, 0);
  const total = apps.reduce((sum, app) => sum + app.totalSections, 0);

  return <main className="admin-page standalone-admin">
    <div className="admin-utility"><Link href="/">← Public preview</Link><span>{user.displayName}</span><form action="/api/auth/logout" method="post"><button type="submit"><LogOut/> Sign out</button></form></div>
    <div className="admin-head"><div><p className="eyebrow">INTERNAL CATALOG · {catalogVersion}</p><h1>Research dashboard</h1><p>The operating surface for building a trustworthy public index.</p></div><form action={importPreliminaryCatalog}><button className="admin-primary" type="submit">Import missing preliminary apps</button></form></div>
    <nav className="admin-section-nav" aria-label="Dashboard sections">
      <a href="#editorial-inbox">Submissions <span>{newRequests} new</span></a>
      <a href="#app-evaluations">App evaluations <span>{apps.length}</span></a>
      <a href="#publication-history">Publication history</a>
    </nav>
    <section className="editorial-inbox" id="editorial-inbox">
      <div><p className="eyebrow">EDITORIAL INBOX</p><h2>App submissions and corrections</h2><p className="editor-help">Mark seen to acknowledge a request. Accept for research to add an unpublished Candidate; submitted claims still need verification.</p></div>
      {editorialRequests.length ? editorialRequests.map((request) => (
        <article id={`submission-${request.id}`} key={request.id}>
          <div className="editorial-inbox-heading">
            <strong>{request.kind === "app" ? `App submission: ${request.appName}` : "Correction request"}</strong>
            <span>{request.status === "accepted" ? "Accepted for research" : request.status === "new" ? "New" : "Seen"} · {new Date(request.createdAt).toLocaleDateString("en-US")}</span>
          </div>
          <p>From {request.name} · <a href={`mailto:${request.email}`}>{request.email}</a></p>
          <p>{request.details}</p>
          {request.kind === "app" ? (
            <div className="editorial-inbox-details">
              <span>Price: {request.pricing}</span><span>Availability: {request.availability}</span>
              <a href={request.websiteUrl} target="_blank" rel="noopener noreferrer">Website</a>
              {request.storeUrl ? <a href={request.storeUrl} target="_blank" rel="noopener noreferrer">Store listing</a> : null}
              <a href={request.privacyUrl} target="_blank" rel="noopener noreferrer">Privacy policy</a>
            </div>
          ) : (
            <div className="editorial-inbox-details">
              <a href={request.pageUrl} target="_blank" rel="noopener noreferrer">Page to correct</a>
              <a href={request.sourceUrl} target="_blank" rel="noopener noreferrer">Source</a>
            </div>
          )}
          {request.kind === "app" ? <CopyResearchBrief submission={request} /> : null}
          <div className="editorial-actions">
            {request.status === "new" ? <form action={markEditorialRequestSeen}><input type="hidden" name="id" value={request.id}/><button type="submit">Mark seen</button></form> : null}
            {request.kind === "app" && request.status !== "accepted" ? <form action={acceptAppSubmissionForResearch}><input type="hidden" name="id" value={request.id}/><button className="accept-candidate" type="submit">Accept for research</button></form> : null}
            {request.kind === "app" && request.candidateAppId ? <Link href={`/admin/apps/${request.candidateAppId}`}>Open catalog evaluation →</Link> : null}
          </div>
          {request.kind === "app" ? <details className="editorial-delete">
            <summary>Delete submission</summary>
            <p>This permanently removes this submission and its notification record. It does not change the catalog.</p>
            <form action={deleteAppSubmission}>
              <input type="hidden" name="id" value={request.id}/>
              <label><input type="checkbox" name="confirmDelete" required/> I want to delete {request.appName}.</label>
              <button type="submit">Permanently delete</button>
            </form>
          </details> : null}
        </article>
      )) : <p>No submissions yet.</p>}
    </section>
    <div className="admin-stats"><article><span>{apps.length}</span><p>Catalog evaluations</p></article><article><span>{reviewed}</span><p>Owner-reviewed profiles</p></article><article><span>{apps.length-reviewed}</span><p>Still in review</p></article><article><span>{verified}/{total}</span><p>Sections verified</p></article></div>
    <div className="admin-work" id="app-evaluations"><div className="admin-list"><div className="admin-list-head"><h2>App evaluations</h2><span>Research state</span></div>{apps.map(app=><Link className="admin-row" href={`/admin/apps/${app.id}`} key={app.id}><span className="app-logo" style={{background:app.color}}>{app.initials}</span><span><strong>{app.name}</strong><small>{app.type}</small></span><i className={app.researchStatus.toLowerCase().replace(" ","-")}>{app.researchStatus}</i><span className="freshness">{app.verifiedSections} of {app.totalSections} sections</span><ChevronRight/></Link>)}</div><aside><p className="eyebrow">PUBLISHING GATE</p><h2>Nothing goes public by accident.</h2><ul><li><Check/> Platforms and access checked</li><li><Check/> Pricing dated and sourced</li><li><Check/> AI status classified</li><li><Check/> Feature evidence attached</li><li><Check/> Legit Score reviewed</li><li><Check/> Disclosures complete</li></ul><p>Only records marked Reviewed and backed by evidence enter a public snapshot.</p><form action={publishApprovedCatalog}><button className="publish-button" type="submit" disabled={!apps.some(app=>app.researchStatus==="Reviewed")}>Publish approved catalog</button></form></aside></div>
    <section className="publication-history" id="publication-history"><div><p className="eyebrow">PUBLICATION HISTORY</p><h2>Versioned catalog snapshots</h2></div>{publications.length?<div>{publications.map(item=><article key={item.id}><strong>{item.catalog_version}</strong><span>{new Date(item.published_at).toLocaleString("en-US")}</span><small>Fit {item.fit_methodology_version} · Legit {item.legit_methodology_version}</small></article>)}</div>:<p>No catalog snapshots published yet.</p>}</section>
  </main>;
}
