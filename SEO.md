# SEO — Cabinet Imane Oulhint

## Where things live

| What | File |
| --- | --- |
| Production origin (single source of truth) | `src/data/siteConfig.js` (`defaultSiteOrigin`) |
| Title / description of every page | `src/data/seoPages.js` (services use `getServiceSeoTitle` + `metaDescription` in `src/data/services.js`) |
| Client-side meta tags, canonical, breadcrumbs JSON-LD | `src/components/PageSeo.jsx` |
| Business / Person / WebSite JSON-LD | `src/data/schema.js` |
| Static HTML shells per route, `404.html`, `sitemap.xml`, `robots.txt` | `scripts/generate-seo-files.mjs` (runs after `vite build`) |
| Cloudflare Pages fallback and legacy slug redirects | `public/_redirects` and app route aliases |

`npm run build` fails if two pages share a title or a description.

## Production domain and indexing

- The production origin is fixed to `https://nutritionniste-agadir.com`; build environment variables cannot change canonical or sitemap hosts.
- `npm run build` generates route-specific HTML shells, canonical URLs, `sitemap.xml`, and `robots.txt`. Directory routes use trailing slashes to match Cloudflare Pages responses.
- Submit `https://nutritionniste-agadir.com/sitemap.xml` in Google Search Console.
- Redirecting `cabinetimane.vercel.app` requires a domain-level redirect on the old Vercel deployment. Cloudflare Pages files for the new domain cannot redirect requests received by Vercel.
- French and Arabic are language-toggle variants at the same URL, with Arabic `lang="ar"` and `dir="rtl"` set at runtime. There are no separate locale URLs, so do not add `hreflang` links until distinct indexable locale URLs exist.

## Adding a page or a service

- New service: add it to `src/data/services.js` (with `metaDescription`). Its shell, sitemap entry and title are generated automatically.
- New static page: add an entry to `seoPages` in `src/data/seoPages.js`, then to `staticRoutes` in `scripts/generate-seo-files.mjs` and to the `<Routes>` in `src/App.jsx`.
- Opening hours exist twice: `openingHours` in `src/data/site.js` (displayed) and `openingHoursSpecification` in `src/data/schema.js` (structured data). Update both.
