import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getProject } from '../content/projects'

export function ProjectPage() {
  const { slug = '' } = useParams()
  const project = getProject(slug)

  useEffect(() => {
    if (!project) return
    document.title = `${project.name} — 306.`
    return () => {
      document.title = '306. — Web, Apps & Software'
    }
  }, [project])

  if (!project) {
    return <Navigate to="/#work" replace />
  }

  return (
    <main className="project-page">
      <section className="project-hero" aria-label={project.name}>
        <div className="project-hero-media" aria-hidden="true">
          <img src={project.image} alt="" />
          <div className="project-hero-shade" />
        </div>

        <div className="project-hero-content">
          <p className="section-label product-hero-label">{project.eyebrow}</p>
          <h1 className="product-brand">{project.name}</h1>
          <p className="product-tagline">{project.tagline}</p>
          <p className="product-summary">{project.summary}</p>
          <div className="cta-row">
            <a className="btn btn-primary" href="#overview">
              Read more
            </a>
            <Link className="btn btn-ghost" to="/#work">
              All projects
            </Link>
          </div>
        </div>
      </section>

      <section className="section product-overview" id="overview">
        <div className="section-inner narrow reveal">
          <p className="section-label">Overview</p>
          <h2 className="section-title">What it is.</h2>
          <div className="prose">
            {project.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section project-preview">
        <div className="section-inner reveal">
          <p className="section-label">Draft</p>
          <h2 className="section-title">Website preview.</h2>
          <figure className="project-preview-frame">
            <img src={project.image} alt={`${project.name} website draft`} />
          </figure>
        </div>
      </section>

      <section className="section product-highlights" id="features">
        <div className="section-inner">
          <div className="reveal">
            <p className="section-label">Highlights</p>
            <h2 className="section-title">What’s on the page.</h2>
          </div>

          <div className="feature-list reveal">
            {project.highlights.map((item, index) => (
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
            <h2 className="section-title">Design direction.</h2>
          </div>

          <div className="detail-list reveal">
            {project.details.map((block) => (
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
            {project.facts.map((fact) => (
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
          <h2 className="section-title">Want something like this?</h2>
          <p className="section-lead">
            306. designs and builds websites with a clear point of view — from
            first draft through launch.
          </p>
          <div className="cta-row" style={{ marginTop: '1.75rem' }}>
            <Link className="btn btn-dark" to="/contact">
              Start a project
            </Link>
            <Link className="btn btn-outline" to="/#work">
              Back to work
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
