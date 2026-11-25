import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialLayout } from "@/components/editorial-layout";
import { editorialArticles } from "@/lib/editorial";

export const metadata: Metadata = {
  title: "Workout App Reviews & Comparisons | Workout App Index",
  description: "Firsthand workout app reviews and practical comparisons, with clear testing scopes and the people behind the findings.",
  alternates: { canonical: "/reviews" },
  openGraph: { title: "Workout App Reviews & Comparisons", description: "A closer look at how workout apps feel and work in practice.", url: "/reviews", type: "website" },
};

export default function ReviewsPage() {
  return <EditorialLayout>
    <header className="editorial-introduction"><p className="eyebrow">THE APPS, IN PRACTICE</p><h1>Reviews &amp;<br />Comparisons</h1><p>A closer look at how workout apps feel and work, who they suit, and the tradeoffs that matter when you train.</p></header>
    <div className="editorial-review-list">{editorialArticles.map(article => <article className="editorial-review-card" key={article.slug}>
      <div className="editorial-card-label"><span>Hands-on review</span><time dateTime={article.publishedAt}>November 25, 2026</time></div>
      <h2><Link href={`/reviews/${article.slug}`}>{article.title}</Link></h2>
      <p>{article.description}</p>
      <div className="editorial-card-bottom"><span>By <Link href="/about">{article.author}</Link></span><Link href={`/reviews/${article.slug}`}>Read the review <ArrowRight aria-hidden="true" /></Link></div>
    </article>)}</div>
    <aside className="editorial-reading-note"><h2>Know what went into the review.</h2><p>Each article explains what we tried and what we didn’t. Publisher claims stay distinct from firsthand findings. For sourced pricing, features and platforms, start with the app’s catalog profile.</p><Link href="/editorial-standards#coverage">Our coverage standards <ArrowRight aria-hidden="true" /></Link></aside>
  </EditorialLayout>;
}
