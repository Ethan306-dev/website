import { useEffect } from 'react'
import { CONTACT_EMAIL } from '../constants'

export function Contact() {
  useEffect(() => {
    document.title = 'Contact — 306.'
    return () => {
      document.title = '306. — Web, Apps & Software'
    }
  }, [])

  return (
    <main>
      <section className="page-hero contact-page-hero">
        <div className="section-inner reveal">
          <p className="section-label">Contact</p>
          <h1 className="page-title">Let’s build.</h1>
          <p className="page-lead">
            Share a short brief — product idea, timeline, and any links or
            sketches. I’ll reply soon.
          </p>
        </div>
      </section>

      <section className="section contact">
        <div className="section-inner">
          <div className="contact-panel reveal">
            <div>
              <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              <p className="contact-note" style={{ marginTop: '1rem' }}>
                Useful to include: what you’re building, who it’s for, and when
                you’d like to launch.
              </p>
            </div>
            <a className="btn btn-primary" href={`mailto:${CONTACT_EMAIL}`}>
              Email Ethan
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
