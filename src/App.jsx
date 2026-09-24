import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import {
  Apple,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock,
  ExternalLink,
  FileText,
  Heart,
  Leaf,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Star,
  TrendingUp,
  UserRound,
  UsersRound,
} from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import SiteFooter, { FloatingContact } from './components/SiteFooter.jsx'
import services from './data/services.js'
import ServiceDetailPage from './pages/ServiceDetailPage.jsx'
import './App.css'

const instagramHighlights = [
  {
    title: 'Résultats',
    image: '/instagram-highlight-01.jpg',
    url: 'https://www.instagram.com/stories/highlights/18035105875901523/?hl=ar',
  },
  {
    title: 'Témoignages',
    image: '/instagram-highlight-02.jpg',
    url: 'https://www.instagram.com/stories/highlights/18014261108105056/?hl=ar',
  },
  {
    title: 'Résultats',
    image: '/instagram-highlight-03.jpg',
    url: 'https://www.instagram.com/stories/highlights/17942293193603930/?hl=ar',
  },
  {
    title: 'Résultats',
    image: '/instagram-highlight-04.jpg',
    url: 'https://www.instagram.com/stories/highlights/17960852024529661/?hl=ar',
  },
  {
    title: 'Résultats',
    image: '/instagram-highlight-05.jpg',
    url: 'https://www.instagram.com/stories/highlights/17926621049422685/?hl=ar',
  },
  {
    title: 'Quotes',
    image: '/instagram-highlight-06.jpg',
    url: 'https://www.instagram.com/stories/highlights/17897427104563212/?hl=ar',
  },
  {
    title: 'Résultats',
    image: '/instagram-highlight-07.jpg',
    url: 'https://www.instagram.com/stories/highlights/17923731941310702/?hl=ar',
  },
  {
    title: 'Résultats',
    image: '/instagram-highlight-08.jpg',
    url: 'https://www.instagram.com/stories/highlights/17943372475928065/?hl=ar',
  },
  {
    title: 'À la une',
    image: '/instagram-highlight-09.jpg',
    url: 'https://www.instagram.com/stories/highlights/18333175978210127/?hl=ar',
  },
  {
    title: 'À la une',
    image: '/instagram-highlight-10.jpg',
    url: 'https://www.instagram.com/stories/highlights/18035500648788743/?hl=ar',
  },
  {
    title: 'Amincissement',
    image: '/instagram-highlight-11.jpg',
    url: 'https://www.instagram.com/stories/highlights/18085824854131146/?hl=ar',
  },
  {
    title: 'À la une',
    image: '/instagram-highlight-12.jpg',
    url: 'https://www.instagram.com/stories/highlights/17874303045469923/?hl=ar',
  },
  {
    title: 'My patients ❤️',
    image: '/instagram-highlight-13.jpg',
    url: 'https://www.instagram.com/stories/highlights/17939826025951136/?hl=ar',
  },
  {
    title: '⭐️⭐️⭐️⭐️⭐️',
    image: '/instagram-highlight-14.jpg',
    url: 'https://www.instagram.com/stories/highlights/17897079648082806/?hl=ar',
  },
  {
    title: 'À la une',
    image: '/imane-logo-new.png',
    url: 'https://www.instagram.com/stories/highlights/18291986620303194/?hl=ar',
  },
  {
    title: 'À la une',
    image: '/imane-logo-new.png',
    url: 'https://www.instagram.com/stories/highlights/18111509882506675/?hl=ar',
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

const whyChooseReasons = [
  {
    iconImage: '/service-icon-07.png',
    iconAlt: 'Icône stratégie nutritionnelle',
    title: 'Stratégie nutritionnelle',
    text: 'Des conseils clairs, adaptés à votre rythme et à vos objectifs.',
    origin: 'from-left-top',
  },
  {
    iconImage: '/service-icon-06.png',
    iconAlt: 'Icône soutien individuel',
    title: 'Soutien individuel',
    text: 'Un accompagnement personnel, humain et ciblé à chaque étape.',
    origin: 'from-left',
  },
  {
    iconImage: '/service-icon-04.png',
    iconAlt: 'Icône habitudes actives',
    title: 'Habitudes actives',
    text: 'Des repères simples pour bouger mieux et retrouver de l’énergie.',
    origin: 'from-left-bottom',
  },
  {
    iconImage: '/service-icon-09.png',
    iconAlt: 'Icône alimentation saine',
    title: 'Alimentation saine',
    text: 'Un programme durable, équilibré et compatible avec votre quotidien.',
    origin: 'from-right-top',
  },
  {
    iconImage: '/service-icon-07.png',
    iconAlt: 'Icône programme sur mesure',
    title: 'Programme sur mesure',
    text: 'Des ajustements progressifs selon vos bilans et vos préférences.',
    origin: 'from-right',
  },
  {
    iconImage: '/service-icon-04.png',
    iconAlt: 'Icône meilleure santé',
    title: 'Meilleure santé',
    text: 'Une approche calme pour renforcer votre confort et votre confiance.',
    origin: 'from-right-bottom',
  },
]

const process = [
  {
    step: '01',
    icon: CalendarCheck,
    detailIcon: Clock,
    title: 'Bilan initial',
    text: 'Analyse de vos objectifs, habitudes, antécédents, rythme quotidien et mesures de référence.',
    detailTitle: 'Environ 1h',
    detailText: 'Pour mieux vous connaître',
  },
  {
    step: '02',
    icon: ClipboardList,
    detailIcon: Apple,
    title: 'Programme personnalisé',
    text: 'Création d’un plan clair, souple et compatible avec votre culture alimentaire et vos contraintes.',
    detailTitle: 'Des conseils adaptés',
    detailText: 'Simples et réalistes',
  },
  {
    step: '03',
    icon: TrendingUp,
    detailIcon: Heart,
    title: 'Suivi régulier',
    text: 'Ajustements, motivation et contrôle des résultats pour avancer avec méthode et sérénité.',
    detailTitle: 'Un accompagnement continu',
    detailText: 'Pour des résultats durables',
  },
]

const faqs = [
  {
    question: 'Où trouver une diététicienne nutritionniste à Agadir ?',
    answer:
      'Le cabinet Imane Oulhint accueille les personnes à Agadir souhaitant bénéficier d’un accompagnement nutritionnel personnalisé. Le suivi est adapté aux objectifs, aux habitudes alimentaires et aux besoins de chaque personne.',
  },
  {
    question: 'Comment se déroule une consultation diététique à Agadir ?',
    answer:
      'La première consultation permet de faire le point sur vos habitudes alimentaires, votre mode de vie et vos objectifs. Un accompagnement personnalisé peut ensuite être mis en place selon vos besoins et votre évolution.',
  },
  {
    question: 'Le cabinet propose-t-il un accompagnement pour la perte de poids ?',
    answer:
      'Oui. Le cabinet propose un suivi nutritionnel personnalisé pour les personnes souhaitant perdre du poids progressivement, avec des recommandations adaptées à leur situation et à leurs habitudes.',
  },
  {
    question: 'Peut-on consulter pour une prise de poids ?',
    answer:
      'Oui. Un accompagnement nutritionnel peut également être proposé aux personnes souhaitant prendre du poids de manière encadrée et améliorer leur alimentation.',
  },
  {
    question: 'Qu’est-ce qu’un rééquilibrage alimentaire ?',
    answer:
      'Le rééquilibrage alimentaire vise à améliorer progressivement les habitudes alimentaires sans se limiter à un régime temporaire. L’accompagnement est adapté au rythme, aux besoins et aux objectifs de chaque personne.',
  },
  {
    question: 'Le suivi nutritionnel est-il personnalisé ?',
    answer:
      'Oui. Les recommandations sont adaptées à chaque personne en fonction de ses objectifs, de ses habitudes alimentaires, de son mode de vie et de son évolution au cours du suivi.',
  },
  {
    question: 'Le cabinet propose-t-il le drainage lymphatique à Agadir ?',
    answer:
      'Oui. Le drainage lymphatique fait partie des prestations proposées par le cabinet. Il est possible de contacter le cabinet pour obtenir plus d’informations et prendre rendez-vous.',
  },
  {
    question: 'Le cabinet propose-t-il des séances de pressothérapie à Agadir ?',
    answer:
      'Oui. Des séances de pressothérapie sont proposées au cabinet. Contactez directement le cabinet pour obtenir davantage d’informations sur la prestation et les modalités de rendez-vous.',
  },
  {
    question: 'Combien de séances sont nécessaires pour un suivi nutritionnel ?',
    answer:
      'Le nombre de consultations dépend des objectifs et de l’évolution de chaque personne. La fréquence du suivi peut être déterminée après la première consultation.',
  },
  {
    question: 'Faut-il prendre rendez-vous avant de venir au cabinet ?',
    answer:
      'Il est recommandé de prendre rendez-vous à l’avance afin de confirmer la disponibilité du cabinet et l’horaire de votre consultation ou de votre soin.',
  },
  {
    question: 'Comment prendre rendez-vous avec le cabinet Imane Oulhint à Agadir ?',
    answer:
      'Le rendez-vous peut être demandé directement par téléphone ou WhatsApp, en utilisant les coordonnées indiquées sur ce site.',
  },
  {
    question: 'Où se trouve le cabinet Imane Oulhint à Agadir ?',
    answer:
      'Le cabinet est situé à Agadir. Pour connaître son adresse exacte et préparer votre itinéraire, consultez les informations Google Maps du cabinet ou contactez-nous directement.',
  },
]

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
}

const scrollRevealGroups = [
  '.about-section .section-intro > span, .about-section .section-intro > h2, .about-section .section-intro > p',
  '.about-section .trust-row > div',
  '.treatments-section .section-intro > span, .treatments-section .section-intro > h2, .treatments-section .section-intro > p',
  '.treatments-section .check-list > span',
  '.treatments-section .feature-panel',
  '.process-section .process-intro > span, .process-section .process-intro > h2, .process-section .process-intro > p',
  '.process-section .process-signature',
  '.results-section .reviews-heading > span, .results-section .reviews-heading > h2, .results-section .reviews-heading > p',
  '.results-section .reviews-trust-row > span',
  '.results-section .elfsight-reviews-wrap',
  '.faq-section .section-intro > span, .faq-section .section-intro > h2, .faq-section .section-intro > p',
  '.faq-section .faq-list > .faq-item',
  '.booking-section .booking-heading > span, .booking-section .booking-heading > h2, .booking-section .booking-heading > p',
  '.booking-section .booking-form > label, .booking-section .booking-form > button',
  '.booking-section .booking-aside > span, .booking-section .booking-aside > h2, .booking-section .booking-aside > p',
  '.booking-section .booking-contact-list > div',
  '.site-footer .footer-grid > *',
  '.site-footer .footer-bottom',
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

function shouldReduceMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function useRoutePageReveal(pageRef) {
  useEffect(() => {
    const page = pageRef.current
    if (!page) {
      return undefined
    }

    const targets = Array.from(page.querySelectorAll('[data-page-reveal]'))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    targets.forEach((target, index) => {
      target.style.setProperty('--page-reveal-delay', `${(index % 4) * 90}ms`)
    })

    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-page-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('is-page-visible')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.18 },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [pageRef])
}

function getVisibleServiceCards() {
  if (typeof window === 'undefined') {
    return 3
  }

  if (window.innerWidth <= 640) {
    return 1
  }

  if (window.innerWidth <= 920) {
    return 2
  }

  return 3
}

function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const target = document.querySelector(hash)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash, pathname])

  return null
}

