"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  apps as preliminaryApps,
  getOriginalityProfile,
  getTrainingRelationship,
  type AppRecord,
} from "@/lib/catalog";
import { exclusionReasons, fitScore } from "@/lib/matching";
import { openAnalyticsPreferences, trackEvent } from "@/lib/analytics";

const questions = [
  {
    title: "What do you want the app to do?",
    key: "job",
    options: [
      "Give me a complete program",
      "Adapt training for me",
      "Let me choose a proven program",
      "Help me build my own workouts",
      "Log workouts quickly",
    ],
  },
  {
    title: "When you open the app, what would feel most helpful?",
    key: "planning",
    options: [
      "Show me the next workout—no decisions needed",
      "Give me a few proven programs to choose from",
      "Adjust the workout based on my recent training",
      "Let me build exactly what I want",
      "Just stay out of the way while I log",
    ],
  },
  {
    title: "What is your main goal?",
    key: "goal",
    options: [
      "Build muscle",
      "Get stronger",
      "Powerlifting",
      "General fitness",
      "Learn resistance training",
      "Stay consistent",
    ],
  },
  {
    title: "How experienced are you?",
    key: "level",
    options: [
      "Completely new",
      "Beginner",
      "Intermediate",
      "Advanced",
      "Not sure",
    ],
  },
  {
    title: "Where do you usually train?",
    key: "equipment",
    options: [
      "Commercial gym",
      "Home gym",
      "Dumbbells only",
      "Barbell and plates",
      "Bodyweight",
      "It varies",
    ],
  },
  {
    title: "What matters most?",
    key: "priority",
    options: [
      "Fast logging",
      "Expert programs",
      "Automatic progression",
      "Detailed analytics",
      "Built-in motivation",
      "Community",
      "Human coaching",
      "Offline use",
      "Distinctive experience",
    ],
  },
  {
    title: "How do you feel about AI?",
    key: "ai",
    options: [
      "Avoid all AI",
      "Okay if it is optional",
      "AI-assisted features are okay",
      "I want AI-generated training",
      "No preference",
    ],
  },
  {
    title: "What is your budget?",
    key: "budget",
    options: [
      "Free only",
      "Up to $5 monthly",
      "Up to $10 monthly",
      "Up to $20 monthly",
      "One-time purchase",
      "Price is not a major factor",
    ],
  },
];

const featuredProfiles = [
  {
    id: "lift-league",
    highlights: ["Cohesive training system", "Proprietary scoring", "No AI identified"],
    spectrum: 58,
  },
  {
    id: "boostcamp",
    highlights: ["Proven programs", "Strength progression", "Broad free library"],
    spectrum: 68,
  },
  {
    id: "strengthlog",
    highlights: ["Detailed logging", "Proven programs", "Deep statistics"],
    spectrum: 76,
  },
  {
    id: "fitbod",
    highlights: ["Generated workouts", "Equipment aware", "Adaptive training"],
    spectrum: 62,
  },
] as const;

function AppCard({
  app,
  score,
  selected,
  onCompare,
}: {
  app: AppRecord;
  score?: number;
  selected: boolean;
  onCompare: () => void;
}) {
  return (
    <article className="app-card">
      <div className="app-card-top">
        <div className="app-identity">
          <span className="app-logo" style={{ background: app.color }}>
            {app.initials}
          </span>
          <div>
            <p className="eyebrow">{app.type}</p>
            <h3>{app.name}</h3>
          </div>
        </div>
        {score !== undefined && score > 0 ? (
          <div className="fit-score">
            <strong>{score}%</strong>
            <span>App Fit</span>
          </div>
        ) : null}
      </div>
      <p className="best-for">Best for: {app.bestFor}</p>
      <p className="description">{app.description}</p>
      <div className="chip-row">
        <span>{app.price}</span>
        <span>{app.platforms.join(" + ")}</span>
        <span
          className={app.ai === "No AI identified" ? "ai-clear" : "ai-used"}
        >
          {app.ai}
        </span>
      </div>
      <div className="card-rule" />
      <div className="legit-row">
        <span>
          <ShieldCheck size={16} /> Legit Score
        </span>
        <strong>{app.legit}/100</strong>
      </div>
      <div className="legit-row">
        <span>
          <Sparkles size={16} /> Originality &amp; Identity
        </span>
        <strong>{getOriginalityProfile(app.id).score}/100</strong>
      </div>
      <p className="caveat">
        <strong>Watch for:</strong> {app.caveat}
      </p>
      <div className="card-actions">
        <Button variant={selected ? "default" : "outline"} onClick={onCompare}>
          {selected ? <Check /> : null}
          {selected ? "Added" : "Compare"}
        </Button>
        <Button variant="ghost" asChild>
          <Link
            href={`/apps/${app.id}`}
            onClick={() => trackEvent("view_app_profile", { app_id: app.id })}
          >
            View profile <ChevronRight />
          </Link>
        </Button>
      </div>
    </article>
  );
}

