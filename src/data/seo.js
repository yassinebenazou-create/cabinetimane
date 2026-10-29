import { defaultSiteOrigin, normalizeOrigin } from './siteConfig.js'

export function getSiteOrigin() {
  return normalizeOrigin(import.meta.env.VITE_SITE_URL) || defaultSiteOrigin
}

export function getAbsoluteSiteUrl(path = '/') {
  return new URL(path, `${getSiteOrigin()}/`).href
}
