import type { Metadata } from "next";
import Link from "next/link";
import { PublicInformationLayout } from "@/components/public-information-layout";
import { CommercialInquiryForm } from "@/components/commercial-inquiry-form";
import { PartnershipPlacements } from "@/components/partnership-placements";
import { publicOpenGraph } from "@/lib/seo";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
 title: "Brand Placements, Sponsored Content & Market Research | Workout App Index",
 description: "Promote a fitness app, equipment or apparel brand with disclosed placements and useful sponsored content. Commission focused fitness-software research.",
 alternates: { canonical: "/partnerships" },
 openGraph: publicOpenGraph("Partnerships | Workout App Index", "Disclosed brand placements, sponsored features and practical market research.", "/partnerships"),
};
export default function PartnershipsPage() {
 return <PublicInformationLayout eyebrow="WORK WITH WAI" title="Connect with people choosing how to train" introduction="Put a relevant fitness product in front of interested readers, or get a clearer view of the fitness-app market.">
  <section><h2>Paid brand placements</h2><p>App, equipment and apparel brands can commission a clearly labeled sponsored link on this Partnerships page. We agree the message, destination and placement dates before publication. Availability, price and any audience figures are discussed for the specific placement.</p></section>
  <section><h2>Sponsored features</h2><p>Commission a dedicated sponsored article that explains your product, its intended audience and useful ways to apply it. Sponsored features are identified as paid promotion on the page and linked from our partner placements. Claims need supporting evidence.</p><p>App developers can also request product use and a promotional write-up through our <Link href="/submit-app">developer submission form</Link>.</p></section>
  <section><h2>Research for developers</h2><p>Understand competitor pricing, subscription boundaries, features, positioning and product experience. We can prepare a focused report around the decisions your team needs to make. Aggregate audience observations can be included when sufficient relevant data is available. Personal visitor and submission details are excluded.</p></section>
  <section><h2>Affiliate and referral arrangements</h2><p>Discuss disclosed referral links for products relevant to our readers. Commercial links identify the relationship, and finder matching remains based on product facts and visitor preferences.</p></section>
  <PartnershipPlacements />
  <CommercialInquiryForm kind="partnership" />
  <p>We agree deliverables, timing and price before work begins. Read our <Link href="/terms">terms</Link> and <Link href="/editorial-standards">research standards</Link>.</p>
 </PublicInformationLayout>;
}
