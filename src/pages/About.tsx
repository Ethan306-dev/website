import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export function About() {
  useEffect(() => {
    document.title = 'About — 306.'
    return () => {
      document.title = '306. — Web, Apps & Software'
    }
  }, [])

  return (
    <main>
      <section className="page-hero about-page-hero">
        <div className="section-inner reveal">
          <p className="section-label">About</p>
          <h1 className="page-title">
            306<span>.</span>
          </h1>
          <p className="page-lead">
            A solo development studio by Ethan Weeks — building web, apps, and
            software with clarity and care.
          </p>
        </div>
      </section>

      <section className="section about">
        <div className="section-inner">
          <div className="about-grid reveal">
            <div className="about-copy">
              <p>
                306. is a focused practice for shipping digital products. No
                oversized team, no layers of process — just direct collaboration
                from first conversation through release.
              </p>
              <p>
                Work spans marketing sites, mobile apps, and custom software.
                Recent shipped work includes VolleyCanvas, a volleyball coaching
                app on the App Store.
              </p>
              <p>
                If you need something built properly — and want one person
                accountable for the result — that’s what 306. is for.
              </p>
            </div>
            <dl className="about-aside">
              <dt>Founder</dt>
              <dd>Ethan Weeks</dd>
              <dt>Focus</dt>
              <dd>Web · Apps · Software</dd>
              <dt>Product</dt>
              <dd>
                <Link className="text-link light" to="/work/volleycanvas">
                  VolleyCanvas
                </Link>
              </dd>
            </dl>
          </div>
        </div>
      </section>

      <section className="section services">
        <div className="section-inner">
          <div className="reveal">
            <p className="section-label">How it works</p>
            <h2 className="section-title">A simple engagement.</h2>
          </div>
          <div className="services-list reveal">
            <article className="service-item">
              <h3>Scope</h3>
              <p>
                We align on the problem, the audience, and what “done” looks
                like — before lines of code.
              </p>
            </article>
            <article className="service-item">
              <h3>Build</h3>
              <p>
                Design and development stay tight: frequent demos, clear
                decisions, and a path to something you can ship.
              </p>
            </article>
            <article className="service-item">
              <h3>Ship</h3>
              <p>
                Launch support, polish, and iteration so the product holds up in
                the real world — not just in a demo.
              </p>
            </article>
          </div>
          <div className="reveal" style={{ marginTop: '2.5rem' }}>
            <Link className="btn btn-dark" to="/contact">
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
