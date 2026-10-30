import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getBreadcrumbStructuredData } from '../data/schema.js'
import { getAbsolutePageUrl, getAbsoluteSiteUrl } from '../data/seo.js'
import { defaultShareImage, defaultShareImageAlt, siteName } from '../data/seoPages.js'
import { useLanguage } from '../i18n/language.js'

const indexableRobots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function setCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

export default function PageSeo({
  title,
  description,
  image = defaultShareImage,
  imageAlt = defaultShareImageAlt,
  type = 'website',
  noindex = false,
  breadcrumbs,
}) {
  const { pathname } = useLocation()
  const { language, translate } = useLanguage()
  const localizedTitle = translate(title)
  const localizedDescription = translate(description)
  const localizedImageAlt = translate(imageAlt)

  // Cloudflare Pages serves directory route shells at their trailing-slash URL.
  const canonicalPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/'

  useEffect(() => {
    const canonicalUrl = getAbsolutePageUrl(canonicalPath)
    const imageUrl = getAbsoluteSiteUrl(image)
    const locale = language === 'ar' ? 'ar_MA' : 'fr_MA'
    const alternateLocale = language === 'ar' ? 'fr_MA' : 'ar_MA'

    document.title = localizedTitle

    if (noindex) {
      // Non-indexable pages (404) must not advertise a canonical URL.
      document.head.querySelector('link[rel="canonical"]')?.remove()
    } else {
      setCanonical(canonicalUrl)
    }

    setMeta('name', 'description', localizedDescription)
    setMeta('name', 'robots', noindex ? 'noindex, follow' : indexableRobots)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:site_name', siteName)
    setMeta('property', 'og:locale', locale)
    setMeta('property', 'og:locale:alternate', alternateLocale)
    setMeta('property', 'og:title', localizedTitle)
    setMeta('property', 'og:description', localizedDescription)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:image', imageUrl)
    setMeta('property', 'og:image:alt', localizedImageAlt)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', localizedTitle)
    setMeta('name', 'twitter:description', localizedDescription)
    setMeta('name', 'twitter:image', imageUrl)
    setMeta('name', 'twitter:image:alt', localizedImageAlt)
  }, [canonicalPath, image, language, localizedDescription, localizedImageAlt, localizedTitle, noindex, type])

  if (!breadcrumbs?.length) {
    return null
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    ...getBreadcrumbStructuredData(
      breadcrumbs.map((item) => ({ name: translate(item.name), path: item.path })),
    ),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  )
}
