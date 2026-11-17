"use client";
import { useState, type ReactNode, type FormEvent } from "react";
import { useRouter } from "next/navigation";
export type ActionResult = { error?: string; message?: string };
export function AdminActionForm({ action, children, ...props }: { action: (data: FormData) => Promise<ActionResult>; children: ReactNode } & Omit<React.ComponentProps<"form">, "action" | "onSubmit">) {
  const [result, setResult] = useState<ActionResult>({});
  const [pending, setPending] = useState(false);
  const router = useRouter();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = new FormData(form, (event.nativeEvent as SubmitEvent).submitter);
    setPending(true);
    try {
      const saved = await action(data); setResult(saved);
      if (!saved.error) router.refresh();
    } catch { setResult({ error: "Could not save. Your values are retained. Check your connection and try again." }); }
    finally { setPending(false); }
  }
  return <form {...props} onSubmit={submit} aria-busy={pending}><fieldset disabled={pending} className="admin-action-fields">{children}</fieldset>{result.error && <p role="alert">{result.error}</p>}{result.message && <p role="status">{result.message}</p>}</form>;
}
