import { apps, type AppRecord } from "../../lib/catalog.ts";
import { prepareFactClaims } from "../../lib/catalog-facts.ts";

// Synthetic local fixture, not research and never a catalog seed or live record.
export function factualFixture():AppRecord {
  const record:AppRecord={...structuredClone(apps[0]),id:"migration-fixture",name:"Example Factual App",initials:"EX",coverageMode:"factual",type:"Workout logger",description:"Synthetic product used only to verify factual-profile behavior.",bestFor:"An example comparison",caveat:"Synthetic fixture; not an actual product recommendation.",
    price:"Not established",monthlyPrice:null,hasUsableFreeTier:null,supportsOneTimePurchase:null,
    freeTierCapabilities:{completeProgram:null,adaptiveProgramming:null,programLibrary:null},ai:"Not assessed",legit:null,goals:[],features:[],level:[],authorship:"Not established",deliversCompleteProgram:null,programLibrary:null,adaptiveProgramming:null,supportedTrainingEnvironments:[],
    commercialDisclosure:{status:"none",statement:""},
    trainingRelationship:{planningStyle:"Not assessed",secondaryStyles:[],choiceLoad:"Not assessed",continuity:"Not assessed",customization:"Not assessed",decisionsRemoved:"Not established",decisionsRemaining:"Not established",tradeoff:"Not established",idealUser:"Not established",notFor:"Not established"},
    researchStatus:"Researching",
  };
  const fields=["identity","platforms","pricing","ai","features","trainingRelationship"];
  record.factClaims=prepareFactClaims(fields.map(field=>({field,status:field==="identity"||field==="platforms"?"Officially documented":"Not established",statement:field==="identity"||field==="platforms"?"Synthetic documentation for a local fixture.":"Not established by this fixture.",url:field==="identity"||field==="platforms"?"https://example.com/":"",checkedAt:"2026-11-04",context:"Synthetic test only; no product was researched or tested.",value:null,rechecked:true})),record);
  return record;
}
