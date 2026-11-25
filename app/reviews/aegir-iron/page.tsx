import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EditorialLayout } from "@/components/editorial-layout";
import { aegirReview as article, articleStructuredData } from "@/lib/editorial";

export const metadata: Metadata = {
  title: `${article.title} | Workout App Index`,
  description: article.description,
  alternates: { canonical: "/reviews/aegir-iron" },
  authors: [{ name: article.author, url: "https://workoutappindex.com/about" }],
  openGraph: { title: article.title, description: article.description, url: "/reviews/aegir-iron", type: "article", publishedTime: article.publishedAt, authors: ["https://workoutappindex.com/about"] },
};

export default function AegirReviewPage() {
  return <EditorialLayout>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData(article)).replace(/</g, "\\u003c") }} />
    <article className="editorial-article">
      <Link className="editorial-back" href="/reviews"><ArrowLeft aria-hidden="true" /> Reviews &amp; Comparisons</Link>
      <header className="editorial-article-header"><p className="eyebrow">HANDS-ON REVIEW</p><h1>{article.title}</h1><div className="editorial-byline"><span>By <Link href="/about" rel="author">{article.author}</Link></span><time dateTime={article.publishedAt}>November 25, 2026</time></div></header>
      <aside className="editorial-scope" aria-label="Testing scope"><strong>What this review covers</strong><p>{article.scope}</p></aside>
      <div className="editorial-prose">{article.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{article.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}</div>
      <aside className="editorial-disclosure"><h2>About this coverage</h2><p>No material relationship with Ægir Iron beyond its free submission and testing. Ryan also builds fitness apps; read more <Link href="/about">about the author and WAI</Link>.</p><p>Have a factual correction? <Link href="/corrections">Send the statement and a supporting source.</Link></p></aside>
      <Link className="editorial-profile-link" href="/apps/gir-iron"><span><small>THE CATALOG PROFILE</small><strong>Ægir Iron’s features, pricing and platforms</strong></span><ArrowRight aria-hidden="true" /></Link>
    </article>
  </EditorialLayout>;
}
