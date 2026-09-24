import type { Metadata } from "next";
import { EditorialRequestForm } from "@/components/editorial-request-form";
import { PublicInformationLayout } from "@/components/public-information-layout";

export const metadata: Metadata = {
  title: "Submit a Fitness App | Workout App Index",
  description:
    "Submit a publicly available fitness app for independent evaluation by Workout App Index.",
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
            If core features require payment or an account, be prepared to
            arrange review access. Do not send passwords through this form.
          </li>
        </ol>
        <p>
          Submission is free. It does not guarantee inclusion, a particular
          score, a favorable review, or a response by a fixed date. Advertising
          has no effect on editorial decisions.
        </p>
      </section>
      <EditorialRequestForm kind="app" />
    </PublicInformationLayout>
  );
}
