import Link from "next/link";
import { Check, ChevronRight, LogOut } from "lucide-react";
import { catalogVersion } from "@/lib/catalog";
import { isLegacyPublicApp } from "@/lib/legacy-public-catalog";
import { requireCatalogAdmin } from "@/lib/admin-auth";
import { listCatalogRecords, listPublications } from "@/lib/catalog-repository";
import { getEditorialCapacity, listEditorialRequests } from "@/lib/editorial-requests";
import { MONTHLY_ACCEPTANCE_LIMIT, MONTHLY_SCREENING_LIMIT, normalizeAppSubmissionStatus, statusLabels } from "@/lib/submission-workflow";
import { CopyResearchBrief } from "@/components/copy-research-brief";
import { acceptAppSubmissionForResearch, changeSubmissionReviewStage, completeSubmissionScreening, deleteAppSubmission, importPreliminaryCatalog, markEditorialRequestSeen, publishApprovedCatalog, startSubmissionScreening } from "./actions";
import "./admin.css";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ cursor?: string }> }) {
  const user = await requireCatalogAdmin("/admin");
  const { cursor } = await searchParams;
  const apps = await listCatalogRecords();
  const publications = await listPublications();
  const { requests: editorialRequests, nextCursor } = await listEditorialRequests(cursor);
  const capacity = await getEditorialCapacity();
  const activeApp = editorialRequests.find(item => item.id === capacity.activeSubmissionId);
  const newRequests = editorialRequests.filter(request => request.kind === "app" && !request.seenAt).length;
  const reviewed = apps.filter(app => app.researchStatus === "Reviewed").length;
  const verified = apps.reduce((sum, app) => sum + app.verifiedSections, 0);
  const total = apps.reduce((sum, app) => sum + app.totalSections, 0);

  return <main className="admin-page standalone-admin">
    <div className="admin-utility"><Link href="/">← Public preview</Link><span>{user.displayName}</span><form action="/api/auth/logout" method="post"><button type="submit"><LogOut/> Sign out</button></form></div>
    <div className="admin-head"><div><p className="eyebrow">INTERNAL CATALOG · {catalogVersion}</p><h1>Research dashboard</h1><p>The operating surface for building a trustworthy public index.</p></div><form action={importPreliminaryCatalog}><button className="admin-primary" type="submit">Import missing preliminary apps</button></form></div>
    <nav className="admin-section-nav" aria-label="Dashboard sections">
      <a href="#editorial-inbox">Submissions <span>{newRequests} unseen on this page</span></a>
      <a href="#app-evaluations">App evaluations <span>{apps.length}</span></a>
      <a href="#publication-history">Publication history</a>
    </nav>
    <section className="editorial-inbox" id="editorial-inbox">
      <div><p className="eyebrow">EDITORIAL INBOX</p><h2>App submissions and corrections</h2><p className="editor-help">Submissions are internal unverified research leads. Mark seen only acknowledges receipt. Screen up to {MONTHLY_SCREENING_LIMIT} and accept up to {MONTHLY_ACCEPTANCE_LIMIT} for research per calendar month. One app can be in active deep review at a time. Submission, research, owner approval, and publication remain separate.</p>
      <p className="editor-help">This month: {capacity.screenings}/{MONTHLY_SCREENING_LIMIT} screens · {capacity.acceptances}/{MONTHLY_ACCEPTANCE_LIMIT} research acceptances. Active deep review: {capacity.activeSubmissionId ? activeApp?.kind === "app" ? activeApp.appName : "An app on another page" : "None"}. No developer stage emails are sent.</p></div>
      {editorialRequests.length ? editorialRequests.map((request) => (
        <article id={`submission-${request.id}`} key={request.id}>
          <div className="editorial-inbox-heading">
            <strong>{request.kind === "app" ? `App submission: ${request.appName}` : "Correction request"}</strong>
            <span>{request.kind === "app" ? statusLabels[normalizeAppSubmissionStatus(request.status)] : request.seenAt ? "Seen" : "Received"} · {new Date(request.createdAt).toLocaleDateString("en-US")}</span>
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
          {request.kind === "app" ? <div className="submission-meta">
            <span>Received {new Date(request.createdAt).toLocaleDateString("en-US")}</span>
            <span>Seen {request.seenAt ? new Date(request.seenAt).toLocaleDateString("en-US") : "pending"}</span>
            <span>Screened {request.screeningCompletedAt ? new Date(request.screeningCompletedAt).toLocaleDateString("en-US") : "pending"}</span>
            <span>Accepted {request.acceptedAt ? new Date(request.acceptedAt).toLocaleDateString("en-US") : "pending"}</span>
            {request.screeningNote ? <span>Screening note: {request.screeningNote}</span> : null}
            {request.statusNote ? <span>Status note: {request.statusNote}</span> : null}
            {request.candidateAppId ? <span>Linked evaluation: {request.candidateAppId}</span> : null}
          </div> : null}
          <div className="editorial-actions">
            {!request.seenAt ? <form action={markEditorialRequestSeen}><input type="hidden" name="id" value={request.id}/><button type="submit">Mark seen</button></form> : null}
            {request.kind === "app" && ["received", "waitlisted_unassessed", "not_scheduled"].includes(normalizeAppSubmissionStatus(request.status)) ? <form action={startSubmissionScreening}><input type="hidden" name="id" value={request.id}/><button type="submit">Start 10–15 minute screen</button></form> : null}
            {request.kind === "app" && normalizeAppSubmissionStatus(request.status) === "waitlisted_eligible" ? <form action={acceptAppSubmissionForResearch}><input type="hidden" name="id" value={request.id}/><button className="accept-candidate" type="submit">Accept for research</button></form> : null}
            {request.kind === "app" && normalizeAppSubmissionStatus(request.status) === "accepted_for_research" ? <form action={changeSubmissionReviewStage}><input type="hidden" name="id" value={request.id}/><input type="hidden" name="target" value="active_review"/><button type="submit">Start deep review</button></form> : null}
            {request.kind === "app" && normalizeAppSubmissionStatus(request.status) === "active_review" ? <form action={changeSubmissionReviewStage}><input type="hidden" name="id" value={request.id}/><input type="hidden" name="target" value="research_ready"/><button type="submit">Research ready for owner</button></form> : null}
            {request.kind === "app" && ["waitlisted_eligible", "accepted_for_research", "active_review", "research_ready"].includes(normalizeAppSubmissionStatus(request.status)) ? <form className="submission-defer" action={changeSubmissionReviewStage}><input type="hidden" name="id" value={request.id}/><input type="hidden" name="target" value="not_scheduled"/><input name="note" required maxLength={500} aria-label="Reason not scheduled" placeholder="Brief reason"/><button type="submit">Not currently scheduled</button></form> : null}
            {request.kind === "app" && request.candidateAppId ? <Link href={`/admin/apps/${request.candidateAppId}`}>Open catalog evaluation →</Link> : null}
          </div>
          {request.kind === "app" && normalizeAppSubmissionStatus(request.status) === "screening" ? <form className="submission-screen" action={completeSubmissionScreening}>
            <input type="hidden" name="id" value={request.id}/>
            <p>Initial screen: check public facts only. A developer claim is not independent evidence.</p>
            <div className="submission-checks">
              <label><input type="checkbox" name="liveProduct"/> Live public product</label>
              <label><input type="checkbox" name="substantiveTraining"/> Substantive training or tracking</label>
              <label><input type="checkbox" name="workingListing"/> Working website or store listing</label>
              <label><input type="checkbox" name="privacyPolicy"/> Public privacy policy</label>
              <label><input type="checkbox" name="pricingAndPlatforms"/> Pricing and platforms stated</label>
              <label><input type="checkbox" name="reviewAccess"/> Review access available or practical</label>
            </div>
            <label>Brief screening note <input name="note" maxLength={500} placeholder="Verified facts, missing items, or reason"/></label>
            <div className="editorial-actions"><button name="decision" value="waitlisted_eligible" type="submit">Eligible waitlist</button><button name="decision" value="not_scheduled" type="submit">Not scheduled</button><button name="decision" value="declined" type="submit">Decline</button></div>
          </form> : null}
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
      )) : <p>No submissions on this page.</p>}
      <nav className="submission-pagination" aria-label="Submission pages"><Link href="/admin#editorial-inbox">Newest</Link>{nextCursor ? <Link href={`/admin?cursor=${nextCursor}#editorial-inbox`}>Older submissions →</Link> : null}</nav>
    </section>
    <div className="admin-stats"><article><span>{apps.length}</span><p>Catalog evaluations</p></article><article><span>{reviewed}</span><p>Owner-reviewed profiles</p></article><article><span>{apps.length-reviewed}</span><p>Still in review</p></article><article><span>{verified}/{total}</span><p>Sections verified</p></article></div>
    <div className="admin-work" id="app-evaluations"><div className="admin-list"><div className="admin-list-head"><h2>App evaluations</h2><span>Research state</span></div>{apps.map(app=><Link className="admin-row" href={`/admin/apps/${app.id}`} key={app.id}><span className="app-logo" style={{background:app.color}}>{app.initials}</span><span><strong>{app.name}</strong><small>{app.type}{isLegacyPublicApp(app.id)?" · Legacy public":""}</small></span><i className={app.researchStatus.toLowerCase().replace(" ","-")}>{app.researchStatus}</i><span className="freshness">{app.verifiedSections} of {app.totalSections} sections</span><ChevronRight/></Link>)}</div><aside><p className="eyebrow">PUBLISHING GATE</p><h2>New entries require your review.</h2><ul><li><Check/> Platforms and access checked</li><li><Check/> Pricing dated and sourced</li><li><Check/> AI status classified</li><li><Check/> Feature evidence attached</li><li><Check/> Legit Score reviewed</li><li><Check/> Disclosures complete</li></ul><p>The original 36 are marked Legacy public and stay visible while you review them. New entries appear only after they are marked Reviewed and you publish the catalog.</p><form action={publishApprovedCatalog}><button className="publish-button" type="submit" disabled={!apps.some(app=>app.researchStatus==="Reviewed")}>Publish approved catalog</button></form></aside></div>
    <section className="publication-history" id="publication-history"><div><p className="eyebrow">PUBLICATION HISTORY</p><h2>Versioned catalog snapshots</h2></div>{publications.length?<div>{publications.map(item=><article key={item.id}><strong>{item.catalog_version}</strong><span>{new Date(item.published_at).toLocaleString("en-US")}</span><small>Fit {item.fit_methodology_version} · Legit {item.legit_methodology_version}</small></article>)}</div>:<p>No catalog snapshots published yet.</p>}</section>
  </main>;
}
