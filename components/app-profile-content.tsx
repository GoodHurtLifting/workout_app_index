import type { AppRecord } from "@/lib/catalog";
import type { EvidenceRow } from "@/lib/catalog-repository";
import { FactualProfileContent } from "@/components/factual-profile-content";
import { profileStructuredData } from "@/lib/seo";
export function AppProfileContent({app,apps,publicEvidence=[],includeStructuredData=true,destinations={official_site:null,store:null}}:{app:AppRecord;apps:AppRecord[];publicEvidence?:EvidenceRow[];includeStructuredData?:boolean;destinations?:{official_site:string|null;store:string|null}}) {
 const structuredData=profileStructuredData(app);
 return <main className="product-shell public-profile-shell facts-first-site">{includeStructuredData?<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}}/>:null}<FactualProfileContent app={app} apps={apps} publicEvidence={publicEvidence} destinations={destinations}/></main>;
}
