import type { Metadata } from "next";
import { EditorialRequestForm } from "@/components/editorial-request-form";
import { PublicInformationLayout } from "@/components/public-information-layout";

export const metadata: Metadata = {
  title: "Corrections | Workout App Index",
  description:
    "Send a sourced correction for a Workout App Index app profile or editorial page.",
  alternates: { canonical: "/corrections" },
};

export default function CorrectionsPage() {
  return (
    <PublicInformationLayout
      eyebrow="KEEP THE INDEX ACCURATE"
      title="Request a correction"
      introduction="If a price, feature, platform, policy, or other claim is out of date, send us the page and the evidence."
    >
      <section>
        <h2>What helps us verify it</h2>
        <ul>
          <li>The Workout App Index page where you found the issue.</li>
          <li>The specific statement that needs to change.</li>
          <li>The correct information and a public source that supports it.</li>
        </ul>
        <p>
          Factual corrections are free and may be sent at any time. We check
          the evidence before changing a profile. Correcting a fact does not
          automatically change a score or reopen the full evaluation. If a
          product has changed materially, tell us what changed and when; a
          request does not guarantee immediate retesting or publication.
        </p>
      </section>
      <EditorialRequestForm kind="correction" />
    </PublicInformationLayout>
  );
}
