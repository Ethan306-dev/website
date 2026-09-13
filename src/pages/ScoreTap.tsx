import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { PromoCarousel } from '../components/PromoCarousel'
import { scoreTapContent as c } from '../content/scoretap'

export function ScoreTap() {
  useEffect(() => {
    document.title = 'ScoreTap — 306.'
    return () => {
      document.title = '306. — Web, Apps & Software'
    }
  }, [])

  return (
    <main className="product-page scoretap-page">
      <section className="product-hero scoretap-hero" aria-label="ScoreTap">
        <div className="product-hero-visual scoretap-hero-visual" aria-hidden="true">
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-a" />
          <div className="work-stage product-hero-stage">
            <div className="work-stage-grid" />
            <img
              className="work-app-icon"
              src="/brand/scoretap.png"
              alt=""
              width={240}
              height={240}
            />
          </div>
        </div>

        <div className="product-hero-content">
          <p className="spotlight-badge">Spotlight app</p>
          <img
            className="product-icon"
            src="/brand/scoretap.png"
            alt=""
            width={72}
            height={72}
          />
          <p className="section-label product-hero-label">{c.eyebrow}</p>
          <h1 className="product-brand">{c.name}</h1>
          <p className="product-tagline">{c.tagline}</p>
          <p className="product-summary">{c.summary}</p>
          <div className="cta-row">
            <a className="btn btn-primary" href="#promo">
              See the look
            </a>
            <Link className="btn btn-ghost" to="/#work">
              All work
            </Link>
          </div>
        </div>
      </section>

      <section className="section product-overview" id="overview">
        <div className="section-inner narrow reveal">
          <p className="section-label">Overview</p>
          <h2 className="section-title">What it is.</h2>
          <div className="prose">
            {c.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section promo-section" id="promo">
        <div className="section-inner reveal">
          <p className="section-label">Promo</p>
          <h2 className="section-title">ScoreTap in motion.</h2>
          <PromoCarousel slides={c.promo} label="ScoreTap promotional carousel" />
        </div>
      </section>

      <section className="section product-highlights" id="features">
        <div className="section-inner">
          <div className="reveal">
            <p className="section-label">Features</p>
            <h2 className="section-title">Built for play.</h2>
          </div>
          <div className="feature-list reveal">
            {c.highlights.map((item, index) => (
              <article className="feature-item" key={item.title}>
                <span className="feature-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section product-details" id="details">
        <div className="section-inner">
          <div className="reveal">
            <p className="section-label">In depth</p>
            <h2 className="section-title">More about ScoreTap.</h2>
          </div>
          <div className="detail-list reveal">
            {c.details.map((block) => (
              <article className="detail-item" key={block.heading}>
                <h3>{block.heading}</h3>
                <p>{block.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section product-facts" id="facts">
        <div className="section-inner reveal">
          <p className="section-label">At a glance</p>
          <dl className="facts-grid">
            {c.facts.map((fact) => (
              <div className="fact" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section product-cta">
        <div className="section-inner reveal">
          <p className="section-label">Next</p>
          <h2 className="section-title">More play ahead.</h2>
          <p className="section-lead">
            ScoreTap is the latest app from 306. — built to make scoring fast,
            clear, and ready for any court.
          </p>
          <div className="cta-row" style={{ marginTop: '1.75rem' }}>
            <Link className="btn btn-dark" to="/contact">
              Talk about an app
            </Link>
            <Link className="btn btn-outline" to="/work/volleycanvas">
              See VolleyCanvas
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
