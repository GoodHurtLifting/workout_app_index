import type { AppRecord } from "./catalog";
export function candidateFromSubmission(id: string, name: string): AppRecord {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]?.toUpperCase() ?? "").join("") || "?";
  return {
    coverageMode: "factual", factClaims: [], commercialDisclosure: {status:"not-established",statement:""},
    id, name, initials, color: "#536b83", type: "Unclassified",
    bestFor: "Not yet assessed",
    description: "Research candidate. Product facts have not been established.",
    price: "Not verified", monthlyPrice: null,
    hasUsableFreeTier: null,
    freeTierCapabilities: { completeProgram: null, adaptiveProgramming: null, programLibrary: null },
    platforms: [], ai: "Not assessed", legit: null, goals: [], features: [], level: [],
    authorship: "Not assessed", caveat: "Not yet assessed",
    deliversCompleteProgram: null, programLibrary: null, adaptiveProgramming: null,
    supportedTrainingEnvironments: [], researchStatus: "Candidate", verifiedSections: 0, totalSections: 7,
    trainingRelationship: {
      planningStyle: "Not assessed", choiceLoad: "Not assessed", continuity: "Not assessed",
      customization: "Not assessed", decisionsRemoved: "Not yet assessed",
      decisionsRemaining: "Not yet assessed", tradeoff: "Not yet assessed",
      idealUser: "Not yet assessed", notFor: "Not yet assessed",
    },

  };
}

export function candidateId(name: string): string {
  return name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60).replace(/-$/g, "") || "app";
}
