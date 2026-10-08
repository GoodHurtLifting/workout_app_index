import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCatalogAdmin } from "@/lib/admin-auth";
import { getCatalogRecord, getPublicCatalog, isRecheckedEvidence, listEvidence } from "@/lib/catalog-repository";
import { addEvidence } from "../../actions";
import { CatalogReviewForm } from "@/components/catalog-review-form";
import "../../admin.css";

export const dynamic="force-dynamic";

export default async function CatalogAppPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params; await requireCatalogAdmin(`/admin/apps/${id}`); const app=await getCatalogRecord(id); if(!app) notFound(); const evidence=await listEvidence(id);
  const publicCatalog=await getPublicCatalog();
  const publicApp=publicCatalog.apps.find(item=>item.id===id);
  const draftMatchesPublic=publicApp ? JSON.stringify(publicApp)===JSON.stringify(app) : false;
  const checks=[{label:"Identity and description",pass:Boolean(app.name&&app.description&&app.type&&app.type!=="Unclassified"&&!app.description.startsWith("Developer-submitted candidate."))},{label:"Platforms confirmed",pass:app.platforms.length>0},{label:"Pricing recorded",pass:Boolean(app.price&&app.price!=="Not verified")},{label:"AI status classified",pass:Boolean(app.ai&&app.ai!=="Not assessed")},{label:"Feature inventory",pass:app.features.length>0},{label:"Rechecked evidence attached",pass:evidence.some(isRecheckedEvidence)},{label:"Owner review confirmed",pass:app.researchStatus==="Reviewed"}];
  const ready=checks.every(check=>check.pass);
  return <main className="admin-page standalone-admin editor-page"><div className="admin-utility"><Link href="/admin">← Research dashboard</Link><span>{app.name}</span></div><div className="editor-heading"><div><p className="eyebrow">CATALOG RECORD</p><h1>{app.name}</h1><p>Review every public and finder-facing field, attach evidence, and preview the saved draft.</p></div><span className={ready?"gate-ready":"gate-blocked"}>{ready?"Review checks complete":"Review checks incomplete"}</span></div>
  <div className="admin-review-tools"><p><strong>Public version:</strong> {publicApp ? draftMatchesPublic ? "Current editor values match what visitors see." : "The public profile differs from this saved draft." : "Not listed publicly."}</p><div><Link href={`/admin/apps/${id}/preview`}>Preview saved draft</Link>{publicApp?<Link href={`/apps/${id}`} target="_blank">Open public profile ↗</Link>:null}</div></div>
  <div className="editor-layout"><CatalogReviewForm app={app} />
  <aside className="editor-sidebar">
    <section><p className="eyebrow">REVIEW CHECKLIST</p><h2>{checks.filter(check=>check.pass).length} of {checks.length} checks passed</h2><ul className="gate-list">{checks.map(check=><li className={check.pass?"passed":"missing"} key={check.label}><span>{check.pass?"✓":"!"}</span>{check.label}</li>)}</ul><p className="editor-help">These checks are a guide, not a substitute for reviewing the claims and sources.</p></section>
    <section>
      <p className="eyebrow">ADD EVIDENCE</p>
      <h2>Source or test note</h2>
      <p className="editor-help">Record one specific supported claim per entry. Public web sources need a URL; hands-on tests and developer correspondence may be private notes.</p>
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
    </section>
  </aside></div>
  <section className="evidence-list"><div><p className="eyebrow">SOURCE LOG</p><h2>{evidence.length} evidence source{evidence.length===1?"":"s"}</h2></div>{evidence.length?evidence.map(item=><article key={item.id}><div><strong>{item.source_type}</strong><span>{new Date(item.checked_at).toLocaleDateString("en-US")}</span></div><p>{item.claim_supported}</p>{item.url?<a href={item.url} target="_blank" rel="noreferrer">Open source ↗</a>:<span>Private review note</span>}{item.internal_note?<small>{item.internal_note}</small>:null}</article>):<p className="empty-evidence">No evidence attached yet. Add the first official source above.</p>}</section></main>
}
