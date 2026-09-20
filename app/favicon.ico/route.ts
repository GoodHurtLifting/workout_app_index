const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="3" fill="#172334"/><rect x="5" y="13" width="22" height="6" fill="#426b99"/><rect x="8" y="9" width="3" height="14" fill="#f1f3f5"/><rect x="21" y="9" width="3" height="14" fill="#f1f3f5"/></svg>`;

export function GET() {
  return new Response(favicon, {
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=604800",
      "Content-Type": "image/svg+xml; charset=utf-8",
    },
  });
}
