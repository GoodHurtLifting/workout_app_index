import type { Metadata } from "next";
import Link from "next/link";
import { PublicInformationLayout } from "@/components/public-information-layout";

export const metadata: Metadata = {
  title: "Editorial Standards | Workout App Index",
  description:
    "How Workout App Index researches, tests, scores, and publishes fitness app reviews, including evidence limits and corrections.",
  alternates: { canonical: "/editorial-standards" },
};

export default function EditorialStandardsPage() {
  return (
    <PublicInformationLayout
      eyebrow="HOW WE WORK"
      title="Editorial standards"
      introduction="A useful recommendation starts with accurate facts and a clear explanation of who an app actually serves."
    >
      <section>
        <h2>What we evaluate</h2>
        <p>
          We look at the training decisions an app makes for you, the decisions
          you still own, its programming style, logging and progression tools,
          price, platform availability, AI use, and important limitations. The
          best app depends on the person using it; a longer feature list is not
          automatically a better fit.
        </p>
      </section>
      <section>
        <h2>How a review begins</h2>
        <p>
          We start with official product websites, app store listings, pricing
          pages, privacy documents, and available support information. We note
          the source, date, region, and access tier behind important claims.
          A developer submission starts research; it does not verify a claim or
          guarantee testing, a listing, or publication.
        </p>
      </section>
      <section>
        <h2>What hands-on testing covers</h2>
        <p>
          When hands-on access is practical, a normal catalog review allows
          about 60 to 90 minutes of use: one representative path through the
          product, one reasonable retry if blocked, and one obvious alternative
          route if available. We may stop sooner when the main experience and
          its tradeoff are clear.
          We do not require repeated workouts, special test access, or an
          unreleased build to write a qualified profile. If an important
          feature cannot be reached, we disclose that limit instead of calling
          it broken or verified.
        </p>
      </section>
      <section>
        <h2>What counts as evidence</h2>
        <p>
          We separate what we observed in the app from what an official source
          documents, what a developer reports, and what we infer editorially.
          An unresolved or untested claim is qualified or left out. Published
          privacy terms and visible controls inform our assessment, but we do
          not certify an app&apos;s underlying data handling, security, or legal
          compliance. A review is a bounded assessment, not an exhaustive
          product audit.
        </p>
      </section>
      <section>
        <h2>Three different scores</h2>
        <p>
          App Fit is personal to a visitor&apos;s finder answers. It is not a
          universal quality ranking. Legit Score and Originality &amp; Identity
          are separate editorial assessments on a 100-point scale.
        </p>
        <ul>
          <li>
            <strong>Legit Score</strong> averages five equally weighted
            dimensions: core execution, usability, reliability, value, and
            support/privacy.
          </li>
          <li>
            <strong>Originality &amp; Identity</strong> averages five equally
            weighted dimensions: original mechanics, product point of view,
            visual identity, meaningful differentiation, and defensibility.
          </li>
        </ul>
        <p>
          Each dimension needs a reason grounded in available evidence. Missing
          evidence is not treated as a product failure, but it cannot justify a
          high band that requires demonstrated, repeatable performance. An app
          can be well made without being especially original, or distinctive
          without being the right fit for you.
        </p>
      </section>
      <section>
        <h2>Confidence and review status</h2>
        <p>
          Where shown, confidence describes how much evidence supports an
          assessment, not how good the app is. Low means important paths or
          repeatability remain untested. Moderate means the main path and some
          return use or history were examined, with key commercial and policy
          facts cross-checked. High requires multiple representative sessions
          or workflows and independent checks of major claims. High should be
          uncommon for a catalog review.
        </p>
        <p>
          A Reviewed label means the editor approved the evidence-backed
          profile; it does not mean every feature or platform was tested.
          Earlier public profiles remain visible while they are reassessed and
          may still say Researching or Evaluation ready. Their scores are
          preliminary and should not be read as newly reviewed under this
          process.
        </p>
      </section>
      <section>
        <h2>Developer participation and publication</h2>
        <p>
          Developer participation is not required before publication. We may
          ask a focused factual question, but we do not provide routine review
          updates, negotiate scores in advance, or offer prepublication
          approval. A developer&apos;s response to our editorial outreach does
          not improve the support score. If a product changes, we consider the
          verified change in the relevant product dimension. The editor
          approves a reviewed profile, and publication is a separate decision.
        </p>
      </section>
      <section>
        <h2>Advertising and ownership</h2>
        <p>
          Ads help keep Workout App Index free. Advertisers cannot buy a
          listing, a higher score, or placement in finder results. Ads are
          labeled and kept separate from app recommendations. Workout App Index
          and The Lift League are both owned by Turf King LLC. The Lift League
          is evaluated under the same criteria as other apps, and shared
          ownership is disclosed in its profile.
        </p>
      </section>
      <section>
        <h2>Private developer audits</h2>
        <p>
          A developer may separately purchase a private positioning audit.
          Payment never affects whether WAI selects or publishes an app, its
          scores or ranking, or our editorial conclusions. Submitting an app
          remains free and does not require an audit.
        </p>
      </section>
      <section>
        <h2>Updates and corrections</h2>
        <p>
          Apps change. We review documented corrections and update profiles
          when the evidence supports a change. A new fact does not
          automatically change a score. If you find an error, please use our
          <Link href="/corrections"> corrections form</Link> and include a
          source we can check.
        </p>
      </section>
    </PublicInformationLayout>
  );
}
