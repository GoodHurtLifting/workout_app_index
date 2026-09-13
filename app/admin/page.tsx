import Link from "next/link";
import { Check, ChevronRight, LogOut } from "lucide-react";
import { chatGPTSignOutPath } from "@/app/chatgpt-auth";
import { catalogVersion } from "@/lib/catalog";
import { requireCatalogAdmin } from "@/lib/admin-auth";
import { listCatalogRecords, listPublications } from "@/lib/catalog-repository";
import { importPreliminaryCatalog, publishApprovedCatalog } from "./actions";
import "./admin.css";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireCatalogAdmin("/admin");
  const apps = await listCatalogRecords();
  const publications = await listPublications();
  const ready = apps.filter(app => ["Evaluation ready", "Reviewed"].includes(app.researchStatus)).length;
  const verified = apps.reduce((sum, app) => sum + app.verifiedSections, 0);
  const total = apps.reduce((sum, app) => sum + app.totalSections, 0);

  return <main className="admin-page standalone-admin">
    <div className="admin-utility"><Link href="/">← Public preview</Link><span>{user.displayName}</span><a href={chatGPTSignOutPath("/")}><LogOut/> Sign out</a></div>
    <div className="admin-head"><div><p className="eyebrow">INTERNAL CATALOG · {catalogVersion}</p><h1>Research dashboard</h1><p>The operating surface for building a trustworthy public index.</p></div><form action={importPreliminaryCatalog}><button className="admin-primary" type="submit">Import preliminary catalog</button></form></div>
    <div className="admin-stats"><article><span>{apps.length}</span><p>Candidate profiles</p></article><article><span>{ready}</span><p>Ready to publish</p></article><article><span>{apps.length-ready}</span><p>Need verification</p></article><article><span>{verified}/{total}</span><p>Sections verified</p></article></div>
    <div className="admin-work"><div className="admin-list"><div className="admin-list-head"><h2>App evaluations</h2><span>Research state</span></div>{apps.map(app=><Link className="admin-row" href={`/admin/apps/${app.id}`} key={app.id}><span className="app-logo" style={{background:app.color}}>{app.initials}</span><span><strong>{app.name}</strong><small>{app.type}</small></span><i className={app.researchStatus.toLowerCase().replace(" ","-")}>{app.researchStatus}</i><span className="freshness">{app.verifiedSections} of {app.totalSections} sections</span><ChevronRight/></Link>)}</div><aside><p className="eyebrow">PUBLISHING GATE</p><h2>Nothing goes public by accident.</h2><ul><li><Check/> Platforms and access checked</li><li><Check/> Pricing dated and sourced</li><li><Check/> AI status classified</li><li><Check/> Feature evidence attached</li><li><Check/> Legit Score reviewed</li><li><Check/> Disclosures complete</li></ul><p>Only records marked Reviewed and backed by evidence enter a public snapshot.</p><form action={publishApprovedCatalog}><button className="publish-button" type="submit" disabled={!apps.some(app=>app.researchStatus==="Reviewed")}>Publish approved catalog</button></form></aside></div>
    <section className="publication-history"><div><p className="eyebrow">PUBLICATION HISTORY</p><h2>Versioned catalog snapshots</h2></div>{publications.length?<div>{publications.map(item=><article key={item.id}><strong>{item.catalog_version}</strong><span>{new Date(item.published_at).toLocaleString("en-US")}</span><small>Fit {item.fit_methodology_version} · Legit {item.legit_methodology_version}</small></article>)}</div>:<p>No catalog snapshots published yet.</p>}</section>
  </main>;
}
