import { ChevronRight, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cabinet, defaultWhatsAppMessage, getWhatsAppUrl, openingHours } from '../data/site.js'
import { useLanguage } from '../i18n/language.js'

export function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.7 22v-9h3l.45-3.52H13.7V7.24c0-1.02.28-1.71 1.75-1.71h1.87V2.38a25.1 25.1 0 0 0-2.73-.14c-2.7 0-4.54 1.65-4.54 4.67v2.57H7v3.52h3.05v9h3.65Z"
      />
    </svg>
  )
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.7" r="1.15" fill="currentColor" />
    </svg>
  )
}

export function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.3 2h3.1c.2 1.7 1.2 3.2 2.7 4v3.2a8.3 8.3 0 0 1-2.7-.7v6.4A7.1 7.1 0 1 1 11.3 8v3.3a3.8 3.8 0 1 0 3 3.7V2Z"
      />
    </svg>
  )
}

export default function SiteFooter() {
  const { localize, translate } = useLanguage()
  const localizedHours = localize(openingHours)
  const whatsappUrl = getWhatsAppUrl(translate(defaultWhatsAppMessage))

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img
            src="/imane-logo-footer.png"
            alt={translate('Imane Oulhint, Diététicienne Nutritionniste')}
          />
          <p>
            {translate(
              'Imane Oulhint, Diététicienne Nutritionniste, propose à Agadir des solutions nutritionnelles personnalisées selon les besoins de chaque personne.',
            )}
          </p>
          <a
            className="footer-whatsapp-link"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle aria-hidden="true" size={20} />
            {translate('Prendre rendez-vous sur WhatsApp')}
          </a>
        </div>

        <div className="footer-column">
          <h2>{translate('Liens Utiles')}</h2>
          <nav className="footer-links" aria-label={translate('Liens utiles')}>
            <Link to="/">
              <ChevronRight aria-hidden="true" size={18} />
              {translate('À propos')}
            </Link>
            <Link to="/services">
              <ChevronRight aria-hidden="true" size={18} />
              {translate('Services')}
            </Link>
            <Link to="/consultation">
              <ChevronRight aria-hidden="true" size={18} />
              {translate('Consultation')}
            </Link>
            <Link to="/contact">
              <ChevronRight aria-hidden="true" size={18} />
              {translate('Contact')}
            </Link>
          </nav>
        </div>

        <div className="footer-column">
          <h2>{translate('Services')}</h2>
          <div className="footer-services">
            <Link to="/services/perte-de-poids">
              <img src="/service-icon-09.png" alt="" aria-hidden="true" />
              {translate('Gestion du poids')}
            </Link>
            <Link to="/services/nutrition-maladies-chroniques">
              <img src="/service-icon-06.png" alt="" aria-hidden="true" />
              {translate('Nutrition clinique')}
            </Link>
            <Link to="/services/bilan-corporel-tanita">
              <img src="/service-icon-07.png" alt="" aria-hidden="true" />
              {translate('Bilan corporel – TANITA')}
            </Link>
            <Link to="/services/bilan-oligoscan">
              <img src="/service-icon-04.png" alt="" aria-hidden="true" />
              {translate('Bilan Oligoscan')}
            </Link>
          </div>
        </div>

        <div className="footer-column footer-contact-column">
          <h2>{translate('Contact Infos')}</h2>
          <div className="footer-contact-list">
            <span>
              <InstagramIcon />
              <a
                href={cabinet.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                @cabinet_oulhint
              </a>
            </span>
            <span>
              <Phone aria-hidden="true" size={28} />
              <a href={cabinet.phoneHref}>{cabinet.phoneDisplay}</a>
            </span>
            <span>
              <MessageCircle aria-hidden="true" size={28} />
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp {cabinet.whatsappDisplay}
              </a>
            </span>
            <span>
              <MapPin aria-hidden="true" size={28} />
              <a
                href={cabinet.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {translate(cabinet.address)}
              </a>
            </span>
          </div>

          <h2 className="footer-hours-title">{translate("Heures d'ouverture")}</h2>
          <div className="footer-hours">
            {localizedHours.map((item) => (
              <div key={item.days}>
                <strong>{item.days}</strong>
                <span>{item.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>{translate('© 2026 Cabinet Imane Oulhint. Tous droits réservés.')}</p>
        <nav className="footer-social-links" aria-label={translate('Réseaux sociaux')}>
          <a
            className="footer-social-link"
            href={cabinet.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={translate('Suivre le cabinet Imane Oulhint sur Facebook')}
            title="Facebook"
          >
            <FacebookIcon />
          </a>
          <a
            className="footer-social-link"
            href={cabinet.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={translate('Suivre le cabinet Imane Oulhint sur Instagram')}
            title="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            className="footer-social-link"
            href={cabinet.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={translate('Suivre le cabinet Imane Oulhint sur TikTok')}
            title="TikTok"
          >
            <TikTokIcon />
          </a>
        </nav>
      </div>
    </footer>
  )
}

export function FloatingContact() {
  const { translate } = useLanguage()

  return (
    <a
      className="floating-contact"
      href={getWhatsAppUrl(translate(defaultWhatsAppMessage))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={translate('Contacter le cabinet sur WhatsApp')}
    >
      <img src="/whatsapp-icon.png" alt="" aria-hidden="true" />
    </a>
  )
}
