import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CalendarCheck, Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Consultation', href: '/consultation' },
  { label: 'Résultats Patients', href: '/resultats-patients' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

function isActive(item, location) {
  if (item.href === '/') {
    return location.pathname === '/'
  }

  if (item.href === '/services') {
    return location.pathname.startsWith('/services')
  }

  return location.pathname === item.href
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const updateHeaderState = () => {
      setScrolled(window.scrollY > 24)
    }

    updateHeaderState()
    window.addEventListener('scroll', updateHeaderState, { passive: true })

    return () => window.removeEventListener('scroll', updateHeaderState)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <div className="nav-container">
        <Link
          className="brand-link"
          to="/"
          aria-label="Accueil Cabinet Imane Oulhint"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/imane-logo-new.png"
            alt="Imane Oulhint, Diététicienne Nutritionniste"
          />
        </Link>

        <nav className="desktop-nav" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link
              className={isActive(item, location) ? 'nav-link active' : 'nav-link'}
              to={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="nav-cta" to="/contact">
          <CalendarCheck aria-hidden="true" size={17} />
          Prendre rendez-vous
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
        </button>
      </div>

      <div className={menuOpen ? 'mobile-menu open' : 'mobile-menu'}>
        <nav aria-label="Navigation mobile">
          {navItems.map((item) => (
            <Link
              className={isActive(item, location) ? 'mobile-link active' : 'mobile-link'}
              to={item.href}
              key={item.label}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link className="mobile-cta" to="/contact" onClick={() => setMenuOpen(false)}>
            Prendre rendez-vous
          </Link>
        </nav>
      </div>
    </header>
  )
}
