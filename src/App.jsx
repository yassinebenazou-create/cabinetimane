import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import {
  Apple,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  HeartPulse,
  Mail,
  MapPin,
  Quote,
  Salad,
  Scale,
  ShieldCheck,
  Stethoscope,
  Utensils,
} from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import './App.css'

const services = [
  {
    icon: Scale,
    image: '/service-reequilibrage-alimentaire.jpg',
    imageAlt: 'Assiette équilibrée avec légumes frais pour un rééquilibrage alimentaire',
    title: 'Rééquilibrage alimentaire',
    text: 'Des programmes réalistes pour retrouver une alimentation structurée, durable et adaptée à votre rythme de vie.',
  },
  {
    icon: HeartPulse,
    image: '/service-nutrition-clinique.jpg',
    imageAlt: 'Consultation de nutrition clinique avec plan alimentaire personnalisé',
    title: 'Nutrition clinique',
    text: 'Un accompagnement nutritionnel en lien avec le diabète, les troubles digestifs, le cholestérol ou les besoins spécifiques.',
  },
  {
    icon: Salad,
    image: '/service-amincissement-medical.jpg',
    imageAlt: 'Suivi d’amincissement médical avec mesure corporelle et alimentation saine',
    title: 'Amincissement médical',
    text: 'Un suivi progressif centré sur la composition corporelle, les habitudes alimentaires et la stabilité des résultats.',
  },
  {
    icon: Apple,
    image: '/service-femme-famille.jpg',
    imageAlt: 'Famille partageant un repas sain dans un accompagnement nutritionnel',
    title: 'Nutrition femme et famille',
    text: 'Des conseils adaptés à la grossesse, l’allaitement, l’enfant, l’adolescent et les transitions importantes.',
  },
]

const treatments = [
  'Bilan nutritionnel complet',
  'Impédancemétrie et suivi corporel',
  'Plans alimentaires personnalisés',
  'Coaching comportemental',
  'Suivi perte de poids',
  'Accompagnement sport et santé',
]

const process = [
  {
    step: '01',
    title: 'Bilan initial',
    text: 'Analyse de vos objectifs, habitudes, antécédents, rythme quotidien et mesures de référence.',
  },
  {
    step: '02',
    title: 'Programme personnalisé',
    text: 'Création d’un plan clair, souple et compatible avec votre culture alimentaire et vos contraintes.',
  },
  {
    step: '03',
    title: 'Suivi régulier',
    text: 'Ajustements, motivation et contrôle des résultats pour avancer avec méthode et sérénité.',
  },
]

const testimonials = [
  {
    name: 'Salma B.',
    text: 'Un accompagnement très professionnel. J’ai appris à mieux manger sans frustration et les résultats sont restés stables.',
  },
  {
    name: 'Nadia E.',
    text: 'Le suivi est précis, humain et rassurant. Chaque rendez-vous m’a donné des actions simples à appliquer.',
  },
  {
    name: 'Youssef A.',
    text: 'Programme clair, conseils adaptés au travail et au sport. J’ai retrouvé de l’énergie au quotidien.',
  },
]

const faqs = [
  {
    question: 'Combien de temps dure une première consultation ?',
    answer:
      'La première consultation dure généralement 45 à 60 minutes afin de réaliser un bilan complet et de définir vos objectifs.',
  },
  {
    question: 'Le programme est-il strict ?',
    answer:
      'Non. Le plan est personnalisé, progressif et pensé pour rester compatible avec votre vie sociale, vos goûts et votre santé.',
  },
  {
    question: 'Proposez-vous un suivi après le premier rendez-vous ?',
    answer:
      'Oui. Les consultations de suivi permettent d’ajuster le programme, mesurer les progrès et renforcer les habitudes durables.',
  },
]

const heroVideos = ['/hero-nutrition-1.mp4', '/hero-nutrition-2.mp4', '/hero-nutrition-3.mp4']

const initialStats = {
  patients: 0,
  steps: 0,
  plans: 0,
}

const statTargets = {
  patients: 1200,
  steps: 3,
  plans: 100,
}

function shouldSkipCountAnimation() {
  return (
    typeof window !== 'undefined' &&
    (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  )
}

function shouldRevealImmediately() {
  return (
    typeof window !== 'undefined' &&
    (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  )
}

function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const target = document.querySelector(hash)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash, pathname])

  return null
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="section-intro">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}

function ServiceCard({ icon: Icon, image, imageAlt, title, text, index }) {
  return (
    <article className="service-card" style={{ '--service-delay': `${index * 95}ms` }}>
      <div className="service-media">
        <img src={image} alt={imageAlt} loading="lazy" decoding="async" />
        <span className="service-icon">
          <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
        </span>
      </div>
      <div className="service-content">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  )
}

