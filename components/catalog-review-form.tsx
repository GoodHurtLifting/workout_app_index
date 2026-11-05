"use client";

import { useActionState,type ReactNode } from "react";
import { FactClaimsEditor } from "@/components/fact-claims-editor";
import type { AppRecord } from "@/lib/catalog";
import { getTrainingRelationship } from "@/lib/catalog";
import { publicCatalogRecord } from "@/lib/catalog-facts";
import { AdjacentFeatureEditor } from "@/components/adjacent-feature-editor";
import { updateCatalogApp } from "@/app/admin/actions";
import { PersonAssociationEditor } from "@/components/person-association-editor";
import { AdminSubmitButton } from "@/components/admin-submit-button";

const planningStyles = [
  "Not assessed",
  "Follow a complete path",
  "Choose a proven path",
  "Let the app adapt",
  "Build it yourself",
  "Just log the work",
];

export function CatalogReviewForm({ app, savedFingerprint,publiclyListed=false,sourceLog }: { app: AppRecord; savedFingerprint: string;publiclyListed?:boolean;sourceLog?:ReactNode }) {
  const [result,action]=useActionState(updateCatalogApp,{error:""});
  const relationship = getTrainingRelationship(app);
  const audit=publicCatalogRecord(app).adjacentFeatureEvidence;

  return <form action={action} className="record-form">
    <input type="hidden" name="savedFingerprint" value={savedFingerprint} />
    <input type="hidden" name="id" value={app.id} />
    <p className="editor-help">Save a draft while you work, or update this public listing after checking its facts and sources. Other listings are unaffected.</p>
    <section>
      <h2>Product details</h2>
      <div className="form-grid">
        <label>Name<input name="name" defaultValue={app.name} required /></label>
        <label>Product type<input name="type" defaultValue={app.type} required /></label>
        <label>Logo initials<input name="initials" defaultValue={app.initials} required maxLength={6} /></label>
        <label>Logo color<input name="color" type="color" defaultValue={app.color} required /></label>
      </div>
      <label>Short description<textarea name="description" defaultValue={app.description} required rows={4} /></label>
      <label>May suit<input name="bestFor" defaultValue={app.bestFor} required /></label>
      <label>Important limits<textarea name="caveat" defaultValue={app.caveat} rows={3} /></label>
    </section>
    <details className="entry-editor-section" open><summary>Access &amp; product facts <small>Pricing, platforms, AI and features</small></summary><div>
      <div className="form-grid">
        <label>Price summary<input name="price" defaultValue={app.price} required /></label>
        <label>Monthly price in USD, if applicable<input name="monthlyPrice" type="number" min="0" step="0.01" defaultValue={app.monthlyPrice ?? ""} /></label>
        <label>Programming authorship<input name="authorship" defaultValue={app.authorship} /></label>
        <label>AI status<select name="ai" defaultValue={app.ai}><option>Not assessed</option><option>No AI identified</option><option>Optional AI</option><option>AI supporting features</option><option>AI central</option></select></label>
      </div>
      <label>Platforms, comma separated<input name="platforms" defaultValue={app.platforms.join(", ")} /></label>
      <label>Experience levels, comma separated<input name="level" defaultValue={app.level.join(", ")} /></label>
      <label>Training goals, comma separated<input name="goals" defaultValue={app.goals.join(", ")} /></label>
      <label>Training environments, comma separated<input name="supportedTrainingEnvironments" defaultValue={app.supportedTrainingEnvironments.join(", ")} /></label>
      <label>Notable features, comma separated<textarea name="features" defaultValue={app.features.join(", ")} rows={5} /></label>
      <div className="check-grid">
        <FactBoolean name="deliversCompleteProgram" value={app.deliversCompleteProgram} label="Complete program" />
        <FactBoolean name="programLibrary" value={app.programLibrary} label="Program library" />
        <FactBoolean name="adaptiveProgramming" value={app.adaptiveProgramming} label="Adaptive programming" />
        <FactBoolean name="supportsOneTimePurchase" value={app.supportsOneTimePurchase} label="One-time purchase available" />
        <FactBoolean name="hasUsableFreeTier" value={app.hasUsableFreeTier} label="Usable free tier" />
      </div>
      <p className="editor-help">What the free tier actually includes:</p>
      <div className="check-grid">
        <FactBoolean name="freeCompleteProgram" value={app.freeTierCapabilities.completeProgram} label="Complete program" />
        <FactBoolean name="freeAdaptiveProgramming" value={app.freeTierCapabilities.adaptiveProgramming} label="Adaptive programming" />
        <FactBoolean name="freeProgramLibrary" value={app.freeTierCapabilities.programLibrary} label="Program library" />
      </div>
    </div></details>
    <details className="entry-editor-section"><summary>Training approach <small>Planning, equipment and user choices</small></summary><div>
      <p className="editor-help">Describe the product workflow using supported facts. Preference matching uses these details; rankings cannot be edited directly.</p>
      <div className="form-grid">
        <label>Primary planning style<select name="planningStyle" defaultValue={relationship.planningStyle}>{planningStyles.map(value => <option key={value}>{value}</option>)}</select></label>
        <label>Secondary styles, comma separated<input name="secondaryStyles" defaultValue={relationship.secondaryStyles?.join(", ") ?? ""} /></label>
        <label>Choice load<select name="choiceLoad" defaultValue={relationship.choiceLoad}>{["Not assessed","Low","Moderate","High"].map(value => <option key={value}>{value}</option>)}</select></label>
        <label>Continuity<select name="continuity" defaultValue={relationship.continuity}>{["Not assessed","Single coherent system","Program-based","Session-adaptive","User-directed"].map(value => <option key={value}>{value}</option>)}</select></label>
        <label>Customization<select name="customization" defaultValue={relationship.customization}>{["Not assessed","Follow as written","Guided flexibility","Full control"].map(value => <option key={value}>{value}</option>)}</select></label>
      </div>
      <label>Decisions the app makes easier<textarea name="decisionsRemoved" defaultValue={relationship.decisionsRemoved ?? ""} rows={3} /></label>
      <label>Decisions the user still owns<textarea name="decisionsRemaining" defaultValue={relationship.decisionsRemaining ?? ""} rows={3} /></label>
      <label>Central tradeoff<textarea name="tradeoff" defaultValue={relationship.tradeoff ?? ""} rows={3} /></label>
      <label>This may sound like you<textarea name="idealUser" defaultValue={relationship.idealUser} rows={3}  /></label>
      <label>Probably not your fit<textarea name="notFor" defaultValue={relationship.notFor} rows={3}  /></label>
    </div></details>
    <AdjacentFeatureEditor name={app.name} initialAudit={audit}/>
    <details className="entry-editor-section"><summary>Sources &amp; verification <small>Claim-specific links, dates and unknowns</small></summary><div>
    <FactClaimsEditor initialClaims={app.factClaims ?? []} />
    {sourceLog}
    </div></details>
    <details className="entry-editor-section"><summary>Creators &amp; trainers <small>Optional associations</small></summary><div><PersonAssociationEditor initialPeople={app.people ?? []} /></div></details>
    <details className="entry-editor-section"><summary>Ownership &amp; disclosure</summary><div>      <label>Commercial relationship<select name="disclosureStatus" defaultValue={app.commercialDisclosure?.status ?? "not-established"}><option value="not-established">Not established yet</option><option value="none">No material commercial relationship</option><option value="material">Material relationship, disclosed below</option></select></label>
      <label>Public disclosure<textarea name="disclosureStatement" defaultValue={app.commercialDisclosure?.statement ?? ""} rows={3}/></label>
    </div></details>
    {result.error?<p className="catalog-proposal-notice" role="alert">{result.error}</p>:null}
    <div className="entry-save-bar"><AdminSubmitButton label="Save draft" pendingLabel="Saving…" name="intent" value="draft"/><AdminSubmitButton label={publiclyListed?"Update public listing":"Publish listing"} pendingLabel="Saving…" name="intent" value="publish"/></div>
  </form>;
}

function FactBoolean({name,value,label}:{name:string;value:boolean|null|undefined;label:string}) {
  return <label>{label}<select name={name} defaultValue={value==null?"unknown":String(value)}><option value="unknown">Not established</option><option value="true">Yes</option><option value="false">No</option></select></label>;
}
