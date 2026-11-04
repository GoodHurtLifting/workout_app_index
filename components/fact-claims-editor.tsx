"use client";
import { useState } from "react";
import type { FactClaim } from "@/lib/catalog";
import { evidenceClasses, factFields } from "@/lib/catalog-facts";
type EditableClaim = FactClaim & { rechecked?: boolean };
export function FactClaimsEditor({ initialClaims }: { initialClaims: FactClaim[] }) {
  const [claims,setClaims]=useState<EditableClaim[]>(initialClaims);
  function update(index:number, patch:Partial<EditableClaim>) { setClaims(current=>current.map((claim,i)=>i===index?{...claim,...patch}:claim)); }
  return <section><h2>Dated facts and unknowns</h2><p className="editor-help">Research prepares these entries. Each entry identifies what the source supports, when it was checked, and its platform, country, tier, or version context. Changed catalog values invalidate their old evidence until rechecked. These statements, sources, dates, and contexts appear publicly; keep private notes and contact details out.</p>
    <input type="hidden" name="factClaims" value={JSON.stringify(claims)} />
    {claims.map((claim,index)=><fieldset key={index} className="fact-claim-editor"><legend>Claim {index+1}</legend>
      <label>Catalog field<input list="fact-fields" value={claim.field} onChange={event=>update(index,{field:event.target.value})} required /></label>
      <label>Evidence class<select value={claim.status} onChange={event=>update(index,{status:event.target.value as FactClaim["status"]})}>{evidenceClasses.map(status=><option key={status}>{status}</option>)}</select></label>
      <label>Statement or uncertainty<textarea value={claim.statement} onChange={event=>update(index,{statement:event.target.value})} required maxLength={1200}/></label>
      <div className="form-grid"><label>Actually checked on<input type="date" value={claim.checkedAt} onChange={event=>update(index,{checkedAt:event.target.value})} required /></label>
      <label>Public source URL, if applicable<input type="url" value={claim.url} onChange={event=>update(index,{url:event.target.value})}/></label></div>
      <label>Country, platform, tier, version, and evidence limits<input value={claim.context} onChange={event=>update(index,{context:event.target.value})} required maxLength={500}/></label>
      <p className="editor-help">Value previously checked: {JSON.stringify(claim.value) ?? "Not yet bound"}</p>
      <label><input type="checkbox" checked={claim.rechecked===true} onChange={event=>update(index,{rechecked:event.target.checked})}/> I checked this claim against the current editor values; attach that value when saving.</label>
      <button type="button" onClick={()=>setClaims(current=>current.filter((_,i)=>i!==index))}>Remove claim from draft</button>
    </fieldset>)}
    <datalist id="fact-fields">{factFields.map(field=><option key={field} value={field}/>)}</datalist>
    <p className="editor-help">Use feature: followed by the exact feature label for a specific observed feature, such as feature:Fast logging. Conflicting and developer-reported claims do not earn finder matches.</p>
    <button type="button" onClick={()=>setClaims(current=>[...current,{field:"identity",status:"Not established",statement:"",checkedAt:"",url:"",context:"",value:null,rechecked:true}])}>Add a dated claim or unknown</button>
  </section>;
}
