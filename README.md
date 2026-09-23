# SolarNow Enterprises website

SEO-first website for SolarNow Enterprises, Kalmeshwar, Nagpur, Maharashtra.

## Local development

```bash
npm install
npm run dev
npm run build
```

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SITE_URL`: the final canonical HTTPS origin, without a trailing slash.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: Google Search Console HTML tag verification token only (the value in `content`, not the whole tag).
- `NEXT_PUBLIC_BUSINESS_PHONE`: the verified public business phone number, including country/area code.
- `NEXT_PUBLIC_GOOGLE_MAPS_URL`: the verified Google Business Profile or Maps destination.
- `RESEND_API_KEY`: private Resend API key used only by the server route.
- `LEAD_NOTIFICATION_EMAIL`: inbox where new buyer enquiries should arrive.
- `LEAD_FROM_EMAIL`: sender on a domain verified in Resend, for example `SolarNow Website <leads@example.com>`.

Do not invent a phone number, review, rating, certification, project result or social profile. Update the address in the footer and JSON-LD together if it changes.

## Buyer enquiry delivery

The forms on the homepage, `/contact` and `/get-quote` post to `/api/enquiry`. The API validates the fields, checks a hidden spam trap, and sends the lead to `LEAD_NOTIFICATION_EMAIL` through Resend. If the private email variables are missing, the form clearly says that online delivery is not configured and copies the enquiry summary instead of pretending it was sent.

Create a Resend account, verify a sending domain, and create an API key. Keep the key in Vercel Environment Variables; never commit it to Git or place it in a `NEXT_PUBLIC_` variable.

## Deploy to Vercel with GitHub

1. Create a new GitHub repository and upload this project with the files in this directory at the repository root.
2. In Vercel, choose **Add New → Project**, import the GitHub repository, and keep **Framework Preset: Next.js**. `vercel.json` already selects `npm run build:vercel`.
3. Before the production deployment, add these variables in **Project → Settings → Environment Variables**: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BUSINESS_PHONE`, `NEXT_PUBLIC_GOOGLE_MAPS_URL`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, and `LEAD_FROM_EMAIL`.
4. Set `NEXT_PUBLIC_SITE_URL` to the final Vercel or custom-domain HTTPS origin with no trailing slash. Use a verified public phone including country code, such as `+91...`.
5. Apply the variables to Production (and Preview if you want form testing there), then deploy or redeploy. Environment-variable changes affect only new deployments.
6. Submit one test enquiry with your own details and confirm it reaches `LEAD_NOTIFICATION_EMAIL`. Then verify the header call button, every navigation page, `/robots.txt`, and `/sitemap.xml`.
7. To add a custom domain, open **Project → Settings → Domains**, add the domain, and follow the DNS records shown by Vercel. After DNS works, update `NEXT_PUBLIC_SITE_URL` and redeploy.

For local Vercel-mode testing, copy `.env.example` to `.env.local`, add development-only values, run `npm run dev:vercel`, and keep `.env.local` out of Git.

## Google Search Console setup

1. Create a property in [Google Search Console](https://search.google.com/search-console). A Domain property is preferred when DNS access is available; otherwise use a URL-prefix property matching the exact production HTTPS origin.
2. For URL-prefix HTML-tag verification, copy only the verification token into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, rebuild and deploy, then choose **Verify** in Search Console. For Domain verification, add the DNS record supplied by Google through the domain provider.
3. After the production domain is configured, set `NEXT_PUBLIC_SITE_URL` to that exact origin. Confirm that page canonicals, `robots.txt` and `sitemap.xml` use it.
4. In Search Console, open **Sitemaps**, submit `sitemap.xml`, and wait for the status to become successful. The expected URL is `https://your-domain.example/sitemap.xml`.
5. Use **URL inspection** for the homepage and representative service pages. Confirm the URL is allowed, canonical selection is sensible and the page can be rendered.
6. After publishing important new or materially changed content, inspect the exact URL and choose **Request indexing**. This is a request, not a ranking or indexing guarantee.
7. Monitor **Page indexing** for excluded or error URLs and **Performance → Search results** for queries, pages, clicks, impressions, click-through rate and average position. Compare useful date ranges rather than reacting to daily volatility.
8. Re-check Search Console after URL changes, redirects, structured-data changes or a domain migration.

## SEO maintenance checklist

- Keep page titles, descriptions and main headings unique.
- Add a page only when it serves a distinct customer need; do not create thin location doorway pages.
- Confirm claims, project data and images before publication.
- Re-review the subsidy page whenever central, Maharashtra or distribution-company rules change. Update its visible review date.
- Compress new images, set accurate alt text and reserve dimensions to prevent layout shift.
- Link new pages from relevant navigation or content; do not leave orphan pages.
- Run `npm run build` before every deployment and verify representative URLs, `robots.txt`, `sitemap.xml` and a non-existent URL.

## Content model

Service and information-page content lives in `lib/site-data.ts`. The dynamic route provides unique metadata, canonical URLs, breadcrumbs, visible content and appropriate WebPage or Service JSON-LD. The root layout provides truthful Organization, LocalBusiness and WebSite JSON-LD. FAQ content is visible but intentionally does not claim FAQ rich-result eligibility.
