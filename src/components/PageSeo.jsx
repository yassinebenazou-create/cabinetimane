import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getAbsoluteSiteUrl } from '../data/seo.js'
import { useLanguage } from '../i18n/language.js'

const defaultShareImage = '/service-gestion-poids.png'

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
  imageAlt = 'Cabinet Imane Oulhint à Agadir',
  type = 'website',
}) {
  const { pathname } = useLocation()
  const { language, translate } = useLanguage()
  const localizedTitle = translate(title)
  const localizedDescription = translate(description)
  const localizedImageAlt = translate(imageAlt)

  useEffect(() => {
    const canonicalUrl = getAbsoluteSiteUrl(pathname || '/')
    const imageUrl = getAbsoluteSiteUrl(image)
    const locale = language === 'ar' ? 'ar_MA' : 'fr_MA'
    const alternateLocale = language === 'ar' ? 'fr_MA' : 'ar_MA'

    document.title = localizedTitle
    setCanonical(canonicalUrl)
    setMeta('name', 'description', localizedDescription)
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:site_name', 'Cabinet Imane Oulhint')
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
  }, [image, language, localizedDescription, localizedImageAlt, localizedTitle, pathname, type])

  return null
}
