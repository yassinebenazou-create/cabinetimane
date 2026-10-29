// Page-level SEO metadata shared by the React app (PageSeo) and the build step
// (scripts/generate-seo-files.mjs) so the static HTML shells and the client-side
// metadata can never drift apart. Plain data only: no browser or Vite APIs here.

export const siteName = 'Cabinet Imane Oulhint'
export const defaultShareImage = '/og-default.jpg'
export const defaultShareImageAlt =
  'Logo du cabinet Imane Oulhint, diététicienne nutritionniste à Agadir'

export const seoPages = {
  home: {
    path: '/',
    title: 'Diététicienne Nutritionniste à Agadir | Imane Oulhint',
    description:
      'Découvrez le cabinet d’Imane Oulhint, diététicienne nutritionniste à Agadir. Gestion du poids, nutrition clinique et bilans personnalisés. Contactez le cabinet.',
  },
  services: {
    path: '/services',
    title: 'Services de Nutrition à Agadir | Cabinet Imane Oulhint',
    description:
      'Rééquilibrage alimentaire, nutrition clinique, bilans TANITA et Oligoscan, amincissement : découvrez les services du cabinet Imane Oulhint à Agadir.',
  },
  consultation: {
    path: '/consultation',
    title: 'Consultation Nutritionnelle à Agadir | Imane Oulhint',
    description:
      'Découvrez le déroulement d’une consultation nutritionnelle personnalisée au cabinet Imane Oulhint à Agadir, du bilan initial au suivi régulier.',
  },
  results: {
    path: '/resultats-patients',
    title: 'Résultats Patients | Cabinet Imane Oulhint à Agadir',
    description:
      'Découvrez les retours, avis Google et contenus partagés par les patients du cabinet Imane Oulhint à Agadir.',
  },
  faq: {
    path: '/faq',
    title: 'FAQ Nutrition | Cabinet Imane Oulhint à Agadir',
    description:
      'Réponses aux questions fréquentes sur la consultation nutritionnelle, le suivi, la prise de rendez-vous et les soins proposés par le cabinet Imane Oulhint à Agadir.',
  },
  contact: {
    path: '/contact',
    title: 'Contact et Rendez-vous | Diététicienne à Agadir',
    description:
      'Prenez rendez-vous avec Imane Oulhint, diététicienne nutritionniste à Agadir : téléphone, WhatsApp, e-mail et adresse du cabinet à Agadir Bay, Technopole II.',
  },
}

export const notFoundPage = {
  title: 'Page introuvable | Cabinet Imane Oulhint',
  description:
    'La page demandée est introuvable. Retrouvez les services et les coordonnées du cabinet Imane Oulhint à Agadir.',
}

// Titles for service pages. Services not listed here fall back to
// "<name> à Agadir | Imane Oulhint".
const serviceSeoTitles = {
  'perte-de-poids': 'Gestion du Poids à Agadir | Imane Oulhint',
  'nutrition-maladies-chroniques': 'Nutrition Clinique à Agadir | Imane Oulhint',
  'bilan-corporel-tanita': 'Bilan Corporel TANITA à Agadir | Imane Oulhint',
  'bilan-oligoscan': 'Bilan Oligoscan à Agadir | Imane Oulhint',
  // A remote follow-up is not tied to the Agadir premises, so the title does not claim it is.
  'suivi-nutritionnel-a-distance': 'Suivi Nutritionnel à Distance | Imane Oulhint',
}

export function getServiceSeoTitle(service) {
  return serviceSeoTitles[service.slug] ?? `${service.name} à Agadir | Imane Oulhint`
}

