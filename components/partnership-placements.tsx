import Link from "next/link";
import { publicPartnershipPlacements } from "@/lib/partnership-placements";
export async function PartnershipPlacements() {
  const placements = await publicPartnershipPlacements();
  if (!placements.length) return null;
  return <section><h2>Paid partner placements</h2>{placements.map(item => <article className="partner-placement" key={item.slug}>
    <p className="eyebrow">PAID PROMOTION · {item.brand}</p>
    <h3>{item.title}</h3>
    <p>{item.body.slice(0, 350)}{item.body.length > 350 ? "…" : ""}</p>
    {item.kind === "article" ? <Link href={`/sponsored/${item.slug}`}>Read the sponsored feature</Link> : <a href={item.destination} rel="sponsored noopener noreferrer" target="_blank">Visit {item.brand}</a>}
  </article>)}</section>;
}
