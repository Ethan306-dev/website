import { useEffect, useState } from 'react'

export type PromoSlide = {
  src: string
  alt: string
  caption?: string
}

type PromoCarouselProps = {
  slides: PromoSlide[]
  label?: string
}

export function PromoCarousel({ slides, label = 'Promotional carousel' }: PromoCarouselProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 5500)
    return () => window.clearInterval(timer)
  }, [slides.length])

  if (slides.length === 0) return null

  const slide = slides[index]

  function go(next: number) {
    const total = slides.length
    setIndex(((next % total) + total) % total)
  }

  return (
    <div className="promo-carousel" role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="promo-carousel-frame">
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className="promo-carousel-image"
        />
      </div>

      {slide.caption ? (
        <p className="promo-carousel-caption">{slide.caption}</p>
      ) : null}

      {slides.length > 1 ? (
        <div className="promo-carousel-controls">
          <button
            type="button"
            className="promo-carousel-nav"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <div className="promo-carousel-dots" role="tablist" aria-label="Slides">
            {slides.map((item, dotIndex) => (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={dotIndex === index}
                aria-label={`Show slide ${dotIndex + 1}`}
                className={`promo-carousel-dot${dotIndex === index ? ' is-active' : ''}`}
                onClick={() => setIndex(dotIndex)}
              />
            ))}
          </div>
          <button
            type="button"
            className="promo-carousel-nav"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      ) : null}
    </div>
  )
}
