export const adjacentFeatureOptions = ["Nutrition","Recovery","Mindfulness","Cardio","Body composition","Wearable integration"] as const;
export type AdjacentFeature = typeof adjacentFeatureOptions[number];
export type AdjacentFeatureFinding = {
  checkedAt?:string;
  status:"Documented"|"Not established"|"Separate product"|"Conflicting"|"Not available";
  summary:string;
  sourceUrls:string[];
  evidenceClass:"Officially documented"|"App-store documented";
  platforms?:string[];
  requiresPaid?:boolean;
};
export type AdjacentFeatureAudit = {
  ownerEdited?:boolean;
  name:string;
  checkedAt:string;
  reviewScope:string;
  sourcesChecked:string[];
  features:Record<AdjacentFeature,AdjacentFeatureFinding>;
};
export function currentAdjacentAudit(audit:AdjacentFeatureAudit|undefined):boolean {
  if (!audit || !/^\d{4}-\d{2}-\d{2}$/.test(audit.checkedAt)) return false;
  const date=new Date(`${audit.checkedAt}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10)===audit.checkedAt && audit.checkedAt<=new Date().toISOString().slice(0,10);
}
export function adjacentFeatureSummary(audit:AdjacentFeatureAudit|undefined,feature:AdjacentFeature):string {
  const finding=audit?.features[feature];
  if (!finding || !currentAdjacentFinding(audit,feature)) return "Not established; no current feature-specific check is recorded.";
  return `${finding.status}: ${finding.summary}`;
}

export function currentAdjacentFinding(audit:AdjacentFeatureAudit|undefined,feature:AdjacentFeature):boolean {
  if(!audit)return false;
  return currentAdjacentAudit({...audit,checkedAt:audit.features[feature]?.checkedAt??audit.checkedAt});
}
