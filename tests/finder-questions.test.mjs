import assert from "node:assert/strict";
import test from "node:test";
import { finderQuestions,normalizeFinderAnswers,selectedAdjacentFeatures,validFinderAnswers } from "../lib/finder-questions.ts";
import { apps } from "../lib/catalog.ts";
import { exclusionReasons,fitScore,matchReasons,matchedAdjacentFeatures } from "../lib/matching.ts";
import { factualFixture } from "./fixtures/factual-profile.ts";
test("finder asks about platform once and combines the overlapping training questions",()=>{
 assert.equal(finderQuestions.length,9);assert.equal(new Set(finderQuestions.map(question=>question.key)).size,9);
 assert.equal(finderQuestions.filter(question=>question.key==="platform").length,1);
 assert.equal(finderQuestions.some(question=>question.key==="job"),false);
 for(const planning of finderQuestions.find(question=>question.key==="planning").options){const normalized=normalizeFinderAnswers({planning});assert.ok(normalized.job);assert.equal(normalized.planning,planning);for(const app of apps)assert.equal(fitScore(app,{planning}),fitScore(app,normalized));}
 assert.deepEqual(normalizeFinderAnswers({planning:"Not sure"}),{planning:"Not sure"});
});
test("platform is a hard constraint without adding preference points",()=>{
 const app={...apps[0],platforms:["Android"]};
 assert.deepEqual(exclusionReasons(app,{platform:"iPhone"}),["Not listed for iPhone"]);
 assert.equal(fitScore(app,{platform:"iPhone"}),0);
 assert.equal(fitScore(app,{platform:"Android"}),fitScore(app,{}));
 const unknown=factualFixture();unknown.platforms=["Web"];
 assert.match(exclusionReasons(unknown,{platform:"Web"})[0],/not established/);
});
test("a compatible job alone does not produce a false training-style explanation",()=>{
 const app={...apps[0],deliversCompleteProgram:true,trainingRelationship:{...apps[0].trainingRelationship,planningStyle:"Build it yourself",secondaryStyles:[]}};
 assert.equal(matchReasons(app,{planning:"Show me the next workout, with no decisions needed"}).includes("Fits the way you want to plan training"),false);
 assert.ok(matchReasons(app,{platform:"Android"}).includes("Available for Android"));
});


test("optional adjacent preferences restore with multiple selections and older saved results",()=>{
 const saved=Object.fromEntries(finderQuestions.filter(question=>!question.multiple).map(question=>[question.key,question.options[0]]));
 assert.equal(validFinderAnswers(saved),true);
 assert.equal(validFinderAnswers({...saved,extras:"Nutrition|Recovery"}),true);
 assert.equal(validFinderAnswers({...saved,extras:""}),true);
 assert.equal(validFinderAnswers({...saved,extras:["Nutrition"]}),false);
 assert.equal(validFinderAnswers({...saved,extras:"Nutrition|Invented"}),false);
 assert.deepEqual(selectedAdjacentFeatures("Recovery|Nutrition|Nutrition|Invented"),["Nutrition","Recovery"]);
 assert.equal(finderQuestions.find(question=>question.key==="extras").multiple,true);
});

test("adjacent preferences add bounded points without changing eligibility or unselected results",()=>{
 const app={...apps[0],features:["Nutrition guidance","Recovery tracking","Meditation","Cardio workouts","Body fat tracking"]};
 const base=fitScore(app,{});
 assert.equal(fitScore(app,{extras:""}),base);
 assert.equal(fitScore(app,{extras:"Nutrition|Recovery"}),base+4);
 assert.equal(fitScore(app,{extras:"Nutrition|Recovery|Mindfulness|Cardio|Body composition"}),base+6);
 assert.equal(fitScore(app,{extras:"Nutrition|Nutrition|Invented"}),base+2);
 assert.deepEqual(exclusionReasons({...app,features:[]},{extras:"Nutrition|Recovery"}),[]);
 assert.equal(fitScore({...app,features:[]},{extras:"Nutrition|Recovery"}),base);
 assert.equal(fitScore({...app,platforms:["Android"]},{platform:"iPhone",extras:"Nutrition"}),0);
 assert.ok(matchReasons(app,{extras:"Nutrition|Recovery"}).includes("Additional preferences: Nutrition, Recovery"));
 const generic={...app,features:["Health integration","Body measurements","Progress photos","Bodyweight training","Readiness feedback","Mobility"],description:"Nutrition, cardio, meditation, and body fat"};
 assert.deepEqual(matchedAdjacentFeatures(generic,{extras:"Nutrition|Recovery|Mindfulness|Cardio|Body composition"}),[]);
});

test("factual adjacent features require current documented or observed evidence",()=>{
 const app=factualFixture();app.features=["Nutrition guidance","Cardio workouts"];
 const answers={extras:"Nutrition|Cardio"};const base=fitScore(app,{});
 const claim={field:"features",status:"Officially documented",statement:"Documented features",checkedAt:"2026-11-04",url:"https://example.com/features",context:"Official product documentation",value:[...app.features]};
 app.factClaims=app.factClaims.filter(item=>item.field!=="features");
 assert.equal(fitScore(app,answers),base);
 app.factClaims.push(claim);
 assert.equal(fitScore(app,answers),base+4);
 for(const status of ["Developer-reported","Conflicting","Not established"]){claim.status=status;assert.equal(fitScore(app,answers),base);assert.deepEqual(matchedAdjacentFeatures(app,answers),[]);}
 claim.status="Officially documented";claim.value=["Older feature"];
 assert.equal(fitScore(app,answers),base);
});
