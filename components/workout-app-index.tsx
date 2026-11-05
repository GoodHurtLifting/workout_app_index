"use client";
import { adjacentFeatureOptions,adjacentFeatureSummary } from "@/lib/adjacent-features";
import {Fragment,useEffect,useLayoutEffect,useMemo,useRef,useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {ArrowRight,Check,ChevronRight,Filter,Search,SlidersHorizontal,X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Progress} from "@/components/ui/progress";
import {Sheet,SheetContent,SheetDescription,SheetFooter,SheetHeader,SheetTitle} from "@/components/ui/sheet";
import {getTrainingRelationship,type AppRecord} from "@/lib/catalog";
import {supportedFact} from "@/lib/catalog-facts";
import {displayFact,trainingApproach,freeAccessLabel,profileEvidenceLabel} from "@/lib/catalog-presentation";
import {finderQuestions as questions,selectedAdjacentFeatures,validFinderAnswers} from "@/lib/finder-questions";
import {exclusionReasons,fitScore,matchReasons} from "@/lib/matching";
import {matchingPeople} from "@/lib/people";
import {analyticsConsentGranted,openAnalyticsPreferences,trackEvent} from "@/lib/analytics";
import {useCatalogSearchAnalytics} from "@/components/use-catalog-search-analytics";
import {AdSlot} from "@/components/ad-slot";

const finderStorageKey = "wai-finder-results-v2";
const finderHistoryKey = "waiFinderAnswers";
const finderScrollKey = "waiFinderScrollY";

function restoreFinderAnswers(): Record<string, string> | null {
  const historyAnswers = window.history.state?.[finderHistoryKey];
  if (validFinderAnswers(historyAnswers)) return historyAnswers;
  try {
    const saved = window.sessionStorage.getItem(finderStorageKey);
    const parsed: unknown = saved ? JSON.parse(saved) : null;
    return validFinderAnswers(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function rememberFinderResults(answers: Record<string, string>) {
  const url = new URL(window.location.href);
  url.searchParams.set("finder", "results");
  window.history.replaceState(
    { ...window.history.state, [finderHistoryKey]: answers },
    "",
    url,
  );
  try {
    window.sessionStorage.setItem(finderStorageKey, JSON.stringify(answers));
  } catch {
    // The history entry still holds the answers if session storage is blocked.
  }
}

function rememberFinderScroll() {
  const scrollY = window.scrollY;
  window.history.replaceState(
    { ...window.history.state, [finderScrollKey]: scrollY },
    "",
    window.location.href,
  );
  try {
    window.sessionStorage.setItem(finderScrollKey, String(scrollY));
  } catch {
    // History state still retains the position if session storage is blocked.
  }
}

function savedFinderScroll(): number | null {
  let value: unknown = window.history.state?.[finderScrollKey];
  if (value == null) {
    try {
      value = window.sessionStorage.getItem(finderScrollKey);
    } catch {
      return null;
    }
  }
  const scrollY = Number(value);
  return Number.isFinite(scrollY) && scrollY >= 0 ? scrollY : null;
}

function clearFinderResults() {
  const url = new URL(window.location.href);
  if (url.searchParams.get("finder") !== "results") return;
  url.searchParams.delete("finder");
  const state = { ...window.history.state };
  delete state[finderHistoryKey];
  delete state[finderScrollKey];
  window.history.replaceState(state, "", url);
  try {
    window.sessionStorage.removeItem(finderStorageKey);
    window.sessionStorage.removeItem(finderScrollKey);
  } catch {
    // Browsers can disable session storage without affecting navigation.
  }
}


function AppCard({app,score,selected,onCompare,onOpenProfile,reasons=[],personMatches=[]}:{app:AppRecord;score?:number;selected:boolean;onCompare:()=>void;onOpenProfile?:()=>void;reasons?:string[];personMatches?:string[]}) {
  return <article className="app-card facts-app-card">
    <div className="app-card-top"><div className="app-identity"><span className="app-logo" style={{background:app.color}}>{app.initials}</span><div><p className="eyebrow">{app.type}</p><h3>{app.name}</h3></div></div>{score!==undefined?<div className="fit-score"><strong>{score}%</strong><span>Preference fit</span></div>:null}</div>
    <p className="best-for">May suit: {app.bestFor}</p><p className="description">{app.description}</p>
    {personMatches.length?<p className="person-match">People match: {personMatches.join(", ")}</p>:null}
    <dl className="catalog-facts"><div><dt>Price</dt><dd>{displayFact(app,"pricing",app.price)}</dd></div><div><dt>Platforms</dt><dd>{displayFact(app,"platforms",app.platforms.join(" · "))}</dd></div><div><dt>Training approach</dt><dd>{trainingApproach(app)}</dd></div><div><dt>Free access</dt><dd>{freeAccessLabel(app)}</dd></div><div><dt>AI use</dt><dd>{displayFact(app,"ai",app.ai)}</dd></div></dl>
    {reasons.length?<ul className="match-explanations">{reasons.map(reason=><li key={reason}><Check size={14}/>{reason}</li>)}</ul>:null}
    <p className="caveat"><strong>Consider:</strong> {app.caveat}</p><p className="catalog-evidence">{profileEvidenceLabel(app)}</p>
    <div className="card-actions"><Button variant={selected?"default":"outline"} onClick={onCompare}>{selected?<Check/>:null}{selected?"Added":"Compare"}</Button><Button variant="ghost" asChild><Link href={`/apps/${app.id}`} onClick={onOpenProfile}>View facts <ChevronRight/></Link></Button></div>
  </article>;
}

type InitialFilters={q?:string;ai?:string;author?:string;access?:string;level?:string};
export default function WorkoutAppIndex({initialApps,initialView="home",initialFilters={},restoreFinderOnMount=false}:{initialApps:AppRecord[];initialView?:"home"|"browse"|"finder";initialFilters?:InitialFilters;restoreFinderOnMount?:boolean}) {
  const apps=initialApps;const router=useRouter();
  const [view,setView]=useState<"home"|"browse"|"finder"|"compare"|"privacy">(initialView);
  const [step,setStep]=useState(0);const [answers,setAnswers]=useState<Record<string,string>>({});const [showResults,setShowResults]=useState(false);
  const [restorePending,setRestorePending]=useState(restoreFinderOnMount);const scrollToRestore=useRef<number|null>(null);
  useEffect(()=>{const restore=()=>{if(new URL(window.location.href).searchParams.get("finder")!=="results"){setRestorePending(false);return;}const saved=restoreFinderAnswers();if(saved){scrollToRestore.current=savedFinderScroll();setAnswers(saved);setStep(questions.length-1);setShowResults(true);setView("finder");}else clearFinderResults();setRestorePending(false);};window.addEventListener("popstate",restore);const frame=requestAnimationFrame(restore);return()=>{window.removeEventListener("popstate",restore);cancelAnimationFrame(frame);};},[restoreFinderOnMount]);
  useLayoutEffect(()=>{if(view!=="finder"||!showResults||scrollToRestore.current===null)return;const frame=requestAnimationFrame(()=>{window.scrollTo({top:scrollToRestore.current??0,behavior:"instant"});scrollToRestore.current=null;});return()=>cancelAnimationFrame(frame);},[view,showResults]);
  const [query,setQuery]=useState(initialFilters.q??"");
  const [aiOnly,setAiOnly]=useState(initialFilters.ai==="no-ai");const [freeOnly,setFreeOnly]=useState(initialFilters.access==="free");const [levelFilter,setLevelFilter]=useState(initialFilters.level??"All");
  const [typeFilter,setTypeFilter]=useState("All");const [platformFilter,setPlatformFilter]=useState("All");const [authorshipFilter,setAuthorshipFilter]=useState(initialFilters.author??"All");const [featureFilter,setFeatureFilter]=useState("All");const [filtersOpen,setFiltersOpen]=useState(false);const [compare,setCompare]=useState<string[]>([]);
  const ranked=useMemo(()=>apps.map(app=>({app,score:fitScore(app,answers)})).filter(item=>item.score>0).sort((a,b)=>b.score-a.score||a.app.name.localeCompare(b.app.name)),[apps,answers]);
  const nearMatches=useMemo(()=>apps.map(app=>({app,score:fitScore(app,answers,true),reasons:exclusionReasons(app,answers)})).sort((a,b)=>a.reasons.length-b.reasons.length||b.score-a.score||a.app.name.localeCompare(b.app.name)).slice(0,3),[apps,answers]);
  const filtered=useMemo(()=>apps.filter(app=>(!query||`${app.name} ${app.type} ${app.description} ${app.features.join(" ")}`.toLowerCase().includes(query.toLowerCase().trim())||matchingPeople(app,query).length>0)&&(!aiOnly||supportedFact(app,"ai")&&app.ai==="No AI identified")&&(!freeOnly||supportedFact(app,"hasUsableFreeTier")&&app.hasUsableFreeTier===true)&&(typeFilter==="All"||app.type.toLowerCase().includes(typeFilter.toLowerCase()))&&(platformFilter==="All"||supportedFact(app,"platforms")&&app.platforms.includes(platformFilter))&&(authorshipFilter==="All"||supportedFact(app,"authorship")&&app.authorship===authorshipFilter)&&(levelFilter==="All"||supportedFact(app,"level")&&app.level.includes(levelFilter))&&(featureFilter==="All"||supportedFact(app,"features")&&app.features.includes(featureFilter))).sort((a,b)=>a.name.localeCompare(b.name,"en",{sensitivity:"base"})||a.id.localeCompare(b.id)),[apps,query,aiOnly,freeOnly,typeFilter,platformFilter,authorshipFilter,levelFilter,featureFilter]);
  const activeFilters=[aiOnly,freeOnly,typeFilter!=="All",platformFilter!=="All",authorshipFilter!=="All",levelFilter!=="All",featureFilter!=="All"].filter(Boolean).length;
  const searchAnalytics=useCatalogSearchAnalytics({query,resultCount:filtered.length,groups:[...(freeOnly?["access" as const]:[]),...(aiOnly?["ai" as const]:[]),...(typeFilter!=="All"?["type" as const]:[]),...(platformFilter!=="All"?["platform" as const]:[]),...(authorshipFilter!=="All"?["authorship" as const]:[]),...(levelFilter!=="All"?["level" as const]:[]),...(featureFilter!=="All"?["feature" as const]:[])]},view==="browse");
  const markSearchChanged=searchAnalytics.changed;
  useEffect(()=>{if(initialView!=="browse")return;const frame=requestAnimationFrame(()=>{try{const search=window.sessionStorage.getItem("wai-pending-catalog-search");if(search!==null){if(window.sessionStorage.getItem("wai-pending-catalog-measurement")==="granted")markSearchChanged();setQuery(search);window.sessionStorage.removeItem("wai-pending-catalog-search");window.sessionStorage.removeItem("wai-pending-catalog-measurement");}}catch{}});return()=>cancelAnimationFrame(frame);},[initialView,markSearchChanged]);
  const clearFilters=()=>{searchAnalytics.changed();setQuery("");setAiOnly(false);setFreeOnly(false);setTypeFilter("All");setPlatformFilter("All");setAuthorshipFilter("All");setLevelFilter("All");setFeatureFilter("All");};
  const resetFinder=()=>{clearFinderResults();setAnswers({});setStep(0);setShowResults(false);};
  const navigate=(next:typeof view)=>{setView(next);if(next==="home"||next==="browse"||next==="finder"){if(next==="finder")resetFinder();router.push(next==="home"?"/":next==="browse"?"/apps":"/find");}window.scrollTo({top:0,behavior:"smooth"});};
  const toggleCompare=(id:string)=>{if(!compare.includes(id)&&compare.length<4)trackEvent("add_to_comparison",{app_id:id});setCompare(current=>current.includes(id)?current.filter(value=>value!==id):current.length>=4?current:[...current,id]);};
  const answer=(value:string)=>{const next={...answers,[questions[step].key]:value};setAnswers(next);if(step===questions.length-1){rememberFinderResults(next);trackEvent("complete_app_finder");setShowResults(true);}else setStep(current=>current+1);};
  const compared=compare.map(id=>apps.find(app=>app.id===id)).filter((app):app is AppRecord=>Boolean(app));
  if(restorePending)return <main className="product-shell finder-shell" aria-live="polite"><p>Restoring your app matches…</p></main>;
  return <main className="product-shell facts-first-site">
    <header className="site-header"><Link className="brand" href="/"><span className="brand-mark"><span/></span><span>WORKOUT APP <b>INDEX</b></span></Link><nav aria-label="Primary navigation"><Link href="/find" onClick={resetFinder}>Find an app</Link><Link href="/apps">Browse apps</Link><Link href="/editorial-standards">How we research</Link></nav><Button className="header-cta" onClick={()=>navigate("finder")}>Find my fit <ArrowRight/></Button></header>
    {view==="home"?<>
      <section className="hero facts-hero"><div className="hero-copy"><p className="kicker">INDEPENDENT WORKOUT APP RESEARCH</p><h1>Find an app that fits <em>how you train.</em></h1><p>Compare what workout apps offer, what they cost, and how they expect you to train. See the sources, the tradeoffs, and what remains unknown.</p><form className="home-catalog-search" onSubmit={event=>{event.preventDefault();try{window.sessionStorage.setItem("wai-pending-catalog-search",query.trim());window.sessionStorage.setItem("wai-pending-catalog-measurement",analyticsConsentGranted()?"granted":"denied");}catch{} router.push("/apps");}}><label className="sr-only" htmlFor="home-app-search">Search the app catalog</label><Search/><input id="home-app-search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search apps, features, or training styles"/><button type="submit" aria-label="Search catalog"><ArrowRight/></button></form><div className="hero-actions"><Button size="lg" onClick={()=>navigate("finder")}>Help me choose <ArrowRight/></Button><Button size="lg" variant="outline" onClick={()=>navigate("browse")}>Browse all {apps.length} apps</Button></div><p className="microcopy">Free to use. No account. Recommendations based on your needs.</p></div>
      <HomeAppExamples apps={apps}/></section>
      <section className="facts-principles"><div><strong>{apps.length} app profiles</strong><p>Practical product information in one place.</p></div><div><strong>Personal matching</strong><p>Your platform, training approach, equipment, and budget.</p></div><div><strong>Evidence with limits</strong><p>Public claims, firsthand findings, and unknowns kept distinct.</p></div></section>
      <section className="paths"><div className="section-heading"><p className="eyebrow">TWO WAYS TO START</p><h2>A shortlist, or the whole picture.</h2></div><div className="path-grid"><button onClick={()=>navigate("finder")}><span className="path-number">01</span><SlidersHorizontal/><h3>Help me choose</h3><p>Nine practical questions about your device, training, equipment, preferences, and budget.</p><span>Find my matches <ArrowRight/></span></button><button onClick={()=>navigate("browse")}><span className="path-number">02</span><Search/><h3>Explore the catalog</h3><p>Browse facts, filter the options, and compare the training approaches and access terms that matter to you.</p><span>Browse app profiles <ArrowRight/></span></button></div></section>
      <section className="category-strip"><p>EXPLORE BY NEED</p><div><Link href="/apps?level=Beginner">Beginner options</Link><Link href="/apps?ai=no-ai">No AI identified</Link><Link href="/apps?author=Trainer-written">Trainer-written programs</Link><Link href="/apps?access=free">Usable free tiers</Link></div></section>
      <AdSlot placement="home"/><section className="facts-services-note"><div><p className="eyebrow">FOR FITNESS SOFTWARE TEAMS</p><h2>Private testing and product research</h2><p>Defined workflows, bounded testing, and private findings. Separately scoped from public coverage.</p></div><Link href="/services">See testing &amp; research services <ArrowRight/></Link></section>
    </>:null}
    {view==="finder"&&!showResults?<section className="finder-shell"><div className="finder-progress"><span>QUESTION {step+1} OF {questions.length}</span><Progress value={((step+1)/questions.length)*100}/></div><div className="finder-question"><p className="eyebrow">FIND YOUR TRAINING FIT</p><h1>{questions[step].title}</h1><p className="question-help">{questions[step].help}</p>{questions[step].multiple?<fieldset className="option-grid adjacent-options"><legend className="sr-only">Check all that apply</legend>{adjacentFeatureOptions.map(option=><label key={option} className={selectedAdjacentFeatures(answers.extras).includes(option)?"selected":""}><input type="checkbox" checked={selectedAdjacentFeatures(answers.extras).includes(option)} onChange={()=>{const selected=selectedAdjacentFeatures(answers.extras);setAnswers(current=>({...current,extras:(selected.includes(option)?selected.filter(value=>value!==option):[...selected,option]).join("|")}));}}/>{option}</label>)}</fieldset>:<div className="option-grid">{questions[step].options.map((option,index)=><button key={option} className={answers[questions[step].key]===option?"selected":""} onClick={()=>answer(option)}><span>{String.fromCharCode(65+index)}</span>{option}<ChevronRight/></button>)}</div>}{questions[step].multiple?<Button className="adjacent-continue" onClick={()=>answer(answers.extras??"")}>Continue <ArrowRight/></Button>:null}<div className="finder-back"><Button variant="ghost" disabled={step===0} onClick={()=>setStep(current=>Math.max(0,current-1))}>Back</Button><button onClick={()=>answer(questions[step].multiple?"":"Not sure")}>{questions[step].multiple?"No preference / Skip":"I’m not sure / Skip"}</button></div></div></section>:null}
    {view==="finder"&&showResults?<section className="results-page"><div className="results-intro"><p className="eyebrow">YOUR PREFERENCES · {ranked.length} COMPATIBLE APPS</p><h1>Options that fit your training.</h1><p>Preference fit describes alignment with your answers, not overall product quality. Important unknowns cannot satisfy a hard requirement. Check each profile’s sources and current offer.</p><Button variant="outline" onClick={resetFinder}>Retake finder</Button></div>{ranked.length?<div className="result-grid">{ranked.slice(0,6).map(({app,score})=><AppCard key={app.id} app={app} score={score} reasons={matchReasons(app,answers)} selected={compare.includes(app.id)} onCompare={()=>toggleCompare(app.id)} onOpenProfile={rememberFinderScroll}/>)}</div>:<div className="near-matches"><div className="near-match-heading"><p className="eyebrow">NO CONFIRMED MATCH FOR EVERY REQUIREMENT</p><h2>Nearby options, with the limits explained.</h2><p>These apps have a mismatch or an important unknown. That uncertainty is part of the decision.</p></div><div className="result-grid">{nearMatches.map(({app,reasons})=><article className="app-card near-match-card" key={app.id}><h3>{app.name}</h3><p>{app.bestFor}</p><ul>{reasons.map(reason=><li key={reason}>{reason}</li>)}</ul><Link href={`/apps/${app.id}`} onClick={rememberFinderScroll}>Read the profile <ChevronRight/></Link></article>)}</div></div>}</section>:null}
    {view==="browse"?<section className="browse-page"><div className="browse-head"><div><p className="eyebrow">THE WORKOUT APP CATALOG</p><h1>Understand the options.</h1><p>Compare pricing, access, platforms, AI use, and how each app expects you to train. Profiles are listed alphabetically.</p></div><div className="browse-search"><Search/><Input value={query} onChange={event=>{searchAnalytics.changed();setQuery(event.target.value);}} placeholder="Search apps, features, trainers, or creators" aria-label="Search apps, features, trainers, or creators"/></div></div><div className="browse-toolbar"><Button variant={freeOnly?"default":"outline"} onClick={()=>{searchAnalytics.changed();setFreeOnly(value=>!value);}}>Usable free tier {freeOnly?<X/>:null}</Button><Button variant={aiOnly?"default":"outline"} onClick={()=>{searchAnalytics.changed();setAiOnly(value=>!value);}}>No AI identified {aiOnly?<X/>:null}</Button>{["All","Logger","Program"].map(type=><Button key={type} variant={typeFilter===type?"default":"outline"} onClick={()=>{searchAnalytics.changed();setTypeFilter(type);}}>{type==="All"?"All types":type=== "Logger"?"Loggers":"Programs"}</Button>)}<Button variant="outline" onClick={()=>setFiltersOpen(true)}><Filter/> More filters {activeFilters?<b>{activeFilters}</b>:null}</Button>{activeFilters||query?<button className="clear-link" onClick={clearFilters}>Clear</button>:null}<span>{filtered.length} apps</span></div>{filtered.length?<div className="result-grid">{filtered.map((app,index)=><Fragment key={app.id}><AppCard app={app} onOpenProfile={()=>searchAnalytics.select(app.id,index+1)} personMatches={matchingPeople(app,query).map(person=>person.name)} selected={compare.includes(app.id)} onCompare={()=>toggleCompare(app.id)}/>{index===5?<AdSlot placement="browse"/>:null}</Fragment>)}</div>:<div className="empty-state"><h2>No profiles match these filters</h2><p>Try a broader search or remove a filter. Unknown facts do not count as a confirmed match.</p><Button onClick={clearFilters}>Clear filters</Button></div>}</section>:null}
    {view==="compare"?<section className="compare-page"><button className="back-link" onClick={()=>navigate("browse")}>← Back to catalog</button><div className="compare-heading"><p className="eyebrow">SIDE BY SIDE</p><h1>Compare what matters.</h1><p>Product information and tradeoffs, without a universal winner.</p></div>{compared.length>=2?<div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>Product facts</th>{compared.map(app=><th key={app.id}><Link href={`/apps/${app.id}`}>{app.name}</Link><button aria-label={`Remove ${app.name}`} onClick={()=>toggleCompare(app.id)}><X/></button></th>)}</tr></thead><tbody>{[
      ["May suit",(app:AppRecord)=>app.bestFor],["Price",(app:AppRecord)=>displayFact(app,"pricing",app.price)],["Free access",freeAccessLabel],["Platforms",(app:AppRecord)=>displayFact(app,"platforms",app.platforms.join(", "))],["How you train",trainingApproach],["Decisions you still own",(app:AppRecord)=>displayFact(app,"trainingRelationship",getTrainingRelationship(app).decisionsRemaining??"")],["Program authorship",(app:AppRecord)=>displayFact(app,"authorship",app.authorship)],["AI use",(app:AppRecord)=>displayFact(app,"ai",app.ai)],["Features",(app:AppRecord)=>displayFact(app,"features",app.features.join(" · "))],...adjacentFeatureOptions.map(feature=>[feature,(app:AppRecord)=>adjacentFeatureSummary(app.adjacentFeatureEvidence,feature)]),["Tradeoff",(app:AppRecord)=>app.caveat],["Evidence",profileEvidenceLabel],
    ].map(([label,read])=><tr key={label as string}><th>{label as string}</th>{compared.map(app=><td key={app.id}>{(read as (app:AppRecord)=>string)(app)}</td>)}</tr>)}</tbody></table></div>:<p>Add at least two apps to compare.</p>}</section>:null}
      {view === "privacy" && (
        <section className="privacy-page">
          <p className="eyebrow">PRIVACY</p>
          <h1>Clear choices. Minimal collection.</h1>
          <div className="privacy-card">
            <h2>Public site</h2>
            <p>
              You can browse the catalog and use the app finder without an
              account. The finder runs in your browser; we do not send your
              individual questionnaire answers to Google Analytics.
            </p>
            <h2>Optional analytics</h2>
            <p>
              If you accept analytics, Google Analytics measures page views and
              broad interactions such as completing the finder, viewing an app
              profile, or adding an app to comparison. Google may process device,
              browser, approximate-location, and usage information under its own
              terms. Analytics remains off when you decline.
            </p>
            <h2>Advertising</h2>
            <p>
              Google AdSense may show clearly labeled ads on selected pages to
              help keep the site free. Google and its partners may use cookies
              or similar technologies for ad delivery and measurement. Ads do
              not influence recommendations, matching, or inclusion. Where required,
              an advertising consent message lets you manage those choices.
            </p>
            <h2>Submissions and private inquiries</h2>
            <p>
              If you submit an app, request a correction, or send a service or partnership inquiry, we store the
              information you provide in a private review queue. We use your
              contact details to evaluate the request and follow up if needed.
              Submissions and inquiries are not published automatically. Inquiry contact details and message content are not included in our custom analytics events.
            </p>
            <h2>Your choice</h2>
            <p>
              Your analytics preference is stored in your browser and applies
              to Analytics, not to advertising. You can change it at any time;
              declining Analytics does not limit the site.
            </p>
            <Button variant="outline" onClick={openAnalyticsPreferences}>
              Change analytics preference
            </Button>
            <h2>Contact</h2>
            <p>
              Questions or correction requests can be sent to Turf King LLC at
              <a href="mailto:ryan@workoutappindex.com">ryan@workoutappindex.com</a>.
            </p>
            <p className="privacy-updated">Last updated: November 4, 2026</p>
          </div>
        </section>
      )}

    {compare.length>0?<div className="compare-tray"><span><strong>{compare.length}</strong> selected</span><div>{compared.map(app=><span key={app.id}>{app.name}<button aria-label={`Remove ${app.name}`} onClick={()=>toggleCompare(app.id)}><X/></button></span>)}</div><Button disabled={compare.length<2} onClick={()=>navigate("compare")}>Compare apps <ArrowRight/></Button></div>:null}
    <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}><SheetContent className="filter-sheet"><SheetHeader><SheetTitle>Filter the catalog</SheetTitle><SheetDescription>Only established facts satisfy a selected filter. Use the finder for a personalized shortlist.</SheetDescription></SheetHeader><div className="filter-groups"><FilterGroup label="Platform" value={platformFilter} values={["All","Android","iOS","Web"]} onChange={value=>{searchAnalytics.changed();setPlatformFilter(value);}}/><FilterGroup label="Experience" value={levelFilter} values={["All","Beginner","Intermediate","Advanced"]} onChange={value=>{searchAnalytics.changed();setLevelFilter(value);}}/><FilterGroup label="Program authorship" value={authorshipFilter} values={["All","Trainer-written","User-created","Rules-based adaptive","AI-generated"]} onChange={value=>{searchAnalytics.changed();setAuthorshipFilter(value);}}/><FilterGroup label="Feature" value={featureFilter} values={["All","Fast logging","Expert programs","Detailed analytics","Built-in motivation","Community","Human coaching","Offline use"]} onChange={value=>{searchAnalytics.changed();setFeatureFilter(value);}}/></div><SheetFooter><Button onClick={()=>setFiltersOpen(false)}>Show {filtered.length} apps</Button><Button variant="ghost" onClick={clearFilters}>Clear filters</Button></SheetFooter></SheetContent></Sheet>
    <footer><Link href="/" className="brand">WORKOUT APP <b>INDEX</b></Link><p>Understand the apps. Find your fit.</p><div><Link href="/apps">Browse apps</Link><Link href="/find">Find an app</Link><Link href="/editorial-standards">Research standards</Link><Link href="/how-we-score">How matching works</Link><Link href="/corrections">Corrections</Link><Link href="/submit-app">Submit an app</Link><Link href="/services">Testing &amp; Research</Link><Link href="/partnerships">Partnerships</Link><button onClick={()=>navigate("privacy")}>Privacy</button></div><small>© 2026 Turf King LLC. App names and trademarks belong to their respective owners. Commercial relationships do not buy recommendations.</small></footer>
  </main>;
}
function FilterGroup({label,value,values,onChange}:{label:string;value:string;values:string[];onChange:(value:string)=>void}) {return <fieldset><legend>{label}</legend>{values.map(option=><button key={option} className={value===option?"selected":""} onClick={()=>onChange(option)}><span>{value===option?<Check/>:null}</span>{option}</button>)}</fieldset>;}


const homepageExampleIds = ["lift-league", "boostcamp", "hevy", "stronglifts"];

function HomeAppExamples({apps}:{apps:AppRecord[]}) {
  const examples = homepageExampleIds.flatMap(id => {
    const app = apps.find(candidate => candidate.id === id);
    return app ? [app] : [];
  });
  const [offset,setOffset] = useState(0);
  const [paused,setPaused] = useState(false);
  const [hovered,setHovered] = useState(false);
  const [focused,setFocused] = useState(false);
  const count = examples.length;
  useEffect(() => {
    if (paused || hovered || focused || count <= 3) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer:ReturnType<typeof setInterval>|undefined;
    const update = () => {
      if (timer) clearInterval(timer);
      if (!motion.matches) timer = setInterval(() => setOffset(current => (current + 1) % count),5000);
    };
    update();
    motion.addEventListener("change",update);
    return () => { if (timer) clearInterval(timer); motion.removeEventListener("change",update); };
  },[paused,hovered,focused,count]);
  const visible = Array.from({length:Math.min(3,count)},(_,index) => examples[(offset+index)%count]);
  return <aside className="facts-preview-panel" aria-label="Featured app examples" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);}}>
    <p className="eyebrow">START WITH THE ESSENTIALS</p><h2>Different apps.<br/>Different ways to train.</h2><p className="facts-panel-intro">Price, platform, and the decisions the app leaves to you.</p>
    <div className="facts-preview-list">{visible.map(app=><Link href={`/apps/${app.id}`} key={app.id}><span className="app-logo" style={{background:app.color}}>{app.initials}</span><div><strong>{app.name}</strong><span>{trainingApproach(app)}</span><small>{displayFact(app,"platforms",app.platforms.join(" · "))}</small></div><ChevronRight/></Link>)}</div>
    {count>3?<div className="facts-preview-controls"><button type="button" onClick={()=>setPaused(current=>!current)} aria-pressed={paused}>{paused?"Resume rotation":"Pause rotation"}</button><button type="button" onClick={()=>setOffset(current=>(current+1)%count)}>Next examples <ChevronRight aria-hidden="true"/></button></div>:null}
    <p className="facts-panel-foot">A few examples from the index. The Lift League and WAI share ownership through Turf King LLC.</p><Link className="text-link" href="/apps">Open the catalog <ArrowRight/></Link>
  </aside>;
}
