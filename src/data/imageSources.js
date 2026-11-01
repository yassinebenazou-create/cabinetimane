export function getResponsiveWebpSrcSet(src, width, variantWidths) {
  const imageBase = src
    .replace(/-\d+w(?=\.webp$)/i, '')
    .replace(/\.(?:jpe?g|png|webp)$/i, '')
  const widths = Array.isArray(variantWidths) ? variantWidths : [variantWidths]
  const candidates = widths
    .filter((variantWidth) => variantWidth < width)
    .map((variantWidth) => `${encodeURI(`${imageBase}-${variantWidth}w.webp`)} ${variantWidth}w`)

  if (/\.webp$/i.test(src)) {
    candidates.push(`${encodeURI(src)} ${width}w`)
  }

  return candidates.join(', ')
}
