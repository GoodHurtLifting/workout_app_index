import type { AppRecord } from "@/lib/catalog";
import { applyCatalogProposalChanges } from "@/app/admin/actions";
import { catalogProposalChanges, catalogRecordFingerprint } from "@/lib/catalog-proposals";

function show(value: unknown): string {
  if (value === undefined || value === null) return "Not set";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "None";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

export function CatalogProposalReview({ saved, proposed }: { saved: AppRecord; proposed: AppRecord }) {
  const changes = catalogProposalChanges(saved, proposed);
  if (!changes.length) return null;

  return <section className="catalog-proposals" aria-labelledby="catalog-proposals-heading">
    <p className="eyebrow">LOCAL RESEARCH UPDATE</p>
    <h2 id="catalog-proposals-heading">Review proposed changes</h2>
    <p className="editor-help">Compare the saved admin value with the local research draft. Check only the fields you accept. Applying them updates your private catalog record, not the public site. Unchecked fields and your review status stay as they are.</p>
    {saved.researchStatus === "Reviewed" ? <p className="editor-help">This record is already Reviewed. Move it back to Researching before accepting new research changes, then review it again before publication.</p> : null}
    <form action={applyCatalogProposalChanges}>
      <input type="hidden" name="id" value={saved.id} />
      <input type="hidden" name="savedFingerprint" value={catalogRecordFingerprint(saved)} />
      <input type="hidden" name="proposalFingerprint" value={catalogRecordFingerprint(proposed)} />
      <div className="catalog-proposal-list">
        {changes.map(change => <label className="catalog-proposal-row" key={change.path}>
          <span className="catalog-proposal-select"><input type="checkbox" name="fields" value={change.path} /><strong>{change.label}</strong><small>{change.group}</small></span>
          <span><b>Saved now</b><span>{show(change.before)}</span></span>
          <span><b>Proposed</b><span>{show(change.after)}</span></span>
        </label>)}
      </div>
      <button className="admin-primary" type="submit" disabled={saved.researchStatus === "Reviewed"}>Apply selected changes to private record</button>
      <p className="editor-help">If the saved card changed since you opened this page, the update stops. Refresh to compare the latest values before accepting anything.</p>
    </form>
  </section>;
}
