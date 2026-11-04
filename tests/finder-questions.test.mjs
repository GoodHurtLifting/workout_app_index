import assert from "node:assert/strict";
import test from "node:test";
import { finderQuestions,normalizeFinderAnswers } from "../lib/finder-questions.ts";
import { apps } from "../lib/catalog.ts";
import { exclusionReasons,fitScore,matchReasons } from "../lib/matching.ts";
import { factualFixture } from "./fixtures/factual-profile.ts";
test("finder asks about platform once and combines the overlapping training questions",()=>{
 assert.equal(finderQuestions.length,8);assert.equal(new Set(finderQuestions.map(question=>question.key)).size,8);
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
