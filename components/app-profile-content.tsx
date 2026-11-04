import type { AppRecord } from "@/lib/catalog";
import type { EvidenceRow } from "@/lib/catalog-repository";
import { FactualProfileContent } from "@/components/factual-profile-content";
export function AppProfileContent({app,apps,publicEvidence=[],destinations={official_site:null,store:null}}:{app:AppRecord;apps:AppRecord[];publicEvidence?:EvidenceRow[];destinations?:{official_site:string|null;store:string|null}}) {
 const structuredData={"@context":"https://schema.org","@type":"SoftwareApplication",name:app.name,description:app.description,applicationCategory:"HealthApplication",operatingSystem:app.platforms.join(", "),url:`https://workoutappindex.com/apps/${app.id}`};
 return <main className="product-shell public-profile-shell facts-first-site"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}}/><FactualProfileContent app={app} apps={apps} publicEvidence={publicEvidence} destinations={destinations}/></main>;
}
