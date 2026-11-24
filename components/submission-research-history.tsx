import type { EditorialRequest } from "@/lib/editorial-requests";
import { readableHistory } from "@/lib/inbox-presentation";

export type LinkedResearch = { id: string; sourceType: string; finding: string; note?: string | null; at: number; url?: string | null; origin: string };
export const recordedDate = (at: number) => Number.isFinite(at) && at > 0 && Number.isFinite(new Date(at).getTime()) ? new Date(at).toLocaleDateString("en-US", { timeZone: "America/New_York" }) : "Date not recorded";

export function EarlierResearch({ request, evidence }: { request: EditorialRequest; evidence: LinkedResearch[] }) {
  const rounds = (request.reviewRounds ?? []).filter(round => round.testedScope || round.startNote || round.decisionNote);
  return <>
    {!request.researchNotes?.length && !evidence.length && !rounds.length ? <p>No saved research was found on this request or its linked catalog entry. Earlier chat or local research may still need linking; this does not establish that the app was never tested.</p> : null}
    {rounds.map(round => <article className="research-record" key={`round-${round.number}`}><h4>Earlier review round {round.number}</h4><p>{recordedDate(round.decidedAt ?? round.startedAt ?? 0)} · Retained submission history</p><p>Testing scope: {round.testedScope || "Not recorded in this round"}</p>{round.startNote ? <p className="preserve-lines">{round.startNote}</p> : null}{round.decisionNote ? <p className="preserve-lines">{round.decisionNote}</p> : null}<p>These are earlier notes, not a new test or a verification of the current release.</p></article>)}
    {evidence.map(source => <article className="research-record" key={source.id}><h4>{source.sourceType}</h4><p>{recordedDate(source.at)} · {source.origin}</p><p className="preserve-lines">{source.finding}</p>{source.note ? <p className="preserve-lines">Context and limits: {source.note}</p> : null}{source.url ? <a href={source.url} target="_blank" rel="noopener noreferrer">Supporting source</a> : null}</article>)}
  </>;
}

export function SubmissionHistory({ request }: { request: EditorialRequest }) {
  return <details className="submission-review-history"><summary>Earlier decisions and activity</summary><p>Readable summaries of retained decisions and recent activity (up to 100 events from each log). Historical stages do not establish testing or current publication. Full audit records remain stored privately.</p><ol>{readableHistory(request).map((item, index) => <li key={index}><strong>{item.title}</strong><span>{recordedDate(item.at ?? 0)}</span>{item.detail ? <p>{item.detail}</p> : null}{item.note ? <p className="preserve-lines">{item.note}</p> : null}</li>)}</ol></details>;
}
