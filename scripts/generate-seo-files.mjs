import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defaultSiteOrigin } from '../src/data/siteConfig.js'
import {
  defaultShareImage,
  defaultShareImageAlt,
  getServiceSeoTitle,
  notFoundPage,
  seoPages,
  siteName,
} from '../src/data/seoPages.js'
import services from '../src/data/services.js'
import { cabinet } from '../src/data/site.js'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(rootDir, 'dist')
const sourceHtml = await readFile(path.join(distDir, 'index.html'), 'utf8')

const siteUrl = defaultSiteOrigin

const indexableRobots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

const staticRoutes = [
  { ...seoPages.home, heading: 'Nutrition personnalisée pour retrouver l’équilibre' },
  { ...seoPages.services, heading: 'Services de nutrition et bilans à Agadir' },
  { ...seoPages.consultation, heading: 'Votre consultation nutritionnelle à Agadir' },
  { ...seoPages.results, heading: 'Expériences des patients au cabinet à Agadir' },
  { ...seoPages.faq, heading: 'Questions fréquentes sur votre accompagnement à Agadir' },
  { ...seoPages.contact, heading: 'Contact et rendez-vous à Agadir' },
].map((route) => ({ ...route, image: defaultShareImage, imageAlt: defaultShareImageAlt }))

