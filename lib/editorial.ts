// Owner-approved public copy only. Original dictation and research stay private.
export const aegirReview = {
  "slug": "aegir-iron",
  "appId": "gir-iron",
  "title": "Ægir Iron review: One training home for athletes who cross strength sports",
  "author": "Ryan Lovelace",
  "publishedAt": "2026-11-25",
  "description": "Ryan Lovelace tries Ægir Iron’s program builder, completes one workout and takes a first look at its coach dashboard.",
  "scope": "One completed workout, program building and a first look at the desktop coach dashboard in October 2026. Band-resistance calculations, muscle mapping and strength-level estimates were not tested. This is not a retest of the latest release.",
  "intro": [
    "I tend to start by seeing how an app handles a 5×5 with a couple of accessory lifts each day, so I opened Ægir Iron with a pretty specific idea of what I wanted to train. In the program builder, I set up three full-body days a week, with a mix of heavy and volume days, six exercises per session, and an eight-week cycle split into two four-week blocks. I could preview how the week would lay out before building the plan. Then I took the first session into the gym.",
    "The program builder was one of my favorite parts of Ægir Iron. It let me make the decisions I already had in mind and see what they added up to. But the idea that stuck with me was bigger than any one program. What happens to your training history when the way you train changes?"
  ],
  "sections": [
    {
      "heading": "Built for athletes who cross over",
      "paragraphs": [
        "Angela, the developer behind Ægir Iron, told me she started building it to plan and track her own strength training with a remote coach. That grew into an app for athletes whose training might span powerlifting, Olympic weightlifting, strongman, and calisthenics. Her goal was to give lifters one place to keep their training history as they moved between disciplines or worked with different coaches.",
        "That’s what makes the app interesting to me. You might spend a block preparing for a powerlifting meet and later shift your attention to strongman events or bodyweight skills. The exercises, programming, and measures of progress can all change, but it’s still one athlete’s training history. Ægir Iron is built around that continuity.",
        "One detail that captured that thinking was the way it handles bands. You can define the estimated resistance of the bands you own, color by color, and use those values to calculate band-assisted work. I didn’t test the calculation during my workout, but the idea stood out to me. A band-assisted set can go into your training record with an estimate of how much help the band provided."
      ]
    },
    {
      "heading": "A lot of information, with a reason for it",
      "paragraphs": [
        "The workout screens are information-dense. During my session, it took me some time to find my way around the logging controls. I appreciated the exercise demos and automatic rest timer once I was into the workout. For a competitive athlete who wants to track individual set performance, exertion, cluster sets, and band assistance, I can see that depth being more useful than a streamlined training log.",
        "Angela told me she built Ægir Iron’s muscle mapping by hand, drawing on more than 171 journal publications to map how exercises work different muscle segments. For athletes whose training spans barbell lifts, strongman events, and bodyweight work, that breakdown could help show where the work overlaps across disciplines. The app also offers strength-level estimates. I didn’t test either feature during my session, but both stood out as features a competitive lifter might want that wouldn’t be included in a basic training log.",
        "I also connected a test athlete to the desktop coach dashboard. Even with a fresh account, the dashboard looked more than serviceable. It put the information I’d want to check as a coach in one place, including the athlete’s progress through the week’s program, readiness trends, and recent PRs."
      ]
    },
    {
      "heading": "The lifter behind the app",
      "paragraphs": [
        "I build fitness apps, too, and I appreciated how receptive Angela was when I shared my impressions. She was interested in what it was like to use Ægir Iron through a workout, and that told me she cares about the people who train with it. She’s clearly passionate about lifting and about building something that can keep up as an athlete’s training changes.",
        "If your training crosses strength sports and you want to keep that work together, Ægir Iron is worth a look."
      ]
    }
  ]
} as const;

export const editorialArticles = [aegirReview];

export function articleStructuredData(article: typeof aegirReview) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://workoutappindex.com/reviews/${article.slug}#article`,
    mainEntityOfPage: `https://workoutappindex.com/reviews/${article.slug}`,
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    author: { "@type": "Person", "@id": "https://workoutappindex.com/about#ryan-lovelace", name: article.author, url: "https://workoutappindex.com/about" },
    publisher: { "@type": "Organization", name: "Workout App Index", url: "https://workoutappindex.com" },
    about: { "@type": "SoftwareApplication", name: "Ægir Iron", url: "https://workoutappindex.com/apps/gir-iron" },
  };
}
