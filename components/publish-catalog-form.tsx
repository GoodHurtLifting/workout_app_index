"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { publishApprovedCatalog, type PublishCatalogResult } from "@/app/admin/actions";

const initialState: PublishCatalogResult = { status: "idle", message: "" };

function PublishButton({ hasReviewed }: { hasReviewed: boolean }) {
  const { pending } = useFormStatus();
  return <button className="publish-button" type="submit" disabled={!hasReviewed || pending}>
    {pending ? "Publishing catalog…" : "Publish approved catalog"}
  </button>;
}

function PublishFeedback({ result }: { result: PublishCatalogResult }) {
  const { pending } = useFormStatus();
  if (pending) return <p className="admin-action-message pending" role="status">Checking reviewed profiles and publishing the catalog…</p>;
  if (result.status === "idle") return null;
  return <p className={`admin-action-message ${result.status}`} role={result.status === "error" ? "alert" : "status"}>{result.message}</p>;
}

export function PublishCatalogForm({ hasReviewed, latestPublication }: {
  hasReviewed: boolean;
  latestPublication?: { catalog_version: string; published_at: number };
}) {
  const [result, action] = useActionState(publishApprovedCatalog, initialState);
  const latest = result.status === "success" && result.version && result.publishedAt
    ? { catalog_version: result.version, published_at: result.publishedAt }
    : latestPublication;
  return <div className="publish-control">
    <form action={action}><PublishButton hasReviewed={hasReviewed} /><PublishFeedback result={result} /></form>
    {latest ? <p className="editor-help">Latest recorded publication: <strong>{latest.catalog_version}</strong> on {new Date(latest.published_at).toLocaleString("en-US")}. See Publication history below.</p> : <p className="editor-help">No catalog snapshot has been published yet.</p>}
  </div>;
}