const routes = [
  ...staticRoutes,
  ...services.map((service) => ({
    path: `/services/${service.slug}`,
    title: getServiceSeoTitle(service),
    description: service.metaDescription,
    heading: service.name,
    image: service.image,
    imageAlt: service.imageAlt,
  })),
]

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function escapeXml(value) {
  return escapeHtml(value).replaceAll("'", '&apos;')
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function absoluteUrl(urlPath) {
  return new URL(urlPath, `${siteUrl}/`).href
}

function canonicalPath(urlPath) {
  const normalizedPath = `/${urlPath.replace(/^\/+|\/+$/g, '')}`
  return normalizedPath === '/' ? '/' : `${normalizedPath}/`
}

function pageUrl(urlPath) {
  return absoluteUrl(canonicalPath(urlPath))
}

function removeHomeHeroPreload(html) {
  return html.replace(
    /\s*<link\b(?=[^>]*\brel=["']preload["'])(?=[^>]*\bhref=["']\/hero-nutrition-1-poster\.webp["'])[^>]*\/?>/i,
    '',
  )
}

function upsertMeta(html, attribute, key, content) {
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${escapeRegExp(key)}["'][^>]*>`, 'i')
  const tag = `<meta ${attribute}="${escapeHtml(key)}" content="${escapeHtml(content)}" />`

  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

function buildNoscript(route) {
  const links = [
    ...staticRoutes.map((item) => ({ href: canonicalPath(item.path), label: item.title.split(' | ')[0] })),
  ]
  const nav = links.map((link) => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`).join('')
  const serviceLinks = services
    .map((service) => `<li><a href="${canonicalPath(`/services/${service.slug}`)}">${escapeHtml(service.name)}</a></li>`)
    .join('')

  // Shown only when JavaScript is disabled: a readable fallback with the same
  // heading, description, navigation and contact details as the real page.
  return [
    '    <noscript>',
    `      <main style="max-width:760px;margin:0 auto;padding:32px 20px;font-family:Arial,sans-serif;line-height:1.55">`,
    `        <h1>${escapeHtml(route.heading)}</h1>`,
    `        <p>${escapeHtml(route.description)}</p>`,
    `        <nav aria-label="Navigation principale"><ul>${nav}</ul></nav>`,
    `        <nav aria-label="Services"><ul>${serviceLinks}</ul></nav>`,
    `        <p>${escapeHtml(siteName)} : ${escapeHtml(cabinet.address)}, Maroc. Téléphone : <a href="${escapeHtml(cabinet.phoneHref)}">${escapeHtml(cabinet.phoneDisplay)}</a>.</p>`,
    '      </main>',
    '    </noscript>',
  ].join('\n')
}

function buildHtml(route) {
  const canonicalUrl = pageUrl(route.path)
  const imageUrl = absoluteUrl(route.image)
  let html = sourceHtml.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)

  if (route.path !== '/') {
    html = removeHomeHeroPreload(html)
  }

  html = upsertMeta(html, 'name', 'description', route.description)
  html = upsertMeta(html, 'name', 'robots', indexableRobots)
  html = upsertMeta(html, 'property', 'og:type', 'website')
  html = upsertMeta(html, 'property', 'og:site_name', siteName)
  html = upsertMeta(html, 'property', 'og:locale', 'fr_MA')
  html = upsertMeta(html, 'property', 'og:locale:alternate', 'ar_MA')
  html = upsertMeta(html, 'property', 'og:title', route.title)
  html = upsertMeta(html, 'property', 'og:description', route.description)
  html = upsertMeta(html, 'property', 'og:url', canonicalUrl)
  html = upsertMeta(html, 'property', 'og:image', imageUrl)
  html = upsertMeta(html, 'property', 'og:image:alt', route.imageAlt)
  html = upsertMeta(html, 'name', 'twitter:card', 'summary_large_image')
  html = upsertMeta(html, 'name', 'twitter:title', route.title)
  html = upsertMeta(html, 'name', 'twitter:description', route.description)
  html = upsertMeta(html, 'name', 'twitter:image', imageUrl)
  html = upsertMeta(html, 'name', 'twitter:image:alt', route.imageAlt)

  html = html.replace(/\s*<link\s+[^>]*rel=["']canonical["'][^>]*>/i, '')
  html = html.replace('</head>', `    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />\n  </head>`)
  html = html.replace('<div id="root"></div>', `<div id="root"></div>\n${buildNoscript(route)}`)

  return html
}

// 404 shell: served by the host with a real 404 status for unknown URLs. The React
// app boots inside it and renders its "Page introuvable" screen. It is not
// indexable and has no canonical URL.
function build404Html() {
  let html = sourceHtml.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(notFoundPage.title)}</title>`)

  html = removeHomeHeroPreload(html)
  html = upsertMeta(html, 'name', 'description', notFoundPage.description)
  html = upsertMeta(html, 'name', 'robots', 'noindex, follow')
  html = html.replace(/\s*<link\s+[^>]*rel=["']canonical["'][^>]*>/i, '')
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"></div>\n    <noscript><main style="max-width:760px;margin:0 auto;padding:32px 20px;font-family:Arial,sans-serif"><h1>Page introuvable</h1><p><a href="/">Retour à l’accueil</a></p></main></noscript>`,
  )

  return html
}

// --- Safety checks: fail the build rather than ship duplicate or broken metadata.
const problems = []
const seenTitles = new Map()
const seenDescriptions = new Map()

for (const route of routes) {
  if (seenTitles.has(route.title)) problems.push(`Duplicate title: "${route.title}" (${seenTitles.get(route.title)} / ${route.path})`)
  if (seenDescriptions.has(route.description)) problems.push(`Duplicate description on ${route.path} and ${seenDescriptions.get(route.description)}`)
  seenTitles.set(route.title, route.path)
  seenDescriptions.set(route.description, route.path)

  if (!route.title || !route.description) problems.push(`Missing metadata on ${route.path}`)
  if (route.title.length > 65) console.warn(`SEO: title may be truncated (${route.title.length} chars) on ${route.path}`)
  if (route.description.length > 170) console.warn(`SEO: description may be truncated (${route.description.length} chars) on ${route.path}`)
}

if (problems.length > 0) {
  console.error(`SEO: ${problems.join('\nSEO: ')}`)
  process.exit(1)
}

for (const route of routes) {
  const outputPath = route.path === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route.path.slice(1), 'index.html')

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, buildHtml(route), 'utf8')
}

await writeFile(path.join(distDir, '404.html'), build404Html(), 'utf8')

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => `  <url><loc>${escapeXml(pageUrl(route.path))}</loc></url>`),
  '</urlset>',
  '',
].join('\n')

await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8')
await writeFile(
  path.join(distDir, 'robots.txt'),
  ['User-agent: *', 'Allow: /', '', `Sitemap: ${siteUrl}/sitemap.xml`, ''].join('\n'),
  'utf8',
)

console.log(`SEO: generated ${routes.length} route shells + 404.html for ${siteUrl}`)
