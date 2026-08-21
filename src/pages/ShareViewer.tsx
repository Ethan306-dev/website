import { Link, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import {
  loadPublishedManifest,
  publishedPageUrl,
  type ShareMeta,
} from '../lib/shareTypes'

export function ShareViewer() {
  const { slug = '' } = useParams()
  const [share, setShare] = useState<ShareMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activePage, setActivePage] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')
      try {
        const manifest = await loadPublishedManifest()
        const found = manifest.shares.find((item) => item.slug === slug) || null
        if (!found) {
          if (!cancelled) {
            setShare(null)
            setError('This preview link was not found or is not published yet.')
          }
          return
        }
        if (!cancelled) {
          setShare(found)
          setActivePage(found.defaultPage || found.pages[0]?.path || '')
          document.title = `${found.title} — 306.`
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load share')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
      document.title = '306. — Web, Apps & Software'
    }
  }, [slug])

  const iframeSrc = useMemo(() => {
    if (!share || !activePage) return ''
    return publishedPageUrl(share.slug, activePage)
  }, [share, activePage])

  return (
    <div className="share-shell">
      <header className="share-topbar">
        <Link className="share-brand" to="/">
          <img src="/brand/306-circle.png" alt="" width={28} height={28} />
          <span>306.</span>
        </Link>
        <div className="share-topbar-copy">
          {share ? (
            <>
              <strong>{share.title}</strong>
              <span>Prepared for {share.clientName}</span>
            </>
          ) : (
            <strong>Client preview</strong>
          )}
        </div>
      </header>

      {share && share.pages.length > 1 ? (
        <nav className="share-page-nav" aria-label="Pages in this preview">
          {share.pages.map((page) => (
            <button
              key={page.path}
              type="button"
              className={`share-page-tab${activePage === page.path ? ' is-active' : ''}`}
              onClick={() => setActivePage(page.path)}
            >
              {page.label}
            </button>
          ))}
        </nav>
      ) : null}

      <main className="share-stage">
        {loading ? <p className="share-status">Loading preview…</p> : null}
        {!loading && error ? <p className="share-status share-status-error">{error}</p> : null}
        {!loading && share && iframeSrc ? (
          <iframe
            className="share-frame"
            title={share.title}
            src={iframeSrc}
          />
        ) : null}
      </main>
    </div>
  )
}
