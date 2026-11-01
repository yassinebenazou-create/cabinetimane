import { getAbsolutePageUrl, getAbsoluteSiteUrl } from './seo.js'
import { cabinet } from './site.js'
import { siteName } from './seoPages.js'

// Schema.org building blocks. Only facts that already appear on the website are
// used here (name, address, phone, e-mail, opening hours, social profiles,
// degree). Nothing is invented: no ratings, no reviews, no price range.

const phone = '+212528234949'

const streetAddress = 'Agadir Bay, Bloc D, 1er étage, N° 107, Technopole II'

// Mirrors `openingHours` in src/data/site.js: update both together.
const openingHoursSpecification = [
  { dayOfWeek: ['Monday', 'Wednesday', 'Friday'], opens: '09:00', closes: '13:00' },
  { dayOfWeek: ['Monday', 'Wednesday', 'Friday'], opens: '14:30', closes: '18:30' },
  { dayOfWeek: ['Tuesday', 'Thursday'], opens: '09:00', closes: '18:30' },
  { dayOfWeek: 'Saturday', opens: '09:00', closes: '12:30' },
].map((specification) => ({ '@type': 'OpeningHoursSpecification', ...specification }))

export function getCabinetId() {
  return `${getAbsoluteSiteUrl('/')}#cabinet`
}

export function getPersonId() {
  return `${getAbsoluteSiteUrl('/')}#imane-oulhint`
}

export function getWebsiteId() {
  return `${getAbsoluteSiteUrl('/')}#website`
}

// MedicalBusiness is the closest accurate LocalBusiness subtype for a dietetics
// practice (schema.org has no dedicated "Dietitian" type).
export function getCabinetEntity() {
  const homeUrl = getAbsoluteSiteUrl('/')

  return {
    '@type': 'MedicalBusiness',
    '@id': getCabinetId(),
    name: siteName,
    alternateName: 'Cabinet de Diététique Nutrition et Amincissement Imane Oulhint',
    description:
      'Cabinet de diététique et nutrition à Agadir proposant des consultations nutritionnelles personnalisées, des bilans et des soins de bien-être.',
    url: homeUrl,
    logo: getAbsoluteSiteUrl('/imane-logo-new.webp'),
    image: getAbsoluteSiteUrl('/og-default.jpg'),
    telephone: phone,
    email: cabinet.email,
    hasMap: cabinet.mapsUrl,
    sameAs: [cabinet.instagramUrl, cabinet.facebookUrl, cabinet.tiktokUrl],
    address: {
      '@type': 'PostalAddress',
      streetAddress,
      addressLocality: 'Agadir',
      addressRegion: 'Souss-Massa',
      postalCode: '80020',
      addressCountry: 'MA',
    },
    areaServed: { '@type': 'City', name: 'Agadir' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: phone,
      contactType: 'appointments',
      availableLanguage: ['French', 'Arabic'],
    },
    openingHoursSpecification,
  }
}

// A compact reference used by pages other than the home page. It repeats the
// essential NAP data so each page is self-contained and consistent.
export function getCabinetReference() {
  const { '@type': type, '@id': id, name, url, telephone, address } = getCabinetEntity()
  return { '@type': type, '@id': id, name, url, telephone, address }
}

export function getPersonEntity() {
  return {
    '@type': 'Person',
    '@id': getPersonId(),
    name: cabinet.professional,
    jobTitle: cabinet.title,
    url: getAbsoluteSiteUrl('/'),
    worksFor: { '@id': getCabinetId() },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Université Mohammed VI des Sciences et de la Santé',
    },
    sameAs: [cabinet.instagramUrl, cabinet.facebookUrl, cabinet.tiktokUrl],
  }
}

export function getWebsiteEntity() {
  return {
    '@type': 'WebSite',
    '@id': getWebsiteId(),
    url: getAbsoluteSiteUrl('/'),
    name: siteName,
    alternateName: 'Cabinet de Diététique Nutrition et Amincissement Imane Oulhint',
    inLanguage: ['fr-MA', 'ar-MA'],
    publisher: { '@id': getCabinetId() },
  }
}

export function getHomeStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [getWebsiteEntity(), getCabinetEntity(), getPersonEntity()],
  }
}

export function getBreadcrumbStructuredData(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getAbsolutePageUrl(item.path),
    })),
  }
}
