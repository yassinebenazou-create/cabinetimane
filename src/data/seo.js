import { defaultSiteOrigin } from './siteConfig.js'

export function getSiteOrigin() {
  return defaultSiteOrigin
}

export function getAbsoluteSiteUrl(path = '/') {
  return new URL(path, `${getSiteOrigin()}/`).href
}

export function getAbsolutePageUrl(path = '/') {
  const normalizedPath = `/${path.replace(/^\/+|\/+$/g, '')}`
  return getAbsoluteSiteUrl(normalizedPath === '/' ? '/' : `${normalizedPath}/`)
}