function HomePage() {
  const [activeHeroVideo, setActiveHeroVideo] = useState(0)
  const [shouldSkipStatsAnimation] = useState(shouldSkipCountAnimation)
  const [shouldShowServicesImmediately] = useState(shouldRevealImmediately)
  const [isAboutVisible, setIsAboutVisible] = useState(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window),
  )
  const [areServicesVisible, setAreServicesVisible] = useState(shouldShowServicesImmediately)
  const [hasStatsStarted, setHasStatsStarted] = useState(shouldSkipStatsAnimation)
  const [statValues, setStatValues] = useState(() =>
    shouldSkipStatsAnimation ? statTargets : initialStats,
  )
  const aboutSectionRef = useRef(null)
  const statsRowRef = useRef(null)
  const servicesSectionRef = useRef(null)

  useEffect(() => {
    const switchTimer = window.setInterval(() => {
      setActiveHeroVideo((current) => (current + 1) % heroVideos.length)
    }, 7000)

    return () => window.clearInterval(switchTimer)
  }, [])

  useEffect(() => {
    const section = aboutSectionRef.current

    if (!section || isAboutVisible) {
      return undefined
    }

    if (!('IntersectionObserver' in window)) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.22,
      },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [isAboutVisible])

  useEffect(() => {
    const statsRow = statsRowRef.current

    if (!statsRow || hasStatsStarted || shouldSkipStatsAnimation) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStatsStarted(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.35,
      },
    )

    observer.observe(statsRow)

    return () => observer.disconnect()
  }, [hasStatsStarted, shouldSkipStatsAnimation])

  useEffect(() => {
    if (!hasStatsStarted || shouldSkipStatsAnimation) {
      return undefined
    }

    const duration = 1800
    const startedAt = performance.now()
    let animationFrame = 0

    const easeOutCubic = (progress) => 1 - (1 - progress) ** 3

    const animateStats = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const easedProgress = easeOutCubic(progress)

      setStatValues({
        patients: Math.round(statTargets.patients * easedProgress),
        steps: Math.round(statTargets.steps * easedProgress),
        plans: Math.round(statTargets.plans * easedProgress),
      })

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animateStats)
        return
      }

      setStatValues(statTargets)
    }

    animationFrame = window.requestAnimationFrame(animateStats)

    return () => window.cancelAnimationFrame(animationFrame)
  }, [hasStatsStarted, shouldSkipStatsAnimation])

  useEffect(() => {
    const section = servicesSectionRef.current

    if (!section || areServicesVisible || shouldShowServicesImmediately) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAreServicesVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '0px 0px -14% 0px',
        threshold: 0.18,
      },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [areServicesVisible, shouldShowServicesImmediately])

  return (
    <>
      <Navbar />

      <main>
        <section className="hero-section" id="accueil">
          <div className="hero-video-stack" aria-hidden="true">
            {heroVideos.map((video, index) => (
              <video
                className={index === activeHeroVideo ? 'hero-video active' : 'hero-video'}
                key={video}
                src={video}
                autoPlay
                muted
                loop
                playsInline
                preload={index === 0 ? 'auto' : 'metadata'}
              />
            ))}
          </div>
          <div className="hero-overlay" />
          <div className="hero-content container reveal">
            <span className="hero-kicker">Cabinet de diététique, nutrition et amincissement</span>
            <h1>
              <span>Nutrition personnalisée</span>
              <span>pour retrouver</span>
              <span className="accent-word">l’équilibre</span>
            </h1>
            <p>
              Cabinet Imane Oulhint accompagne adultes, familles et sportifs avec des programmes
              personnalisés, une approche médicale calme et un suivi durable.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#rendez-vous">
                Prendre rendez-vous
                <ChevronRight aria-hidden="true" size={18} />
              </a>
              <a className="ghost-button" href="#services">
                Découvrir les services
              </a>
            </div>
          </div>
        </section>

        <section
          className={`about-section section-pad cabinet-reveal${isAboutVisible ? ' is-visible' : ''}`}
          id="cabinet"
          ref={aboutSectionRef}
        >
          <div className="container about-grid">
            <div className="cabinet-copy">
              <SectionIntro
                eyebrow="Le cabinet"
                title="Une approche nutritionnelle premium, claire et profondément personnalisée."
                text="Chaque consultation s’appuie sur l’écoute, l’analyse clinique et l’éducation nutritionnelle. L’objectif est d’obtenir des résultats mesurables sans régimes extrêmes."
              />
              <div className="trust-row" ref={statsRowRef}>
                <div>
                  <strong>+{statValues.patients}</strong>
                  <span>patients accompagnés</span>
                </div>
                <div>
                  <strong>{statValues.steps}</strong>
                  <span>étapes de suivi</span>
                </div>
                <div>
                  <strong>{statValues.plans}%</strong>
                  <span>plans personnalisés</span>
                </div>
              </div>
            </div>
            <video
              className="about-image about-video cabinet-media"
              src="/cabinet-ouverture.mp4"
              aria-label="Vidéo de présentation du Cabinet Imane Oulhint"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        </section>

        <section
          className={`services-section section-pad soft-band services-reveal${
            areServicesVisible ? ' is-visible' : ''
          }`}
          id="services"
          ref={servicesSectionRef}
        >
          <div className="container">
            <SectionIntro
              eyebrow="Services"
              title="Des accompagnements adaptés à votre santé, votre objectif et votre quotidien."
              text="Le cabinet propose un suivi complet pour améliorer votre alimentation, votre silhouette et votre confort de vie."
            />
            <div className="services-grid">
              {services.map((service, index) => (
                <ServiceCard key={service.title} index={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        <section className="treatments-section section-pad" id="soins">
          <div className="container split-grid">
            <div>
              <SectionIntro
                eyebrow="Traitements"
                title="Un suivi nutritionnel structuré autour de données concrètes."
                text="Les recommandations sont ajustées selon vos bilans, vos préférences alimentaires et votre progression réelle."
              />
              <div className="check-list">
                {treatments.map((item) => (
                  <span key={item}>
                    <CheckCircle2 aria-hidden="true" size={18} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="feature-panel">
              <ShieldCheck aria-hidden="true" size={34} />
              <h3>Un cadre rassurant et professionnel</h3>
              <p>
                Le cabinet privilégie une prise en charge respectueuse, confidentielle et fondée sur
                des objectifs réalistes, avec des conseils faciles à intégrer.
              </p>
            </div>
          </div>
        </section>

        <section className="process-section section-pad soft-band" id="consultation">
          <div className="container">
            <SectionIntro
              eyebrow="Consultation"
              title="Un parcours simple, lisible et motivant."
              text="Chaque étape vous aide à comprendre vos besoins et à transformer vos habitudes avec méthode."
            />
            <div className="process-grid">
              {process.map((item) => (
                <article className="process-item" key={item.step}>
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="results-section section-pad" id="resultats">
          <div className="container results-grid">
            <div>
              <SectionIntro
                eyebrow="Résultats Patients"
                title="Des résultats construits avec patience, écoute et régularité."
                text="Le suivi met l’accent sur la progression durable : mieux manger, mieux comprendre son corps et retrouver confiance."
              />
              <a className="text-link" href="#rendez-vous">
                Commencer mon accompagnement
                <ChevronRight aria-hidden="true" size={17} />
              </a>
            </div>
            <div className="testimonial-stack">
              {testimonials.map((testimonial) => (
                <article className="testimonial-card" key={testimonial.name}>
                  <Quote aria-hidden="true" size={20} />
                  <p>{testimonial.text}</p>
                  <strong>{testimonial.name}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="faq-section section-pad soft-band" id="faq">
          <div className="container faq-grid">
            <SectionIntro
              eyebrow="FAQ"
              title="Les questions fréquentes avant votre rendez-vous."
              text="Quelques réponses pour vous aider à préparer votre première consultation au cabinet."
            />
            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="booking-section section-pad" id="rendez-vous">
          <div className="container booking-grid">
            <div>
              <SectionIntro
                eyebrow="Contact"
                title="Prenez rendez-vous pour un bilan personnalisé."
                text="Un premier échange permet de comprendre votre objectif et de définir le type de suivi le plus adapté."
              />
              <div className="contact-list">
                <span>
                  <MapPin aria-hidden="true" size={19} />
                  Casablanca, Maroc
                </span>
                <span>
                  <Mail aria-hidden="true" size={19} />
                  contact@cabinet-imane.ma
                </span>
                <span>
                  <CalendarCheck aria-hidden="true" size={19} />
                  Consultations sur rendez-vous
                </span>
              </div>
            </div>
            <form className="booking-form">
              <label>
                Nom complet
                <input type="text" name="name" placeholder="Votre nom" />
              </label>
              <label>
                Téléphone
                <input type="tel" name="phone" placeholder="+212 ..." />
              </label>
              <label>
                Objectif principal
                <select name="goal" defaultValue="">
                  <option value="" disabled>
                    Choisir un objectif
                  </option>
                  <option>Perte de poids</option>
                  <option>Nutrition clinique</option>
                  <option>Rééquilibrage alimentaire</option>
                  <option>Suivi familial</option>
                </select>
              </label>
              <button type="submit" className="primary-button">
                Prendre rendez-vous
                <ChevronRight aria-hidden="true" size={18} />
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <img src="/imane-oulhint-logo.png" alt="Logo Cabinet Imane Oulhint" />
            <p>Cabinet de Diététique, Nutrition et Amincissement.</p>
          </div>
          <div>
            <span>
              <Stethoscope aria-hidden="true" size={17} />
              Nutrition clinique
            </span>
            <span>
              <Utensils aria-hidden="true" size={17} />
              Plans alimentaires
            </span>
            <span>
              <ClipboardCheck aria-hidden="true" size={17} />
              Suivi personnalisé
            </span>
          </div>
        </div>
      </footer>

      <a
        className="floating-contact"
        href="https://wa.me/212600000000"
        aria-label="Contacter le cabinet sur WhatsApp"
      >
        <img src="/whatsapp-icon.png" alt="" aria-hidden="true" />
      </a>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
