import type { Metadata } from "next";
import Link from "next/link";
import { PublicInformationLayout } from "@/components/public-information-layout";
import { CommercialInquiryForm } from "@/components/commercial-inquiry-form";
import { serviceOffers } from "@/lib/commercial-inquiries";

export const metadata: Metadata = {
  title: "Testing & Research Services | Workout App Index",
  description: "Bounded private human testing and competitive product research for fitness software. Agree a scope before payment.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <PublicInformationLayout eyebrow="PRIVATE PRODUCT RESEARCH" title="Testing & Research Services" introduction="Understand where people encounter friction, how your product compares, and which questions need closer investigation.">
    <section><p>WAI offers bounded private testing and research for fitness software. These are initial validation prices; the final deliverable, access, timing, and fee are agreed before payment.</p><p><a href="#request-scope">Request a scope</a></p></section>
    <section><h2>{serviceOffers.focused_test}</h2><ul><li>One platform and device.</li><li>One specified workflow, with up to approximately one hour of testing.</li><li>Reproducible problems and usability friction in the paths attempted.</li><li>Concise private findings, including what could not be verified.</li></ul></section>
    <section><h2>{serviceOffers.launch_review}</h2><ul><li>Onboarding and account creation.</li><li>The main product journey and paywall or purchase experience.</li><li>Important navigation and trust issues.</li><li>Prioritized private findings with supporting images.</li><li>Approximately two to three hours of bounded testing.</li></ul></section>
    <section><h2>{serviceOffers.competitive_audit}</h2><ul><li>Product experience review and comparison with up to three direct competitors.</li><li>Pricing, trial, paywall, positioning, audience, and differentiation analysis.</li><li>Written private report and a review call.</li></ul><p>The comparison set and depth are agreed in the scope. Documented competitor claims remain distinct from directly tested behavior.</p></section>
    <section><h2>Agree the boundaries first</h2><p>Services do not include implementation, unlimited retesting, store approval, or guaranteed commercial results. Any additional workflow, device, or follow-up needs a separate agreement. We may decline a scope that we cannot represent responsibly.</p></section>
    <section><h2>Private work and independent coverage</h2><p><Link href="/corrections">Factual corrections are free</Link>. Payment cannot purchase a listing, score, ranking, recommendation, finder placement, publication, or removal of legitimate criticism. Private findings do not automatically change public coverage. Material commercial relationships that inform public coverage will be disclosed. Developers do not approve WAI&apos;s conclusions.</p><p>Our <Link href="/editorial-standards">editorial standards</Link> apply to all public work. For sponsorships, referrals, or research partnerships, see <Link href="/partnerships">commercial partnerships</Link>.</p></section>
    <CommercialInquiryForm kind="service" />
  </PublicInformationLayout>;
}
