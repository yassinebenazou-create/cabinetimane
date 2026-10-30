import { defaultSiteOrigin } from './siteConfig.js'

export function getSiteOrigin() {
  return defaultSiteOrigin
}

export function getAbsoluteSiteUrl(path = '/') {
  return new URL(path, `${getSiteOrigin()}/`).href
}

export function getAbsolutePageUrl(path = '/') {
  const { pathname } = new URL(path, `${getSiteOrigin()}/`)
  const normalizedPath = `/${pathname.replace(/^\/+|\/+$/g, '')}`
  return getAbsoluteSiteUrl(normalizedPath === '/' ? '/' : `${normalizedPath}/`)
}
