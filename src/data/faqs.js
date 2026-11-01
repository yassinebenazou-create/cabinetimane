export const faqs = [
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
      'Oui, des séances de pressothérapie sont proposées au cabinet. Pour obtenir davantage d’informations sur la prestation et les modalités de prise de rendez-vous, nous vous invitons à contacter directement le cabinet.',
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

export function getFaqStructuredData(items) {
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
