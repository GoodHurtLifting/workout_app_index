import { publicOpenGraph } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { DeveloperSubmissionFunnel } from "@/components/developer-submission-funnel";
import { PublicInformationLayout } from "@/components/public-information-layout";

export const metadata: Metadata = {
  title: "Submit a Fitness App | Workout App Index",
  description:
    "Get a factual app listing for $20, or request human testing, a promotional review or a competitive comparison.",
  alternates: { canonical: "/submit-app" },
};

// Keep social previews aligned with this page canonical.
metadata.openGraph = publicOpenGraph(String(metadata.title), String(metadata.description), "/submit-app");

export default function SubmitAppPage() {
  return (
    <PublicInformationLayout
      eyebrow="FOR APP DEVELOPERS"
      title="Submit your app"
      introduction="Help the right users discover your app, improve the experience, or understand how it compares. Tell us about your product, then choose the support you need."
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
          A factual listing costs $20 and includes expedited assessment,
          source checks and profile preparation for eligible apps. We assess
          complete, accessible submissions within five business days. If an app
          is ineligible or we cannot deliver, we refund the listing fee in full.
          Additional testing, promotional writing and comparison services are
          available by agreement. <Link href="/terms">Read the terms</Link>.
          <Link href="/corrections"> Factual corrections remain free</Link>.
        </p>
      </section>
      <DeveloperSubmissionFunnel />
    </PublicInformationLayout>
  );
}
