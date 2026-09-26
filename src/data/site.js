export const cabinet = {
  name: 'Cabinet de Diététique Nutrition et Amincissement',
  professional: 'Imane Oulhint',
  title: 'Diététicienne Nutritionniste',
  phoneDisplay: '05 28 23 49 49',
  phoneHref: 'tel:+212528234949',
  whatsappDisplay: '07 63 49 32 04',
  whatsappNumber: '212763493204',
  address: 'Agadir Bay, Bloc D, 1er étage, N° 107, Technopole II, Agadir',
  mapsUrl: 'https://maps.app.goo.gl/ySn7P1XEkWU57EU27?g_st=iw',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Cabinet+de+di%C3%A9t%C3%A9tique+nutrition+et+amincissement%2C+IMANE+OULHINT%2C+Agadir+80020&output=embed',
  instagramUrl: 'https://www.instagram.com/cabinet_oulhint/?hl=ar',
  facebookUrl: 'https://www.facebook.com/p/cabinet_oulhint-100085624656022/',
  tiktokUrl: 'https://www.tiktok.com/@cabintet_oulhint',
}

export const openingHours = [
  { days: 'Lundi, mercredi, vendredi', hours: '09h00–13h00 / 14h30–18h30' },
  { days: 'Mardi et jeudi', hours: '09h00–18h30' },
  { days: 'Samedi', hours: '09h00–12h30' },
]

export const defaultWhatsAppMessage =
  'Bonjour, je souhaite prendre rendez-vous au Cabinet Imane Oulhint.'

export function getWhatsAppUrl(message = defaultWhatsAppMessage) {
  return `https://wa.me/${cabinet.whatsappNumber}?text=${encodeURIComponent(message)}`
}
