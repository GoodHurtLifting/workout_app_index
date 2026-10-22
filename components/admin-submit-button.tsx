"use client";

import { useFormStatus } from "react-dom";

export function AdminSubmitButton({ label, pendingLabel, className = "admin-primary", name, value, disabled = false }: {
  label: string;
  pendingLabel: string;
  className?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();
  return <button className={className} type="submit" name={name} value={value} disabled={disabled || pending} aria-busy={pending}>
    {pending ? pendingLabel : label}
  </button>;
}
