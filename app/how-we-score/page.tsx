import type { Metadata } from "next";
import Link from "next/link";
import { PublicInformationLayout } from "@/components/public-information-layout";

export const metadata: Metadata = {
  title: "How We Score Fitness Apps | Workout App Index",
  description: "How Workout App Index calculates App Fit, Legit Score, and Originality & Identity, and how evidence and confidence shape each review.",
  alternates: { canonical: "/how-we-score" },
};

export default function HowWeScorePage() {
  return <PublicInformationLayout eyebrow="OUR METHODOLOGY" title="How we score" introduction="The best fitness app is not the one with the most features or the highest number. It is the one that does the job you need, in a way you will want to keep using.">
    <section>
      <p><strong>Methodology versions:</strong> Finder matching <code>fit-1</code>; editorial scoring rubric <code>initial-v1</code>. The current review protocol applies to new evaluations and substantive reassessments from October 19, 2026. This explanation was approved October 21, 2026. Earlier public profiles are addressed below.</p>
      <p>We use three separate measures: App Fit, Legit Score, and Originality &amp; Identity. Confidence describes how much evidence supports an evaluation. It is not another quality score.</p>
    </section>
    <section>
      <h2>App Fit: right for you, not best overall</h2>
      <p>App Fit answers, &ldquo;How closely does this app match my finder answers?&rdquo; It is personalized, not an overall quality score, popularity contest, or endorsement.</p>
      <p>Some answers can rule an app out. Depending on what you request, the finder checks documented program type, adaptation, AI use, training environment, free access, and price. An unknown fact does not earn a match; when it is essential to a hard requirement, the app may be excluded. If none meet every requirement, we show nearby alternatives and their compromises.</p>
      <p>For compatible apps, the current finder starts at 22 points and adds:</p>
      <ul>
        <li>Up to 20 for the requested main job.</li>
        <li>16 for the primary planning style, or 9 for a supported secondary style.</li>
        <li>14 for the training goal.</li>
        <li>Usually 12 for the single most important feature or priority.</li>
        <li>6 for experience level and up to 10 for AI preference.</li>
      </ul>
      <p>If you choose <strong>Distinctive experience</strong>, that priority instead adds 0 to 12 points based on the app&apos;s Originality score: its score minus 50, divided by four, rounded, then limited to that range. The final Fit result is capped at 98. Compatible apps are ordered by this result. Legit Score does not add a hidden ranking bonus, and WAI ownership adds no finder points.</p>
      <p>Fit depends on accurate catalog fields. It cannot promise that an app will work for everyone who gives the same answers.</p>
    </section>
    <section>
      <h2>Legit Score: how well the product delivers</h2>
      <p>Legit Score assesses the product and access tier evaluated. It is not a claim that an app is legally compliant, medically valid, secure, bug-free, or suitable for everyone. We score five dimensions from 0 to 100, give each <strong>20% weight</strong>, and round their arithmetic mean to the nearest whole number.</p>
      <ul>
        <li><strong>Core execution:</strong> Can a user complete the principal training, planning, coaching, or logging job in the evaluated path?</li>
        <li><strong>Usability:</strong> Can a user find the next action, understand the controls, finish a session, and return without undue friction?</li>
        <li><strong>Reliability:</strong> Do the paths we actually test function and retain expected state? Strong claims of consistency need repeated evidence.</li>
        <li><strong>Value:</strong> What useful work is available at the current price, and where do trials, paywalls, or tier limits interrupt it?</li>
        <li><strong>Support and privacy:</strong> Are published privacy disclosures, visible controls, help routes, and ordinary customer-facing support coherent? This is not a security or compliance audit. A developer&apos;s response to WAI editorial outreach does not earn support points.</li>
      </ul>
      <p>Our working anchors are <strong>90 to 100</strong> for demonstrated, consistently strong performance; <strong>75 to 89</strong> for strong observed or documented performance with limited issues; <strong>60 to 74</strong> for a credible offering with material observed limitations; <strong>40 to 59</strong> for major observed limitations; and <strong>below 40</strong> for core failure or substantial negative evidence. New dimension judgments normally use five-point steps. We explain why evidence fits a band rather than adjusting a dimension to produce a preferred total.</p>
    </section>
    <section>
      <h2>Originality &amp; Identity: what gives it its own place</h2>
      <p>Originality is separate from quality. A conventional app may execute brilliantly; a distinctive app may still be difficult to use. We score five dimensions from 0 to 100, weight each <strong>20%</strong>, and round their arithmetic mean.</p>
      <ul>
        <li><strong>Original mechanics:</strong> A specific, meaningful product or training mechanism that differs from relevant alternatives.</li>
        <li><strong>Product point of view:</strong> Coherent decisions about whom the app serves and which tradeoffs it makes.</li>
        <li><strong>Visual identity:</strong> Recognizable, consistent design that supports the intended experience, not merely a style we like.</li>
        <li><strong>Meaningful differentiation:</strong> A verified reason a target user might choose it over named alternatives.</li>
        <li><strong>Defensibility:</strong> Evidence that a mechanism, integrated workflow, community, data advantage, or other asset would be meaningfully hard to reproduce.</li>
      </ul>
      <p>We may also use a descriptive label such as &ldquo;Clear identity&rdquo; or &ldquo;Distinctive.&rdquo; The label is an editorial summary, not a second mathematical formula or a claim that a feature is exclusive.</p>
      <p>More features, code, citations, technical complexity, or years of development do not automatically raise either editorial score. A feature matters when evidence shows that it improves a relevant dimension. Citations may explain a design choice without proving the app&apos;s calculations, outcomes, or scientific accuracy.</p>
    </section>
    <section>
      <h2>Confidence measures evidence, not quality</h2>
      <p>Confidence describes the breadth and strength of evidence behind an assessment. It never adds or subtracts points.</p>
      <ul>
        <li><strong>Low:</strong> At most one principal journey on one platform, a documentation-only assessment, or important workflows and repeatability remain untested.</li>
        <li><strong>Moderate:</strong> The main journey was completed, some return use or history was examined, and important pricing and policy facts were cross-checked. Material gaps are still stated.</li>
        <li><strong>High:</strong> Multiple representative sessions or workflows support repeatability, and major claims have been independently checked. This should be uncommon in a bounded catalog evaluation.</li>
      </ul>
      <p>A strong app can have Low Confidence. Missing evidence is not a defect or an automatic deduction, but cannot support a high band that requires demonstrated or consistent performance. A confirmed failure in a tested path can affect its dimension; an untested path remains unknown. If a profile has no confidence label, do not infer that WAI completed a High-Confidence evaluation.</p>
    </section>
    <section>
      <h2>What counts as evidence</h2>
      <ol>
        <li><strong>Directly observed:</strong> What WAI did and saw in a particular version, platform, country, tier, and date, when known. One observation is not universal proof.</li>
        <li><strong>Officially documented:</strong> What a current site, store listing, privacy policy, or help page says. This establishes the publisher&apos;s statement, not necessarily the feature&apos;s performance.</li>
        <li><strong>Developer-reported:</strong> What a developer says in a submission or conversation. It directs research but is not independent verification.</li>
        <li><strong>Editorial inference:</strong> WAI&apos;s reasoned conclusion about fit, tradeoffs, differentiation, or score, tied to evidence and relevant comparisons.</li>
        <li><strong>Unresolved:</strong> A missing, conflicting, stale, inaccessible, or untested claim. We qualify it, leave it out, or withhold the profile rather than silently treating it as true or false.</li>
      </ol>
      <p>When sources conflict, we identify the context. A current observed workflow is useful for what happened in that workflow; a current store or policy page may be a better source for stated availability, price, or privacy terms. Neither can be generalized beyond what was checked. We revisit a score when new evidence materially changes a dimension.</p>
    </section>
    <section>
      <h2>Research, testing, and publication are different</h2>
      <p>A <strong>researched profile</strong> draws on dated public sources and may not include personal use. A <strong>personally tested evaluation</strong> adds identified observations from using the product, not a test of every feature. A <strong>developer claim</strong> is a statement to investigate, not a completed evaluation.</p>
      <p>Routine hands-on catalog work is bounded. We usually allow about <strong>60 to 90 minutes</strong> for one representative journey, one reasonable retry after a barrier, and one obvious alternative route if available. We may stop sooner when the main experience and tradeoff are clear. This is not exhaustive quality assurance, a load test, security audit, legal review, or scientific validation of every calculation and training outcome.</p>
      <p>We record the review date, tested platform and access tier, region, and app version when available. If access is blocked or the version is unknown, we say so. An observation from one context does not establish behavior everywhere. Material product changes can make an older evaluation stale; a developer&apos;s report of a fix is not the same as WAI confirming it.</p>
      <p><strong>Reviewed</strong> means Ryan approved the exact editorial profile and its evidence for publication. It does not mean every feature was personally tested. Approval and publication are separate actions.</p>
      <h3>Earlier profiles</h3>
      <p>The original public catalog remains available while its entries are reassessed. Some carry earlier preliminary scores and a status such as &ldquo;Researching.&rdquo; Their older totals should not be compared as though each had already been calculated and approved under the <code>initial-v1</code> five-dimension rubric. A revised score becomes public only after its evidence-backed profile is approved and published.</p>
    </section>
    <section>
      <h2>Submissions, corrections, and editorial decisions</h2>
      <p><Link href="/submit-app">Submitting an app</Link> is free. A submission is an unverified research lead, not a verified profile. It guarantees neither screening, testing, scoring, listing, publication, a timetable, nor a favorable conclusion. An app may remain unscheduled or unpublished.</p>
      <p>Developers and readers may send <Link href="/corrections">evidence-backed factual corrections</Link>. We check the particular claim and may update a fact without changing a score. A material product change can justify reevaluation, but a request does not guarantee a rescore or an immediate update. Developers do not approve conclusions or negotiate scores before publication. Their participation is not required for a responsibly qualified profile.</p>
      <p>WAI may decline a new listing or withdraw an existing one when current evidence and practical access do not let us represent the user experience responsibly, especially when a material core claim cannot be verified or qualified fairly. Nonpublication is not itself a finding that an app is fraudulent or unsafe.</p>
    </section>
    <section>
      <h2>Money, access, and ownership</h2>
      <p>Advertising helps keep WAI free. Sponsorships, any affiliate relationships, private developer audits, and review access cannot buy a score, ranking, recommendation, finder placement, favorable conclusion, or publication. Ads and any commercial links are identified separately from editorial recommendations. Paid private work is not a route to a public score.</p>
      <p>Workout App Index and <strong>The Lift League</strong> share an owner, Turf King LLC. <strong>Caliper Cal</strong> is also a Turf King product. Readers should know this conflict of interest. Ownership is disclosed on any profile of a WAI-owned product; those products receive no finder bonus or guaranteed coverage. We treat our own product claims as first-party claims and state where independent evidence or testing is absent. We do not present an owner&apos;s self-evaluation as an independent third-party certification.</p>
    </section>
    <section>
      <h2>What our scores do not certify</h2>
      <p>We may read privacy policies, store disclosures, technical explanations, and cited studies, and test visible controls. Unless we identify a narrow claim and describe how we independently checked it, WAI does <strong>not</strong> certify legal compliance, actual backend data handling, security, medical validity, scientific accuracy, long-term reliability, or training outcomes. A high score describes the evidence-backed dimensions and scope stated in the profile, not every part of the product.</p>
    </section>
    <section>
      <h2>Common questions</h2>
      <h3>Why didn&apos;t a new feature increase the score?</h3><p>The score reflects what the feature demonstrably changes within a scored dimension. Mere presence, complexity, or development effort does not earn points. It may still deserve an accurate feature listing.</p>
      <h3>Why wasn&apos;t a developer&apos;s statement treated as verified?</h3><p>A submission or email tells us what to check. We distinguish that report from a current official source and from behavior WAI directly observed.</p>
      <h3>Can a developer request a rescore?</h3><p>A developer can send a documented correction or material update. WAI decides whether new evidence warrants reassessment. We do not negotiate a target number or promise a schedule.</p>
      <h3>Does paying WAI affect coverage?</h3><p>No. Paid audits, ads, sponsorships, and any affiliate relationship are separate from editorial selection, scores, ranking, finder placement, conclusions, and publication.</p>
      <h3>Does a high score mean WAI endorses every feature?</h3><p>No. Read the dimension rationale, confidence, tested context, and unresolved limits. A high total is not an exhaustive certification.</p>
      <h3>Can an app be left unpublished?</h3><p>Yes. A submission can remain in research, be declined, or be left unpublished if we cannot support a fair current profile. An existing listing may also need to be withdrawn when its material claims can no longer be responsibly represented.</p>
      <h3>How often are profiles updated?</h3><p>There is no fixed schedule. We consider documented corrections and material changes as capacity allows. Price, features, policies, and availability may change between checks, so the dates and scope shown with a profile matter.</p>
    </section>
  </PublicInformationLayout>;
}
