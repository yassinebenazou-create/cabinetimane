import { Link } from 'react-router-dom'

function normalizeRoute(to) {
  if (typeof to !== 'string' || !to.startsWith('/') || to.startsWith('//')) {
    return to
  }

  const suffixIndex = to.search(/[?#]/)
  const pathname = suffixIndex === -1 ? to : to.slice(0, suffixIndex)
  const suffix = suffixIndex === -1 ? '' : to.slice(suffixIndex)

  if (pathname === '/' || pathname.endsWith('/')) {
    return to
  }

  return `${pathname}/${suffix}`
}

export default function RouteLink({ to, ...props }) {
  return <Link to={normalizeRoute(to)} {...props} />
}
