import type { Metadata } from "next";
import Link from "next/link";
import { EditorialRequestForm } from "@/components/editorial-request-form";
import { PublicInformationLayout } from "@/components/public-information-layout";

export const metadata: Metadata = {
  title: "Submit a Fitness App | Workout App Index",
  description:
    "Submit a publicly available fitness app for editorial consideration by Workout App Index.",
  alternates: { canonical: "/submit-app" },
};

export default function SubmitAppPage() {
  return (
    <PublicInformationLayout
      eyebrow="FOR APP DEVELOPERS"
      title="Submit your app"
      introduction="Tell us about your product so we can decide whether it belongs in the index and research it under the same standards as every other app."
    >
      <section>
        <h2>Requirements before we can consider it</h2>
        <ol>
          <li>
            The app must be publicly available and usable by people outside
            your company, with a working official website or app store listing.
          </li>
          <li>
            It must help people train or track fitness in a substantive way;
            a landing page or waitlist alone is not enough.
          </li>
          <li>
            Its supported platforms, countries, current price, trial terms,
            and free tier limits must be publicly stated or supplied for review.
          </li>
          <li>
            Provide clear details of its workouts or programs, logging,
            progression, coaching, AI use, and any important equipment needs.
          </li>
          <li>
            Provide a public privacy policy and explain what training or
            health information the app collects and shares.
          </li>
          <li>
            If core features require payment or an account, describe the
            ordinary access path. Do not send passwords through this form.
          </li>
        </ol>
        <p>
          Submission is free. We may screen, waitlist, or decline an app
          according to fit, evidence, access, and editorial capacity. Submission
          does not guarantee testing, scoring, listing, publication, a timeline,
          or a favorable conclusion. Factual corrections are free. Optional
          paid follow-up testing, if separately agreed, pays for testing time
          and private findings, not a public score, ranking, recommendation,
          finder placement, or publication. See our
          <Link href="/editorial-standards"> editorial standards</Link> for how we
          handle later product changes.
        </p>
      </section>
      <EditorialRequestForm kind="app" />
    </PublicInformationLayout>
  );
}
