import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCatalogAdmin } from "@/lib/admin-auth";
import { getCatalogRecord, getCatalogWithdrawal, getLatestPublishedCatalog, getPublicCatalog, isRecheckedEvidence, listEvidence } from "@/lib/catalog-repository";
import { addEvidence, restoreCatalogListing, withdrawCatalogListing } from "../../actions";
import { CatalogReviewForm } from "@/components/catalog-review-form";
import { CatalogReviewStatusForm } from "@/components/catalog-review-status-form";
import { CatalogProposalReview } from "@/components/catalog-proposal-review";
import { catalogRecordFingerprint } from "@/lib/catalog-proposals";
import type { AppRecord, ResearchStatus } from "@/lib/catalog";
import { catalogResearchDrafts, catalogResearchSources, getUnmodifiedPlaceholderResearchDraft } from "@/lib/catalog-research-drafts";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { isLegacyPublicApp } from "@/lib/legacy-public-catalog";
import { missingReviewProfileDetails } from "@/lib/catalog-review-readiness";
import "../../admin.css";

export const dynamic="force-dynamic";

const proposalNotices: Record<string, string> = {
  applied: "Selected changes are saved to the private catalog record. You do not need to click Save catalog record again unless you make additional edits below. Review the updated card before changing its stage.",
  stale: "This comparison is out of date. The latest saved values are shown below; review them and choose fields again.",
  select: "Select one or more proposed fields, or confirm that you reviewed every field before applying the complete draft.",
  reviewed: "Move this record back to Researching before accepting a new research update.",
  invalid: "These selected fields could not be saved as a valid catalog record. Review the proposed values.",
};

const stageNotices: Record<string, string> = {
  updated: "Review stage updated. This did not publish the app.",
  "save-first": "Save the catalog record before changing its review stage. The populated research draft is still available below; no saved fields were deleted.",
  stale: "The saved card changed since this page opened. Reload it and review the latest version before changing stage.",
  same: "The card is already at that review stage.",
  confirm: "Confirm that you reviewed the saved profile before marking it Reviewed.",
  incomplete: "The saved card still has candidate placeholders. Apply the local research proposal or save the completed editor form before marking it Reviewed.",
  evidence: "A dated, rechecked source is required before marking this card Reviewed. Ask WAI to prepare the missing evidence.",
  emdash: "Replace em dashes in the saved public copy before changing its stage.",
  invalid: "Choose a valid review stage.",
  error: "The stage could not be updated. The saved card was not changed; please try again or check the server logs.",
};

const saveNotices: Record<string, string> = {
  stale: "The saved card changed since this edit form loaded. Your older form was not saved over it. Review the latest saved version before editing again.",
};

