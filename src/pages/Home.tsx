import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../constants'

export function Home() {
  return (
    <main>
      <section className="hero" id="top" aria-label="Introduction">
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-a" />
          <div className="hero-orb hero-orb-b" />
          <div className="hero-court" />
        </div>

        <div className="hero-content">
          <p className="brand">
            306<span>.</span>
          </p>
          <div className="hero-copy">
            <h1>Web, apps, and software — built with intent.</h1>
            <p>
              A solo development studio crafting digital products that feel
              clear, fast, and ready for the real world.
            </p>
            <div className="cta-row">
              <Link className="btn btn-primary" to="/contact">
                Start a project
              </Link>
              <a className="btn btn-ghost" href="#work">
                See the work
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section work" id="work">
        <div className="section-inner">
          <div className="reveal">
            <p className="section-label">Selected work</p>
            <h2 className="section-title">Shipped and on the court.</h2>
            <p className="section-lead">
              Real products built end to end — including VolleyCanvas, a
              volleyball coaching board live on the App Store.
            </p>
          </div>

          <div className="work-feature reveal">
            <div className="work-stage" aria-hidden="true">
              <div className="work-stage-grid" />
              <div className="work-phone">
                <div className="work-phone-bar" />
                <div className="work-phone-screen">
                  <div className="work-phone-title">VolleyCanvas</div>
                  <div className="work-phone-line" />
                  <div className="work-phone-line short" />
                  <div className="work-court-mini">
                    <span className="work-dot" />
                  </div>
                </div>
              </div>
            </div>

            <div className="work-meta">
              <h3>VolleyCanvas</h3>
              <p>
                Create, animate, and share volleyball drills on a digital court
                — player paths, ball trajectories, lineups, rotations, and
                session planning for coaches at every level.
              </p>
              <div className="work-tags">
                <span>iPhone & iPad</span>
                <span>Drill animation</span>
                <span>Lineups & stats</span>
              </div>
              <Link className="btn btn-dark" to="/work/volleycanvas">
                View project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="section-inner">
          <div className="reveal">
            <p className="section-label">Services</p>
            <h2 className="section-title">What 306. builds.</h2>
            <p className="section-lead">
              Focused engagements across the stack — strategy through ship —
              with one person accountable for the result.
            </p>
          </div>

          <div className="services-list reveal">
            <article className="service-item">
              <h3>Web</h3>
              <p>
                Marketing sites, product interfaces, and web apps with
                performance, accessibility, and a point of view.
              </p>
            </article>
            <article className="service-item">
              <h3>Apps</h3>
              <p>
                Native and cross-platform mobile products — from first prototype
                to App Store release and iteration.
              </p>
            </article>
            <article className="service-item">
              <h3>Software</h3>
              <p>
                Custom tools, backends, and systems that stay maintainable as
                the product grows.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section about" id="about">
        <div className="section-inner">
          <div className="reveal">
            <p className="section-label">About</p>
            <h2 className="section-title">One studio. One builder.</h2>
          </div>

          <div className="about-grid reveal">
            <div className="about-copy">
              <p>
                306. is the development practice of Ethan Weeks — a solo studio
                focused on shipping thoughtful software without the overhead of
                a large agency.
              </p>
              <p>
                Every project gets direct attention: clear communication, sharp
                execution, and products that feel considered from the first tap
                to the last release.
              </p>
              <p style={{ marginTop: '1.5rem' }}>
                <Link className="text-link light" to="/about">
                  More about 306. →
                </Link>
              </p>
            </div>
            <dl className="about-aside">
              <dt>Founder</dt>
              <dd>Ethan Weeks</dd>
              <dt>Focus</dt>
              <dd>Web · Apps · Software</dd>
              <dt>Studio</dt>
              <dd>306.</dd>
            </dl>
          </div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="section-inner">
          <div className="reveal">
            <p className="section-label">Contact</p>
            <h2 className="section-title">Have something to build?</h2>
            <p className="section-lead">
              Tell me about the product, the timeline, and what success looks
              like. I’ll get back to you soon.
            </p>
          </div>

          <div className="contact-panel reveal">
            <div>
              <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              <p className="contact-note" style={{ marginTop: '1rem' }}>
                Prefer a quick note? Email works best — include links, sketches,
                or a short brief if you have them.
              </p>
            </div>
            <Link className="btn btn-primary" to="/contact">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
