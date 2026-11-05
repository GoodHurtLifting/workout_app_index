export const publicSiteUrl = "https://workoutappindex.com";
export function profileStructuredData(app: {id: string; name: string; description: string}) {
  const url = `${publicSiteUrl}/apps/${app.id}`;
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": url, url, name: app.name, description: app.description },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: publicSiteUrl },
      { "@type": "ListItem", position: 2, name: "Workout apps", item: `${publicSiteUrl}/apps` },
      { "@type": "ListItem", position: 3, name: app.name, item: url },
    ] },
  ] };
}
export function publicOpenGraph(title: string, description: string, path: string) {
  return { title, description, url: `${publicSiteUrl}${path}`, siteName: "Workout App Index", type: "website" as const };
}
export const siteStructuredData = { "@context": "https://schema.org", "@graph": [
  { "@type": "Organization", "@id": `${publicSiteUrl}/#organization`, name: "Workout App Index", url: publicSiteUrl },
  { "@type": "WebSite", "@id": `${publicSiteUrl}/#website`, name: "Workout App Index", url: publicSiteUrl, publisher: { "@id": `${publicSiteUrl}/#organization` } },
] };
