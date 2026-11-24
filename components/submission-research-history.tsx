import type { EditorialRequest } from "@/lib/editorial-requests";
import { readableHistory } from "@/lib/inbox-presentation";
import type { InboxResearch, OriginalDictation } from "@/lib/inbox-research";

export type LinkedResearch = InboxResearch;
export const recordedDate = (at: number) => Number.isFinite(at) && at > 0 && Number.isFinite(new Date(at).getTime()) ? new Date(at).toLocaleDateString("en-US", { timeZone: "America/New_York" }) : "Date not recorded";

export function OriginalDictatedNotes({ request, messages }: { request: EditorialRequest; messages: OriginalDictation[] }) {
  const saved = (request.researchNotes ?? []).filter(note => note.kind === "owner_dictation");
  if (!messages.length && !saved.length) return <p>Original chat wording has not been attached to this request yet. The research summaries below are not a verbatim transcript.</p>;
  return <section className="original-dictation"><h4>Original dictated words · {messages.length + saved.length} messages</h4><p>Your first-person wording, kept separately from research summaries. Chat transcripts preserve speech-to-text spelling and punctuation; original audio is not stored here. Earlier impressions may be corrected by later messages. These private notes are editorial source material, not approved public copy.</p>{messages.map(message => <details className="research-record" key={message.id}><summary>{message.appName} · {new Date(message.capturedAt).toLocaleString("en-US", { timeZone: "America/New_York" })}</summary><blockquote className="preserve-lines">{message.text}</blockquote>{message.attachments.length ? <p>Attachments referenced in the original message: {message.attachments.join(", ")}. Images are not reproduced here.</p> : null}<details><summary>Original source reference</summary><p>Chat {message.source.sessionId}, message at source line {message.source.line}. Text fingerprint: {message.sha256}.</p></details></details>)}{saved.map(note => <details className="research-record" key={note.id}><summary>Original dictated note · {note.observedOn || recordedDate(note.at)}</summary><p>{note.context}</p><blockquote className="preserve-lines">{note.findings}</blockquote>{note.limitations ? <p>Context and limits: {note.limitations}</p> : null}</details>)}</section>;
}

export function EarlierResearch({ request, evidence }: { request: EditorialRequest; evidence: LinkedResearch[] }) {
  const rounds = (request.reviewRounds ?? []).filter(round => round.testedScope || round.startNote || round.decisionNote);
  return <>
    {!request.researchNotes?.length && !evidence.length && !rounds.length ? <p>No saved research was found on this request or its linked catalog entry. Earlier chat or local research may still need linking; this does not establish that the app was never tested.</p> : null}
    {rounds.map(round => <article className="research-record" key={`round-${round.number}`}><h4>Earlier review round {round.number}</h4><p>{recordedDate(round.decidedAt ?? round.startedAt ?? 0)} · Retained submission history</p><p>Testing scope: {round.testedScope || "Not recorded in this round"}</p>{round.startNote ? <p className="preserve-lines">{round.startNote}</p> : null}{round.decisionNote ? <p className="preserve-lines">{round.decisionNote}</p> : null}<p>These are earlier notes, not a new test or a verification of the current release.</p></article>)}
    {evidence.some(source => source.historical) ? <p className="historical-research-notice">Recovered notes preserve the structured record of your dictation, rather than a verbatim transcript. Each dated section can be opened below. Corrections and later-confirmed testing details take precedence over earlier interpretations. This does not change the request’s status or publish any findings.</p> : null}
    {evidence.map(source => { const body = <><p>{recordedDate(source.at)} · {source.origin}</p>{source.note ? <p className="preserve-lines">Context and limits: {source.note}</p> : null}<p className="preserve-lines">{source.finding}</p>{source.url ? <a href={source.url} target="_blank" rel="noopener noreferrer">Supporting source</a> : null}</>; return source.historical ? <details className="research-record" key={source.id}><summary>{source.title || source.sourceType} · {recordedDate(source.at)}</summary>{body}</details> : <article className="research-record" key={source.id}><h4>{source.title || source.sourceType}</h4>{body}</article>; })}
  </>;
}

export function SubmissionHistory({ request }: { request: EditorialRequest }) {
  return <details className="submission-review-history"><summary>Earlier decisions and activity</summary><p>Readable summaries of retained decisions and recent activity (up to 100 events from each log). Historical stages do not establish testing or current publication. Full audit records remain stored privately.</p><ol>{readableHistory(request).map((item, index) => <li key={index}><strong>{item.title}</strong><span>{recordedDate(item.at ?? 0)}</span>{item.detail ? <p>{item.detail}</p> : null}{item.note ? <p className="preserve-lines">{item.note}</p> : null}</li>)}</ol></details>;
}
