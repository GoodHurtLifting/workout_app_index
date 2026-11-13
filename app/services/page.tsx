import type { Metadata } from "next";
import Link from "next/link";
import { PublicInformationLayout } from "@/components/public-information-layout";
import { CommercialPageView } from "@/components/commercial-page-view";
import { publicOpenGraph } from "@/lib/seo";
export const metadata: Metadata = {
  title: "App Testing, Reviews & Competitive Research | Workout App Index",
  description: "Find what holds users back, understand your competition, and help the right people discover your fitness app.",
  alternates: { canonical: "/services" },
  openGraph: publicOpenGraph("Testing & Research | Workout App Index", "Practical product feedback and coverage for fitness apps.", "/services"),
};
export default function ServicesPage() {
  return <PublicInformationLayout eyebrow="FOR FITNESS APP DEVELOPERS" title="Build a better app. Reach the right users." introduction="Get a clear outside view of your product, practical recommendations and coverage that explains who your app helps.">
    <CommercialPageView />
    <section><h2>Human testing and follow-up</h2><p>See where people get stuck. We work through an agreed part of your app, identify friction and reproducible problems, and explain what would make the experience easier. Follow-up helps you understand the findings and prioritize your next steps.</p></section>
    <section><h2>Experience review and promotional write-up</h2><p>Understand your app’s strengths, limitations and audience through a fuller experience review. You receive private recommendations and a clearly disclosed promotional write-up grounded in helping suitable users find your product.</p></section>
    <section><h2>Product use and competitive comparison</h2><p>We use your app as its intended customers would, then compare it with relevant industry leaders. Your inspirations, target audience and intended improvements help shape the comparison. You receive private findings and a written comparison explaining where your approach stands out and where it could improve.</p><p>Before we start, we agree which competitors and product experiences to examine, how long to use the product, and what the written deliverables will cover.</p></section>
    <section><h2>Service scope and limits</h2><p>We agree the work, access requirements, timing and price with you in a signed scope. A non-refundable 50% deposit starts the engagement. The final 50% is invoiced on completion. Additional platforms, competitors and follow-up can be added by agreement.</p><p>Services focus on product use, findings and writing. The scope sets revision and follow-up limits. Downloads, revenue and other commercial results are not guaranteed. Read our <Link href="/terms">service terms</Link>.</p></section>
    <section><h2>Start with your app</h2><p>Tell us how your app works, what inspired it and where you would like help. On the next step, choose a $20 factual listing or a service you would like to discuss. We use the same details to prepare your proposal.</p><p><Link className="service-cta" href="/submit-app">Tell us about your app →</Link></p></section>
    <section><h2>Clear findings and disclosed coverage</h2><p>Commissioned write-ups identify the commercial relationship. Findings reflect the evidence, and finder matching uses the same factual criteria for every app. <Link href="/corrections">Factual corrections</Link> remain free. For brand placements, sponsored content or market research, explore <Link href="/partnerships">partnerships</Link>.</p></section>
  </PublicInformationLayout>;
}
