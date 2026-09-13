import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { PromoCarousel } from '../components/PromoCarousel'
import {
  CONTACT_EMAIL,
  VOLLEYCANVAS_SUPPORT_URL,
  VOLLEYCANVAS_URL,
} from '../constants'
import { volleyCanvasContent as c } from '../content/volleycanvas'

export function VolleyCanvas() {
  useEffect(() => {
    document.title = 'VolleyCanvas — 306.'
    return () => {
      document.title = '306. — Web, Apps & Software'
    }
  }, [])

  return (
    <main className="product-page">
      <section className="product-hero" aria-label="VolleyCanvas">
        <div className="product-hero-visual" aria-hidden="true">
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-a" />
          <div className="work-stage product-hero-stage">
            <div className="work-stage-grid" />
            <img
              className="work-app-icon"
              src="/brand/volleycanvas.png"
              alt=""
              width={240}
              height={240}
            />
          </div>
        </div>

        <div className="product-hero-content">
          <img
            className="product-icon"
            src="/brand/volleycanvas.png"
            alt=""
            width={72}
            height={72}
          />
          <p className="section-label product-hero-label">{c.eyebrow}</p>
          <h1 className="product-brand">{c.name}</h1>
          <p className="product-tagline">{c.tagline}</p>
          <p className="product-summary">{c.summary}</p>
          <div className="cta-row">
            <a
              className="btn btn-primary"
              href={VOLLEYCANVAS_URL}
              target="_blank"
              rel="noreferrer"
            >
              View on the App Store
            </a>
            <Link className="btn btn-ghost" to="/work/volleycanvas/drills">
              Drill Library
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
          <h2 className="section-title">VolleyCanvas in focus.</h2>
          <p className="section-lead">
            Promotional frames for availability, rotations, and live match
            stats.
          </p>
          <PromoCarousel
            slides={c.promo}
            label="VolleyCanvas promotional carousel"
          />
        </div>
      </section>

      <section className="section product-highlights" id="features">
        <div className="section-inner">
          <div className="reveal">
            <p className="section-label">Features</p>
            <h2 className="section-title">What coaches get.</h2>
            <p className="section-lead">
              From animated drills and ball paths to lineups, rotations, and
              match stats — everything built for coaching on a digital court.
            </p>
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
            <h2 className="section-title">More about the product.</h2>
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

      {c.notes.length > 0 && (
        <section className="section product-notes" id="notes">
          <div className="section-inner narrow reveal">
            <p className="section-label">Notes</p>
            <div className="prose">
              {c.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section support-section" id="support">
        <div className="section-inner reveal">
          <p className="section-label">Support & privacy</p>
          <h2 className="section-title">Policies and help.</h2>
          <p className="section-lead">
            VolleyCanvas is designed to work offline. It does not require an
            account, does not use analytics, and does not send your rosters,
            drills, or settings to the developer.
          </p>

          <div className="support-list">
            <article className="support-item">
              <h3>Privacy notice</h3>
              <p>
                Read how VolleyCanvas stores information on your device, what
                happens when you import or export files, and how to delete your
                data.
              </p>
              <a
                className="btn btn-dark"
                href={VOLLEYCANVAS_SUPPORT_URL}
                target="_blank"
                rel="noreferrer"
              >
                Open privacy notice
              </a>
            </article>
            <article className="support-item">
              <h3>Terms & conditions</h3>
              <p>
                Review the terms for using VolleyCanvas, including licence,
                acceptable use, training safety, and limitation of liability.
              </p>
              <a
                className="btn btn-outline"
                href={VOLLEYCANVAS_SUPPORT_URL}
                target="_blank"
                rel="noreferrer"
              >
                Open terms
              </a>
            </article>
            <article className="support-item">
              <h3>Contact support</h3>
              <p>
                For privacy, terms, or app support questions, email 306. and
                include VolleyCanvas in the subject.
              </p>
              <a className="btn btn-outline" href={`mailto:${CONTACT_EMAIL}?subject=VolleyCanvas%20support`}>
                Email {CONTACT_EMAIL}
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="section product-cta">
        <div className="section-inner reveal">
          <p className="section-label">Get the app</p>
          <h2 className="section-title">Available on the App Store.</h2>
          <p className="section-lead">
            Free on iPhone and iPad — create drills, animate plays, and coach
            with a clearer court.
          </p>
          <div className="cta-row" style={{ marginTop: '1.75rem' }}>
            <a
              className="btn btn-dark"
              href={VOLLEYCANVAS_URL}
              target="_blank"
              rel="noreferrer"
            >
              Open App Store
            </a>
            <Link className="btn btn-outline" to="/work/volleycanvas/drills">
              Browse drills
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
