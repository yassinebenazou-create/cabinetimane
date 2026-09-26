import { useEffect, useMemo, useRef, useState } from 'react'
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
  Hand,
  Heart,
  HeartPulse,
  Leaf,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Scale,
  ScanLine,
  ShieldCheck,
  Star,
  TrendingUp,
  Utensils,
  UserRound,
  UsersRound,
  Venus,
} from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import SiteFooter, { FloatingContact } from './components/SiteFooter.jsx'
import services, { serviceCardSlugs } from './data/services.js'
import { cabinet, defaultWhatsAppMessage, getWhatsAppUrl, openingHours } from './data/site.js'
import { useLanguage } from './i18n/language.js'
import { localizeServices } from './i18n/services.ar.js'
import ServiceDetailPage from './pages/ServiceDetailPage.jsx'
import './App.css'

const cardServices = serviceCardSlugs
  .map((slug) => services.find((service) => service.slug === slug))
  .filter(Boolean)

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
  'Obésité, amincissement et manque d’appétit',
  'Diabète, cholestérol et goutte',
  'Grossesse, allaitement, troubles hormonaux et SOPK',
  'Maladies digestives, côlon irritable et Helicobacter pylori',
  'Dénutrition, anémie et anorexie mentale',
  'Bilans TANITA et Oligoscan',
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
    title: 'Repères clairs',
    text: 'Des repères clairs pour mieux comprendre vos besoins nutritionnels.',
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
    detailTitle: 'Premier échange',
    detailText: 'Pour mieux comprendre vos besoins',
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
    text: 'Ajustements et échanges réguliers pour faire évoluer les recommandations avec méthode.',
    detailTitle: 'Un accompagnement continu',
    detailText: 'Selon votre évolution',
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
      'Le cabinet est situé à Agadir Bay, Bloc D, 1er étage, N° 107, Technopole II. Le lien Google Maps du cabinet permet de préparer directement votre itinéraire.',
  },
]

function getFaqStructuredData(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
    })),
  }
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
]

const heroVideos = ['/hero-nutrition-1.mp4', '/hero-nutrition-2.mp4', '/hero-nutrition-3.mp4']

const cabinetStatTargets = {
  patients: 1200,
  steps: 3,
  plans: 100,
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
  const { translate } = useLanguage()

  useEffect(() => {
    document.title = translate(title)
    document.querySelector('meta[name="description"]')?.setAttribute('content', translate(description))
  }, [description, title, translate])

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
  const { translate } = useLanguage()

  return (
    <div className="section-intro">
      <span>{translate(eyebrow)}</span>
      <h2>{translate(title)}</h2>
      <p>{translate(text)}</p>
    </div>
  )
}

function ServicesIntro() {
  const { translate } = useLanguage()
  const title =
    'Des accompagnements adaptés à votre santé, votre objectif et votre quotidien.'

  return (
    <div className="section-intro services-intro">
      <span className="services-eyebrow">{translate('Services')}</span>
      <h2 aria-label={translate(title)}>
        <span className="services-title-line" aria-hidden="true">
          <span>{translate('Des accompagnements adaptés')}</span>
        </span>
        <span className="services-title-line" aria-hidden="true">
          <span>{translate('à votre santé, votre objectif')}</span>
        </span>
        <span className="services-title-line" aria-hidden="true">
          <span>{translate('et votre quotidien.')}</span>
        </span>
      </h2>
      <p>
        {translate(
          'Le cabinet développe des solutions nutritionnelles sur mesure et propose des bilans adaptés aux besoins de chaque personne.',
        )}
      </p>
    </div>
  )
}

function StomachIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.8 2.8v5.1c0 1.8 1 3.3 2.7 4 2.2.9 3.2 3.4 2.3 5.6-1.2 3-4.2 4.8-7.7 4.4-4.5-.5-7.6-3.7-7.6-8.1 0-2.5.7-4.8 2-6.8.6-.9 2-.5 2 .6v3.2c0 1.8 1.1 3.2 2.7 3.7 1.8.6 3.9-.8 3.9-2.8V2.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ServiceCardIcon({ name }) {
  if (name === 'clipboard-apple') {
    return (
      <span className="service-icon-combo service-icon-clipboard">
        <ClipboardList />
        <Apple />
      </span>
    )
  }

  if (name === 'utensils-heart') {
    return (
      <span className="service-icon-combo service-icon-utensils">
        <Utensils />
        <Heart />
      </span>
    )
  }

  if (name === 'hand-scan') {
    return (
      <span className="service-icon-combo service-icon-hand-scan">
        <Hand />
        <ScanLine />
      </span>
    )
  }

  const Icon = {
    'heart-pulse': HeartPulse,
    scale: Scale,
    venus: Venus,
  }[name]

  if (name === 'stomach') {
    return <StomachIcon />
  }

  return Icon ? <Icon aria-hidden="true" /> : <ClipboardList aria-hidden="true" />
}