export default async function CatalogAppPage({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<{proposal?:string;stage?:string;save?:string;visibility?:string}>}){
  const {id}=await params; const {proposal,stage,save,visibility}=await searchParams; await requireCatalogAdmin(`/admin/apps/${id}`); const app=await getCatalogRecord(id); if(!app) notFound(); const evidence=await listEvidence(id);
  const stored=await getAdminFirestore().collection("catalogApps").doc(id).get();
  const savedRecord=stored.exists ? { ...(stored.data()!.record as AppRecord), researchStatus:stored.data()!.publication_status as ResearchStatus } : null;
  const checklistRecord=savedRecord ?? app;
  const savedAt=stored.exists && typeof stored.data()?.updated_at === "number" ? stored.data()!.updated_at as number : null;
  const savedFingerprint=savedRecord ? catalogRecordFingerprint(savedRecord) : "unsaved";
  const hasUnsavedResearchDraft=!stored.exists ? Boolean(catalogResearchDrafts[id]) : Boolean(savedRecord && getUnmodifiedPlaceholderResearchDraft(savedRecord, stored.data()?.source_submission_id));
  const hasUnsavedLegacyScoreDraft=isLegacyPublicApp(id)&&Boolean(app.legitAssessment)&&!stored.data()?.record?.legitAssessment;
  const researchSources=catalogResearchSources[id] ?? [];
  const publicCatalog=await getPublicCatalog();
  const publicApp=publicCatalog.apps.find(item=>item.id===id);
  const withdrawal=await getCatalogWithdrawal(id);
  const publishedRecord=withdrawal?.active ? (await getLatestPublishedCatalog())?.find(item=>item.id===id&&item.researchStatus==="Reviewed") : null;
  const canRestore=Boolean(publishedRecord&&savedRecord?.researchStatus==="Reviewed"&&JSON.stringify(savedRecord)===JSON.stringify(publishedRecord));
  const draftMatchesPublic=publicApp ? JSON.stringify(publicApp)===JSON.stringify(app) : false;
  const missingProfile=missingReviewProfileDetails(checklistRecord);
  const checks=[
    {label:"Identity, fit, scores, and training relationship",pass:!missingProfile.includes("Identity, position, and description")&&!missingProfile.includes("Scores and training relationship")},
    {label:"Platforms recorded",pass:!missingProfile.includes("Platforms")},
    {label:"Pricing recorded",pass:!missingProfile.includes("Pricing")},
    {label:"AI status classified",pass:!missingProfile.includes("AI status")},
    {label:"Feature inventory",pass:!missingProfile.includes("Feature inventory")},
    {label:"Dated research source attached",pass:evidence.some(isRecheckedEvidence)},
    {label:"Owner review confirmed",pass:checklistRecord.researchStatus==="Reviewed"},
  ];
  const ready=checks.every(check=>check.pass);
  return <main className="admin-page standalone-admin editor-page"><div className="admin-utility"><Link href="/admin">← Research dashboard</Link><span>{app.name}</span></div><div className="editor-heading"><div><p className="eyebrow">CATALOG RECORD</p><h1>{app.name}</h1><p>Review the proposed card and its source log. Research sources are prepared with the local draft; you do not need to enter them one by one.</p></div><span className={ready?"gate-ready":"gate-blocked"}>{ready?"Review checks complete":"Review checks incomplete"}</span></div>
  <div className="admin-review-tools"><p><strong>Public version:</strong> {publicApp ? draftMatchesPublic ? "Current editor values match what visitors see." : "The public profile differs from this editor draft." : "Not listed publicly."}</p><div><Link href={`/admin/apps/${id}/preview`}>Preview editor draft</Link>{publicApp?<Link href={`/apps/${id}`} target="_blank">Open public profile ↗</Link>:null}</div></div>
  {visibility==="withdrawn"?<p className="catalog-proposal-notice" role="status">This listing is withdrawn from the public catalog. Its private research record remains intact.</p>:null}
  {visibility==="visible"?<p className="catalog-proposal-notice" role="status">The reviewed, published listing is visible again.</p>:null}
  {withdrawal?.active?<section className="catalog-visibility-control"><h2>Public listing withdrawn</h2><p>Reason recorded internally: {withdrawal.reason}</p><p>The private research card is unchanged. This app is omitted from the finder, public profile, API, and sitemap.</p>{canRestore?<form action={restoreCatalogListing}><input type="hidden" name="id" value={id}/><label><input type="checkbox" name="confirmRestore" required/> I rechecked the current reviewed and published card and want to restore it publicly.</label><button type="submit">Restore public listing</button></form>:<p>To restore, first review and publish a current version of this card. A preliminary legacy profile cannot be restored unchanged.</p>}</section>:publicApp?<details className="catalog-visibility-control"><summary>Withdraw this public listing</summary><p>Use this only when WAI cannot responsibly represent the current user experience. This hides the app from public discovery without deleting its research or changing its scores.</p><form action={withdrawCatalogListing}><input type="hidden" name="id" value={id}/><label>Internal editorial reason<textarea name="reason" required minLength={20} maxLength={500} rows={3}/></label><label><input type="checkbox" name="confirmWithdrawal" required/> Withdraw {app.name} from the public catalog.</label><button type="submit">Withdraw public listing</button></form></details>:null}
  {isLegacyPublicApp(id)?<p className="editor-help">Legacy public listing: this app was among the original 36 shown before owner review. It stays public when you publish newer approved entries. Its current research status is not an approval.</p>:null}
  {hasUnsavedResearchDraft?<p className="catalog-proposal-notice" role="status"><strong>The research shown in the editor is not saved yet.</strong> The review checklist below checks the saved Firebase card, which still has candidate placeholders. Accept the proposed research fields or save the completed editor form before marking this app Reviewed.</p>:null}
  {hasUnsavedLegacyScoreDraft?<p className="editor-help">A provisional legacy rescoring is prefilled below for private review. It is not saved in Firebase and does not change the public profile. Check the source and rationale before saving; saving as Researching still does not publish a revised score.</p>:null}
  {proposal&&proposalNotices[proposal]?<p className="catalog-proposal-notice" role="status">{proposalNotices[proposal]}</p>:null}
  {stage&&stageNotices[stage]?<p className="catalog-proposal-notice" role={stage==="updated"?"status":"alert"}>{stageNotices[stage]}</p>:null}
  {save&&saveNotices[save]?<p className="catalog-proposal-notice" role="alert">{saveNotices[save]}</p>:null}
  {stored.exists&&catalogResearchDrafts[id]?<CatalogProposalReview saved={{ ...(stored.data()!.record as typeof app), researchStatus: stored.data()!.publication_status }} proposed={catalogResearchDrafts[id]}/>:null}
  <div className="editor-layout"><div className="editor-main"><CatalogReviewForm key={savedFingerprint} app={app} savedFingerprint={savedFingerprint} /><CatalogReviewStatusForm id={id} currentStatus={savedRecord?.researchStatus ?? app.researchStatus} savedAt={savedAt} canMarkReviewed={checks.slice(0,6).every(check=>check.pass)} /></div>
  <aside className="editor-sidebar">
    <section><p className="eyebrow">SAVED CARD REVIEW CHECKLIST</p><h2>{checks.filter(check=>check.pass).length} of {checks.length} checks passed</h2><ul className="gate-list">{checks.map(check=><li className={check.pass?"passed":"missing"} key={check.label}><span>{check.pass?"✓":"!"}</span>{check.label}</li>)}</ul>{missingProfile.length?<p className="editor-help">Still missing from the saved card: {missingProfile.join(", ")}.</p>:null}<p className="editor-help">These checks use the saved private record, not the local proposal shown in the editor. They are workflow checks, not a count of product features tested. WAI prepares the dated sources; your role is to review the card and confirm it when ready.</p></section>
    {researchSources.length?<section><p className="eyebrow">RESEARCH CONTEXT</p><h2>Sources and test notes</h2><p className="editor-help">These working notes explain the draft and its limits. Only dated, vetted sources in the source log below count toward publication. If a source or claim is missing, flag it in chat for WAI research rather than entering it yourself.</p>{researchSources.map(source=><article key={source.label}>{source.url?<a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>:<strong>{source.label}</strong>}<p>{source.supports}</p>{source.followUp?<small>{source.followUp}</small>:null}</article>)}</section>:null}
    <details className="editor-evidence-advanced"><summary>Advanced: add or correct a source manually</summary><section>
      <p className="editor-help">This is an optional correction tool, not a review step. Research sources are normally prepared locally and attached when the card is saved.</p>
      <form action={addEvidence} className="evidence-form">
        <input type="hidden" name="appId" value={app.id}/>
        <label>Source type<select name="sourceType"><option>Official website</option><option>Google Play</option><option>Apple App Store</option><option>Official documentation</option><option>Privacy policy</option><option>Hands-on testing</option><option>Developer correspondence</option></select></label>
        <label>Source URL, if public or available<input name="url" type="url" placeholder="https://"/></label>
        <label>Claim supported<textarea name="claim" required rows={3} placeholder="The source confirms ..."/></label>
        <label>Internal note<textarea name="note" rows={3} placeholder="What still needs testing or clarification?"/></label>
        <label className="public-check"><input type="checkbox" name="public"/> Cite this public web source on the Reviewed profile</label>
        <p className="editor-help">Only the source type, claim, link, and check date can appear publicly. Internal notes stay private.</p>
        <button className="admin-primary" type="submit">Add evidence</button>
      </form>
    </section></details>
  </aside></div>
  <section className="evidence-list"><div><p className="eyebrow">SOURCE LOG</p><h2>{evidence.length} evidence source{evidence.length===1?"":"s"}</h2></div>{evidence.length?evidence.map(item=><article key={item.id}><div><strong>{item.source_type}</strong><span>{new Date(item.checked_at).toLocaleDateString("en-US")}</span></div><p>{item.claim_supported}</p>{item.url?<a href={item.url} target="_blank" rel="noreferrer">Open source ↗</a>:<span>Private review note</span>}{item.internal_note?<small>{item.internal_note}</small>:null}</article>):<p className="empty-evidence">No dated sources attached yet. WAI research should prepare and attach them with the next local card update.</p>}</section></main>
}
