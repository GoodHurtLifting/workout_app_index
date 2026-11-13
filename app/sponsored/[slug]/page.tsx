import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicInformationLayout } from "@/components/public-information-layout";
import { publicPartnershipPlacements } from "@/lib/partnership-placements";
type Props = { params: Promise<{slug: string}> };
export const dynamic = "force-dynamic";
async function find(slug: string) {
 return (await publicPartnershipPlacements()).find(item => item.slug === slug && item.kind === "article");
}
export async function generateMetadata({params}: Props): Promise<Metadata> {
 const item = await find((await params).slug);
 if (!item) return { robots: { index: false } };
 return { title: `${item.title} | Sponsored | Workout App Index`, description: item.body.slice(0, 160), alternates: { canonical: `/sponsored/${item.slug}` }, openGraph: { type: "article", title: item.title, description: item.body.slice(0, 160), url: `/sponsored/${item.slug}` } };
}
export default async function SponsoredPage({params}: Props) {
 const item = await find((await params).slug);
 if (!item) notFound();
 const date = new Date(item.updatedAt).toISOString();
 const data = { "@context": "https://schema.org", "@type": "Article", headline: item.title, dateModified: date, author: { "@type": "Organization", name: "Workout App Index" }, isPartOf: { "@type": "WebSite", name: "Workout App Index", url: "https://workoutappindex.com" } };
 return <PublicInformationLayout eyebrow={`PAID PROMOTION · ${item.brand}`} title={item.title} introduction={`This feature was commissioned by ${item.brand}.`}>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data).replace(/</g, "\\u003c")}} />
  <p>Updated <time dateTime={date}>{date.slice(0,10)}</time> · Workout App Index</p>
  {item.body.split(/\n\s*\n/).map((paragraph,index)=><p key={index}>{paragraph}</p>)}
  <p><a href={item.destination} rel="sponsored noopener noreferrer" target="_blank">Visit {item.brand}</a></p>
 </PublicInformationLayout>;
}
