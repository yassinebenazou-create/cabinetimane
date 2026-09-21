import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import {
  Apple,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
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
import './App.css'

const services = [
  {
    iconImage: '/service-icon-09.png',
    iconAlt: 'Icône perte de poids',
    image: '/service-perte-poids-tanger.png',
    imageAlt: 'Service de perte de poids personnalisé au cabinet de nutrition',
    title: 'Perte de poids Casablanca',
    text: 'Un suivi personnalisé pour perdre du poids durablement.',
  },
  {
    iconImage: '/service-icon-06.png',
    iconAlt: 'Icône troubles alimentaires',
    image: '/service-troubles-conduites.png',
    imageAlt: 'Service pour les troubles des conduites alimentaires',
    title: 'Troubles des conduites alimentaires',
    text: 'Un accompagnement calme pour retrouver l’équilibre.',
  },
  {
    iconImage: '/service-icon-07.png',
    iconAlt: 'Icône nutrition clinique',
    image: '/service-maladies-chroniques.png',
    imageAlt: 'Nutrition adaptée aux maladies chroniques',
    title: 'Nutrition des maladies chroniques',
    text: 'Des conseils adaptés aux besoins médicaux.',
  },
  {
    iconImage: '/service-icon-04.png',
    iconAlt: 'Icône analyse du corps',
    image: '/service-analyse-corps.png',
    imageAlt: 'Analyse du corps et suivi de composition corporelle',
    title: 'Analyse du corps Casablanca',
    text: 'Un bilan corporel précis pour suivre vos progrès.',
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
    title: 'StratÃ©gie nutritionnelle',
    text: 'Des conseils clairs, adaptÃ©s Ã  votre rythme et Ã  vos objectifs.',
    origin: 'from-left-top',
  },
  {
    iconImage: '/service-icon-06.png',
    iconAlt: 'Icône soutien individuel',
    title: 'Soutien individuel',
    text: 'Un accompagnement personnel, humain et ciblÃ© Ã  chaque Ã©tape.',
    origin: 'from-left',
  },
  {
    iconImage: '/service-icon-04.png',
    iconAlt: 'Icône habitudes actives',
    title: 'Habitudes actives',
    text: 'Des repÃ¨res simples pour bouger mieux et retrouver de lâ€™Ã©nergie.',
    origin: 'from-left-bottom',
  },
  {
    iconImage: '/service-icon-09.png',
    iconAlt: 'Icône alimentation saine',
    title: 'Alimentation saine',
    text: 'Un programme durable, Ã©quilibrÃ© et compatible avec votre quotidien.',
    origin: 'from-right-top',
  },
  {
    iconImage: '/service-icon-07.png',
    iconAlt: 'Icône programme sur mesure',
    title: 'Programme sur mesure',
    text: 'Des ajustements progressifs selon vos bilans et vos prÃ©fÃ©rences.',
    origin: 'from-right',
  },
  {
    iconImage: '/service-icon-04.png',
    iconAlt: 'Icône meilleure santé',
    title: 'Meilleure santÃ©',
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

function shouldReduceMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
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

function ServiceCard({ iconImage, iconAlt, image, imageAlt, title, text, index }) {
  return (
    <article className="service-card" style={{ '--service-delay': `${index * 95}ms` }}>
      <div className="service-media">
        <div className="service-image-frame">
          <img src={image} alt={imageAlt} loading="lazy" decoding="async" />
        </div>
        <span className="service-icon">
          <img src={iconImage} alt={iconAlt} loading="lazy" decoding="async" />
        </span>
      </div>
      <div className="service-content">
        <h3>{title}</h3>
        <p>{text}</p>
        <a href="#rendez-vous" className="service-read-more">
          Lire Plus
        </a>
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
    serviceDragStartXRef.current = event.clientX
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const handleServicePointerMove = (event) => {
    if (!isServiceDragging) {
      return
    }

    setServiceDragDelta(event.clientX - serviceDragStartXRef.current)
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
                      key={`${service.title}-${index}`}
                      style={{
                        flexBasis:
                          serviceSlideWidth > 0
                            ? `${serviceSlideWidth}px`
                            : `calc((100% - ${serviceGap * (visibleServiceCards - 1)}px) / ${visibleServiceCards})`,
                      }}
                    >
                      <ServiceCard index={index % services.length} {...service} />
                    </div>
                  ))}
                </div>
              </div>
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
              <p>Une prise en charge nutritionnelle claire, humaine et pensÃ©e pour durer.</p>
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

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img
              src="/imane-logo-footer.png"
              alt="Imane Oulhint, Diététicienne Nutritionniste"
            />
            <p>
              Que votre objectif soit de retrouver votre équilibre alimentaire, d’améliorer votre
              santé ou d’être accompagnée dans une perte de poids durable, le cabinet vous guide
              avec une approche claire, médicale et personnalisée.
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
              <a href="#cabinet">
                <ChevronRight aria-hidden="true" size={18} />
                À propos
              </a>
              <a href="#services">
                <ChevronRight aria-hidden="true" size={18} />
                Services
              </a>
              <a href="#consultation">
                <ChevronRight aria-hidden="true" size={18} />
                Consultation
              </a>
              <a href="#rendez-vous">
                <ChevronRight aria-hidden="true" size={18} />
                Contact
              </a>
            </nav>
          </div>

          <div className="footer-column">
            <h2>Services</h2>
            <div className="footer-services">
              <span>
                <img src="/service-icon-09.png" alt="" aria-hidden="true" />
                Perte de poids Casablanca
              </span>
              <span>
                <img src="/service-icon-06.png" alt="" aria-hidden="true" />
                Troubles des conduites alimentaires
              </span>
              <span>
                <img src="/service-icon-07.png" alt="" aria-hidden="true" />
                Nutrition des maladies chroniques
              </span>
              <span>
                <img src="/service-icon-04.png" alt="" aria-hidden="true" />
                Analyse du corps Casablanca
              </span>
            </div>
          </div>

          <div className="footer-column footer-contact-column">
            <h2>Contact Infos</h2>
            <div className="footer-contact-list">
              <span>
                <Mail aria-hidden="true" size={28} />
                contact@cabinet-imane.ma
              </span>
              <span>
                <Phone aria-hidden="true" size={28} />
                +212 600 000 000
              </span>
              <span>
                <MapPin aria-hidden="true" size={28} />
                Casablanca, Maroc
              </span>
            </div>

            <h2 className="footer-hours-title">Heures d'ouverture</h2>
            <div className="footer-hours">
              <div>
                <strong>Vendredi</strong>
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
          <div>
            <span>
              <img src="/service-icon-09.png" alt="" aria-hidden="true" />
              Perte de poids
            </span>
            <span>
              <img src="/service-icon-07.png" alt="" aria-hidden="true" />
              Nutrition médicale
            </span>
            <span>
              <img src="/service-icon-04.png" alt="" aria-hidden="true" />
              Analyse du corps
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
