import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialLayout } from "@/components/editorial-layout";

export const metadata: Metadata = {
  title: "About Workout App Index | Ryan Lovelace",
  description: "Meet Ryan Lovelace, founder and editor of Workout App Index, and learn why he built a place to find workout apps that fit the way you train.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Workout App Index", description: "The person behind Workout App Index.", url: "/about", type: "profile", firstName: "Ryan", lastName: "Lovelace" },
};

export default function AboutPage() {
  const structuredData = { "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: { "@type": "Person", "@id": "https://workoutappindex.com/about#ryan-lovelace", name: "Ryan Lovelace", jobTitle: "Founder and editor", url: "https://workoutappindex.com/about", image: "https://workoutappindex.com/images/ryan-lovelace.jpg", worksFor: { "@type": "Organization", name: "Workout App Index", url: "https://workoutappindex.com" } } };
  return <EditorialLayout>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <header className="editorial-introduction"><p className="eyebrow">THE PERSON BEHIND THE INDEX</p><h1>About Workout App Index</h1></header>
    <section className="about-author" aria-labelledby="ryan-lovelace"><div className="about-bio"><h2 id="ryan-lovelace">Ryan Lovelace</h2><p className="about-role">Founder &amp; editor</p>
      <p>I’m Ryan Lovelace, the founder and editor of Workout App Index. I started WAI to help people find the best workout app for the way they train and give indie developers a place alongside established brands.</p>
      <p>I’ve lived in the gym since 2016 and became a certified personal trainer in 2020. I’ve spent nearly two decades in commercial design and interactive development. I started building fitness apps in 2019, and these days I spend most of my time thinking about how they look, how they feel, and how they work.</p>
      <Link className="editorial-text-link" href="/reviews">Read the reviews <ArrowRight aria-hidden="true" /></Link>
    </div><Image className="about-portrait" src="/images/ryan-lovelace.jpg" alt="Ryan Lovelace" width={1492} height={2065} sizes="(max-width: 620px) 144px, 340px" /></section>
  </EditorialLayout>;
}
