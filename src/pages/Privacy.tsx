import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { CONTACT_EMAIL } from '../constants'

export function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy — 306.'
    return () => {
      document.title = '306. — Web, Apps & Software'
    }
  }, [])

  return (
    <main className="privacy-page">
      <section className="page-hero privacy-hero">
        <div className="section-inner reveal">
          <p className="section-label">Legal</p>
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-lead">Last updated: 13 September 2026</p>
        </div>
      </section>

      <section className="section privacy-body">
        <div className="section-inner narrow reveal">
          <div className="legal-prose">
            <h2>Overview</h2>
            <p>
              This Privacy Policy applies to mobile applications, software and
              services published by 306, including ScoreTap, VolleyCanvas, Block
              Loom, and other applications published by 306.
            </p>
            <p>
              We design our apps with privacy in mind. Wherever possible,
              information you create is stored locally on your device rather
              than being collected by us.
            </p>
            <p>
              We do not sell your personal information and we do not use your
              information for third-party advertising or cross-app tracking.
            </p>
            <p>
              Different 306 apps provide different features, so some sections of
              this policy may only apply when you choose to use a particular
              feature.
            </p>

            <h2>Information Stored on Your Device</h2>
            <p>
              Our apps may store information you create or configure directly on
              your device.
            </p>
            <p>Depending on the app, this may include information such as:</p>
            <ul>
              <li>Player names and team names</li>
              <li>Jersey numbers and player roles</li>
              <li>Match results and scoring information</li>
              <li>Lineups and rotations</li>
              <li>Drills and training plans</li>
              <li>Notes, labels, drawings and presets</li>
              <li>App preferences and settings</li>
              <li>Appearance and language settings</li>
              <li>Saved games or other app-created content</li>
            </ul>
            <p>
              This information is generally stored using Apple system storage
              and is not automatically sent to 306.
            </p>
            <p>
              For example, VolleyCanvas stores user-created rosters, drills,
              notes, presets, drawings and settings locally on the device.
            </p>

            <h2>iCloud</h2>
            <p>
              Some 306 apps may offer optional iCloud synchronisation.
            </p>
            <p>
              When iCloud functionality is enabled, information may be stored in
              or synchronised through your personal Apple iCloud account.
            </p>
            <p>
              iCloud data is processed and stored by Apple in accordance with
              Apple&apos;s privacy policies and the settings associated with
              your Apple Account.
            </p>
            <p>
              306 does not receive access to your entire iCloud account.
            </p>
            <p>
              You can control iCloud permissions through your device settings.
            </p>

            <h2>Game Center</h2>
            <p>
              Some apps, including apps with gaming, scoring, leaderboard or
              social features, may integrate with Apple Game Center.
            </p>
            <p>
              If you use Game Center, Apple may process information such as
              your:
            </p>
            <ul>
              <li>Game Center player identity</li>
              <li>Display name</li>
              <li>Achievements</li>
              <li>Leaderboard information</li>
              <li>Game-related activity</li>
            </ul>
            <p>
              Game Center is operated by Apple and is subject to Apple&apos;s
              own privacy practices.
            </p>
            <p>
              306 only accesses Game Center information necessary to provide the
              features available within the relevant app.
            </p>

            <h2>Contacts</h2>
            <p>
              Some apps may allow you to select or invite people from your
              device&apos;s contacts.
            </p>
            <p>
              Access to contacts is only requested when required for a feature
              and after you grant permission through iOS.
            </p>
            <p>
              Where possible, contact information is processed on your device
              and is not collected or stored by 306.
            </p>
            <p>
              You can revoke contact access at any time through your
              device&apos;s privacy settings.
            </p>

            <h2>Live Sharing and Invitations</h2>
            <p>
              Some 306 apps may allow you to create live links, invite other
              players, share match information, or collaborate with other
              users.
            </p>
            <p>
              When you choose to use these features, information required to
              make the shared session work may be transmitted between devices or
              temporarily processed by the services supporting that
              functionality.
            </p>
            <p>This may include information such as:</p>
            <ul>
              <li>Player or team names</li>
              <li>Match information</li>
              <li>Scores</li>
              <li>Session identifiers</li>
              <li>Information you intentionally choose to share</li>
            </ul>
            <p>
              We only process information required to provide the sharing
              functionality.
            </p>
            <p>
              Do not enter or share personal information belonging to another
              person unless you have permission to do so.
            </p>

            <h2>Importing, Exporting and Sharing</h2>
            <p>
              Some 306 apps allow you to import, export or share content such
              as:
            </p>
            <ul>
              <li>Images</li>
              <li>Rosters</li>
              <li>Match information</li>
              <li>Drills</li>
              <li>Practice plans</li>
              <li>Documents or other files</li>
            </ul>
            <p>
              When you choose to share or export content, you choose the
              destination.
            </p>
            <p>
              Files may then be processed by Apple or by third-party apps and
              services you select. Those services operate under their own
              privacy policies.
            </p>
            <p>
              This follows the same approach currently used by VolleyCanvas for
              exported drills, rosters, images and practice plans.
            </p>

            <h2>Information We Collect</h2>
            <p>
              Unless specifically required by a feature described in this
              policy, 306 apps do not collect personal information for the
              developer.
            </p>
            <p>
              We do not use our apps to collect information for:
            </p>
            <ul>
              <li>Advertising</li>
              <li>User profiling</li>
              <li>Cross-app tracking</li>
              <li>Selling user information</li>
              <li>Third-party marketing</li>
            </ul>
            <p>
              Where an app operates entirely offline, information created
              inside the app remains on your device unless you explicitly choose
              to export, share or synchronise it.
            </p>
            <p>
              VolleyCanvas, for example, does not send its locally stored
              rosters, drills, notes, presets, drawings or settings to the
              developer and does not use analytics or tracking.
            </p>

            <h2>Analytics and Tracking</h2>
            <p>
              306 does not use information collected through its apps for
              advertising tracking.
            </p>
            <p>
              Unless explicitly disclosed for a particular app or feature, our
              apps do not use third-party behavioural advertising or tracking
              technologies.
            </p>
            <p>
              Apple may independently collect information relating to App Store
              downloads, purchases, device operation, crashes or diagnostics in
              accordance with Apple&apos;s own privacy policies and your device
              settings.
            </p>

            <h2>Purchases</h2>
            <p>
              If an app contains a purchase, subscription or other paid feature,
              transactions are normally processed by Apple through the App
              Store.
            </p>
            <p>
              306 does not receive your full payment-card information.
            </p>
            <p>
              Apple may provide information necessary to verify whether you have
              purchased or are entitled to use a feature.
            </p>

            <h2>Data Retention</h2>
            <p>
              Information stored locally remains on your device until you remove
              it using functionality within the app or delete the app.
            </p>
            <p>
              Information stored through third-party services such as iCloud or
              Game Center may remain subject to the retention policies and
              settings of those services.
            </p>
            <p>
              Temporary information required for features such as live sharing
              may be retained only for as long as reasonably necessary to
              provide that functionality.
            </p>

            <h2>Deleting Your Data</h2>
            <p>
              Depending on the app, you may be able to delete saved information
              directly from within the app.
            </p>
            <p>
              Locally stored app information can generally also be removed by
              deleting the app from your device. This is the deletion mechanism
              currently described for VolleyCanvas.
            </p>
            <p>
              For information stored by Apple services such as iCloud or Game
              Center, you may also be able to manage or delete that information
              through your Apple Account or device settings.
            </p>
            <p>
              If a 306 service directly stores personal information and you
              would like it deleted, you may contact us using the details below.
            </p>

            <h2>Children&apos;s Privacy</h2>
            <p>
              Our apps are not designed to knowingly collect personal
              information from children unless the relevant app and feature
              specifically states otherwise.
            </p>
            <p>
              Users should not enter another person&apos;s personal information
              into an app without appropriate permission.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              Certain features may rely on services provided by Apple or other
              third parties.
            </p>
            <p>These can include:</p>
            <ul>
              <li>Apple App Store</li>
              <li>iCloud</li>
              <li>Game Center</li>
              <li>Apple system sharing services</li>
            </ul>
            <p>
              Your use of those services is also subject to the applicable
              provider&apos;s privacy policy.
            </p>
            <p>
              306 is not responsible for the privacy practices of third-party
              apps or services that you independently choose to use.
            </p>

            <h2>Security</h2>
            <p>
              We take reasonable steps to design our apps in a way that limits
              unnecessary collection and transmission of personal information.
            </p>
            <p>
              However, no electronic storage or transmission method can be
              guaranteed to be completely secure.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy when our apps, services or legal
              requirements change.
            </p>
            <p>
              The latest version will be published at this page with an updated
              Last updated date.
            </p>
            <p>
              Continued use of our apps after an update is subject to the
              current version of this Privacy Policy.
            </p>

            <h2>Contact</h2>
            <p>
              If you have questions about this Privacy Policy, your information,
              or any 306 application, please contact:
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
              <Link className="text-link" to="/contact">
                Contact 306.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
