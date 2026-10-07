"use client";

import { useState } from "react";
import type { PersonAssociation } from "@/lib/catalog";

const roles: PersonAssociation["role"][] = ["Creator", "Founder", "Trainer", "Program author", "Featured athlete"];

export function PersonAssociationEditor({ initialPeople }: { initialPeople: PersonAssociation[] }) {
  const [people, setPeople] = useState(initialPeople);

  function update(index: number, changes: Partial<PersonAssociation>) {
    setPeople((current) => current.map((person, position) => position === index ? { ...person, ...changes } : person));
  }

  return <section>
    <h2>Creators, trainers, and other people</h2>
    <p>Only add a documented connection. Describe the person&apos;s actual role and link to a public source. A mention or endorsement is not proof of authorship.</p>
    <input type="hidden" name="people" value={JSON.stringify(people)} />
    {people.map((person, index) => <div className="person-editor" key={index}>
      <div className="form-grid">
        <label>Name<input value={person.name} onChange={(event) => update(index, { name: event.target.value })} /></label>
        <label>Role<select value={person.role} onChange={(event) => update(index, { role: event.target.value as PersonAssociation["role"] })}>{roles.map((role) => <option key={role}>{role}</option>)}</select></label>
      </div>
      <label>How this person is connected<input value={person.relationship} onChange={(event) => update(index, { relationship: event.target.value })} /></label>
      <label>Public source URL<input type="url" value={person.sourceUrl} onChange={(event) => update(index, { sourceUrl: event.target.value })} placeholder="https://" /></label>
      <label>Other names people may search, comma separated<input value={person.aliases.join(", ")} onChange={(event) => update(index, { aliases: event.target.value.split(",").map((alias) => alias.trim()) })} /></label>
      <button type="button" onClick={() => setPeople((current) => current.filter((_, position) => position !== index))}>Remove person</button>
    </div>)}
    <button type="button" onClick={() => setPeople((current) => [...current, { name: "", aliases: [], role: "Trainer", relationship: "", sourceUrl: "", checkedAt: new Date().toISOString().slice(0, 10) }])}>Add person</button>
  </section>;
}
