"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
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
  getTrainingRelationship,
  type AppRecord,
} from "@/lib/catalog";
import { fitScore } from "@/lib/matching";

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

function AppCard({
  app,
  score,
  selected,
  onCompare,
  onProfile,
}: {
  app: AppRecord;
  score?: number;
  selected: boolean;
  onCompare: () => void;
  onProfile: () => void;
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
      <p className="caveat">
        <strong>Watch for:</strong> {app.caveat}
      </p>
      <div className="card-actions">
        <Button variant={selected ? "default" : "outline"} onClick={onCompare}>
          {selected ? <Check /> : null}
          {selected ? "Added" : "Compare"}
        </Button>
        <Button variant="ghost" onClick={onProfile}>
          View profile <ChevronRight />
        </Button>
      </div>
    </article>
  );
}

export default function Home() {
  const [apps, setApps] = useState<AppRecord[]>(preliminaryApps);
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
  const [view, setView] = useState<
    "home" | "finder" | "browse" | "method" | "profile" | "compare"
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
  const [profileId, setProfileId] = useState("boostcamp");
  // Both calculations intentionally rerun when the asynchronously published catalog changes.
  const ranked = useMemo(
    () =>
      apps
        .map((app) => ({ app, score: fitScore(app, answers) }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score),
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
  const toggleCompare = (id: string) =>
    setCompare((current) =>
      current.includes(id)
        ? current.filter((x) => x !== id)
        : current.length < 4
          ? [...current, id]
          : current,
    );
  const navigate = (next: typeof view) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openProfile = (id: string) => {
    setProfileId(id);
    navigate("profile");
  };
  const answer = (value: string) => {
    const q = questions[step];
    setAnswers((a) => ({ ...a, [q.key]: value }));
    if (step === questions.length - 1) setShowResults(true);
    else setStep((s) => s + 1);
  };
  const profile = apps.find((a) => a.id === profileId) ?? apps[0];
  const profileRelationship = getTrainingRelationship(profile.id);
  const heroFeatured = apps.find((app) => app.id === "boostcamp") ?? apps[0];
  const compared = compare
    .map((id) => apps.find((a) => a.id === id))
    .filter(Boolean) as AppRecord[];
  return (
    <main>
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
              <p className="kicker">STRENGTH APP MATCHMAKING, MINUS THE HYPE</p>
              <h1>
                Too many workout apps.
                <br />
                <em>Find the one that fits.</em>
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
                <span>YOUR TOP MATCH</span>
                <span className="confidence">HIGH CONFIDENCE</span>
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
                  <strong>94</strong>
                  <span>% FIT</span>
                </div>
              </div>
              <div className="match-reasons">
                <div>
                  <Check /> Proven programs
                </div>
                <div>
                  <Check /> Strength progression
                </div>
                <div>
                  <Check /> Beginner friendly
                </div>
              </div>
              <div className="spectrum">
                <div>
                  <span>Simple</span>
                  <span>Technical</span>
                </div>
                <i>
                  <b style={{ width: "68%" }} />
                </i>
              </div>
              <div className="panel-foot">
                <span>
                  <ShieldCheck /> Legit Score{" "}
                  <strong>{heroFeatured.legit}</strong>
                </span>
                <span>AI: {heroFeatured.ai}</span>
              </div>
            </div>
          </section>
          <section className="proof">
            <div>
              <strong>{apps.length}</strong>
              <span>preliminary app profiles</span>
            </div>
            <div>
              <strong>60+</strong>
              <span>features in the catalog model</span>
            </div>
            <div>
              <strong>2</strong>
              <span>separate, explainable scores</span>
            </div>
            <p>Catalog facts are being verified before public launch.</p>
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
          <div className="result-grid">
            {ranked.slice(0, 6).map(({ app, score }) => (
              <AppCard
                key={app.id}
                app={app}
                score={score}
                selected={compare.includes(app.id)}
                onCompare={() => toggleCompare(app.id)}
                onProfile={() => openProfile(app.id)}
              />
            ))}
          </div>
        </section>
      )}
      {view === "browse" && (
        <section className="browse-page">
          <div className="browse-head">
            <div>
              <p className="eyebrow">THE CATALOG</p>
              <h1>Browse workout apps</h1>
              <p>
                Preliminary profiles. Product facts and scores will be verified
                before launch.
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
                  onProfile={() => openProfile(app.id)}
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
          <h1>Two scores. Two different questions.</h1>
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
          <button>Privacy</button>
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
