import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import services from '../src/data/services.js'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(rootDir, 'dist')
const sourceHtml = await readFile(path.join(distDir, 'index.html'), 'utf8')

const rawSiteUrl =
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  process.env.URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.DEPLOY_PRIME_URL ||
  ''

const siteUrl = rawSiteUrl
  ? (/^https?:\/\//i.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`).replace(/\/$/, '')
  : ''

const routes = [
  {
    path: '/',
    title: 'Cabinet Imane Oulhint | Diététicienne Nutritionniste à Agadir',
    description:
      'Cabinet Imane Oulhint à Agadir : accompagnement nutritionnel personnalisé, services de bien-être et suivi adapté à vos objectifs.',
    image: '/service-gestion-poids.webp',
  },
  {
    path: '/services',
    title: 'Services de nutrition et bien-être | Cabinet Imane Oulhint',
    description:
      'Découvrez les services de nutrition, les bilans et les soins de bien-être proposés par le cabinet Imane Oulhint à Agadir.',
    image: '/images/services/reequilibrage-alimentaire.webp',
  },
  {
    path: '/consultation',
    title: 'Consultation diététique à Agadir | Cabinet Imane Oulhint',
    description:
      'Découvrez le déroulement d’une consultation diététique personnalisée au cabinet Imane Oulhint à Agadir, du bilan initial au suivi régulier.',
    image: '/service-gestion-poids.webp',
  },
  {
    path: '/resultats-patients',
    title: 'Résultats patients | Cabinet Imane Oulhint à Agadir',
    description:
      'Découvrez les retours, avis Google et contenus partagés par les patients du cabinet Imane Oulhint à Agadir.',
    image: '/instagram-highlight-01.jpg',
  },
  {
    path: '/faq',
    title: 'Questions fréquentes | Cabinet Imane Oulhint à Agadir',
    description:
      'Retrouvez les réponses aux questions fréquentes sur les consultations diététiques, le suivi nutritionnel et les soins proposés à Agadir.',
    image: '/service-gestion-poids.webp',
  },
  {
    path: '/contact',
    title: 'Contact | Cabinet Imane Oulhint - Agadir',
    description:
      'Contactez le Cabinet Imane Oulhint à Agadir pour toute demande d’information ou prise de rendez-vous.',
    image: '/images/contact-office.webp',
  },
  ...services.map((service) => ({
    path: `/services/${service.slug}`,
    title: `${service.name} à Agadir | Cabinet Imane Oulhint`,
    description: service.metaDescription,
    image: service.image,
  })),
]

function escapeAttribute(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function upsertMeta(html, attribute, key, content) {
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${escapeRegExp(key)}["'][^>]*>`, 'i')
  const tag = `<meta ${attribute}="${escapeAttribute(key)}" content="${escapeAttribute(content)}" />`

  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

function buildHtml(route) {
  const canonicalUrl = siteUrl ? `${siteUrl}${route.path === '/' ? '/' : route.path}` : ''
  const imageUrl = siteUrl ? new URL(route.image, `${siteUrl}/`).href : route.image
  let html = sourceHtml.replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttribute(route.title)}</title>`)

  html = upsertMeta(html, 'name', 'description', route.description)
  html = upsertMeta(html, 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
  html = upsertMeta(html, 'property', 'og:type', 'website')
  html = upsertMeta(html, 'property', 'og:site_name', 'Cabinet Imane Oulhint')
  html = upsertMeta(html, 'property', 'og:locale', 'fr_MA')
  html = upsertMeta(html, 'property', 'og:title', route.title)
  html = upsertMeta(html, 'property', 'og:description', route.description)
  html = upsertMeta(html, 'property', 'og:image', imageUrl)
  html = upsertMeta(html, 'property', 'og:image:alt', route.title)
  html = upsertMeta(html, 'name', 'twitter:card', 'summary_large_image')
  html = upsertMeta(html, 'name', 'twitter:title', route.title)
  html = upsertMeta(html, 'name', 'twitter:description', route.description)
  html = upsertMeta(html, 'name', 'twitter:image', imageUrl)

  if (canonicalUrl) {
    html = upsertMeta(html, 'property', 'og:url', canonicalUrl)
    html = html.replace(
      /\s*<link\s+[^>]*rel=["']canonical["'][^>]*>/i,
      '',
    )
    html = html.replace('</head>', `    <link rel="canonical" href="${escapeAttribute(canonicalUrl)}" />\n  </head>`)
  }

  return html
}

for (const route of routes) {
  const outputPath = route.path === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route.path.slice(1), 'index.html')

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, buildHtml(route), 'utf8')
}

const robots = ['User-agent: *', 'Allow: /']

if (siteUrl) {
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((route) => {
      const url = `${siteUrl}${route.path === '/' ? '/' : route.path}`
      return `  <url><loc>${escapeXml(url)}</loc></url>`
    }),
    '</urlset>',
    '',
  ].join('\n')

  await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8')
  robots.push(`Sitemap: ${siteUrl}/sitemap.xml`)
} else {
  console.warn('SEO: set VITE_SITE_URL to generate production canonical URLs and sitemap.xml.')
}

await writeFile(path.join(distDir, 'robots.txt'), `${robots.join('\n')}\n`, 'utf8')

console.log(`SEO: generated metadata shells for ${routes.length} routes.`)
