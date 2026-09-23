const base = process.env.SITE_CHECK_URL || "http://localhost:5173";
const routes = ["/", "/about", "/residential-solar-nagpur", "/commercial-solar-nagpur", "/industrial-solar-nagpur", "/rooftop-solar-nagpur", "/on-grid-solar", "/off-grid-solar", "/hybrid-solar", "/solar-solutions", "/solar-calculator", "/solar-projects", "/solar-maintenance", "/solar-financing", "/solar-subsidy", "/partner-with-us", "/blog", "/contact", "/get-quote"];
const titles = new Map();
const descriptions = new Map();
const links = new Set();
const failures = [];

for (const route of routes) {
  const response = await fetch(base + route);
  const html = await response.text();
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]?.trim();
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;
  const ogTitle = html.includes('property="og:title"');
  if (response.status !== 200) failures.push(`${route}: HTTP ${response.status}`);
  if (!title || !description || !canonical || h1Count !== 1 || !ogTitle) failures.push(`${route}: metadata/H1 check failed`);
  if (title) { if (titles.has(title)) failures.push(`${route}: duplicate title with ${titles.get(title)}`); titles.set(title, route); }
  if (description) { if (descriptions.has(description)) failures.push(`${route}: duplicate description with ${descriptions.get(description)}`); descriptions.set(description, route); }
  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) links.add(match[1].split("?")[0].split("#")[0]);
}

for (const link of links) {
  if (link.startsWith("/_next/")) continue;
  const response = await fetch(base + link);
  if (response.status >= 400) failures.push(`Broken internal link ${link}: HTTP ${response.status}`);
}

for (const route of ["/robots.txt", "/sitemap.xml"]) {
  const response = await fetch(base + route);
  if (response.status !== 200) failures.push(`${route}: HTTP ${response.status}`);
}
const missing = await fetch(base + "/not-a-real-page");
if (missing.status !== 404) failures.push(`404 route returned ${missing.status}`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`SEO validation passed: ${routes.length} pages, ${links.size} crawlable internal URLs, robots, sitemap and 404 status.`);
