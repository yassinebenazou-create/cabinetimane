import { useEffect, useMemo, useRef } from 'react'
import {
  Apple,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Goal,
  HandHeart,
  Heart,
  MessageSquare,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
} from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import services, { serviceAliases } from '../data/services.js'
import { useLanguage } from '../i18n/language.js'
import { localizeService } from '../i18n/services.ar.js'

function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...props }) {
  return (
    <Tag
      className={className}
      data-service-reveal
      style={{ '--detail-delay': `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  )
}

const benefitIcons = {
  apple: Apple,
  clipboard: ClipboardList,
  hand: HandHeart,
  heart: Heart,
  message: MessageSquare,
  search: Search,
  settings: Settings2,
  shield: ShieldCheck,
  sparkles: Sparkles,
  steps: TrendingUp,
  target: Goal,
  trending: TrendingUp,
  users: UsersRound,
}

function BenefitIcon({ name }) {
  const Icon = benefitIcons[name] ?? CheckCircle2
  return <Icon aria-hidden="true" size={29} strokeWidth={1.8} />
}

export default function ServiceDetailPage() {
  const { serviceSlug } = useParams()
  const pageRef = useRef(null)
  const { language, translate } = useLanguage()
  const sourceService = services.find((item) => item.slug === serviceSlug)
  const service = useMemo(
    () => localizeService(sourceService, language),
    [language, sourceService],
  )
  const aliasTarget = serviceAliases[serviceSlug]
  const relatedServices = useMemo(() => {
    if (!service) {
      return []
    }

    return service.relatedSlugs
      .map((slug) => localizeService(services.find((item) => item.slug === slug), language))
      .filter(Boolean)
  }, [language, service])

  useEffect(() => {
    if (!service) {
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [service])

  useEffect(() => {
    if (!service) {
      return undefined
    }

    const previousTitle = document.title
    const description = document.querySelector('meta[name="description"]')
    const previousDescription = description?.getAttribute('content') ?? ''

    document.title = language === 'ar'
      ? `${service.name} في أكادير | عيادة إيمان أولحينت`
      : `${service.name} à Agadir | Cabinet Imane Oulhint`
    description?.setAttribute('content', service.metaDescription)

    return () => {
      document.title = previousTitle
      description?.setAttribute('content', previousDescription)
    }
  }, [language, service])

  useEffect(() => {
    const page = pageRef.current
    if (!page || !service) {
      return undefined
    }

    const elements = [...page.querySelectorAll('[data-service-reveal]')]
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !('IntersectionObserver' in window)) {
      return undefined
    }

    elements.forEach((element) => element.classList.add('service-detail-reveal'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -5% 0px' },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [service])

  if (aliasTarget) {
    return <Navigate to={`/services/${aliasTarget}`} replace />
  }

  if (!service) {
    return <Navigate to="/services" replace />
  }

  return (
      <main className="service-detail-page route-page" ref={pageRef}>
        <section className="service-detail-hero" aria-labelledby="service-detail-title">
          <div
            className="container service-detail-hero-grid service-detail-hero-enter"
            key={service.slug}
          >
            <div className="service-detail-hero-copy">
              <nav className="service-breadcrumb service-hero-enter-meta" aria-label={translate('Fil d’Ariane')}>
                <Link to="/">{translate('Accueil')}</Link>
                <ChevronRight aria-hidden="true" size={15} />
                <Link to="/services">{translate('Services')}</Link>
                <ChevronRight aria-hidden="true" size={15} />
                <span aria-current="page">{service.name}</span>
              </nav>
              <span className="service-detail-eyebrow service-hero-enter-meta">{translate('Service')}</span>
              <h1 className="service-hero-enter-title" id="service-detail-title">{service.name}</h1>
              <p className="service-hero-enter-description">{service.heroIntro}</p>
              <span className="service-hero-enter-cta">
                <Link className="primary-button service-detail-primary" to="/contact">
                  <CalendarCheck aria-hidden="true" size={19} />
                  {translate('Prendre rendez-vous')}
                </Link>
              </span>
            </div>

            <figure className="service-detail-hero-media service-hero-enter-media">
              <img
                className={service.imageFit === 'contain' ? 'is-contain' : undefined}
                src={service.image}
                alt={service.imageAlt}
              />
            </figure>
          </div>
        </section>

        <section className="service-detail-section service-detail-intro-section">
          <div className="container service-detail-narrow">
            <Reveal>
              <span className="service-detail-kicker">{translate('Le service')}</span>
              <h2>{service.introTitle}</h2>
              <p className="service-detail-lead">{service.introduction}</p>
            </Reveal>
          </div>
        </section>

        <section className="service-detail-section service-detail-soft">
          <div className="container service-guidance-grid">
            <Reveal className="service-guidance-card service-audience-card">
              <span className="service-detail-kicker">
                {translate(service.audienceTitle ? 'Informations du bilan' : 'À qui s’adresse ce service ?')}
              </span>
              <h2>{service.audienceTitle ?? translate('Pour qui ?')}</h2>
              <div className="service-audience-list">
                {service.audience.map((item) => (
                  <div className="service-audience-row" key={item}>
                    <CheckCircle2 aria-hidden="true" size={21} />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="service-guidance-card service-process-card" delay={90}>
              <span className="service-detail-kicker">{translate('Votre parcours')}</span>
              <h2>{translate('Comment se déroule l’accompagnement ?')}</h2>
              <div className="service-process-list">
                {service.steps.map((step, index) => (
                  <article className="service-process-step" key={step.title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="service-detail-section service-key-points-section">
          <div className="container">
            <Reveal className="service-detail-heading service-key-points-heading">
              <span className="service-detail-kicker">{translate('L’essentiel')}</span>
              <h2>{translate('Les points clés')}</h2>
            </Reveal>
            <div className="service-key-points-grid">
              {service.benefits.map((benefit, index) => (
                <Reveal
                  as="article"
                  className="service-key-point"
                  delay={index * 80}
                  key={benefit.title}
                >
                  <BenefitIcon name={benefit.icon} />
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="service-detail-appointment">
          <Reveal className="container service-detail-appointment-inner">
            <div>
              <span className="service-detail-kicker">{translate('Votre prochain pas')}</span>
              <h2>{translate('Besoin d’un accompagnement personnalisé ?')}</h2>
              <p>{translate('Contactez le cabinet Imane Oulhint pour demander votre rendez-vous à Agadir.')}</p>
            </div>
            <Link className="service-detail-cta-button" to="/contact">
              <CalendarCheck aria-hidden="true" size={20} />
              {translate('Prendre rendez-vous')}
            </Link>
          </Reveal>
        </section>

        <section className="service-detail-section service-related-section">
          <div className="container">
            <Reveal className="service-detail-heading">
              <span className="service-detail-kicker">{translate('Nos services')}</span>
              <h2>{translate('Découvrir aussi')}</h2>
            </Reveal>
            <div className="service-related-grid">
              {relatedServices.map((related, index) => (
                <Reveal delay={index * 90} key={related.slug}>
                  <Link className="service-related-card" to={`/services/${related.slug}`}>
                    <span className="service-related-image">
                      <img
                        className={related.imageFit === 'contain' ? 'is-contain' : undefined}
                        src={related.image}
                        alt={related.imageAlt}
                        loading="lazy"
                      />
                    </span>
                    <span className="service-related-copy">
                      <strong>{related.name}</strong>
                      <small>{related.cardText}</small>
                      <span>
                        {translate('Lire plus')}
                        <ChevronRight aria-hidden="true" size={17} />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
  )
}
