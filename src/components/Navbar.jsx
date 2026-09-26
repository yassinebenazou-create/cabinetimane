import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  BriefcaseMedical,
  CalendarCheck,
  ChartNoAxesColumnIncreasing,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardPlus,
  Globe2,
  House,
  Mail,
  Menu,
  X,
} from 'lucide-react'
import { useLanguage } from '../i18n/language.js'

const navItems = [
  { label: 'Accueil', href: '/', icon: House },
  { label: 'Services', href: '/services', icon: BriefcaseMedical },
  { label: 'Consultation', href: '/consultation', icon: ClipboardPlus },
  {
    label: 'Résultats Patients',
    href: '/resultats-patients',
    icon: ChartNoAxesColumnIncreasing,
  },
  { label: 'FAQ', href: '/faq', icon: CircleHelp },
  { label: 'Contact', href: '/contact', icon: Mail },
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

function LanguageFlag({ language }) {
  return <span className={`language-flag language-flag-${language}`} aria-hidden="true" />
}

function LanguageOptions({ language, setLanguage, translate, onSelect, compact = false }) {
  const selectLanguage = (nextLanguage) => {
    setLanguage(nextLanguage)
    onSelect?.()
  }

  return (
    <div className={compact ? 'language-options is-compact' : 'language-options'}>
      <button
        className={language === 'fr' ? 'language-option is-selected' : 'language-option'}
        type="button"
        role={compact ? 'menuitemradio' : undefined}
        aria-checked={compact ? language === 'fr' : undefined}
        onClick={() => selectLanguage('fr')}
      >
        <LanguageFlag language="fr" />
        <span>{translate('Français')}</span>
        {language === 'fr' && <Check aria-hidden="true" size={17} strokeWidth={2.4} />}
      </button>
      <button
        className={language === 'ar' ? 'language-option is-selected' : 'language-option'}
        type="button"
        role={compact ? 'menuitemradio' : undefined}
        aria-checked={compact ? language === 'ar' : undefined}
        onClick={() => selectLanguage('ar')}
      >
        <LanguageFlag language="ar" />
        <span>{translate('العربية')}</span>
        {language === 'ar' && <Check aria-hidden="true" size={17} strokeWidth={2.4} />}
      </button>
    </div>
  )
}

function LanguageSwitcher({ className = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const { language, setLanguage, translate } = useLanguage()

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        containerRef.current?.querySelector('.language-switcher-button')?.focus()
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  return (
    <div className={`language-switcher ${className}`.trim()} ref={containerRef}>
      <button
        className="language-switcher-button"
        type="button"
        aria-label={translate('Changer la langue')}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <Globe2 aria-hidden="true" size={18} strokeWidth={2} />
        <span>{language.toUpperCase()}</span>
        <ChevronDown
          className={isOpen ? 'language-chevron is-open' : 'language-chevron'}
          aria-hidden="true"
          size={15}
          strokeWidth={2.2}
        />
      </button>
      {isOpen && (
        <div className="language-dropdown" role="menu">
          <LanguageOptions
            compact
            language={language}
            setLanguage={setLanguage}
            translate={translate}
            onSelect={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { language, setLanguage, translate } = useLanguage()

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
          aria-label={translate('Accueil Cabinet Imane Oulhint')}
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/imane-logo-new.png"
            alt={translate('Imane Oulhint, Diététicienne Nutritionniste')}
          />
        </Link>

        <nav className="desktop-nav" aria-label={translate('Navigation principale')}>
          {navItems.map((item) => (
            <Link
              className={isActive(item, location) ? 'nav-link active' : 'nav-link'}
              to={item.href}
              key={item.href}
              aria-current={isActive(item, location) ? 'page' : undefined}
            >
              {translate(item.label)}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <LanguageSwitcher className="desktop-language-switcher" />
          <Link className="nav-cta" to="/contact">
            <CalendarCheck aria-hidden="true" size={17} />
            {translate('Prendre rendez-vous')}
          </Link>
        </div>

        <div className="mobile-nav-actions">
          <LanguageSwitcher className="mobile-language-switcher" />
          <button
            className="menu-toggle"
            type="button"
            aria-label={translate(menuOpen ? 'Fermer le menu' : 'Ouvrir le menu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
          </button>
        </div>
      </div>

      <div className={menuOpen ? 'mobile-menu open' : 'mobile-menu'} id="mobile-navigation">
        <nav aria-label={translate('Navigation mobile')}>
          <div className="mobile-menu-links">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item, location)

              return (
                <Link
                  className={active ? 'mobile-link active' : 'mobile-link'}
                  to={item.href}
                  key={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mobile-link-icon">
                    <Icon aria-hidden="true" size={20} strokeWidth={2} />
                  </span>
                  <span>{translate(item.label)}</span>
                </Link>
              )
            })}
          </div>

          <section className="mobile-language-section" aria-label={translate('Langue')}>
            <h2>
              <Globe2 aria-hidden="true" size={19} strokeWidth={2} />
              {translate('Langue')}
            </h2>
            <LanguageOptions
              language={language}
              setLanguage={setLanguage}
              translate={translate}
            />
          </section>

          <Link className="mobile-cta" to="/contact" onClick={() => setMenuOpen(false)}>
            <CalendarCheck aria-hidden="true" size={18} />
            {translate('Prendre rendez-vous')}
          </Link>
        </nav>
      </div>
    </header>
  )
}
