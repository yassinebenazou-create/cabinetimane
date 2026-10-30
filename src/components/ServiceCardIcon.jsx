import {
  Apple,
  ClipboardList,
  Hand,
  Heart,
  HeartPulse,
  Scale,
  ScanLine,
  Utensils,
  Venus,
  Video,
} from 'lucide-react'

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

export default function ServiceCardIcon({ name, image }) {
  if (name === 'amincissement') {
    return <img src={image ?? '/service-icon-amincissement.png'} alt="" draggable="false" />
  }

  if (name === 'apple-measuring-tape') {
    return <img src={image ?? '/service-icon-gestion-poids.png'} alt="" draggable="false" />
  }

  if (!name && image) {
    return <img src={image} alt="" draggable="false" />
  }

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
    video: Video,
  }[name]

  if (name === 'stomach') {
    return <StomachIcon />
  }

  return Icon ? <Icon aria-hidden="true" /> : <ClipboardList aria-hidden="true" />
}
