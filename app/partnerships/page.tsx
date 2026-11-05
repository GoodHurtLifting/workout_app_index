import { publicOpenGraph } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { PublicInformationLayout } from "@/components/public-information-layout";
import { CommercialInquiryForm } from "@/components/commercial-inquiry-form";

export const metadata: Metadata = {
  title: "Commercial Partnerships | Workout App Index",
  description: "Discuss disclosed sponsorships, affiliate and referral arrangements, and factual fitness-software market research with WAI.",
  alternates: { canonical: "/partnerships" },
};

// Keep social previews aligned with this page canonical.
metadata.openGraph = publicOpenGraph(String(metadata.title), String(metadata.description), "/partnerships");

export default function PartnershipsPage() {
  return <PublicInformationLayout eyebrow="WORK WITH WAI" title="Commercial partnerships" introduction="Explore useful, clearly disclosed commercial work while keeping product research and recommendations independent.">
    <section><h2>Affiliate, referral, and qualified-lead arrangements</h2><p>We may earn per-sale, recurring, or qualified-lead compensation for suitable fitness software. Recommendations must reflect buyer needs. Commercial participation cannot purchase preferential matching or finder placement. Apps without affiliate programs remain eligible for equal editorial consideration.</p><p>We disclose compensation near the relevant link. Any lead-sharing arrangement needs a defined qualification standard and the person&apos;s informed permission before their contact details are shared.</p></section>
    <section><h2>Sponsorships and advertising</h2><p>Potential formats include podcast and newsletter sponsorships, category-page sponsorships, videos, clearly labeled sponsored educational content, founder spotlights, profile enhancements, and site advertising. Paid enhancements cannot affect editorial conclusions. Sponsored material will be labeled where it appears.</p><p>We agree deliverables and pricing against demonstrated impressions, clicks, downloads, or engagement. We do not promise unsupported traffic, audience size, conversions, or results. Sponsorship cannot buy catalog inclusion, editorial selection, findings, recommendations, finder position, or removal of criticism.</p></section>
    <section><h2>Market research and intelligence</h2><p>We can discuss pricing and trial comparisons, free-tier boundaries, paywall and onboarding research, AI-use maps, category and feature maps, and custom factual reports. Our initial validation offer is a sample Fitness App Competitive Intelligence Brief for established fitness-software companies.</p><p>Recurring competitive-intelligence subscriptions are a possible future product. A founding price around $79 per month is a research hypothesis, not an available subscription. We will validate credible willingness to pay from at least three organizations before building subscription infrastructure.</p></section>
    <section><h2>Future data access and professional-software guidance</h2><p>Licensed datasets, structured exports, research dashboards, category feeds, and limited API access may follow demonstrated manual demand. No automated data subscription or API is being offered here. Buyer-intent information would require consent and privacy safeguards.</p><p>We may research tools for trainers, coaches, gyms, and studios. A dedicated professional finder will wait for viable partnerships or demonstrated buyer demand.</p></section>
    <section><h2>Separate commercial work from editorial decisions</h2><p>Factual corrections remain free. A commercial relationship cannot buy a favorable conclusion or publication. Material relationships that inform coverage will be disclosed, including Turf King ownership relationships. WAI may decline an engagement or partnership.</p><p>For a bounded private product assessment, visit <Link href="/services">Testing &amp; Research Services</Link>. Read our <Link href="/editorial-standards">editorial standards</Link> for evidence and disclosure rules.</p></section>
    <CommercialInquiryForm kind="partnership" />
  </PublicInformationLayout>;
}
