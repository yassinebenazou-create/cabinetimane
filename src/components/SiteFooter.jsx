import { ChevronRight, MapPin, Phone, Send } from 'lucide-react'
import { Link } from 'react-router-dom'

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

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/imane-logo-footer.png" alt="Imane Oulhint, Diététicienne Nutritionniste" />
          <p>
            Que votre objectif soit de retrouver votre équilibre alimentaire, d’améliorer votre
            santé ou d’être accompagnée dans une perte de poids durable, le cabinet vous guide avec
            une approche claire, médicale et personnalisée.
          </p>
          <form className="footer-newsletter" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="footer-newsletter-email">
              Adresse email pour la newsletter
            </label>
            <input id="footer-newsletter-email" type="email" placeholder="Newsletter..." />
            <button type="submit" aria-label="S’inscrire à la newsletter">
              <Send aria-hidden="true" size={24} />
            </button>
          </form>
        </div>

        <div className="footer-column">
          <h2>Liens Utiles</h2>
          <nav className="footer-links" aria-label="Liens utiles">
            <Link to="/">
              <ChevronRight aria-hidden="true" size={18} />
              À propos
            </Link>
            <Link to="/services">
              <ChevronRight aria-hidden="true" size={18} />
              Services
            </Link>
            <Link to="/consultation">
              <ChevronRight aria-hidden="true" size={18} />
              Consultation
            </Link>
            <Link to="/contact">
              <ChevronRight aria-hidden="true" size={18} />
              Contact
            </Link>
          </nav>
        </div>

        <div className="footer-column">
          <h2>Services</h2>
          <div className="footer-services">
            <Link to="/services/perte-de-poids">
              <img src="/service-icon-09.png" alt="" aria-hidden="true" />
              Perte de poids
            </Link>
            <Link to="/services/troubles-des-conduites-alimentaires">
              <img src="/service-icon-06.png" alt="" aria-hidden="true" />
              Troubles des conduites alimentaires
            </Link>
            <Link to="/services/nutrition-maladies-chroniques">
              <img src="/service-icon-07.png" alt="" aria-hidden="true" />
              Nutrition des maladies chroniques
            </Link>
            <Link to="/services/analyse-du-corps">
              <img src="/service-icon-04.png" alt="" aria-hidden="true" />
              Analyse du corps
            </Link>
          </div>
        </div>

        <div className="footer-column footer-contact-column">
          <h2>Contact Infos</h2>
          <div className="footer-contact-list">
            <span>
              <InstagramIcon />
              <a
                href="https://www.instagram.com/cabinet_oulhint/?hl=ar"
                target="_blank"
                rel="noopener noreferrer"
              >
                @cabinet_oulhint
              </a>
            </span>
            <span>
              <Phone aria-hidden="true" size={28} />
              <a href="tel:+212528234949">+212 528 23 49 49</a>
            </span>
            <span>
              <MapPin aria-hidden="true" size={28} />
              <a
                href="https://www.google.com/maps/place/Cabinet+de+di%C3%A9t%C3%A9tique+nutrition+et+amincissement,+IMANE+OULHINT/@30.4023229,-9.5841706,17z/data=!4m6!3m5!1s0xdb3b7de5424372b:0xafdffa32df4af541!8m2!3d30.4023229!4d-9.5863593!16s%2Fg%2F11jyd_nvlj"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agadir Bay, Bloc D, 1er étage, N°107, Technopole II
              </a>
            </span>
          </div>

          <h2 className="footer-hours-title">Heures d'ouverture</h2>
          <div className="footer-hours">
            <div>
              <strong>Lundi - Vendredi</strong>
              <span>9h - 12h30 / 14h30 - 18h</span>
            </div>
            <div>
              <strong>Samedi</strong>
              <span>9h - 12h30</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 Cabinet Imane Oulhint. Tous droits réservés.</p>
        <nav className="footer-social-links" aria-label="Réseaux sociaux">
          <a
            className="footer-social-link"
            href="https://www.facebook.com/p/cabinet_oulhint-100085624656022/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suivre le cabinet Imane Oulhint sur Facebook"
            title="Facebook"
          >
            <FacebookIcon />
          </a>
          <a
            className="footer-social-link"
            href="https://www.instagram.com/cabinet_oulhint/?hl=ar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suivre le cabinet Imane Oulhint sur Instagram"
            title="Instagram"
          >
            <InstagramIcon />
          </a>
        </nav>
      </div>
    </footer>
  )
}

export function FloatingContact() {
  return (
    <a
      className="floating-contact"
      href="https://wa.me/212528234949"
      aria-label="Contacter le cabinet sur WhatsApp"
    >
      <img src="/whatsapp-icon.png" alt="" aria-hidden="true" />
    </a>
  )
}
