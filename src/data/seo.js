function getConfiguredOrigin() {
  const configuredUrl = import.meta.env.VITE_SITE_URL?.trim()

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '')
  }

  return typeof window === 'undefined' ? '' : window.location.origin
}

export function getAbsoluteSiteUrl(path = '/') {
  const origin = getConfiguredOrigin()

  if (!origin) {
    return path
  }

  return new URL(path, `${origin}/`).href
}
