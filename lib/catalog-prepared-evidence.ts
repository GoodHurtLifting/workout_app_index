// Dated sources prepared during local research. These are not developer submissions.
// Keep first-party claims attributed to their publisher and leave untested behavior qualified.
export type PreparedEvidence = {
  id: string;
  source_type: "Official website" | "Google Play" | "Apple App Store" | "Official documentation" | "Privacy policy" | "Hands-on testing";
  url: string | null;
  claim_supported: string;
  checked_at: number;
  public: 0 | 1;
  internal_note: string | null;
};

const checked = (date: string) => Date.parse(`${date}T12:00:00Z`);

export const catalogPreparedEvidence: Record<string, PreparedEvidence[]> = {
  "aldo-coach": [
    {
      id: "research-aldo-coach-2026-10-19-apple-store",
      source_type: "Apple App Store",
      url: "https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375",
      claim_supported: "The US App Store listing identifies iPhone and Apple Watch access, a free download, and developer-described AI program building, set coaching, workout logging, and history.",
      checked_at: checked("2026-10-19"),
      public: 1,
      internal_note: "Store features and release notes are developer-authored claims, not independent testing. Free download does not establish future pricing or every feature gate.",
    },
  ],
  stark: [
    {
      id: "research-stark-2026-10-09-apple-store",
      source_type: "Apple App Store",
      url: "https://apps.apple.com/us/app/stark-workout/id6806627360",
      claim_supported: "The US App Store listing identifies iPhone and Apple Watch availability and describes workout logging, programs, and Premium access to more programs and analytics.",
      checked_at: checked("2026-10-09"),
      public: 1,
      internal_note: "The checked listing did not establish submitted subscription prices or verify the developer's feature claims in use.",
    },
  ],
  "gir-iron": [
    {
      id: "research-gir-iron-2026-10-13-apple-store",
      source_type: "Apple App Store",
      url: "https://apps.apple.com/us/app/%C3%A6gir-iron/id6763792846",
      claim_supported: "The US App Store listing identifies a live iPhone app with Apple Watch compatibility, free download with in-app purchases, and developer-described program-building and strength-logging features.",
      checked_at: checked("2026-10-13"),
      public: 1,
      internal_note: "The store description is developer-authored. It does not independently test logging, offline sync, iPad layout, or language coverage.",
    },
    {
      id: "research-gir-iron-2026-10-13-google-play",
      source_type: "Google Play",
      url: "https://play.google.com/store/apps/details?id=com.aegirlab.app.twa",
      claim_supported: "Google Play identifies a live Android listing and describes free solo training, program building, strength-sport logging, and paid coach subscriptions.",
      checked_at: checked("2026-10-13"),
      public: 1,
      internal_note: "The product description is developer-authored. Exercise counts conflict across sources; do not use a precise count.",
    },
    {
      id: "research-gir-iron-2026-10-19-official-site",
      source_type: "Official website",
      url: "https://www.aegirlab.com/",
      claim_supported: "The official site describes free athlete access, optional paid AI, coach pricing, iOS, Android and web access, coach-to-athlete program delivery, and training-data import and export.",
      checked_at: checked("2026-10-19"),
      public: 1,
      internal_note: "First-party claims. Coach views were observed with an empty test roster, but program delivery and import/export outcomes were not tested.",
    },
    {
      id: "research-gir-iron-2026-10-13-privacy",
      source_type: "Privacy policy",
      url: "https://www.aegirlab.com/privacy/",
      claim_supported: "The developer privacy policy discloses Firebase storage and authentication, optional Anthropic AI processing, optional health and Strava integrations, and stated deletion and export procedures.",
      checked_at: checked("2026-10-13"),
      public: 1,
      internal_note: "Disclosure review only. WAI has not audited the implementation of data handling, deletion, or export.",
    },
  ],
};

export function preparedEvidenceForApp(appId: string): PreparedEvidence[] {
  return catalogPreparedEvidence[appId] ?? [];
}
