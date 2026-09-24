import type { Metadata } from "next";
import Link from "next/link";
import { PublicInformationLayout } from "@/components/public-information-layout";

export const metadata: Metadata = {
  title: "Editorial Standards | Workout App Index",
  description:
    "How Workout App Index researches fitness apps, evaluates fit and quality, handles advertising, and corrects mistakes.",
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
        <h2>Evidence and uncertainty</h2>
        <p>
          We start with official product websites, app store listings, pricing
          pages, and privacy documents. We identify claims that have not yet
          been independently confirmed and show the research status of each
          profile. Developer submissions are leads for research, not proof of a
          feature or a promise of inclusion.
        </p>
      </section>
      <section>
        <h2>Three distinct scores</h2>
        <p>
          App Fit reflects one visitor&apos;s stated needs. Legit Score evaluates
          product quality, credibility, usability, value, privacy, support, and
          maintenance. Originality &amp; Identity describes meaningful product
          differences. The How We Score view on the main site explains how to
          interpret each one.
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
