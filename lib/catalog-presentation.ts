import { getTrainingRelationship, type AppRecord } from "./catalog.ts";
import { isFactual, latestFactDate, supportedFact } from "./catalog-facts.ts";
export function displayFact(app:AppRecord,field:string,value:string):string {
  return supportedFact(app,field) && value && value!=="Not assessed" ? value : "Not established";
}
export function trainingApproach(app:AppRecord):string { return displayFact(app,"trainingRelationship",getTrainingRelationship(app).planningStyle); }
export function freeAccessLabel(app:AppRecord):string {
  if(!supportedFact(app,"hasUsableFreeTier") || app.hasUsableFreeTier==null) return "Not established";
  return app.hasUsableFreeTier?"Usable free tier":"Paid access / check trial terms";
}
export function profileEvidenceLabel(app:AppRecord):string {
  const date=latestFactDate(app);
  return date ? `Facts checked ${date}` : isFactual(app)?"See dated facts and unknowns":"See sources and earlier assessment";
}
