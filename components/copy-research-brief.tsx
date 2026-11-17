"use client";
import { useState } from "react";
export function CopyResearchBrief({ brief }: { brief: string }) {
  const [message, setMessage] = useState("");
  async function copy() {
    try { await navigator.clipboard.writeText(brief); setMessage("Copied. Contact fields and URL parameters omitted; check free text before sharing."); }
    catch { setMessage("Could not copy. Check clipboard permission."); }
  }
  return <div className="research-brief-action"><button type="button" onClick={copy}>Copy research brief</button>{message && <span role="status">{message}</span>}</div>;
}