function ServiceCard({
  cardIcon,
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
  const { translate } = useLanguage()

  return (
    <Link
      className="service-card"
      to={`/services/${slug}`}
      aria-label={`${translate('Découvrir le service')} ${cardTitle}`}
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
        <span className="service-icon" aria-hidden="true">
          <ServiceCardIcon name={cardIcon} />
        </span>
      </div>
      <div className="service-content">
        <h3>{cardTitle}</h3>
        <p>{cardText}</p>
        <span className="service-read-more">
          {translate('Lire plus')}
          <ChevronRight aria-hidden="true" size={17} />
        </span>
      </div>
    </Link>
  )
}

function FaqItem({ faq, index, isOpen, onToggle }) {
  const questionId = `faq-question-${index + 1}`
  const answerId = `faq-answer-${index + 1}`
  const itemRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      itemRef.current?.scrollIntoView({
        behavior: shouldReduceMotion() ? 'auto' : 'smooth',
        block: 'nearest',
      })
    }, 380)

    return () => window.clearTimeout(timer)
  }, [isOpen])

  return (
    <article
      className={`faq-item${isOpen ? ' is-open' : ''}`}
      ref={itemRef}
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

function sendFormToWhatsApp(event, translate) {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  const details = [
    translate('Bonjour, je souhaite prendre rendez-vous au Cabinet Imane Oulhint.'),
    data.get('name') && `${translate('Nom')} : ${data.get('name')}`,
    data.get('phone') && `${translate('Téléphone')} : ${data.get('phone')}`,
    data.get('email') && `${translate('Email')} : ${data.get('email')}`,
    data.get('subject') && `${translate('Sujet')} : ${data.get('subject')}`,
    data.get('message') && `${translate('Message')} : ${data.get('message')}`,
  ].filter(Boolean)

  window.open(getWhatsAppUrl(details.join('\n')), '_blank', 'noopener,noreferrer')
}

function HomePage() {
  const { language, localize, translate } = useLanguage()
  const localizedCardServices = useMemo(
    () => localizeServices(cardServices, language),
    [language],
  )
  const localizedTreatments = useMemo(() => localize(treatments), [localize])
  const localizedWhyChooseReasons = useMemo(() => localize(whyChooseReasons), [localize])
  const localizedProcess = useMemo(() => localize(process), [localize])
  const localizedFaqs = useMemo(() => localize(faqs), [localize])
  const localizedHighlights = useMemo(() => localize(instagramHighlights), [localize])
  const localizedFaqStructuredData = useMemo(
    () => getFaqStructuredData(localizedFaqs),
    [localizedFaqs],
  )
  const [activeHeroVideo, setActiveHeroVideo] = useState(0)
  const [shouldShowServicesImmediately] = useState(shouldRevealImmediately)
  const [shouldShowWhyImmediately] = useState(shouldRevealImmediately)
  const [reduceMotion] = useState(shouldReduceMotion)
  const [shouldShowCabinetStatsImmediately] = useState(shouldRevealImmediately)
  const [areCabinetStatsVisible, setAreCabinetStatsVisible] = useState(
    shouldShowCabinetStatsImmediately,
  )
  const [cabinetStatValues, setCabinetStatValues] = useState(() =>
    shouldShowCabinetStatsImmediately
      ? cabinetStatTargets
      : { patients: 0, steps: 0, plans: 0 },
  )
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
  const aboutSectionRef = useRef(null)
  const cabinetStatsRef = useRef(null)
  const cabinetStatsRanRef = useRef(shouldShowCabinetStatsImmediately)
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
    const stats = cabinetStatsRef.current

    if (!stats || cabinetStatsRanRef.current) {
      return undefined
    }

    let animationFrame = 0
    const duration = 1400
    const delays = { patients: 0, steps: 100, plans: 200 }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || cabinetStatsRanRef.current) {
          return
        }

        cabinetStatsRanRef.current = true
        observer.disconnect()
        setAreCabinetStatsVisible(true)
        const startedAt = performance.now()

        const animate = (now) => {
          const elapsed = now - startedAt
          const getValue = (key) => {
            const progress = Math.min(Math.max((elapsed - delays[key]) / duration, 0), 1)
            const eased = 1 - (1 - progress) ** 3
            return Math.round(cabinetStatTargets[key] * eased)
          }

          setCabinetStatValues({
            patients: getValue('patients'),
            steps: getValue('steps'),
            plans: getValue('plans'),
          })

          if (elapsed < duration + delays.plans) {
            animationFrame = window.requestAnimationFrame(animate)
          } else {
            setCabinetStatValues(cabinetStatTargets)
          }
        }

        animationFrame = window.requestAnimationFrame(animate)
      },
      { threshold: 0.3, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(stats)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

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
    ...localizedCardServices.slice(-visibleServiceCards),
    ...localizedCardServices,
    ...localizedCardServices.slice(0, visibleServiceCards),
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

    if (serviceCarouselIndex >= localizedCardServices.length + visibleServiceCards) {
      resetCarouselPosition(visibleServiceCards)
      return
    }

    if (serviceCarouselIndex < visibleServiceCards) {
      resetCarouselPosition(localizedCardServices.length + visibleServiceCards - 1)
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
              <span>{translate('Nutrition personnalisée')}</span>
              <span>{translate('pour retrouver')}</span>
              <span className="accent-word">{translate('l’équilibre')}</span>
            </h1>
            <p>
              {translate(
                'Imane Oulhint, Diététicienne Nutritionniste, vous accompagne avec des solutions nutritionnelles personnalisées selon vos besoins et votre quotidien.',
              )}
            </p>
            <div className="hero-actions">
              <Link className="primary-button" to="/contact">
                {translate('Prendre rendez-vous')}
                <ChevronRight aria-hidden="true" size={18} />
              </Link>
              <Link className="ghost-button" to="/services">
                {translate('Découvrir les services')}
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
                title="Une approche nutritionnelle claire, attentive et personnalisée."
                text="Chaque consultation s’appuie sur l’écoute, l’analyse de vos besoins et des conseils adaptés à votre situation."
              />
              <div className="trust-row">
                <div>
                  <strong>Imane Oulhint</strong>
                  <span>{translate('Diététicienne Nutritionniste')}</span>
                </div>
                <div>
                  <strong>UM6SS</strong>
                  <span>{translate('Diplômée de l’Université Mohammed VI des Sciences et de la Santé – Casablanca')}</span>
                </div>
                <div>
                  <strong>DU</strong>
                  <span>{translate('International Nutrition Clinique')}</span>
                </div>
              </div>
              <div
                className={`cabinet-stats-row${areCabinetStatsVisible ? ' is-visible' : ''}`}
                aria-label={translate('Chiffres clés du cabinet')}
                ref={cabinetStatsRef}
              >
                <div role="group" aria-label={translate('Plus de 1200 patients accompagnés')}>
                  <strong aria-hidden="true">+{cabinetStatValues.patients}</strong>
                  <span>{translate('patients accompagnés')}</span>
                </div>
                <div role="group" aria-label={translate('3 étapes de suivi')}>
                  <strong aria-hidden="true">{cabinetStatValues.steps}</strong>
                  <span>{translate('étapes de suivi')}</span>
                </div>
                <div role="group" aria-label={translate('100 pour cent de plans personnalisés')}>
                  <strong aria-hidden="true">{cabinetStatValues.plans}%</strong>
                  <span>{translate('plans personnalisés')}</span>
                </div>
              </div>
            </div>
            <video
              className="about-image about-video cabinet-media"
              src="/cabinet-ouverture.mp4"
              aria-label={translate('Vidéo de présentation du Cabinet Imane Oulhint')}
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
                {translate('Découvrir tous les services')}
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
              <span>{translate('Pourquoi nous choisir')}</span>
              <h2>Cabinet Imane Oulhint</h2>
              <p>{translate('Une prise en charge nutritionnelle claire, humaine et pensée pour durer.')}</p>
            </div>

            <div className="why-choice-layout">
              <div className="why-choice-column why-choice-column-left">
                {localizedWhyChooseReasons.slice(0, 3).map((reason, index) => (
                  <WhyChooseItem key={reason.title} index={index} {...reason} />
                ))}
              </div>

              <div className="why-choice-brand" aria-hidden="true">
                <div className="why-choice-brand-mark">
                  <img src="/imane-logo-new.png" alt="" />
                </div>
              </div>

              <div className="why-choice-column why-choice-column-right">
                {localizedWhyChooseReasons.slice(3).map((reason, index) => (
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
                eyebrow="Besoins accompagnés"
                title="Des solutions nutritionnelles adaptées à chaque situation."
                text="Le cabinet développe des recommandations sur mesure selon vos besoins, vos habitudes et les informations communiquées."
              />
              <div className="check-list">
                {localizedTreatments.map((item) => (
                  <span key={item}>
                    <CheckCircle2 aria-hidden="true" size={18} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="feature-panel">
              <ShieldCheck aria-hidden="true" size={34} />
              <h3>{translate('Un cadre rassurant et professionnel')}</h3>
              <p>
                {translate(
                  'Le cabinet privilégie un accompagnement respectueux, confidentiel et fondé sur des objectifs réalistes, en complément du suivi médical lorsque celui-ci est nécessaire.',
                )}
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
            {translate('Mieux manger')}
            <span>{translate('pour mieux vivre')}</span>
          </p>

          <div className="container process-container">
            <header className="process-intro">
              <span className="process-eyebrow">{translate('Consultation')}</span>
              <h2>
                {translate('Votre accompagnement,')}
                <em>{translate('étape par étape.')}</em>
              </h2>
              <p>
                {translate(
                  'Du premier bilan au suivi régulier, chaque rendez-vous s’inscrit dans une démarche claire, personnalisée et durable.',
                )}
              </p>
            </header>

            <div className="process-grid">
              {localizedProcess.map(
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
              {translate('Chaque petit pas compte')}
              <Heart aria-hidden="true" size={18} strokeWidth={1.7} />
            </p>
            <div className="section-route-action">
              <Link className="outline-route-button" to="/consultation">
                {translate('Découvrir la consultation')}
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
              <span className="reviews-eyebrow">{translate('Avis patients')}</span>
              <h2>
                {translate('Leur')} <em>{translate('expérience')}</em> {translate('au cabinet')}
              </h2>
              <p>{translate('Des contenus et témoignages partagés par les patients du cabinet.')}</p>

              <div className="instagram-highlights" role="group" aria-label={translate('Highlights Instagram du cabinet')}>
                <div className="instagram-highlights-track">
                  {[0, 1].map((copyIndex) => (
                    <div
                      className="instagram-highlight-set"
                      aria-hidden={copyIndex === 1 ? true : undefined}
                      key={`highlight-set-${copyIndex}`}
                    >
                      {localizedHighlights.map((highlight, index) => (
                        <a
                          className="instagram-highlight-link"
                          href={highlight.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${translate('Voir le Highlight Instagram')} « ${highlight.title} » ${index + 1}`}
                          tabIndex={copyIndex === 1 ? -1 : undefined}
                          key={`${copyIndex}-${highlight.url}`}
                        >
                          <span className="instagram-highlight-cover">
                            <img
                              src={highlight.image}
                              alt={
                                copyIndex === 0
                                  ? `${translate('Aperçu du Highlight Instagram')} « ${highlight.title} »`
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

              <div className="reviews-trust-row" aria-label={translate('Les engagements du cabinet')}>
                <span>
                  <Leaf aria-hidden="true" />
                  {translate('Des contenus partagés')}
                </span>
                <span>
                  <Heart aria-hidden="true" />
                  {translate('Un accompagnement bienveillant')}
                </span>
                <span>
                  <UsersRound aria-hidden="true" />
                  {translate('Une approche personnalisée')}
                </span>
                <span>
                  <Star aria-hidden="true" />
                  {translate('Une relation de confiance')}
                </span>
              </div>
            </header>

            <p className="reviews-thank-you" aria-hidden="true">
              {translate('Merci')}
              <span>{translate('pour votre confiance')}</span>
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
                {translate('Voir tous les résultats')}
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedFaqStructuredData) }}
          />
          <div className="container faq-grid">
            <div className="section-intro">
              <span>{translate('FAQ')}</span>
              <h2 id="faq-heading">{translate('Questions fréquentes sur votre accompagnement à Agadir')}</h2>
              <p>
                {translate(
                  'Retrouvez les réponses aux questions fréquentes concernant les consultations diététiques, le suivi nutritionnel et les soins proposés au cabinet Imane Oulhint à Agadir.',
                )}
              </p>
            </div>
            <div className="faq-list">
              {localizedFaqs.slice(0, 4).map((faq, index) => (
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
                {translate('Voir toutes les questions')}
                <ChevronRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="booking-section section-pad" id="rendez-vous">
          <div className="container booking-panel">
            <div className="booking-main">
              <header className="booking-heading">
                <span>{translate('Contact')}</span>
                <h2>{translate('Contactez-nous')}</h2>
                <p>
                  {translate(
                    'Une question ou envie de prendre rendez-vous ? Laissez-nous vos coordonnées, nous vous répondrons rapidement.',
                  )}
                </p>
              </header>

              <form className="booking-form" onSubmit={(event) => sendFormToWhatsApp(event, translate)}>
                <label>
                  <span>
                    {translate('Nom')} <b aria-hidden="true">*</b>
                  </span>
                  <span className="booking-field">
                    <UserRound aria-hidden="true" size={21} />
                    <input type="text" name="name" placeholder={translate('Votre nom')} required />
                  </span>
                </label>
                <label>
                  <span>
                    {translate('Email')} <b aria-hidden="true">*</b>
                  </span>
                  <span className="booking-field">
                    <Mail aria-hidden="true" size={21} />
                    <input type="email" name="email" placeholder="votre@email.com" required />
                  </span>
                </label>
                <label>
                  <span>{translate('Sujet')}</span>
                  <span className="booking-field">
                    <FileText aria-hidden="true" size={21} />
                    <input type="text" name="subject" placeholder={translate('Objet de votre demande')} />
                  </span>
                </label>
                <label>
                  <span>
                    {translate('Tél')} <b aria-hidden="true">*</b>
                  </span>
                  <span className="booking-field">
                    <Phone aria-hidden="true" size={21} />
                    <input type="tel" name="phone" placeholder="+212 6XX XX XX XX" required />
                  </span>
                </label>
                <label>
                  <span>
                    {translate('Message')} <b aria-hidden="true">*</b>
                  </span>
                  <span className="booking-field booking-message-field">
                    <MessageSquare aria-hidden="true" size={21} />
                    <textarea
                      name="message"
                      placeholder={translate('Écrivez votre message ici...')}
                      rows="5"
                      required
                    />
                  </span>
                </label>
                <button type="submit" className="primary-button">
                  {translate('Prendre rendez-vous')}
                  <ChevronRight aria-hidden="true" size={18} />
                </button>
              </form>
            </div>

            <aside className="booking-aside" aria-labelledby="booking-contact-title">
              <span className="booking-aside-kicker">{translate('Nos coordonnées')}</span>
              <h2 id="booking-contact-title">{translate('Toujours à votre écoute')}</h2>
              <p>
                {translate(
                  'Le cabinet reste disponible pour répondre à vos questions et vous accompagner dans votre démarche.',
                )}
              </p>

              <div className="booking-contact-list">
                <div>
                  <span className="booking-contact-icon">
                    <Phone aria-hidden="true" size={23} />
                  </span>
                  <span>
                    <strong>{translate('Téléphone')}</strong>
                    <a href={cabinet.phoneHref}>{cabinet.phoneDisplay}</a>
                    <small>{translate('Pour vos questions et prises de rendez-vous')}</small>
                  </span>
                </div>
                <div>
                  <span className="booking-contact-icon">
                    <Mail aria-hidden="true" size={23} />
                  </span>
                  <span>
                    <strong>WhatsApp</strong>
                    <a
                      href={getWhatsAppUrl(translate(defaultWhatsAppMessage))}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {cabinet.whatsappDisplay}
                    </a>
                    <small>{translate('Message direct au cabinet')}</small>
                  </span>
                </div>
                <div>
                  <span className="booking-contact-icon">
                    <MapPin aria-hidden="true" size={23} />
                  </span>
                  <span>
                    <strong>{translate('Adresse')}</strong>
                    <a href={cabinet.mapsUrl} target="_blank" rel="noopener noreferrer">
                      {translate(cabinet.address)}
                    </a>
                    <small>{translate('Consultations sur rendez-vous')}</small>
                  </span>
                </div>
                <div>
                  <span className="booking-contact-icon">
                    <Clock aria-hidden="true" size={23} />
                  </span>
                  <span>
                    <strong>{translate('Horaires')}</strong>
                    <b>{translate('Lun., mer., ven. · 09h–13h / 14h30–18h30')}</b>
                    <small>{translate('Mar., jeu. · 09h–18h30 · Sam. 09h–12h30')}</small>
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
  const { translate } = useLanguage()

  return (
    <section className="inner-page-hero">
      <div className="container inner-page-hero-content">
        <span data-page-reveal>{translate(eyebrow)}</span>
        <h1 data-page-reveal>{translate(title)}</h1>
        <p data-page-reveal>{translate(text)}</p>
      </div>
    </section>
  )
}

function ServicesPage() {
  const pageRef = useRef(null)
  const { language, translate } = useLanguage()
  const localizedCardServices = useMemo(
    () => localizeServices(cardServices, language),
    [language],
  )
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
      <section className="section-pad services-directory" aria-label={translate('Tous les services')}>
        <div className="container services-directory-grid">
          {localizedCardServices.map((service, index) => (
            <ServiceCard key={service.slug} revealIndex={index} pageReveal {...service} />
          ))}
        </div>
      </section>
    </main>
  )
}

function ConsultationPage() {
  const pageRef = useRef(null)
  const { localize, translate } = useLanguage()
  const localizedProcess = useMemo(() => localize(process), [localize])
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
      <section className="process-section section-pad inner-process-section" aria-label={translate('Étapes de la consultation')}>
        <div className="container process-container">
          <div className="process-grid">
            {localizedProcess.map(
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
            {translate('Chaque petit pas compte')}
            <Heart aria-hidden="true" size={18} strokeWidth={1.7} />
          </p>
          <div className="section-route-action" data-page-reveal>
            <Link className="primary-button" to="/contact">
              {translate('Prendre rendez-vous')}
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
  const { localize, translate } = useLanguage()
  const localizedHighlights = useMemo(() => localize(instagramHighlights), [localize])
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
              <span className="reviews-eyebrow">{translate('Sur Instagram')}</span>
              <h2>{translate('Les moments partagés')}</h2>
              <p>{translate('Retrouvez les Highlights du cabinet et ouvrez chaque contenu directement sur Instagram.')}</p>
            </div>
            <div className="instagram-highlights" role="group" aria-label={translate('Highlights Instagram du cabinet')} data-page-reveal>
              <div className="instagram-highlights-track">
                {[0, 1].map((copyIndex) => (
                  <div
                    className="instagram-highlight-set"
                    aria-hidden={copyIndex === 1 ? true : undefined}
                    key={`results-highlight-set-${copyIndex}`}
                  >
                    {localizedHighlights.map((highlight, index) => (
                      <a
                        className="instagram-highlight-link"
                        href={highlight.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${translate('Voir le Highlight Instagram')} « ${highlight.title} » ${index + 1}`}
                        tabIndex={copyIndex === 1 ? -1 : undefined}
                        key={`${copyIndex}-${highlight.url}`}
                      >
                        <span className="instagram-highlight-cover">
                          <img
                            src={highlight.image}
                            alt={copyIndex === 0 ? `${translate('Aperçu du Highlight Instagram')} « ${highlight.title} »` : ''}
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
            <div className="reviews-trust-row" aria-label={translate('Les engagements du cabinet')} data-page-reveal>
              <span><Leaf aria-hidden="true" />{translate('Des contenus partagés')}</span>
              <span><Heart aria-hidden="true" />{translate('Un accompagnement bienveillant')}</span>
              <span><UsersRound aria-hidden="true" />{translate('Une approche personnalisée')}</span>
              <span><Star aria-hidden="true" />{translate('Une relation de confiance')}</span>
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
  const { localize } = useLanguage()
  const localizedFaqs = useMemo(() => localize(faqs), [localize])
  const localizedFaqStructuredData = useMemo(
    () => getFaqStructuredData(localizedFaqs),
    [localizedFaqs],
  )
  useRoutePageReveal(pageRef)

  return (
    <main className="route-page inner-page faq-page" ref={pageRef}>
      <PageSeo
        title="Questions fréquentes | Cabinet Imane Oulhint à Agadir"
        description="Retrouvez les réponses aux questions fréquentes sur les consultations diététiques, le suivi nutritionnel et les soins proposés à Agadir."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedFaqStructuredData) }}
      />
      <InnerPageHeader
        eyebrow="FAQ"
        title="Questions fréquentes sur votre accompagnement à Agadir"
        text="Préparez votre rendez-vous et retrouvez les informations essentielles sur les consultations et les soins du cabinet."
      />
      <section className="faq-section section-pad soft-band faq-page-content">
        <div className="container">
          <div className="faq-list">
            {localizedFaqs.map((faq, index) => (
              <div data-page-reveal key={faq.question}>
                <FaqItem
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function ContactPage() {
  const pageRef = useRef(null)
  const { localize, translate } = useLanguage()
  const localizedHours = useMemo(() => localize(openingHours), [localize])

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

  const whatsappHref = getWhatsAppUrl(translate(defaultWhatsAppMessage))

  return (
    <main className="route-page contact-page" ref={pageRef}>
      <PageSeo
        title="Contact | Cabinet Imane Oulhint - Agadir"
        description="Contactez le Cabinet Imane Oulhint à Agadir pour toute demande d’information ou prise de rendez-vous."
      />

      <section className="contact-hero" aria-labelledby="contact-page-title">
        <div className="container contact-hero-grid">
          <div className="contact-hero-copy" data-contact-reveal>
            <nav className="contact-breadcrumb" aria-label={translate('Fil d’Ariane')}>
              <Link to="/">{translate('Accueil')}</Link>
              <ChevronRight aria-hidden="true" size={16} />
              <span aria-current="page">{translate('Contact')}</span>
            </nav>
            <span className="contact-eyebrow">{translate('Contact')}</span>
            <h1 id="contact-page-title">{translate('Contactez-moi')}</h1>
            <p>
              {translate(
                'Une question ? Un besoin d’information ? Je suis à votre écoute pour vous accompagner et répondre à vos questions.',
              )}
            </p>
          </div>

          <div className="contact-hero-media" data-contact-reveal>
            <img
              src="/images/contact-office.png"
              alt={translate('Bureau d’accueil lumineux du Cabinet Imane Oulhint')}
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="contact-details-section" aria-label={translate('Coordonnées du cabinet')}>
        <div className="container contact-details-grid">
          <article className="contact-info-card" data-contact-reveal>
            <span className="contact-info-icon"><Phone aria-hidden="true" size={24} /></span>
            <div>
              <h2>{translate('Téléphone')}</h2>
              <a href={cabinet.phoneHref}>{cabinet.phoneDisplay}</a>
              <small>{translate('Pour vos questions et prises de rendez-vous')}</small>
            </div>
          </article>

          <article className="contact-info-card" data-contact-reveal>
            <span className="contact-info-icon">
              <img src="/whatsapp-icon.png" alt="" aria-hidden="true" />
            </span>
            <div>
              <h2>WhatsApp</h2>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                {cabinet.whatsappDisplay}
              </a>
              <small>{translate('Message direct au cabinet')}</small>
            </div>
          </article>

          <article className="contact-info-card" data-contact-reveal>
            <span className="contact-info-icon"><MapPin aria-hidden="true" size={24} /></span>
            <div>
              <h2>{translate('Adresse')}</h2>
              <a href={cabinet.mapsUrl} target="_blank" rel="noopener noreferrer">{translate(cabinet.address)}</a>
              <small>{translate('Consultations sur rendez-vous')}</small>
            </div>
          </article>

          <article className="contact-info-card" data-contact-reveal>
            <span className="contact-info-icon"><Clock aria-hidden="true" size={24} /></span>
            <div>
              <h2>{translate('Horaires')}</h2>
              <div className="contact-hours-list">
                {localizedHours.map((item) => (
                  <span key={item.days}><b>{item.days}</b><small>{item.hours}</small></span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="contact-workspace" aria-label={translate('Formulaire et localisation')}>
        <div className="container contact-workspace-grid">
          <section className="contact-form-panel" id="contact-form" data-contact-reveal>
            <header className="contact-section-heading">
              <span>{translate('Votre demande')}</span>
              <h2>{translate('Envoyez-moi un message')}</h2>
              <p>{translate('Remplissez le formulaire ci-dessous et je vous répondrai dans les plus brefs délais.')}</p>
            </header>

            <form className="contact-form" onSubmit={(event) => sendFormToWhatsApp(event, translate)}>
              <label>
                <span>{translate('Nom')} <b aria-hidden="true">*</b></span>
                <span className="contact-field">
                  <UserRound aria-hidden="true" size={20} />
                  <input type="text" name="name" autoComplete="name" placeholder={translate('Votre nom')} required />
                </span>
              </label>
              <label>
                <span>{translate('Email')} <b aria-hidden="true">*</b></span>
                <span className="contact-field">
                  <Mail aria-hidden="true" size={20} />
                  <input type="email" name="email" autoComplete="email" placeholder="votre@email.com" required />
                </span>
              </label>
              <label>
                <span>{translate('Téléphone')} <b aria-hidden="true">*</b></span>
                <span className="contact-field">
                  <Phone aria-hidden="true" size={20} />
                  <input type="tel" name="phone" autoComplete="tel" placeholder={translate('Votre numéro')} required />
                </span>
              </label>
              <label>
                <span>{translate('Sujet')} <b aria-hidden="true">*</b></span>
                <span className="contact-field">
                  <FileText aria-hidden="true" size={20} />
                  <input type="text" name="subject" placeholder={translate('Objet de votre demande')} required />
                </span>
              </label>
              <label className="contact-message-label">
                <span>{translate('Message')} <b aria-hidden="true">*</b></span>
                <span className="contact-field contact-message-field">
                  <MessageSquare aria-hidden="true" size={20} />
                  <textarea name="message" placeholder={translate('Écrivez votre message ici...')} rows="5" required />
                </span>
              </label>
              <button type="submit" className="contact-submit-button">
                <Send aria-hidden="true" size={19} />
                {translate('Envoyer sur WhatsApp')}
              </button>
            </form>
          </section>

          <section className="contact-location-panel" data-contact-reveal>
            <header className="contact-section-heading">
              <span>{translate('Localisation')}</span>
              <h2>{translate('Notre localisation')}</h2>
              <p>{translate('Retrouvez facilement le cabinet à Agadir.')}</p>
            </header>
            <div className="contact-map-frame">
              <iframe
                title={translate('Localisation du Cabinet Imane Oulhint à Agadir')}
                src={cabinet.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="contact-map-brand-marker" aria-hidden="true">
                <img src="/imane-logo-new.png" alt="" />
              </div>
            </div>
            <div className="contact-location-card">
              <span className="contact-info-icon"><MapPin aria-hidden="true" size={23} /></span>
              <div>
                <strong>Cabinet Imane Oulhint</strong>
                <p>{translate(cabinet.address)}</p>
                <a href={cabinet.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {translate('Voir l’itinéraire')}
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
            <span>{translate('Contact direct')}</span>
            <h2>{translate('Une question rapide ?')}</h2>
            <p>{translate('Vous pouvez aussi nous contacter directement via WhatsApp.')}</p>
          </div>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <img src="/whatsapp-icon.png" alt="" aria-hidden="true" />
            {translate('Discuter sur WhatsApp')}
          </a>
        </div>
      </section>

      <section className="contact-trust-section" aria-label={translate('Nos engagements')}>
        <div className="container contact-trust-grid">
          <article data-contact-reveal>
            <CalendarCheck aria-hidden="true" size={30} />
            <div><h2>{translate('Rendez-vous personnalisé')}</h2><p>{translate('Un temps d’échange adapté à vos besoins.')}</p></div>
          </article>
          <article data-contact-reveal>
            <Heart aria-hidden="true" size={30} />
            <div><h2>{translate('Écoute et conseils')}</h2><p>{translate('Une approche attentive et professionnelle.')}</p></div>
          </article>
          <article data-contact-reveal>
            <ShieldCheck aria-hidden="true" size={30} />
            <div><h2>{translate('Confidentialité')}</h2><p>{translate('Vos informations sont traitées avec discrétion.')}</p></div>
          </article>
          <article data-contact-reveal>
            <ClipboardList aria-hidden="true" size={30} />
            <div><h2>{translate('Suivi sur mesure')}</h2><p>{translate('Un accompagnement ajusté à votre évolution.')}</p></div>
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
