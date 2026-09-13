import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { CONTACT_EMAIL } from '../constants'

export function Copyright() {
  useEffect(() => {
    document.title = 'Copyright — 306.'
    return () => {
      document.title = '306. — Web, Apps & Software'
    }
  }, [])

  const year = new Date().getFullYear()

  return (
    <main className="privacy-page">
      <section className="page-hero privacy-hero">
        <div className="section-inner reveal">
          <p className="section-label">Legal</p>
          <h1 className="page-title">Copyright</h1>
          <p className="page-lead">Last updated: 13 September 2026</p>
        </div>
      </section>

      <section className="section privacy-body">
        <div className="section-inner narrow reveal">
          <div className="legal-prose">
            <h2>Overview</h2>
            <p>
              This Copyright notice applies to the websites, mobile
              applications, software, branding and other materials published by
              306, including ScoreTap, VolleyCanvas, Block Loom, and other
              applications and services published by 306.
            </p>
            <p>
              © {year} Ethan Weeks / 306. All rights reserved, except where
              otherwise stated.
            </p>

            <h2>Ownership</h2>
            <p>
              Unless otherwise noted, 306 owns or controls the copyright and
              related intellectual property rights in:
            </p>
            <ul>
              <li>App software and source materials</li>
              <li>Website design, layout and copy</li>
              <li>Logos, icons, product names and brand assets</li>
              <li>Promotional images, graphics and marketing materials</li>
              <li>Documentation, drills library content published by 306, and
                related media</li>
            </ul>
            <p>
              You may use 306 apps and websites under the applicable licence,
              App Store terms, and any product-specific terms. Those permissions
              do not transfer ownership of 306&apos;s intellectual property to
              you.
            </p>

            <h2>Trade Marks</h2>
            <p>
              306, ScoreTap, VolleyCanvas, Block Loom, and related names, logos
              and branding are trade marks or trade names of Ethan Weeks / 306,
              whether registered or unregistered.
            </p>
            <p>
              You may not use these marks in a way that suggests endorsement,
              affiliation or ownership without prior written permission, except
              for accurate, non-misleading references to the apps or studio.
            </p>

            <h2>Limited Licence to Use</h2>
            <p>
              Subject to the App Store licence and any other applicable terms,
              306 grants you a personal, non-exclusive, non-transferable licence
              to use each app for its intended purpose.
            </p>
            <p>You must not, without permission:</p>
            <ul>
              <li>Copy, redistribute or resell 306 apps or brand assets</li>
              <li>Reverse engineer, decompile or unlock paid features by
                unauthorised means</li>
              <li>Remove copyright, trade mark or attribution notices</li>
              <li>Use 306 materials to create competing products that copy
                protected expression</li>
            </ul>

            <h2>Your Content</h2>
            <p>
              You retain rights in content you create inside 306 apps, such as
              rosters, drills, notes, scores, images you import, and other
              user-generated materials, subject to any rights of third parties
              whose information or media you include.
            </p>
            <p>
              You are responsible for ensuring you have permission to use names,
              photos, logos and other content you enter, import, export or
              share.
            </p>
            <p>
              When you choose to share or export content, you remain responsible
              for that content and for complying with the privacy and terms
              policies of any destination service you select.
            </p>

            <h2>Third-Party Materials</h2>
            <p>
              Some apps or website pages may include or link to third-party
              content, fonts, libraries, services or trademarks. Those materials
              remain the property of their respective owners and are used under
              applicable licences or fair use for identification.
            </p>
            <p>
              Apple, App Store, iCloud, Game Center, Apple Watch and related
              marks are trademarks of Apple Inc. 306 is an independent developer
              and is not affiliated with or endorsed by Apple, except as
              required to distribute apps through the App Store.
            </p>

            <h2>Website and Promotional Materials</h2>
            <p>
              Content on 306dev.com, including product pages, promotional
              artwork and studio branding, is protected by copyright. You may
              view and share links to public pages. You may not scrape,
              republish or commercially reuse site content or assets without
              prior written consent, except for brief quotation with
              attribution.
            </p>

            <h2>Reporting Infringement</h2>
            <p>
              If you believe material published by 306 infringes your copyright
              or other intellectual property rights, please contact us with:
            </p>
            <ul>
              <li>Your name and contact details</li>
              <li>A description of the work you claim is infringed</li>
              <li>The URL or location of the material in question</li>
              <li>A statement of your good-faith belief that the use is not
                authorised</li>
            </ul>
            <p>
              We will review notices and take appropriate action where required.
            </p>

            <h2>Changes</h2>
            <p>
              We may update this Copyright notice when our products, branding or
              legal requirements change. The latest version will be published on
              this page with an updated Last updated date.
            </p>

            <h2>Contact</h2>
            <p>
              For copyright, licensing or intellectual property questions:
            </p>
            <p>
              <strong>306</strong>
              <br />
              Developer: Ethan Weeks
              <br />
              Website:{' '}
              <a className="text-link" href="https://306dev.com">
                306dev.com
              </a>
              <br />
              Email:{' '}
              <a className="text-link" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
            <p>
              Related:{' '}
              <Link className="text-link" to="/Privacy">
                Privacy Policy
              </Link>
              {' · '}
              <Link className="text-link" to="/contact">
                Contact
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
