import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { VOLLEYCANVAS_URL } from '../constants'
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
