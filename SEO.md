# SEO — Cabinet Imane Oulhint

## Where things live

| What | File |
| --- | --- |
| Production origin (single source of truth) | `src/data/siteConfig.js` (`defaultSiteOrigin`) or env `VITE_SITE_URL` |
| Title / description of every page | `src/data/seoPages.js` (services use `getServiceSeoTitle` + `metaDescription` in `src/data/services.js`) |
| Client-side meta tags, canonical, breadcrumbs JSON-LD | `src/components/PageSeo.jsx` |
| Business / Person / WebSite JSON-LD | `src/data/schema.js` |
| Static HTML shells per route, `404.html`, `sitemap.xml`, `robots.txt` | `scripts/generate-seo-files.mjs` (runs after `vite build`) |
| Hosting behaviour (clean URLs, no trailing slash, 301 for old slugs, real 404) | `vercel.json` |

`npm run build` fails if two pages share a title or a description.

## Switching to the official domain

1. In the host (Vercel) project settings add the environment variable `VITE_SITE_URL=https://your-domain` (no trailing slash).
2. Redeploy. Canonicals, `og:url`, `og:image`, JSON-LD, `sitemap.xml` and `robots.txt` all follow the variable.
3. Update the `Sitemap:` line of `public/robots.txt` (the built file is regenerated automatically).
4. Add a permanent redirect from the old `*.vercel.app` URLs to the new domain and add the new domain as a Search Console property.

## Adding a page or a service

- New service: add it to `src/data/services.js` (with `metaDescription`). Its shell, sitemap entry and title are generated automatically.
- New static page: add an entry to `seoPages` in `src/data/seoPages.js`, then to `staticRoutes` in `scripts/generate-seo-files.mjs` and to the `<Routes>` in `src/App.jsx`.
- Opening hours exist twice: `openingHours` in `src/data/site.js` (displayed) and `openingHoursSpecification` in `src/data/schema.js` (structured data). Update both.

