import { savePartnerPlacement } from "@/app/admin/commercial-actions";
export function PartnerPlacementAdmin() {
 return <details className="submission-private-work"><summary>Manage sponsored links and features</summary>
  <p>Use the agreed deliverable and approved copy. Reusing a slug replaces that placement. Leave Publish unchecked to save a private draft or withdraw a placement.</p>
  <form action={savePartnerPlacement}>
   <label>Placement slug<input name="slug" required pattern="[a-z0-9][a-z0-9-]{0,79}" /></label>
   <label>Format<select name="kind"><option value="link">Link on Partnerships page</option><option value="article">Sponsored article</option></select></label>
   <label>Brand<input name="brand" required maxLength={120} /></label>
   <label>Category<select name="category"><option value="app">App</option><option value="equipment">Equipment</option><option value="apparel">Apparel</option></select></label>
   <label>Title<input name="title" required maxLength={180} /></label>
   <label>Destination<input name="destination" type="url" required placeholder="https://" /></label>
   <label>Agreed copy<textarea name="body" required minLength={40} maxLength={12000} rows={8} /></label>
   <label><input name="publish" type="checkbox" />Publish this paid promotion</label>
   <button type="submit">Save placement</button>
  </form>
 </details>;
}
