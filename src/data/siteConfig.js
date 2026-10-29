// Single source of truth for the canonical production origin.
//
// The site currently lives on a Vercel subdomain. When the official custom
// domain is connected, set the VITE_SITE_URL environment variable (for example
// in the Vercel project settings) and rebuild: canonical URLs, sitemap.xml,
// robots.txt, Open Graph tags and JSON-LD will all follow automatically.
// Only change `defaultSiteOrigin` if you prefer to hard-code the new domain.
export const defaultSiteOrigin = 'https://cabinetimane.vercel.app'

export function normalizeOrigin(value) {
  const trimmed = String(value ?? '').trim()

  if (!trimmed) {
    return ''
  }

  return (/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`).replace(/\/+$/, '')
}