function PageSeo({ title, description }) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [description, title])

  return null
}

function SiteLayout() {
  const { pathname } = useLocation()

  return (
    <>
      <Navbar />
      <div className="page-route-shell" key={pathname}>
        <Outlet />
      </div>
      <SiteFooter />
      <FloatingContact />
    </>
  )
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

function ServicesIntro() {
  const title =
    'Des accompagnements adaptés à votre santé, votre objectif et votre quotidien.'

  return (
    <div className="section-intro services-intro">
      <span className="services-eyebrow">Services</span>
      <h2 aria-label={title}>
        <span className="services-title-line" aria-hidden="true">
          <span>Des accompagnements adaptés</span>
        </span>
        <span className="services-title-line" aria-hidden="true">
          <span>à votre santé, votre objectif</span>
        </span>
        <span className="services-title-line" aria-hidden="true">
          <span>et votre quotidien.</span>
        </span>
      </h2>
      <p>
        Le cabinet propose un suivi complet pour améliorer votre alimentation, votre silhouette
        et votre confort de vie.
      </p>
    </div>
  )
}

function ServiceCard({
  iconImage,
  iconAlt,
  image,
  imageFit,
  imageAlt,
  cardTitle,
  cardText,
  slug,
  revealIndex,
  onNavigate,
  pageReveal = false,
}) {
  return (
    <Link
      className="service-card"
      to={`/services/${slug}`}
      aria-label={`Découvrir le service ${cardTitle}`}
      draggable="false"
      onClick={onNavigate}
      data-page-reveal={pageReveal || undefined}
      style={{ '--service-delay': `${Math.max(0, revealIndex) * 95}ms` }}
    >
      <div className="service-media">
        <div className="service-image-frame">
          <img
            className={imageFit === 'contain' ? 'service-image-contain' : undefined}
            src={image}
            alt={imageAlt}
            draggable="false"
            loading="lazy"
            decoding="async"
          />
        </div>
        <span className="service-icon">
          <img
            src={iconImage}
            alt={iconAlt}
            draggable="false"
            loading="lazy"
            decoding="async"
          />
        </span>
      </div>
      <div className="service-content">
        <h3>{cardTitle}</h3>
        <p>{cardText}</p>
        <span className="service-read-more">
          Lire plus
          <ChevronRight aria-hidden="true" size={17} />
        </span>
      </div>
    </Link>
  )
}

function FaqItem({ faq, index, isOpen, onToggle, pageReveal = false }) {
  const questionId = `faq-question-${index + 1}`
  const answerId = `faq-answer-${index + 1}`

  return (
    <article
      className={`faq-item${isOpen ? ' is-open' : ''}`}
      data-page-reveal={pageReveal || undefined}
    >
      <h3>
        <button
          id={questionId}
          className="faq-question"
          type="button"
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={onToggle}
        >
          <span>{faq.question}</span>
          <ChevronDown className="faq-chevron" aria-hidden="true" size={21} />
        </button>
      </h3>
      <div
        id={answerId}
        className="faq-answer"
        role="region"
        aria-labelledby={questionId}
        aria-hidden={!isOpen}
      >
        <div className="faq-answer-inner">
          <p>{faq.answer}</p>
        </div>
      </div>
    </article>
  )
}

function WhyChooseItem({ iconImage, iconAlt, title, text, origin, index }) {
  return (
    <article
      className={`why-choice-item ${origin}`}
      style={{ '--why-delay': `${index * 95}ms` }}
    >
      <span className="why-choice-icon">
        <img src={iconImage} alt={iconAlt} loading="lazy" decoding="async" />
      </span>
      <div>
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
  const [shouldShowWhyImmediately] = useState(shouldRevealImmediately)
  const [reduceMotion] = useState(shouldReduceMotion)
  const [isAboutVisible, setIsAboutVisible] = useState(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window),
  )
  const [areServicesVisible, setAreServicesVisible] = useState(shouldShowServicesImmediately)
  const [isWhyVisible, setIsWhyVisible] = useState(shouldShowWhyImmediately)
  const [isProcessVisible, setIsProcessVisible] = useState(shouldRevealImmediately)
  const [visibleServiceCards, setVisibleServiceCards] = useState(getVisibleServiceCards)
  const [serviceCarouselIndex, setServiceCarouselIndex] = useState(getVisibleServiceCards)
  const [serviceCarouselTransition, setServiceCarouselTransition] = useState(true)
  const [serviceCarouselPaused, setServiceCarouselPaused] = useState(false)
  const [serviceViewportWidth, setServiceViewportWidth] = useState(0)
  const [serviceDragDelta, setServiceDragDelta] = useState(0)
  const [isServiceDragging, setIsServiceDragging] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const [hasStatsStarted, setHasStatsStarted] = useState(shouldSkipStatsAnimation)
  const [statValues, setStatValues] = useState(() =>
    shouldSkipStatsAnimation ? statTargets : initialStats,
  )
  const aboutSectionRef = useRef(null)
  const statsRowRef = useRef(null)
  const servicesSectionRef = useRef(null)
  const whySectionRef = useRef(null)
  const processSectionRef = useRef(null)
  const servicesCarouselViewportRef = useRef(null)
  const serviceDragStartXRef = useRef(0)
  const serviceDidDragRef = useRef(false)
  const serviceCarouselFrameRef = useRef(0)

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

  useEffect(() => {
    const section = whySectionRef.current

    if (!section || isWhyVisible || shouldShowWhyImmediately) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsWhyVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '0px 0px -14% 0px',
        threshold: 0.2,
      },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [isWhyVisible, shouldShowWhyImmediately])

  useEffect(() => {
    const section = processSectionRef.current

    if (!section || isProcessVisible) {
      return undefined
    }

    if (!('IntersectionObserver' in window)) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsProcessVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.16,
      },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [isProcessVisible])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      return undefined
    }

    const revealTargets = []

    scrollRevealGroups.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        element.style.setProperty('--scroll-reveal-delay', `${(index % 4) * 90}ms`)
        revealTargets.push(element)
      })
    })

    revealTargets.forEach((element) => element.classList.add('scroll-reveal-item'))

    const animationEndHandlers = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const element = entry.target
          observer.unobserve(element)
          element.classList.add('is-scroll-visible')

          const handleAnimationEnd = (event) => {
            if (event.target !== element || event.animationName !== 'scroll-reveal-up') {
              return
            }

            element.removeEventListener('animationend', handleAnimationEnd)
            element.classList.remove('scroll-reveal-item', 'is-scroll-visible')
            element.style.removeProperty('--scroll-reveal-delay')
            animationEndHandlers.delete(element)
          }

          animationEndHandlers.set(element, handleAnimationEnd)
          element.addEventListener('animationend', handleAnimationEnd)
        })
      },
      {
        rootMargin: '0px 0px -4% 0px',
        threshold: 0.18,
      },
    )

    revealTargets.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
      animationEndHandlers.forEach((handler, element) => {
        element.removeEventListener('animationend', handler)
      })
      revealTargets.forEach((element) => {
        element.classList.remove('scroll-reveal-item', 'is-scroll-visible')
        element.style.removeProperty('--scroll-reveal-delay')
      })
    }
  }, [])

  useEffect(() => {
    const restoreServiceCarouselTransition = () => {
      window.cancelAnimationFrame(serviceCarouselFrameRef.current)
      serviceCarouselFrameRef.current = window.requestAnimationFrame(() => {
        serviceCarouselFrameRef.current = window.requestAnimationFrame(() => {
          setServiceCarouselTransition(true)
        })
      })
    }

    const updateVisibleCards = () => {
      const nextVisibleCards = getVisibleServiceCards()
      setVisibleServiceCards(nextVisibleCards)
      setServiceCarouselTransition(false)
      setServiceCarouselIndex(nextVisibleCards)
      restoreServiceCarouselTransition()
    }

    updateVisibleCards()
    window.addEventListener('resize', updateVisibleCards)

    return () => {
      window.removeEventListener('resize', updateVisibleCards)
      window.cancelAnimationFrame(serviceCarouselFrameRef.current)
    }
  }, [])

  useEffect(() => {
    const viewport = servicesCarouselViewportRef.current

    if (!viewport) {
      return undefined
    }

    const updateViewportWidth = () => {
      setServiceViewportWidth(viewport.clientWidth)
    }

    updateViewportWidth()

    if (!('ResizeObserver' in window)) {
      window.addEventListener('resize', updateViewportWidth)
      return () => window.removeEventListener('resize', updateViewportWidth)
    }

    const resizeObserver = new ResizeObserver(updateViewportWidth)
    resizeObserver.observe(viewport)

    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    if (reduceMotion || serviceCarouselPaused || isServiceDragging) {
      return undefined
    }

    const autoSlideTimer = window.setInterval(() => {
      setServiceCarouselTransition(true)
      setServiceCarouselIndex((current) => current + 1)
    }, 4000)

    return () => window.clearInterval(autoSlideTimer)
  }, [isServiceDragging, reduceMotion, serviceCarouselPaused])

  const serviceGap = 18
  const serviceSlideWidth =
    serviceViewportWidth > 0
      ? (serviceViewportWidth - serviceGap * (visibleServiceCards - 1)) / visibleServiceCards
      : 0
  const serviceSlideStep = serviceSlideWidth + serviceGap
  const serviceCarouselOffset = serviceCarouselIndex * serviceSlideStep
  const serviceCarouselSlides = [
    ...services.slice(-visibleServiceCards),
    ...services,
    ...services.slice(0, visibleServiceCards),
  ]

  const handleServiceCarouselTransitionEnd = () => {
    const resetCarouselPosition = (nextIndex) => {
      window.cancelAnimationFrame(serviceCarouselFrameRef.current)
      setServiceCarouselTransition(false)
      setServiceCarouselIndex(nextIndex)
      serviceCarouselFrameRef.current = window.requestAnimationFrame(() => {
        serviceCarouselFrameRef.current = window.requestAnimationFrame(() => {
          setServiceCarouselTransition(true)
        })
      })
    }

    if (serviceCarouselIndex >= services.length + visibleServiceCards) {
      resetCarouselPosition(visibleServiceCards)
      return
    }

    if (serviceCarouselIndex < visibleServiceCards) {
      resetCarouselPosition(services.length + visibleServiceCards - 1)
    }
  }

  const handleServicePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    setIsServiceDragging(true)
    setServiceCarouselTransition(false)
    setServiceDragDelta(0)
    serviceDidDragRef.current = false
    serviceDragStartXRef.current = event.clientX
  }

  const handleServicePointerMove = (event) => {
    if (!isServiceDragging) {
      return
    }

    const nextDragDelta = event.clientX - serviceDragStartXRef.current
    if (Math.abs(nextDragDelta) > 8) {
      serviceDidDragRef.current = true
    }
    setServiceDragDelta(nextDragDelta)
  }

  const handleServicePointerEnd = () => {
    if (!isServiceDragging) {
      return
    }

    const dragThreshold = Math.max(44, serviceSlideStep * 0.18)
    setServiceCarouselTransition(!reduceMotion)

    if (serviceDragDelta <= -dragThreshold) {
      setServiceCarouselIndex((current) => current + 1)
    } else if (serviceDragDelta >= dragThreshold) {
      setServiceCarouselIndex((current) => current - 1)
    }

    setServiceDragDelta(0)
    setIsServiceDragging(false)
  }

  return (
      <main className="route-page home-page">
        <PageSeo
          title="Cabinet Imane Oulhint | Diététicienne Nutritionniste à Agadir"
          description="Cabinet Imane Oulhint à Agadir : accompagnement nutritionnel personnalisé, services de bien-être et suivi adapté à vos objectifs."
        />
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
          <div className="hero-content container reveal">
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
              <Link className="primary-button" to="/contact">
                Prendre rendez-vous
                <ChevronRight aria-hidden="true" size={18} />
              </Link>
              <Link className="ghost-button" to="/services">
                Découvrir les services
              </Link>
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
            <ServicesIntro />
            <div
              className="services-carousel"
              onMouseEnter={() => setServiceCarouselPaused(true)}
              onMouseLeave={() => setServiceCarouselPaused(false)}
            >
              <div
                className="services-carousel-viewport"
                ref={servicesCarouselViewportRef}
                onPointerCancel={handleServicePointerEnd}
                onPointerDown={handleServicePointerDown}
                onPointerLeave={handleServicePointerEnd}
                onPointerMove={handleServicePointerMove}
                onPointerUp={handleServicePointerEnd}
              >
                <div
                  className="services-carousel-track"
                  onTransitionEnd={handleServiceCarouselTransitionEnd}
                  style={{
                    gap: `${serviceGap}px`,
                    transform: `translate3d(${-(serviceCarouselOffset - serviceDragDelta)}px, 0, 0)`,
                    transitionDuration:
                      serviceCarouselTransition && !reduceMotion && !isServiceDragging
                        ? '720ms'
                        : '0ms',
                  }}
                >
                  {serviceCarouselSlides.map((service, index) => (
                    <div
                      className="service-carousel-slide"
                      key={`${service.slug}-${index}`}
                      style={{
                        flexBasis:
                          serviceSlideWidth > 0
                            ? `${serviceSlideWidth}px`
                            : `calc((100% - ${serviceGap * (visibleServiceCards - 1)}px) / ${visibleServiceCards})`,
                      }}
                    >
                      <ServiceCard
                        revealIndex={Math.min(
                          visibleServiceCards - 1,
                          Math.max(0, index - visibleServiceCards),
                        )}
                        onNavigate={(event) => {
                          if (serviceDidDragRef.current) {
                            event.preventDefault()
                          }
                        }}
                        {...service}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="section-route-action">
              <Link className="outline-route-button" to="/services">
                Découvrir tous les services
                <ChevronRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section
          className={`why-choice-section section-pad why-choice-reveal${
            isWhyVisible ? ' is-visible' : ''
          }`}
          id="pourquoi-nous-choisir"
          ref={whySectionRef}
        >
          <div className="container">
            <div className="why-choice-heading">
              <span>Pourquoi nous choisir</span>
              <h2>Cabinet Imane Oulhint</h2>
              <p>Une prise en charge nutritionnelle claire, humaine et pensée pour durer.</p>
            </div>

            <div className="why-choice-layout">
              <div className="why-choice-column why-choice-column-left">
                {whyChooseReasons.slice(0, 3).map((reason, index) => (
                  <WhyChooseItem key={reason.title} index={index} {...reason} />
                ))}
              </div>

              <div className="why-choice-brand" aria-hidden="true">
                <div className="why-choice-brand-mark">
                  <img src="/imane-logo-new.png" alt="" />
                </div>
              </div>

              <div className="why-choice-column why-choice-column-right">
                {whyChooseReasons.slice(3).map((reason, index) => (
                  <WhyChooseItem key={reason.title} index={index + 3} {...reason} />
                ))}
              </div>
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

        <section
          className={`process-section section-pad process-reveal${isProcessVisible ? ' is-visible' : ''}`}
          id="consultation"
          ref={processSectionRef}
        >
          <img
            className="process-decor-overlay"
            src="/process-decor-overlay.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
          <p className="process-side-note" aria-hidden="true">
            Mieux manger
            <span>pour mieux vivre</span>
          </p>

          <div className="container process-container">
            <header className="process-intro">
              <span className="process-eyebrow">Consultation</span>
              <h2>
                Votre accompagnement,
                <em>étape par étape.</em>
              </h2>
              <p>
                Du premier bilan au suivi régulier, chaque rendez-vous s’inscrit dans une démarche
                claire, personnalisée et durable.
              </p>
            </header>

            <div className="process-grid">
              {process.map(
                ({ step, icon: Icon, detailIcon: DetailIcon, title, text, detailTitle, detailText }, index) => (
                <article
                  className="process-item"
                  key={step}
                  style={{ '--process-delay': `${index * 130}ms` }}
                >
                  <div className="process-marker">
                    <Icon aria-hidden="true" size={28} strokeWidth={1.8} />
                    <span>{step}</span>
                  </div>
                  <div className="process-content">
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <div className="process-detail">
                      <DetailIcon aria-hidden="true" size={22} strokeWidth={1.8} />
                      <span>
                        <strong>{detailTitle}</strong>
                        <small>{detailText}</small>
                      </span>
                    </div>
                  </div>
                </article>
              ),
              )}
            </div>

            <p className="process-signature">
              Chaque petit pas compte
              <Heart aria-hidden="true" size={18} strokeWidth={1.7} />
            </p>
            <div className="section-route-action">
              <Link className="outline-route-button" to="/consultation">
                Découvrir la consultation
                <ChevronRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="results-section section-pad" id="resultats">
          <img
            className="reviews-leaf-frame"
            src="/reviews-leaf-frame.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />

          <div className="container reviews-shell">
            <header className="reviews-heading">
              <span className="reviews-eyebrow">Avis patients</span>
              <h2>
                Leur <em>expérience</em> au cabinet
              </h2>
              <p>Des témoignages authentiques partagés par nos patients sur Google Maps.</p>

              <div className="instagram-highlights" role="group" aria-label="Highlights Instagram du cabinet">
                <div className="instagram-highlights-track">
                  {[0, 1].map((copyIndex) => (
                    <div
                      className="instagram-highlight-set"
                      aria-hidden={copyIndex === 1 ? true : undefined}
                      key={`highlight-set-${copyIndex}`}
                    >
                      {instagramHighlights.map((highlight, index) => (
                        <a
                          className="instagram-highlight-link"
                          href={highlight.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Voir le Highlight Instagram « ${highlight.title} » ${index + 1}`}
                          tabIndex={copyIndex === 1 ? -1 : undefined}
                          key={`${copyIndex}-${highlight.url}`}
                        >
                          <span className="instagram-highlight-cover">
                            <img
                              src={highlight.image}
                              alt={
                                copyIndex === 0
                                  ? `Aperçu du Highlight Instagram « ${highlight.title} »`
                                  : ''
                              }
                              loading="lazy"
                              decoding="async"
                            />
                            <span className="instagram-highlight-external" aria-hidden="true">
                              <ExternalLink size={11} strokeWidth={2} />
                            </span>
                          </span>
                          <span className="instagram-highlight-title">{highlight.title}</span>
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="reviews-trust-row" aria-label="Les engagements du cabinet">
                <span>
                  <Leaf aria-hidden="true" />
                  Des résultats concrets
                </span>
                <span>
                  <Heart aria-hidden="true" />
                  Un accompagnement bienveillant
                </span>
                <span>
                  <UsersRound aria-hidden="true" />
                  Une approche personnalisée
                </span>
                <span>
                  <Star aria-hidden="true" />
                  Une confiance durable
                </span>
              </div>
            </header>

            <p className="reviews-thank-you" aria-hidden="true">
              Merci
              <span>pour votre confiance</span>
              <Heart />
            </p>

            <div className="elfsight-reviews-wrap">
              <div
                className="elfsight-app-8d2e4218-00b5-4e1e-9e88-708da47c0c9c"
                data-elfsight-app-lazy
              />
            </div>
            <div className="section-route-action">
              <Link className="outline-route-button" to="/resultats-patients">
                Voir tous les résultats
                <ChevronRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="faq-section section-pad soft-band"
          id="faq"
          aria-labelledby="faq-heading"
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
          />
          <div className="container faq-grid">
            <div className="section-intro">
              <span>FAQ</span>
              <h2 id="faq-heading">Questions fréquentes sur votre accompagnement à Agadir</h2>
              <p>
                Retrouvez les réponses aux questions fréquentes concernant les consultations
                diététiques, le suivi nutritionnel et les soins proposés au cabinet Imane Oulhint à
                Agadir.
              </p>
            </div>
            <div className="faq-list">
              {faqs.slice(0, 4).map((faq, index) => (
                <FaqItem
                  faq={faq}
                  index={index}
                  isOpen={openFaqIndex === index}
                  key={faq.question}
                  onToggle={() =>
                    setOpenFaqIndex((currentIndex) => (currentIndex === index ? null : index))
                  }
                />
              ))}
            </div>
            <div className="section-route-action">
              <Link className="outline-route-button" to="/faq">
                Voir toutes les questions
                <ChevronRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="booking-section section-pad" id="rendez-vous">
          <div className="container booking-panel">
            <div className="booking-main">
              <header className="booking-heading">
                <span>Contact</span>
                <h2>Contactez-nous</h2>
                <p>
                  Une question ou envie de prendre rendez-vous ? Laissez-nous vos coordonnées,
                  nous vous répondrons rapidement.
                </p>
              </header>

              <form className="booking-form">
                <label>
                  <span>
                    Nom <b aria-hidden="true">*</b>
                  </span>
                  <span className="booking-field">
                    <UserRound aria-hidden="true" size={21} />
                    <input type="text" name="name" placeholder="Votre nom" required />
                  </span>
                </label>
                <label>
                  <span>
                    Email <b aria-hidden="true">*</b>
                  </span>
                  <span className="booking-field">
                    <Mail aria-hidden="true" size={21} />
                    <input type="email" name="email" placeholder="votre@email.com" required />
                  </span>
                </label>
                <label>
                  <span>Sujet</span>
                  <span className="booking-field">
                    <FileText aria-hidden="true" size={21} />
                    <input type="text" name="subject" placeholder="Objet de votre demande" />
                  </span>
                </label>
                <label>
                  <span>
                    Tél <b aria-hidden="true">*</b>
                  </span>
                  <span className="booking-field">
                    <Phone aria-hidden="true" size={21} />
                    <input type="tel" name="phone" placeholder="+212 6XX XX XX XX" required />
                  </span>
                </label>
                <label>
                  <span>
                    Message <b aria-hidden="true">*</b>
                  </span>
                  <span className="booking-field booking-message-field">
                    <MessageSquare aria-hidden="true" size={21} />
                    <textarea
                      name="message"
                      placeholder="Écrivez votre message ici..."
                      rows="5"
                      required
                    />
                  </span>
                </label>
                <button type="submit" className="primary-button">
                  Prendre rendez-vous
                  <ChevronRight aria-hidden="true" size={18} />
                </button>
              </form>
            </div>

            <aside className="booking-aside" aria-labelledby="booking-contact-title">
              <span className="booking-aside-kicker">Nos coordonnées</span>
              <h2 id="booking-contact-title">Toujours à votre écoute</h2>
              <p>
                Le cabinet reste disponible pour répondre à vos questions et vous accompagner dans
                votre démarche.
              </p>

              <div className="booking-contact-list">
                <div>
                  <span className="booking-contact-icon">
                    <Phone aria-hidden="true" size={23} />
                  </span>
                  <span>
                    <strong>Téléphone</strong>
                    <a href="tel:+212600000000">+212 600 000 000</a>
                    <small>Disponible vendredi et samedi</small>
                  </span>
                </div>
                <div>
                  <span className="booking-contact-icon">
                    <Mail aria-hidden="true" size={23} />
                  </span>
                  <span>
                    <strong>Email</strong>
                    <a href="mailto:contact@cabinet-imane.ma">contact@cabinet-imane.ma</a>
                    <small>Réponse sous 24h</small>
                  </span>
                </div>
                <div>
                  <span className="booking-contact-icon">
                    <MapPin aria-hidden="true" size={23} />
                  </span>
                  <span>
                    <strong>Adresse</strong>
                    <b>Casablanca, Maroc</b>
                    <small>Consultations sur rendez-vous</small>
                  </span>
                </div>
                <div>
                  <span className="booking-contact-icon">
                    <Clock aria-hidden="true" size={23} />
                  </span>
                  <span>
                    <strong>Horaires</strong>
                    <b>Vendredi · 9h - 12h30 / 14h30 - 18h</b>
                    <small>Samedi · 9h - 12h30</small>
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
  )
}

function InnerPageHeader({ eyebrow, title, text }) {
  return (
    <section className="inner-page-hero">
      <div className="container inner-page-hero-content">
        <span data-page-reveal>{eyebrow}</span>
        <h1 data-page-reveal>{title}</h1>
        <p data-page-reveal>{text}</p>
      </div>
    </section>
  )
}

function ServicesPage() {
  const pageRef = useRef(null)
  useRoutePageReveal(pageRef)

  return (
    <main className="route-page inner-page services-page" ref={pageRef}>
      <PageSeo
        title="Services de nutrition et bien-être | Cabinet Imane Oulhint"
        description="Découvrez les services de nutrition, les bilans et les soins de bien-être proposés par le cabinet Imane Oulhint à Agadir."
      />
      <InnerPageHeader
        eyebrow="Services"
        title="Des accompagnements adaptés à chaque parcours"
        text="Nutrition, suivi corporel et soins de bien-être : découvrez les services proposés au cabinet Imane Oulhint à Agadir."
      />
      <section className="section-pad services-directory" aria-label="Tous les services">
        <div className="container services-directory-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} revealIndex={index} pageReveal {...service} />
          ))}
        </div>
      </section>
    </main>
  )
}

function ConsultationPage() {
  const pageRef = useRef(null)
  useRoutePageReveal(pageRef)

  return (
    <main className="route-page inner-page consultation-page" ref={pageRef}>
      <PageSeo
        title="Consultation diététique à Agadir | Cabinet Imane Oulhint"
        description="Découvrez le déroulement d’une consultation diététique personnalisée au cabinet Imane Oulhint à Agadir, du bilan initial au suivi régulier."
      />
      <InnerPageHeader
        eyebrow="Consultation"
        title="Votre accompagnement, étape par étape"
        text="Du premier bilan au suivi régulier, chaque rendez-vous s’inscrit dans une démarche claire, personnalisée et durable."
      />
      <section className="process-section section-pad inner-process-section" aria-label="Étapes de la consultation">
        <div className="container process-container">
          <div className="process-grid">
            {process.map(
              ({ step, icon: Icon, detailIcon: DetailIcon, title, text, detailTitle, detailText }) => (
                <article className="process-item" data-page-reveal key={step}>
                  <div className="process-marker">
                    <Icon aria-hidden="true" size={28} strokeWidth={1.8} />
                    <span>{step}</span>
                  </div>
                  <div className="process-content">
                    <h2>{title}</h2>
                    <p>{text}</p>
                    <div className="process-detail">
                      <DetailIcon aria-hidden="true" size={22} strokeWidth={1.8} />
                      <span>
                        <strong>{detailTitle}</strong>
                        <small>{detailText}</small>
                      </span>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
          <p className="process-signature" data-page-reveal>
            Chaque petit pas compte
            <Heart aria-hidden="true" size={18} strokeWidth={1.7} />
          </p>
          <div className="section-route-action" data-page-reveal>
            <Link className="primary-button" to="/contact">
              Prendre rendez-vous
              <ChevronRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function ResultsPage() {
  const pageRef = useRef(null)
  useRoutePageReveal(pageRef)

  return (
    <main className="route-page inner-page results-page" ref={pageRef}>
      <PageSeo
        title="Résultats patients | Cabinet Imane Oulhint à Agadir"
        description="Découvrez les retours, avis Google et contenus partagés par les patients du cabinet Imane Oulhint à Agadir."
      />
      <InnerPageHeader
        eyebrow="Résultats patients"
        title="Leur expérience au cabinet"
        text="Des témoignages authentiques et des parcours partagés par les patients du cabinet Imane Oulhint."
      />
      <section className="results-section section-pad results-page-content">
        <img
          className="reviews-leaf-frame"
          src="/reviews-leaf-frame.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        <div className="container reviews-shell">
          <header className="reviews-heading">
            <div className="reviews-title-group" data-page-reveal>
              <span className="reviews-eyebrow">Sur Instagram</span>
              <h2>Les moments partagés</h2>
              <p>Retrouvez les Highlights du cabinet et ouvrez chaque contenu directement sur Instagram.</p>
            </div>
            <div className="instagram-highlights" role="group" aria-label="Highlights Instagram du cabinet" data-page-reveal>
              <div className="instagram-highlights-track">
                {[0, 1].map((copyIndex) => (
                  <div
                    className="instagram-highlight-set"
                    aria-hidden={copyIndex === 1 ? true : undefined}
                    key={`results-highlight-set-${copyIndex}`}
                  >
                    {instagramHighlights.map((highlight, index) => (
                      <a
                        className="instagram-highlight-link"
                        href={highlight.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Voir le Highlight Instagram « ${highlight.title} » ${index + 1}`}
                        tabIndex={copyIndex === 1 ? -1 : undefined}
                        key={`${copyIndex}-${highlight.url}`}
                      >
                        <span className="instagram-highlight-cover">
                          <img
                            src={highlight.image}
                            alt={copyIndex === 0 ? `Aperçu du Highlight Instagram « ${highlight.title} »` : ''}
                            loading="lazy"
                            decoding="async"
                          />
                          <span className="instagram-highlight-external" aria-hidden="true">
                            <ExternalLink size={11} strokeWidth={2} />
                          </span>
                        </span>
                        <span className="instagram-highlight-title">{highlight.title}</span>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="reviews-trust-row" aria-label="Les engagements du cabinet" data-page-reveal>
              <span><Leaf aria-hidden="true" />Des résultats concrets</span>
              <span><Heart aria-hidden="true" />Un accompagnement bienveillant</span>
              <span><UsersRound aria-hidden="true" />Une approche personnalisée</span>
              <span><Star aria-hidden="true" />Une confiance durable</span>
            </div>
          </header>
          <div className="elfsight-reviews-wrap" data-page-reveal>
            <div
              className="elfsight-app-8d2e4218-00b5-4e1e-9e88-708da47c0c9c"
              data-elfsight-app-lazy
            />
          </div>
        </div>
      </section>
    </main>
  )
}

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null)
  const pageRef = useRef(null)
  useRoutePageReveal(pageRef)

  return (
    <main className="route-page inner-page faq-page" ref={pageRef}>
      <PageSeo
        title="Questions fréquentes | Cabinet Imane Oulhint à Agadir"
        description="Retrouvez les réponses aux questions fréquentes sur les consultations diététiques, le suivi nutritionnel et les soins proposés à Agadir."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <InnerPageHeader
        eyebrow="FAQ"
        title="Questions fréquentes sur votre accompagnement à Agadir"
        text="Préparez votre rendez-vous et retrouvez les informations essentielles sur les consultations et les soins du cabinet."
      />
      <section className="faq-section section-pad soft-band faq-page-content">
        <div className="container">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <FaqItem
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                pageReveal
                key={faq.question}
                onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function ContactPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const page = pageRef.current
    if (!page) {
      return undefined
    }

    const targets = Array.from(page.querySelectorAll('[data-contact-reveal]'))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    targets.forEach((target, index) => {
      target.style.setProperty('--contact-reveal-delay', `${(index % 4) * 70}ms`)
    })

    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-contact-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('is-contact-visible')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.18 },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  const phoneDisplay = '+212 528 23 49 49'
  const phoneHref = 'tel:+212528234949'
  const whatsappHref = 'https://wa.me/212528234949'
  const address = 'Agadir Bay, Bloc D, 1er étage, N°107, Technopole II, Agadir'
  const mapsHref =
    'https://www.google.com/maps/search/?api=1&query=Cabinet+Imane+Oulhint+Agadir+Bay'

  return (
    <main className="route-page contact-page" ref={pageRef}>
      <PageSeo
        title="Contact | Cabinet Imane Oulhint - Agadir"
        description="Contactez le Cabinet Imane Oulhint à Agadir pour toute demande d’information ou prise de rendez-vous."
      />

      <section className="contact-hero" aria-labelledby="contact-page-title">
        <div className="container contact-hero-grid">
          <div className="contact-hero-copy" data-contact-reveal>
            <nav className="contact-breadcrumb" aria-label="Fil d’Ariane">
              <Link to="/">Accueil</Link>
              <ChevronRight aria-hidden="true" size={16} />
              <span aria-current="page">Contact</span>
            </nav>
            <span className="contact-eyebrow">Contact</span>
            <h1 id="contact-page-title">Contactez-moi</h1>
            <p>
              Une question ? Un besoin d’information ? Je suis à votre écoute pour vous accompagner
              et répondre à vos questions.
            </p>
          </div>

          <div className="contact-hero-media" data-contact-reveal>
            <img
              src="/images/contact-office.png"
              alt="Bureau d’accueil lumineux du Cabinet Imane Oulhint"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="contact-details-section" aria-label="Coordonnées du cabinet">
        <div className="container contact-details-grid">
          <article className="contact-info-card" data-contact-reveal>
            <span className="contact-info-icon"><Phone aria-hidden="true" size={24} /></span>
            <div>
              <h2>Téléphone / WhatsApp</h2>
              <a href={phoneHref}>{phoneDisplay}</a>
              <small>Pour vos questions et prises de rendez-vous</small>
            </div>
          </article>

          <article className="contact-info-card" data-contact-reveal>
            <span className="contact-info-icon"><Mail aria-hidden="true" size={24} /></span>
            <div>
              <h2>Email</h2>
              <a href="#contact-form">Écrire via le formulaire</a>
              <small>Aucune adresse email publique n’est renseignée</small>
            </div>
          </article>

          <article className="contact-info-card" data-contact-reveal>
            <span className="contact-info-icon"><MapPin aria-hidden="true" size={24} /></span>
            <div>
              <h2>Adresse</h2>
              <a href={mapsHref} target="_blank" rel="noopener noreferrer">{address}</a>
              <small>Consultations sur rendez-vous</small>
            </div>
          </article>

          <article className="contact-info-card" data-contact-reveal>
            <span className="contact-info-icon"><Clock aria-hidden="true" size={24} /></span>
            <div>
              <h2>Horaires</h2>
              <p>Lundi - Vendredi</p>
              <small>9h - 12h30 / 14h30 - 18h</small>
              <p>Samedi</p>
              <small>9h - 12h30</small>
            </div>
          </article>
        </div>
      </section>

      <section className="contact-workspace" aria-label="Formulaire et localisation">
        <div className="container contact-workspace-grid">
          <section className="contact-form-panel" id="contact-form" data-contact-reveal>
            <header className="contact-section-heading">
              <span>Votre demande</span>
              <h2>Envoyez-moi un message</h2>
              <p>Remplissez le formulaire ci-dessous et je vous répondrai dans les plus brefs délais.</p>
            </header>

            <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
              <label>
                <span>Nom <b aria-hidden="true">*</b></span>
                <span className="contact-field">
                  <UserRound aria-hidden="true" size={20} />
                  <input type="text" name="name" autoComplete="name" placeholder="Votre nom" required />
                </span>
              </label>
              <label>
                <span>Email <b aria-hidden="true">*</b></span>
                <span className="contact-field">
                  <Mail aria-hidden="true" size={20} />
                  <input type="email" name="email" autoComplete="email" placeholder="votre@email.com" required />
                </span>
              </label>
              <label>
                <span>Téléphone <b aria-hidden="true">*</b></span>
                <span className="contact-field">
                  <Phone aria-hidden="true" size={20} />
                  <input type="tel" name="phone" autoComplete="tel" placeholder="Votre numéro" required />
                </span>
              </label>
              <label>
                <span>Sujet <b aria-hidden="true">*</b></span>
                <span className="contact-field">
                  <FileText aria-hidden="true" size={20} />
                  <input type="text" name="subject" placeholder="Objet de votre demande" required />
                </span>
              </label>
              <label className="contact-message-label">
                <span>Message <b aria-hidden="true">*</b></span>
                <span className="contact-field contact-message-field">
                  <MessageSquare aria-hidden="true" size={20} />
                  <textarea name="message" placeholder="Écrivez votre message ici..." rows="5" required />
                </span>
              </label>
              <button type="submit" className="contact-submit-button">
                <Send aria-hidden="true" size={19} />
                Envoyer le message
              </button>
            </form>
          </section>

          <section className="contact-location-panel" data-contact-reveal>
            <header className="contact-section-heading">
              <span>Localisation</span>
              <h2>Notre localisation</h2>
              <p>Retrouvez facilement le cabinet à Agadir.</p>
            </header>
            <div className="contact-map-frame">
              <iframe
                title="Localisation du Cabinet Imane Oulhint à Agadir"
                src="https://www.google.com/maps?q=Cabinet%20Imane%20Oulhint%20Agadir%20Bay&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="contact-location-card">
              <span className="contact-info-icon"><MapPin aria-hidden="true" size={23} /></span>
              <div>
                <strong>Cabinet Imane Oulhint</strong>
                <p>{address}</p>
                <a href={mapsHref} target="_blank" rel="noopener noreferrer">
                  Voir l’itinéraire
                  <ExternalLink aria-hidden="true" size={15} />
                </a>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="contact-whatsapp-section" data-contact-reveal>
        <div className="container contact-whatsapp-panel">
          <div>
            <span>Contact direct</span>
            <h2>Une question rapide ?</h2>
            <p>Vous pouvez aussi nous contacter directement via WhatsApp.</p>
          </div>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <img src="/whatsapp-icon.png" alt="" aria-hidden="true" />
            Discuter sur WhatsApp
          </a>
        </div>
      </section>

      <section className="contact-trust-section" aria-label="Nos engagements">
        <div className="container contact-trust-grid">
          <article data-contact-reveal>
            <CalendarCheck aria-hidden="true" size={30} />
            <div><h2>Rendez-vous personnalisé</h2><p>Un temps d’échange adapté à vos besoins.</p></div>
          </article>
          <article data-contact-reveal>
            <Heart aria-hidden="true" size={30} />
            <div><h2>Écoute et conseils</h2><p>Une approche attentive et professionnelle.</p></div>
          </article>
          <article data-contact-reveal>
            <ShieldCheck aria-hidden="true" size={30} />
            <div><h2>Confidentialité</h2><p>Vos informations sont traitées avec discrétion.</p></div>
          </article>
          <article data-contact-reveal>
            <ClipboardList aria-hidden="true" size={30} />
            <div><h2>Suivi sur mesure</h2><p>Un accompagnement ajusté à votre évolution.</p></div>
          </article>
        </div>
      </section>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/resultats-patients" element={<ResultsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
