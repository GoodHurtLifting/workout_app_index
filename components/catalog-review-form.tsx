import type { AppRecord } from "@/lib/catalog";
import { getOriginalityProfile, getTrainingRelationship } from "@/lib/catalog";
import { updateCatalogApp } from "@/app/admin/actions";
import { PersonAssociationEditor } from "@/components/person-association-editor";

const planningStyles = [
  "Follow a complete path",
  "Choose a proven path",
  "Let the app adapt",
  "Build it yourself",
  "Just log the work",
];

function ScoreField({ label, name, value }: { label: string; name: string; value: number }) {
  return <label>{label}<input name={name} type="number" min="0" max="100" step="1" defaultValue={value} required /></label>;
}

export function CatalogReviewForm({ app }: { app: AppRecord }) {
  const relationship = getTrainingRelationship(app);
  const originality = getOriginalityProfile(app);

  return <form action={updateCatalogApp} className="record-form">
    <input type="hidden" name="id" value={app.id} />
    <p className="editor-help">Save your changes as a draft. They do not change the public profile until a reviewed catalog is published.</p>
    <section>
      <h2>Identity and public verdict</h2>
      <div className="form-grid">
        <label>Name<input name="name" defaultValue={app.name} required /></label>
        <label>Product type<input name="type" defaultValue={app.type} required /></label>
        <label>Logo initials<input name="initials" defaultValue={app.initials} required maxLength={6} /></label>
        <label>Logo color<input name="color" type="color" defaultValue={app.color} required /></label>
      </div>
      <label>Short description<textarea name="description" defaultValue={app.description} required rows={4} /></label>
      <label>Best for<input name="bestFor" defaultValue={app.bestFor} required /></label>
      <label>Primary caveat<textarea name="caveat" defaultValue={app.caveat} rows={3} /></label>
    </section>
    <section>
      <h2>Access, features, and finder facts</h2>
      <div className="form-grid">
        <label>Price summary<input name="price" defaultValue={app.price} required /></label>
        <label>Monthly price in USD, if applicable<input name="monthlyPrice" type="number" min="0" step="0.01" defaultValue={app.monthlyPrice ?? ""} /></label>
        <label>Programming authorship<input name="authorship" defaultValue={app.authorship} /></label>
        <label>AI status<select name="ai" defaultValue={app.ai}><option>No AI identified</option><option>Optional AI</option><option>AI supporting features</option><option>AI central</option></select></label>
      </div>
      <label>Platforms, comma separated<input name="platforms" defaultValue={app.platforms.join(", ")} /></label>
      <label>Experience levels, comma separated<input name="level" defaultValue={app.level.join(", ")} /></label>
      <label>Training goals, comma separated<input name="goals" defaultValue={app.goals.join(", ")} /></label>
      <label>Training environments, comma separated<input name="supportedTrainingEnvironments" defaultValue={app.supportedTrainingEnvironments.join(", ")} /></label>
      <label>Notable features, comma separated<textarea name="features" defaultValue={app.features.join(", ")} rows={5} /></label>
      <div className="check-grid">
        <label><input type="checkbox" name="deliversCompleteProgram" defaultChecked={app.deliversCompleteProgram} /> Complete program</label>
        <label><input type="checkbox" name="programLibrary" defaultChecked={app.programLibrary} /> Program library</label>
        <label><input type="checkbox" name="adaptiveProgramming" defaultChecked={app.adaptiveProgramming} /> Adaptive programming</label>
        <label><input type="checkbox" name="supportsOneTimePurchase" defaultChecked={app.supportsOneTimePurchase} /> One-time purchase available</label>
        <label><input type="checkbox" name="hasUsableFreeTier" defaultChecked={app.hasUsableFreeTier} /> Usable free tier</label>
      </div>
      <p className="editor-help">What the free tier actually includes:</p>
      <div className="check-grid">
        <label><input type="checkbox" name="freeCompleteProgram" defaultChecked={app.freeTierCapabilities.completeProgram} /> Complete program</label>
        <label><input type="checkbox" name="freeAdaptiveProgramming" defaultChecked={app.freeTierCapabilities.adaptiveProgramming} /> Adaptive programming</label>
        <label><input type="checkbox" name="freeProgramLibrary" defaultChecked={app.freeTierCapabilities.programLibrary} /> Program library</label>
      </div>
    </section>
    <section>
      <h2>Training relationship</h2>
      <p className="editor-help">These judgments appear on the public profile and influence fit matching. Finder rank and related-app suggestions are calculated from the saved facts and cannot be edited as standalone text.</p>
      <div className="form-grid">
        <label>Primary planning style<select name="planningStyle" defaultValue={relationship.planningStyle}>{planningStyles.map(value => <option key={value}>{value}</option>)}</select></label>
        <label>Secondary styles, comma separated<input name="secondaryStyles" defaultValue={relationship.secondaryStyles?.join(", ") ?? ""} /></label>
        <label>Choice load<select name="choiceLoad" defaultValue={relationship.choiceLoad}>{["Low","Moderate","High"].map(value => <option key={value}>{value}</option>)}</select></label>
        <label>Continuity<select name="continuity" defaultValue={relationship.continuity}>{["Single coherent system","Program-based","Session-adaptive","User-directed"].map(value => <option key={value}>{value}</option>)}</select></label>
        <label>Customization<select name="customization" defaultValue={relationship.customization}>{["Follow as written","Guided flexibility","Full control"].map(value => <option key={value}>{value}</option>)}</select></label>
      </div>
      <label>Decisions the app makes easier<textarea name="decisionsRemoved" defaultValue={relationship.decisionsRemoved ?? ""} rows={3} /></label>
      <label>Decisions the user still owns<textarea name="decisionsRemaining" defaultValue={relationship.decisionsRemaining ?? ""} rows={3} /></label>
      <label>Central tradeoff<textarea name="tradeoff" defaultValue={relationship.tradeoff ?? ""} rows={3} /></label>
      <label>This may sound like you<textarea name="idealUser" defaultValue={relationship.idealUser} rows={3} required /></label>
      <label>Probably not your fit<textarea name="notFor" defaultValue={relationship.notFor} rows={3} required /></label>
    </section>
    <section>
      <h2>Scores and originality</h2>
      <p className="editor-help">These are WAI editorial judgments. Check the supporting evidence and rationale before approval. The smaller Legit Score breakdown shown in the finder is currently calculated from the overall score.</p>
      <div className="form-grid">
        <ScoreField label="Legit Score" name="legit" value={app.legit} />
        <ScoreField label="Originality score" name="originalityScore" value={originality.score} />
        <label>Originality level<select name="originalityLevel" defaultValue={originality.level}>{["Conventional","Clear identity","Distinctive","Category-defining"].map(value => <option key={value}>{value}</option>)}</select></label>
        <ScoreField label="Original mechanics" name="originalMechanics" value={originality.originalMechanics} />
        <ScoreField label="Product point of view" name="productPointOfView" value={originality.productPointOfView} />
        <ScoreField label="Visual identity" name="visualIdentity" value={originality.visualIdentity} />
        <ScoreField label="Meaningful differentiation" name="meaningfulDifferentiation" value={originality.meaningfulDifferentiation} />
        <ScoreField label="Defensibility" name="defensibility" value={originality.defensibility} />
      </div>
      <label>Public originality summary<textarea name="originalitySummary" defaultValue={originality.summary} rows={3} required /></label>
      <label>Public evidence note<textarea name="originalityEvidenceNote" defaultValue={originality.evidenceNote} rows={3} required /></label>
    </section>
    <PersonAssociationEditor initialPeople={app.people ?? []} />
    <section>
      <h2>Review status</h2>
      <div className="form-grid">
        <label>Research status<select name="researchStatus" defaultValue={app.researchStatus}><option>Candidate</option><option>Researching</option><option>Evaluation ready</option><option>Reviewed</option></select></label>
        <label>Research sections verified<input name="verifiedSections" type="number" min="0" step="1" defaultValue={app.verifiedSections} required /></label>
        <label>Total research sections<input name="totalSections" type="number" min="0" step="1" defaultValue={app.totalSections} required /></label>
      </div>
      <label className="review-confirmation"><input type="checkbox" name="confirmReview" /> I have reviewed this exact profile and approve marking it Reviewed. Required only when saving with Reviewed status.</label>
      <p className="editor-help">Saving a Reviewed record does not publish it. Use the dashboard publication control only after checking the preview and evidence.</p>
    </section>
    <button className="admin-primary" type="submit">Save catalog record</button>
  </form>;
}
