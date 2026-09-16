import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CalendarCheck, Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Consultation', href: '/#consultation' },
  { label: 'Résultats Patients', href: '/#resultats' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#rendez-vous' },
]

function isActive(item, location) {
  if (item.href === '/') {
    return location.pathname === '/' && !location.hash
  }

  return location.hash && item.href.endsWith(location.hash)
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="site-header">
      <div className="nav-container">
        <Link className="brand-link" to="/" aria-label="Accueil Cabinet Imane Oulhint">
          <img src="/imane-logo-navbar.png" alt="Logo Cabinet Imane Oulhint" />
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

        <a className="nav-cta" href="#rendez-vous">
          <CalendarCheck aria-hidden="true" size={17} />
          Prendre rendez-vous
        </a>

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
          <a className="mobile-cta" href="#rendez-vous" onClick={() => setMenuOpen(false)}>
            Prendre rendez-vous
          </a>
        </nav>
      </div>
    </header>
  )
}
