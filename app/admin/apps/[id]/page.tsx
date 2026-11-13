import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCatalogAdmin } from "@/lib/admin-auth";
import { getCatalogWithdrawal,getPublicCatalog,listEvidence } from "@/lib/catalog-repository";
import { setCatalogReviewComplete, withdrawCatalogListing } from "../../actions";
import { CatalogReviewForm } from "@/components/catalog-review-form";
import { CatalogProposalReview } from "@/components/catalog-proposal-review";
import { getCatalogEntryProposal } from "@/lib/catalog-maintenance-proposals";
import { catalogEntryProposalChanges, catalogRecordFingerprint } from "@/lib/catalog-proposals";
import { apps as bundledApps,type AppRecord,type ResearchStatus } from "@/lib/catalog";
import { catalogResearchDrafts } from "@/lib/catalog-research-drafts";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { publicCatalogRecord } from "@/lib/catalog-facts";
import { catalogListingProblems,catalogMissingItems,hasCatalogPublicSource } from "@/lib/catalog-entry-editing";
import "../../admin.css";
export const dynamic="force-dynamic";

export default async function CatalogAppPage({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<{proposal?:string;save?:string;visibility?:string}>}) {
 const {id}=await params;const {proposal,save,visibility}=await searchParams;
 await requireCatalogAdmin(`/admin/apps/${id}`);
 const stored=await getAdminFirestore().collection("catalogApps").doc(id).get();
 const saved=stored.exists?{...(stored.data()!.record as AppRecord),researchStatus:stored.data()!.publication_status as ResearchStatus}:null;
 const reviewComplete=Boolean(saved && (stored.data()?.catalog_review_complete ?? saved.researchStatus === "Reviewed"));
 const app=saved??bundledApps.find(item=>item.id===id)??catalogResearchDrafts[id];if(!app)notFound();
 const evidence=await listEvidence(id);const withdrawal=await getCatalogWithdrawal(id);const catalog=await getPublicCatalog();
 const publicApp=catalog.apps.find(item=>item.id===id);
 const matchesPublic=Boolean(publicApp&&catalogRecordFingerprint(publicCatalogRecord({...app,researchStatus:publicApp.researchStatus}))===catalogRecordFingerprint(publicApp));
 const proposed=saved?getCatalogEntryProposal(saved,catalogResearchDrafts[id]):undefined;
 const fingerprint=saved?catalogRecordFingerprint(saved):"unsaved";
 const hasSource=hasCatalogPublicSource(app,evidence);
 const problems=catalogListingProblems(app,hasSource);
 const missingItems=catalogMissingItems(app,hasSource);
 const reviewState=stored.data()?.catalog_review_state ?? (reviewComplete ? "complete" : app.researchStatus === "Researching" ? "reviewing" : "not_started");
 return <main className="admin-page standalone-admin editor-page simplified-entry"><div className="admin-utility"><Link href="/admin#app-evaluations">← Catalog entries</Link><span>{app.name}</span></div>
 <div className="editor-heading"><div><p className="eyebrow">CATALOG ENTRY</p><h1>{app.name}</h1><p>Edit product facts, sources and listing visibility.</p></div><span className={publicApp?"gate-ready":"gate-blocked"}>{withdrawal?.active?"Hidden":publicApp?"Public":"Draft"}</span></div>
 <div className="admin-review-tools"><p>{withdrawal?.active?"Hidden from the public catalog. Publish this entry to make a checked version visible again.":publicApp?matchesPublic?"Saved facts match the public listing.":"This draft has changes that are not on the public listing.":"This entry has not been published."}</p><div><Link href={`/admin/apps/${id}/preview`}>Preview saved draft</Link>{publicApp?<Link href={`/apps/${id}`} target="_blank">Open public profile ↗</Link>:null}</div></div>
 {save==="updated"?<p className="catalog-proposal-notice" role="status">Draft saved. The public listing has not changed.</p>:save==="published"?<p className="catalog-proposal-notice" role="status">This public listing was updated. Other listings were preserved.</p>:null}
 {visibility==="withdrawn"?<p className="catalog-proposal-notice" role="status">Listing hidden. The entry and its history are preserved.</p>:null}
 {proposal?<p className="catalog-proposal-notice" role={proposal==="applied"?"status":"alert"}>{proposal==="applied"?"Selected factual updates saved to the draft. The public listing has not changed.":proposal==="stale"?"The proposal changed. Reload and compare the latest values.":"Select valid factual updates before applying the proposal."}</p>:null}
 {missingItems.length > 0 && <details className="entry-readiness" id="missing-content"><summary>Missing content ({missingItems.length})</summary><ul>{missingItems.map(item=><li key={item}>{item}</li>)}</ul><p>Review can be complete with documented unknowns.</p></details>}
 {problems.length?<details className="entry-readiness"><summary>Before updating the public listing: {problems.length} item{problems.length===1?"":"s"} to complete</summary><ul>{problems.map(problem=><li key={problem}>{problem}</li>)}</ul><p>You can save a draft at any time. Unknown optional capabilities do not prevent listing.</p></details>:null}
 {saved&&proposed&&catalogEntryProposalChanges(saved,proposed).length?<details className="entry-readiness"><summary>Proposed factual updates</summary><CatalogProposalReview saved={saved} proposed={proposed}/></details>:null}
 {saved && <form action={setCatalogReviewComplete} className="admin-review-tools">
   <input type="hidden" name="id" value={id} />
   <p>Review progress is separate from public visibility and missing facts.</p>
   <label>Review status<select name="reviewState" defaultValue={reviewState}><option value="not_started">Not started</option><option value="reviewing">Reviewing</option><option value="complete">Review complete</option></select></label>
   <button type="submit">Save review status</button>
 </form>}
 <CatalogReviewForm key={fingerprint} app={app} savedFingerprint={fingerprint} publiclyListed={Boolean(publicApp)} sourceLog={<details className="saved-source-log"><summary>Earlier attached sources ({evidence.length})</summary><div>{evidence.map(item=><article key={item.id}><strong>{item.source_type}</strong><small>Checked {new Date(item.checked_at).toLocaleDateString("en-US")} · {item.public?"Public source":"Private note"}</small><p>{item.claim_supported}</p>{item.url?<a href={item.url} target="_blank" rel="noreferrer">Open source ↗</a>:null}{item.internal_note?<p className="editor-help">{item.internal_note}</p>:null}</article>)}</div></details>}/>
 {publicApp?<details className="catalog-visibility-control"><summary>Hide this listing</summary><p>Remove this app from public profiles, matching and the sitemap. Its saved entry and history remain intact.</p><form action={withdrawCatalogListing}><input type="hidden" name="id" value={id}/><label>Internal reason<textarea name="reason" required minLength={20} maxLength={500} rows={3}/></label><label><input type="checkbox" name="confirmWithdrawal" required/> Hide {app.name} from the public catalog.</label><button type="submit">Hide listing</button></form></details>:null}
 </main>;
}
