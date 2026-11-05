"use client";
import { useState } from "react";
import { adjacentFeatureOptions,type AdjacentFeatureAudit,type AdjacentFeatureFinding } from "@/lib/adjacent-features";

function unknownFinding():AdjacentFeatureFinding{return {status:"Not established",summary:"Not established from the available sources.",sourceUrls:[],evidenceClass:"Officially documented"};}

export function AdjacentFeatureEditor({name,initialAudit}:{name:string;initialAudit?:AdjacentFeatureAudit}) {
 const [audit,setAudit]=useState<AdjacentFeatureAudit>(()=>initialAudit??{name,checkedAt:"",reviewScope:"Owner-maintained public product sources; not a hands-on evaluation.",sourcesChecked:[],features:{Nutrition:unknownFinding(),Recovery:unknownFinding(),Mindfulness:unknownFinding(),Cardio:unknownFinding(),"Body composition":unknownFinding(),"Wearable integration":unknownFinding()}});
 const [sourceText,setSourceText]=useState<Record<string,string>>({});
 function update(feature:typeof adjacentFeatureOptions[number],patch:Partial<AdjacentFeatureAudit["features"][typeof feature]>){setAudit(current=>({...current,features:{...current.features,[feature]:{...current.features[feature],...patch}}}));}
 return <details className="entry-editor-section"><summary>Additional features &amp; wearables <small>Six optional capabilities, sources and access limits</small></summary><div>
  <p className="editor-help">Edit what the product includes, where the claim comes from and when you checked it. Unknown is acceptable. Keep companion apps, device support and paid access explicit.</p>
  <input type="hidden" name="adjacentFeatureEvidence" value={JSON.stringify(audit)}/>
  {adjacentFeatureOptions.map(feature=>{const finding=audit.features[feature];return <details className="adjacent-admin-feature" key={feature}><summary>{feature}<small>{finding.status}</small></summary><div>
    <div className="form-grid"><label>Availability<select value={finding.status} onChange={event=>update(feature,{status:event.target.value as typeof finding.status})}>{["Not established","Documented","Separate product","Conflicting","Not available"].map(status=><option key={status}>{status}</option>)}</select></label>
    <label>Actually checked on<input type="date" value={finding.checkedAt??audit.checkedAt} onChange={event=>update(feature,{checkedAt:event.target.value})}/></label></div>
    <label>What is included and any limits<textarea rows={3} maxLength={1200} value={finding.summary} onChange={event=>update(feature,{summary:event.target.value})}/></label>
    <label>Supporting URLs, one per line<textarea rows={2} value={sourceText[feature]??finding.sourceUrls.join("\n")} onChange={event=>{const value=event.target.value;setSourceText(current=>({...current,[feature]:value}));update(feature,{sourceUrls:value.split("\n").map(url=>url.trim()).filter(Boolean)});}}/></label>
    <div className="form-grid"><label>Source type<select value={finding.evidenceClass} onChange={event=>update(feature,{evidenceClass:event.target.value as typeof finding.evidenceClass})}><option>Officially documented</option><option>App-store documented</option></select></label>
    <label>Paid feature?<select value={finding.requiresPaid===undefined?"unknown":String(finding.requiresPaid)} onChange={event=>update(feature,{requiresPaid:event.target.value==="unknown"?undefined:event.target.value==="true"})}><option value="unknown">Access tier not established</option><option value="false">Available without a paid upgrade</option><option value="true">Paid access required</option></select></label></div>
    <label>Established platform scope<select value={finding.platforms?.join(",")??""} onChange={event=>update(feature,{platforms:event.target.value?event.target.value.split(","):undefined})}><option value="">Not platform-specific / not established</option><option value="iOS">iPhone / iOS only established</option><option value="Android">Android only established</option><option value="iOS,Android">iOS and Android established</option><option value="Web">Web only established</option><option value="iOS,Android,Web">iOS, Android and Web established</option></select></label>
  </div></details>;})}
 </div></details>;
}
