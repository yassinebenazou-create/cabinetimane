import { useEffect } from 'react'

export default function StructuredData({ name, data }) {
  useEffect(() => {
    let script = [...document.querySelectorAll('script[data-seo-schema]')].find(
      (element) => element.dataset.seoSchema === name,
    )

    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.seoSchema = name
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify(data).replaceAll('<', '\\u003c')

    return () => script.remove()
  }, [data, name])

  return null
}
