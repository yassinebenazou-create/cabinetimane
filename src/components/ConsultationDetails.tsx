import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import './ConsultationDetails.css'

type ConsultationDetailsProps = {
  children: ReactNode
  bookingAction: ReactNode
  openLabel: string
  closeLabel: string
  regionLabel: string
}

export default function ConsultationDetails({
  children,
  bookingAction,
  openLabel,
  closeLabel,
  regionLabel,
}: ConsultationDetailsProps) {
  const [expanded, setExpanded] = useState(false)
  const regionId = useId()
  const regionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!expanded) return

    // Wait for the layout to expand before choosing the scroll destination.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timeout = window.setTimeout(() => {
      regionRef.current?.scrollIntoView({
        behavior: reducedMotion ? 'instant' : 'smooth',
        block: 'start',
      })
    }, reducedMotion ? 0 : 600)

    return () => window.clearTimeout(timeout)
  }, [expanded])

  return (
    <div className="consultation-details">
      <div className="container consultation-details-control">
        {bookingAction}
        <button
          type="button"
          className="outline-route-button consultation-details-toggle"
          aria-expanded={expanded}
          aria-controls={regionId}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? closeLabel : openLabel}
          <ChevronDown aria-hidden="true" size={18} />
        </button>
      </div>
      <div
        ref={regionRef}
        id={regionId}
        role="region"
        aria-label={regionLabel}
        aria-hidden={!expanded}
        inert={!expanded}
        className={`consultation-details-panel${expanded ? ' is-expanded' : ''}`}
      >
        <div className="consultation-details-content">{children}</div>
      </div>
    </div>
  )
}
