import {
  Award,
  ChevronRight,
  HeartHandshake,
  Leaf,
  ScanLine,
  Scale,
  Sparkles,
} from 'lucide-react'
import PageSeo from '../components/PageSeo.jsx'
import RouteLink from '../components/RouteLink.jsx'
import { seoPages } from '../data/seoPages.js'
import { useLanguage } from '../i18n/language.js'
import '../styles/AboutPage.css'

const approachItems = [
  {
    icon: Scale,
    title: 'Gestion du poids',
    text: 'Perte de poids, amincissement et prise de poids selon vos besoins.',
  },
  {
    icon: Sparkles,
    title: 'Amincissement',
    text: 'Un accompagnement ciblé pour les zones du corps qui vous dérangent.',
  },
  {
    icon: Leaf,
    title: 'Équilibre alimentaire',
    text: 'Rééquilibrage alimentaire et accompagnement adapté à vos objectifs de santé.',
  },
  {
    icon: ScanLine,
    title: 'Bilan OligoScan',
    text: 'Un bilan proposé pour compléter votre accompagnement selon vos besoins.',
  },
]

export default function AboutPage() {
  const { translate } = useLanguage()

  return (
    <main className="route-page inner-page about-page">
      <PageSeo
        title={seoPages.about.title}
        description={seoPages.about.description}
        breadcrumbs={[{ name: 'Accueil', path: '/' }, { name: 'À propos', path: '/a-propos' }]}
      />

      <section className="about-hero" aria-labelledby="about-page-title">
        <div className="container about-hero-grid">
          <div className="about-hero-copy">
            <nav className="about-breadcrumb" aria-label={translate('Fil d’Ariane')}>
              <RouteLink to="/">{translate('Accueil')}</RouteLink>
              <ChevronRight aria-hidden="true" size={16} />
              <span aria-current="page">{translate('À propos')}</span>
            </nav>
            <span className="about-eyebrow">
              <Sparkles aria-hidden="true" size={16} />
              {translate('À propos de votre diététicienne')}
            </span>
            <h1 id="about-page-title">{translate('Imane Oulhint')}</h1>
            <p className="about-role">{translate('Diététicienne Nutritionniste')}</p>
            <p className="about-hero-intro">
              {translate(
                'Diplômée de l’Université Mohammed VI des Sciences et de la Santé - Casablanca et titulaire d’un diplôme international en nutrition clinique, j’ai choisi de consacrer mon parcours professionnel à la nutrition, à la santé et au bien-être.',
              )}
            </p>
            <div className="about-hero-actions">
              <RouteLink className="primary-button" to="/contact">
                {translate('Prendre rendez-vous')}
                <ChevronRight aria-hidden="true" size={18} />
              </RouteLink>
              <RouteLink className="outline-route-button" to="/services">
                {translate('Découvrir les services')}
              </RouteLink>
            </div>
          </div>

          <figure className="about-hero-visual">
            <div className="about-hero-image">
              <img
                src="/about-cabinet.png"
                alt={translate('Salle d’attente du Cabinet Oulhint à Agadir, avec son logo et ses sièges.')}
                width="960"
                height="1280"
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <figcaption>
              <span className="about-visual-icon">
                <HeartHandshake aria-hidden="true" size={22} />
              </span>
              <span>
                <strong>{translate('Cabinet Oulhint')}</strong>
                <small>{translate('Un espace accueillant à Agadir')}</small>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="about-credentials" aria-label={translate('Formation et expérience')}>
        <div className="container about-credentials-grid">
          <article>
            <span className="about-credential-icon"><Award aria-hidden="true" size={22} /></span>
            <span>
              <strong>{translate('Université Mohammed VI')}</strong>
              <small>{translate('Des Sciences et de la Santé - Casablanca')}</small>
            </span>
          </article>
          <article>
            <span className="about-credential-icon"><Leaf aria-hidden="true" size={22} /></span>
            <span>
              <strong>{translate('Diplôme international')}</strong>
              <small>{translate('En nutrition clinique')}</small>
            </span>
          </article>
          <article>
            <span className="about-credential-icon"><HeartHandshake aria-hidden="true" size={22} /></span>
            <span>
              <strong>{translate('Depuis 2022')}</strong>
              <small>{translate('Au service de votre bien-être')}</small>
            </span>
          </article>
        </div>
      </section>

      <section className="about-approach section-pad">
        <div className="container about-approach-grid">
          <div className="about-story">
            <span className="about-section-eyebrow">{translate('Mon parcours')}</span>
            <h2>{translate('Un accompagnement fondé sur l’écoute et la confiance')}</h2>
            <p>
              {translate(
                'Depuis 2022, j’exerce au sein de mon cabinet, Cabinet Oulhint à Agadir, où j’accompagne chaque patient avec une approche personnalisée, fondée sur l’écoute, la bienveillance et le professionnalisme.',
              )}
            </p>
            <p>
              {translate(
                'Ma vision de la nutrition va au-delà des régimes alimentaires : je privilégie une approche individualisée et durable, qui tient compte du mode de vie, des besoins et de l’évolution de chaque patient.',
              )}
            </p>
            <div className="about-kindness-note">
              <HeartHandshake aria-hidden="true" size={22} />
              <span>{translate('Une approche personnalisée, bienveillante et professionnelle.')}</span>
            </div>
          </div>

          <div className="about-care">
            <span className="about-section-eyebrow">{translate('Mon accompagnement')}</span>
            <h2>{translate('Une prise en charge adaptée à vos besoins')}</h2>
            <p>
              {translate(
                'Mon activité couvre différents domaines de la prise en charge nutritionnelle, avec un accompagnement adapté aux objectifs de santé de chacun.',
              )}
            </p>
            <div className="about-care-cards">
              {approachItems.map(({ icon: Icon, title, text }) => (
                <article className="about-care-card" key={title}>
                  <span><Icon aria-hidden="true" size={22} /></span>
                  <div>
                    <h3>{translate(title)}</h3>
                    <p>{translate(text)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-purpose">
        <div className="container about-purpose-panel">
          <span className="about-purpose-icon"><Leaf aria-hidden="true" size={25} /></span>
          <div>
            <span className="about-section-eyebrow">{translate('Mon objectif')}</span>
            <h2>
              {translate(
                'Vous accompagner vers un meilleur équilibre alimentaire et vous aider à atteindre vos objectifs tout en préservant votre santé et votre bien-être.',
              )}
            </h2>
            <p>
              {translate(
                'Votre bien-être commence ici ! Bienvenue dans un espace où votre santé, vos besoins et vos objectifs sont au cœur de notre accompagnement.',
              )}
            </p>
          </div>
          <RouteLink className="primary-button" to="/contact">
            {translate('Prendre rendez-vous')}
            <ChevronRight aria-hidden="true" size={18} />
          </RouteLink>
        </div>
      </section>
    </main>
  )
}