export default function Home() {
  const [apps, setApps] = useState<AppRecord[]>(preliminaryApps);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  useEffect(() => {
    let active = true;
    fetch("/api/catalog")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.apps) && data.apps.length)
          setApps(data.apps);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const timer = window.setInterval(
      () => setFeaturedIndex((index) => (index + 1) % featuredProfiles.length),
      8000,
    );
    return () => window.clearInterval(timer);
  }, []);
  const [view, setView] = useState<
    | "home"
    | "finder"
    | "browse"
    | "method"
    | "profile"
    | "compare"
    | "privacy"
  >("home");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [query, setQuery] = useState("");
  const [aiOnly, setAiOnly] = useState(false);
  const [typeFilter, setTypeFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [authorshipFilter, setAuthorshipFilter] = useState("All");
  const [featureFilter, setFeatureFilter] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [compare, setCompare] = useState<string[]>([]);
  const profileId = "boostcamp";
  // Both calculations intentionally rerun when the asynchronously published catalog changes.
  const ranked = useMemo(
    () =>
      apps
        .map((app) => ({ app, score: fitScore(app, answers) }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score),
    [apps, answers],
  );
  const nearMatches = useMemo(
    () =>
      apps
        .map((app) => ({
          app,
          score: fitScore(app, answers, true),
          reasons: exclusionReasons(app, answers),
        }))
        .sort(
          (a, b) =>
            a.reasons.length - b.reasons.length || b.score - a.score,
        )
        .slice(0, 3),
    [apps, answers],
  );
  const filtered = useMemo(
    () =>
      apps.filter(
        (app) =>
          (!query ||
            `${app.name} ${app.type} ${app.features.join(" ")}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (!aiOnly || app.ai === "No AI identified") &&
          (typeFilter === "All" ||
            app.type.toLowerCase().includes(typeFilter.toLowerCase())) &&
          (platformFilter === "All" ||
            app.platforms.includes(platformFilter)) &&
          (authorshipFilter === "All" || app.authorship === authorshipFilter) &&
          (featureFilter === "All" || app.features.includes(featureFilter)),
      ),
    [
      apps,
      query,
      aiOnly,
      typeFilter,
      platformFilter,
      authorshipFilter,
      featureFilter,
    ],
  );
  const activeFilters = [
    aiOnly,
    typeFilter !== "All",
    platformFilter !== "All",
    authorshipFilter !== "All",
    featureFilter !== "All",
  ].filter(Boolean).length;
  const clearFilters = () => {
    setQuery("");
    setAiOnly(false);
    setTypeFilter("All");
    setPlatformFilter("All");
    setAuthorshipFilter("All");
    setFeatureFilter("All");
  };
  const toggleCompare = (id: string) => {
    if (!compare.includes(id) && compare.length < 4)
      trackEvent("add_to_comparison", { app_id: id });
    setCompare((current) => {
      if (current.includes(id)) return current.filter((x) => x !== id);
      if (current.length >= 4) return current;
      return [...current, id];
    });
  };
  const navigate = (next: typeof view) => {
    setView(next);
    trackEvent("page_view", {
      page_path: next === "home" ? "/" : `/${next}`,
      page_title: `Workout App Index - ${next}`,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const answer = (value: string) => {
    const q = questions[step];
    setAnswers((a) => ({ ...a, [q.key]: value }));
    if (step === questions.length - 1) {
      trackEvent("complete_app_finder");
      setShowResults(true);
    }
    else setStep((s) => s + 1);
  };
  const profile = apps.find((a) => a.id === profileId) ?? apps[0];
  const profileRelationship = getTrainingRelationship(profile.id);
  const profileOriginality = getOriginalityProfile(profile.id);
  const featuredProfile = featuredProfiles[featuredIndex];
  const heroFeatured =
    apps.find((app) => app.id === featuredProfile.id) ?? apps[0];
  const compared = compare
    .map((id) => apps.find((a) => a.id === id))
    .filter(Boolean) as AppRecord[];
  return (
    <main className="product-shell">
      <header className="site-header">
        <button className="brand" onClick={() => navigate("home")}>
          <span className="brand-mark">
            <span />
          </span>
          <span>
            WORKOUT APP <b>INDEX</b>
          </span>
        </button>
        <nav aria-label="Primary navigation">
          <button onClick={() => navigate("finder")}>Find My App</button>
          <button onClick={() => navigate("browse")}>Browse Apps</button>
          <button onClick={() => navigate("method")}>How We Score</button>
        </nav>
        <Button className="header-cta" onClick={() => navigate("finder")}>
          Find My App <ArrowRight />
        </Button>
      </header>
      {view === "home" && (
        <>
          <section className="hero">
            <div className="hero-copy">
              <p className="kicker">INDEPENDENT FITNESS APP INTELLIGENCE</p>
              <h1>
                The definitive guide to fitness apps.
                <br />
                <em>Your best fit, found.</em>
              </h1>
              <p>
                Compare strength-training apps by features, programming style,
                price, AI use, and the things that actually affect your
                workouts.
              </p>
              <div className="hero-actions">
                <Button size="lg" onClick={() => navigate("finder")}>
                  Find My App <ArrowRight />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("browse")}
                >
                  Browse all apps
                </Button>
              </div>
              <p className="microcopy">
                No account. No sponsored rankings. About two minutes.
              </p>
            </div>
            <div className="match-panel">
              <div className="panel-head">
                <span>FEATURED PROFILE</span>
                <div className="carousel-controls">
                  <span>{featuredIndex + 1} / {featuredProfiles.length}</span>
                  <button
                    aria-label="Previous featured app"
                    onClick={() =>
                      setFeaturedIndex(
                        (index) =>
                          (index - 1 + featuredProfiles.length) %
                          featuredProfiles.length,
                      )
                    }
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    aria-label="Next featured app"
                    onClick={() =>
                      setFeaturedIndex(
                        (index) => (index + 1) % featuredProfiles.length,
                      )
                    }
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>
              <div className="match-app">
                <span
                  className="app-logo large"
                  style={{ background: heroFeatured.color }}
                >
                  {heroFeatured.initials}
                </span>
                <div>
                  <p>{heroFeatured.type.toUpperCase()}</p>
                  <h2>{heroFeatured.name}</h2>
                  <span>{heroFeatured.bestFor}</span>
                </div>
                <div className="hero-score">
                  <strong>{getOriginalityProfile(heroFeatured.id).score}</strong>
                  <span>ORIGINALITY</span>
                </div>
              </div>
              <div className="match-reasons">
                {featuredProfile.highlights.map((highlight) => (
                  <div key={highlight}>
                    <Check /> {highlight}
                  </div>
                ))}
              </div>
              <div className="spectrum">
                <div>
                  <span>Simple</span>
                  <span>Technical</span>
                </div>
                <i>
                  <b style={{ width: `${featuredProfile.spectrum}%` }} />
                </i>
              </div>
              <div className="panel-foot">
                <span>
                  <ShieldCheck /> Legit Score{" "}
                  <strong>{heroFeatured.legit}</strong>
                </span>
                <span>AI: {heroFeatured.ai}</span>
                <Link
                  href={`/apps/${heroFeatured.id}`}
                  onClick={() =>
                    trackEvent("view_app_profile", { app_id: heroFeatured.id })
                  }
                >
                  View profile <ChevronRight />
                </Link>
              </div>
            </div>
          </section>
          <section className="proof">
            <div>
              <strong>{apps.length}</strong>
              <span>researched app profiles</span>
            </div>
            <div>
              <strong>60+</strong>
              <span>features in the catalog model</span>
            </div>
            <div>
              <strong>3</strong>
              <span>separate, explainable scores</span>
            </div>
            <p>Independent guidance. Transparent methods. No sponsored rankings.</p>
          </section>
          <section className="paths">
            <div className="section-heading">
              <p className="eyebrow">START WHERE YOU ARE</p>
              <h2>Know what you need—or don’t.</h2>
            </div>
            <div className="path-grid">
              <button onClick={() => navigate("finder")}>
                <span className="path-number">01</span>
                <Sparkles />
                <h3>Match me</h3>
                <p>
                  Answer eight plain-language questions and see which apps fit
                  your training.
                </p>
                <span>
                  Start the finder <ArrowRight />
                </span>
              </button>
              <button onClick={() => navigate("browse")}>
                <span className="path-number">02</span>
                <Search />
                <h3>Explore myself</h3>
                <p>
                  Search the catalog and filter by programming, price, AI use,
                  features, and more.
                </p>
                <span>
                  Browse the index <ArrowRight />
                </span>
              </button>
            </div>
          </section>
          <section className="category-strip">
            <p>POPULAR STARTING POINTS</p>
            <div>
              <button onClick={() => navigate("browse")}>
                Beginner friendly
              </button>
              <button
                onClick={() => {
                  setAiOnly(true);
                  navigate("browse");
                }}
              >
                No AI identified
              </button>
              <button onClick={() => navigate("browse")}>
                Trainer-written
              </button>
              <button onClick={() => navigate("browse")}>Free options</button>
              <button onClick={() => navigate("browse")}>
                Built-in motivation
              </button>
            </div>
          </section>
        </>
      )}
      {view === "finder" && !showResults && (
        <section className="finder-shell">
          <div className="finder-progress">
            <span>
              QUESTION {step + 1} OF {questions.length}
            </span>
            <Progress value={((step + 1) / questions.length) * 100} />
          </div>
          <div className="finder-question">
            <p className="eyebrow">BUILDING YOUR APP FIT PROFILE</p>
            <h1>{questions[step].title}</h1>
            {step === 4 && (
              <p>
                Choose the single most important one for now. You can refine
                this later.
              </p>
            )}
            <div className="option-grid">
              {questions[step].options.map((option, i) => (
                <button key={option} onClick={() => answer(option)}>
                  <span>{String.fromCharCode(65 + i)}</span>
                  {option}
                  <ChevronRight />
                </button>
              ))}
            </div>
            <div className="finder-back">
              <Button
                variant="ghost"
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                Back
              </Button>
              <button onClick={() => answer("Not sure")}>
                I’m not sure / Skip
              </button>
            </div>
          </div>
        </section>
      )}
      {view === "finder" && showResults && (
        <section className="results-page">
          <div className="results-intro">
            <p className="eyebrow">
              YOUR RESULTS · {ranked.length} COMPATIBLE APPS
            </p>
            <h1>Your strongest matches</h1>
            <p>
              Ranked for your preferences—not popularity. Scores reflect the
              published match criteria; ownership never affects placement.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setStep(0);
                setShowResults(false);
              }}
            >
              Retake finder
            </Button>
          </div>
          {ranked.length ? (
            <div className="result-grid">
              {ranked.slice(0, 6).map(({ app, score }) => (
                <AppCard
                  key={app.id}
                  app={app}
                  score={score}
                  selected={compare.includes(app.id)}
                  onCompare={() => toggleCompare(app.id)}
                />
              ))}
            </div>
          ) : (
            <div className="near-matches">
              <div className="near-match-heading">
                <p className="eyebrow">NO EXACT MATCH YET</p>
                <h2>Here’s what came closest.</h2>
                <p>
                  Your requirements conflict with every verified profile. These
                  are the nearest alternatives and the specific compromises
                  each one requires.
                </p>
              </div>
              <div className="result-grid">
                {nearMatches.map(({ app, reasons }) => (
                  <article className="app-card near-match-card" key={app.id}>
                    <div className="app-identity">
                      <span
                        className="app-logo"
                        style={{ background: app.color }}
                      >
                        {app.initials}
                      </span>
                      <div>
                        <p className="eyebrow">CLOSEST ALTERNATIVE</p>
                        <h3>{app.name}</h3>
                      </div>
                    </div>
                    <p className="best-for">Best for: {app.bestFor}</p>
                    <p className="near-match-label">What conflicts:</p>
                    <ul>
                      {reasons.map((reason) => (
                        <li key={reason}>{reason}</li>
                      ))}
                    </ul>
                    <Button variant="outline" asChild>
                      <Link
                        href={`/apps/${app.id}`}
                        onClick={() =>
                          trackEvent("view_app_profile", { app_id: app.id })
                        }
                      >
                        View profile <ChevronRight />
                      </Link>
                    </Button>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
      {view === "browse" && (
        <section className="browse-page">
          <div className="browse-head">
            <div>
              <p className="eyebrow">THE CATALOG</p>
              <h1>Browse workout apps</h1>
              <p>
                Research-backed profiles with transparent facts, scoring, and
                tradeoffs.
              </p>
            </div>
            <div className="browse-search">
              <Search />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search apps or features"
              />
            </div>
          </div>
          <div className="browse-toolbar">
            <Button
              variant={aiOnly ? "default" : "outline"}
              onClick={() => setAiOnly((x) => !x)}
            >
              <Filter /> No AI identified {aiOnly ? <X /> : null}
            </Button>
            {["All", "Logger", "Program"].map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? "default" : "outline"}
                onClick={() => setTypeFilter(type)}
              >
                {type}
              </Button>
            ))}
            <Button variant="outline" onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal /> All filters{" "}
              {activeFilters > 0 ? <b>{activeFilters}</b> : null}
            </Button>
            {activeFilters > 0 ? (
              <button className="clear-link" onClick={clearFilters}>
                Clear
              </button>
            ) : null}
            <span>{filtered.length} apps</span>
          </div>
          {filtered.length ? (
            <div className="result-grid">
              {filtered.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  selected={compare.includes(app.id)}
                  onCompare={() => toggleCompare(app.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No exact matches</h2>
              <p>Try removing a filter or searching for a broader feature.</p>
              <Button onClick={clearFilters}>Clear filters</Button>
            </div>
          )}
        </section>
      )}
      {view === "profile" && (
        <section className="profile-page">
          <button className="back-link" onClick={() => navigate("browse")}>
            ← Back to all apps
          </button>
          <div className="profile-hero">
            <div className="profile-title">
              <span
                className="app-logo profile-logo"
                style={{ background: profile.color }}
              >
                {profile.initials}
              </span>
              <div>
                <p className="eyebrow">{profile.type}</p>
                <h1>{profile.name}</h1>
                <p>{profile.description}</p>
              </div>
            </div>
            <div className="profile-score">
              <span>
                <ShieldCheck /> LEGIT SCORE
              </span>
              <strong>{profile.legit}</strong>
              <small>{profile.researchStatus}</small>
            </div>
          </div>
          <div className="profile-verdict">
            <div>
              <p className="eyebrow">QUICK VERDICT</p>
              <h2>Best for {profile.bestFor.toLowerCase()}.</h2>
              <p>{profile.caveat}</p>
            </div>
            <Button
              variant={compare.includes(profile.id) ? "default" : "outline"}
              onClick={() => toggleCompare(profile.id)}
            >
              {compare.includes(profile.id) ? <Check /> : null}
              {compare.includes(profile.id)
                ? "Added to comparison"
                : "Add to comparison"}
            </Button>
          </div>
          <div className="profile-grid">
            <article>
              <p className="eyebrow">AT A GLANCE</p>
              <dl>
                <div>
                  <dt>Price</dt>
                  <dd>{profile.price}</dd>
                </div>
                <div>
                  <dt>Platforms</dt>
                  <dd>{profile.platforms.join(", ")}</dd>
                </div>
                <div>
                  <dt>Programming</dt>
                  <dd>{profile.authorship}</dd>
                </div>
                <div>
                  <dt>AI status</dt>
                  <dd>{profile.ai}</dd>
                </div>
                <div>
                  <dt>Experience</dt>
                  <dd>{profile.level.join(", ")}</dd>
                </div>
              </dl>
            </article>
            <article>
              <p className="eyebrow">NOTABLE FEATURES</p>
              <div className="feature-list">
                {profile.features.map((feature) => (
                  <span key={feature}>
                    <Check />
                    {feature}
                  </span>
                ))}
              </div>
            </article>
            <article className="relationship-card">
              <p className="eyebrow">HOW THIS APP EXPECTS YOU TO TRAIN</p>
              <div className="relationship-summary">
                <div>
                  <span>Planning</span>
                  <strong>{profileRelationship.planningStyle}</strong>
                  {profileRelationship.secondaryStyles?.length ? (
                    <small>
                      Also supports:{" "}
                      {profileRelationship.secondaryStyles.join(", ")}
                    </small>
                  ) : null}
                </div>
                <div>
                  <span>Choice load</span>
                  <strong>{profileRelationship.choiceLoad}</strong>
                </div>
                <div>
                  <span>Continuity</span>
                  <strong>{profileRelationship.continuity}</strong>
                </div>
                <div>
                  <span>Customization</span>
                  <strong>{profileRelationship.customization}</strong>
                </div>
              </div>
              {profileRelationship.decisionsRemoved ? (
                <div className="relationship-decisions">
                  <div>
                    <h3>Decisions it makes easier</h3>
                    <p>{profileRelationship.decisionsRemoved}</p>
                  </div>
                  <div>
                    <h3>Decisions you still own</h3>
                    <p>{profileRelationship.decisionsRemaining}</p>
                  </div>
                  <div>
                    <h3>The tradeoff</h3>
                    <p>{profileRelationship.tradeoff}</p>
                  </div>
                </div>
              ) : null}
              <div className="relationship-fit">
                <div>
                  <h3>This may sound like you</h3>
                  <p>{profileRelationship.idealUser}</p>
                </div>
                <div>
                  <h3>Probably not your fit</h3>
                  <p>{profileRelationship.notFor}</p>
                </div>
              </div>
            </article>
            <article className="quality-card">
              <p className="eyebrow">LEGIT SCORE BREAKDOWN</p>
              {[
                ["Core execution", Math.min(96, profile.legit + 3)],
                ["Usability", profile.legit],
                ["Reliability", Math.max(70, profile.legit - 2)],
                ["Value", Math.min(94, profile.legit + 1)],
                ["Support & privacy", Math.max(72, profile.legit - 4)],
              ].map(([label, value]) => (
                <div className="quality-row" key={label}>
                  <span>{label}</span>
                  <i>
                    <b style={{ width: `${value}%` }} />
                  </i>
                  <strong>{value}</strong>
                </div>
              ))}
            </article>
            <article className="quality-card">
              <p className="eyebrow">ORIGINALITY &amp; IDENTITY</p>
              <h2>
                {profileOriginality.score}/100 · {profileOriginality.level}
              </h2>
              <p>{profileOriginality.summary}</p>
              {[
                ["Original mechanics", profileOriginality.originalMechanics],
                ["Product point of view", profileOriginality.productPointOfView],
                ["Visual identity", profileOriginality.visualIdentity],
                [
                  "Meaningful differentiation",
                  profileOriginality.meaningfulDifferentiation,
                ],
                ["Defensibility", profileOriginality.defensibility],
              ].map(([label, value]) => (
                <div className="quality-row" key={label}>
                  <span>{label}</span>
                  <i>
                    <b style={{ width: `${value}%` }} />
                  </i>
                  <strong>{value}</strong>
                </div>
              ))}
              <small className="evidence-note">
                {profileOriginality.evidenceNote}
              </small>
            </article>
          </div>
          <div className="verification-note">
            <strong>Research status: {profile.researchStatus}</strong>
            <p>
              {profile.verifiedSections} of {profile.totalSections} research
              sections currently have evidence. A Reviewed status requires the
              remaining claims and hands-on judgments to clear the publishing
              gate.
            </p>
          </div>
        </section>
      )}
      {view === "compare" && (
        <section className="compare-page">
          <button className="back-link" onClick={() => navigate("browse")}>
            ← Back to catalog
          </button>
          <div className="compare-heading">
            <p className="eyebrow">SIDE-BY-SIDE</p>
            <h1>Compare your finalists</h1>
            <p>
              The differences that matter most, without a wall of meaningless
              checkmarks.
            </p>
          </div>
          {compared.length >= 2 ? (
            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    {compared.map((app) => (
                      <th key={app.id}>
                        <span
                          className="app-logo"
                          style={{ background: app.color }}
                        >
                          {app.initials}
                        </span>
                        <strong>{app.name}</strong>
                        <button
                          onClick={() => toggleCompare(app.id)}
                          aria-label={`Remove ${app.name}`}
                        >
                          <X />
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Best for", (a: AppRecord) => a.bestFor],
                    [
                      "Planning style",
                      (a: AppRecord) =>
                        getTrainingRelationship(a.id).planningStyle,
                    ],
                    [
                      "Choice load",
                      (a: AppRecord) =>
                        getTrainingRelationship(a.id).choiceLoad,
                    ],
                    [
                      "Other ways to use it",
                      (a: AppRecord) =>
                        getTrainingRelationship(a.id).secondaryStyles?.join(
                          ", ",
                        ) || "None identified",
                    ],
                    [
                      "Decisions you still own",
                      (a: AppRecord) =>
                        getTrainingRelationship(a.id).decisionsRemaining ||
                        "Not yet evaluated",
                    ],
                    [
                      "Ideal user",
                      (a: AppRecord) => getTrainingRelationship(a.id).idealUser,
                    ],
                    ["Legit Score", (a: AppRecord) => `${a.legit}/100`],
                    [
                      "Originality & identity",
                      (a: AppRecord) => {
                        const originality = getOriginalityProfile(a.id);
                        return `${originality.score}/100 · ${originality.level}`;
                      },
                    ],
                    ["Price", (a: AppRecord) => a.price],
                    ["Platforms", (a: AppRecord) => a.platforms.join(", ")],
                    ["Programming", (a: AppRecord) => a.authorship],
                    ["AI use", (a: AppRecord) => a.ai],
                    ["Experience", (a: AppRecord) => a.level.join(", ")],
                    [
                      "Notable features",
                      (a: AppRecord) => a.features.join(" • "),
                    ],
                    ["Key tradeoff", (a: AppRecord) => a.caveat],
                  ].map(([label, read]) => (
                    <tr key={label as string}>
                      <th>{label as string}</th>
                      {compared.map((app) => (
                        <td key={app.id}>
                          {(read as (a: AppRecord) => string)(app)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <h2>Choose at least two apps</h2>
              <p>
                Add apps from the catalog to see their meaningful differences
                side by side.
              </p>
              <Button onClick={() => navigate("browse")}>Browse apps</Button>
            </div>
          )}
        </section>
      )}
      {view === "method" && (
        <section className="method-page">
          <p className="eyebrow">TRANSPARENT BY DESIGN</p>
          <h1>Three scores. Three different questions.</h1>
          <div className="score-explain">
            <article>
              <span className="score-icon">%</span>
              <h2>App Fit Score</h2>
              <p>
                How closely an app matches one person’s goals, preferences,
                equipment, budget, experience, AI comfort, and preferred
                relationship with their training.
              </p>
              <ul>
                <li>Personalized to finder answers</li>
                <li>Rewards the right planning style—not the most features</li>
                <li>Hard requirements can exclude an app</li>
                <li>Unknown facts never count as a match</li>
              </ul>
            </article>
            <article>
              <span className="score-icon">
                <ShieldCheck />
              </span>
              <h2>Legit Score</h2>
              <p>
                Our structured assessment of the product’s quality, credibility,
                usability, support, value, privacy, and maintenance.
              </p>
              <ul>
                <li>Not influenced by advertising</li>
                <li>Store ratings remain separate</li>
                <li>Methodology changes are versioned</li>
              </ul>
            </article>
            <article>
              <span className="score-icon">
                <Sparkles />
              </span>
              <h2>Originality &amp; Identity</h2>
              <p>
                Whether an app contributes a meaningful mechanic, training
                point of view, or recognizable experience instead of simply
                reproducing the category standard.
              </p>
              <ul>
                <li>Original mechanics and product point of view</li>
                <li>Coherent, recognizable visual identity</li>
                <li>Differences must improve the user experience</li>
                <li>Only affects Fit Score when distinctiveness matters to you</li>
              </ul>
            </article>
          </div>
          <div className="disclosure">
            <h2>Ownership disclosure</h2>
            <p>
              Workout App Index and The Lift League are both owned by Turf King
              LLC. The Lift League is evaluated using the same published
              criteria as every other app. Shared ownership does not guarantee
              placement, ranking, or a favorable score.
            </p>
          </div>
        </section>
      )}
      {view === "privacy" && (
        <section className="privacy-page">
          <p className="eyebrow">PRIVACY</p>
          <h1>Clear choices. Minimal collection.</h1>
          <div className="privacy-card">
            <h2>Public site</h2>
            <p>
              You can browse the catalog and use the app finder without an
              account. The finder runs in your browser; we do not send your
              individual questionnaire answers to Google Analytics.
            </p>
            <h2>Optional analytics</h2>
            <p>
              If you accept analytics, Google Analytics measures page views and
              broad interactions such as completing the finder, viewing an app
              profile, or adding an app to comparison. Google may process device,
              browser, approximate-location, and usage information under its own
              terms. Analytics remains off when you decline.
            </p>
            <h2>Your choice</h2>
            <p>
              Your analytics preference is stored in your browser. You can
              change it at any time; declining does not limit the site.
            </p>
            <Button variant="outline" onClick={openAnalyticsPreferences}>
              Change analytics preference
            </Button>
            <h2>Contact</h2>
            <p>
              Questions or correction requests can be sent to Turf King LLC at
              ryan@theliftleague.com.
            </p>
            <p className="privacy-updated">Last updated: September 19, 2026</p>
          </div>
        </section>
      )}
      {compare.length > 0 && view !== "compare" && (
        <div className="compare-tray">
          <span>
            <strong>{compare.length}</strong> app{compare.length > 1 ? "s" : ""}{" "}
            selected
          </span>
          <div>
            {compare.map((id) => (
              <span key={id}>
                {apps.find((a) => a.id === id)?.name}
                <button
                  aria-label={`Remove ${id}`}
                  onClick={() => toggleCompare(id)}
                >
                  <X />
                </button>
              </span>
            ))}
          </div>
          <Button
            disabled={compare.length < 2}
            onClick={() => navigate("compare")}
          >
            Compare now <ArrowRight />
          </Button>
        </div>
      )}
      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent className="filter-sheet">
          <SheetHeader>
            <SheetTitle>Filter the catalog</SheetTitle>
            <SheetDescription>
              Use these as preferences while browsing. The Finder handles hard
              requirements separately.
            </SheetDescription>
          </SheetHeader>
          <div className="filter-groups">
            <FilterGroup
              label="Platform"
              value={platformFilter}
              values={["All", "Android", "iOS"]}
              onChange={setPlatformFilter}
            />
            <FilterGroup
              label="Programming"
              value={authorshipFilter}
              values={[
                "All",
                "Trainer-written",
                "User-created",
                "Rules-based adaptive",
                "AI-generated",
              ]}
              onChange={setAuthorshipFilter}
            />
            <FilterGroup
              label="Feature"
              value={featureFilter}
              values={[
                "All",
                "Fast logging",
                "Expert programs",
                "Detailed analytics",
                "Built-in motivation",
                "Community",
                "Human coaching",
                "Offline use",
              ]}
              onChange={setFeatureFilter}
            />
          </div>
          <SheetFooter>
            <Button onClick={() => setFiltersOpen(false)}>
              Show {filtered.length} apps
            </Button>
            <Button variant="ghost" onClick={clearFilters}>
              Clear all filters
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <footer>
        <div className="brand">
          <span className="brand-mark">
            <span />
          </span>
          <span>
            WORKOUT APP <b>INDEX</b>
          </span>
        </div>
        <p>Compare the apps. Find your fit.</p>
        <div>
          <button onClick={() => navigate("method")}>How we score</button>
          <button>Editorial standards</button>
          <button>Corrections</button>
          <button onClick={() => navigate("privacy")}>Privacy</button>
        </div>
        <small>
          © 2026 Turf King LLC. App names and trademarks belong to their
          respective owners.
        </small>
      </footer>
    </main>
  );
}

function FilterGroup({
  label,
  value,
  values,
  onChange,
}: {
  label: string;
  value: string;
  values: string[];
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend>{label}</legend>
      {values.map((option) => (
        <button
          key={option}
          className={value === option ? "selected" : ""}
          onClick={() => onChange(option)}
        >
          <span>{value === option ? <Check /> : null}</span>
          {option}
        </button>
      ))}
    </fieldset>
  );
}
