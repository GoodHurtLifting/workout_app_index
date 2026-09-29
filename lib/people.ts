import type { AppRecord, PersonAssociation } from "@/lib/catalog";

export function normalizePersonSearch(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function matchingPeople(app: AppRecord, query: string): PersonAssociation[] {
  const needle = normalizePersonSearch(query);
  if (!needle) return [];
  return (app.people ?? []).filter((person) =>
    [person.name, ...person.aliases].some((name) => normalizePersonSearch(name).includes(needle)),
  );
}
