import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  deleteLocalShare,
  getLocalShareFiles,
  listLocalShareMeta,
  saveLocalShare,
} from '../lib/shareDb'
import {
  buildPreviewUrlMap,
  exportShareZip,
  htmlWithRewrittenAssets,
  readFilesFromList,
  revokeUrlMap,
} from '../lib/shareFiles'
import {
  listHtmlPages,
  pickDefaultPage,
  sharePublicUrl,
  slugify,
  type ShareFileMap,
  type ShareMeta,
} from '../lib/shareTypes'

export function AdminShares() {
  const { isAdmin, ready, openSignIn } = useAuth()
  const navigate = useNavigate()
  const [shares, setShares] = useState<ShareMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [clientName, setClientName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [files, setFiles] = useState<ShareFileMap>({})
  const [filePaths, setFilePaths] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [previewHtml, setPreviewHtml] = useState('')
  const [previewPage, setPreviewPage] = useState('')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  const pages = useMemo(() => listHtmlPages(filePaths), [filePaths])

  useEffect(() => {
    document.title = 'Client shares — 306.'
    return () => {
      document.title = '306. — Web, Apps & Software'
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    if (!isAdmin) openSignIn()
    // intentionally only react to auth readiness/state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, isAdmin])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (editorOpen && !dialog.open) dialog.showModal()
    if (!editorOpen && dialog.open) dialog.close()
  }, [editorOpen])

  async function refresh() {
    setLoading(true)
    setError('')
    try {
      setShares(await listLocalShareMeta())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load shares')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAdmin) void refresh()
  }, [isAdmin])

  function resetEditor() {
    setEditingId(null)
    setTitle('')
    setClientName('')
    setSlug('')
    setSlugTouched(false)
    setFiles({})
    setFilePaths([])
    setPreviewHtml('')
    setPreviewPage('')
    setNotice('')
    setError('')
  }

  function openCreate() {
    resetEditor()
    setEditorOpen(true)
  }

  async function openEdit(share: ShareMeta) {
    resetEditor()
    setEditingId(share.id)
    setTitle(share.title)
    setClientName(share.clientName)
    setSlug(share.slug)
    setSlugTouched(true)
    const stored = await getLocalShareFiles(share.id)
    const paths = Object.keys(stored).sort()
    setFiles(stored)
    setFilePaths(paths)
    const defaultPage = share.defaultPage || pickDefaultPage(listHtmlPages(paths))
    setPreviewPage(defaultPage)
    setEditorOpen(true)
  }

  async function handleFilesSelected(list: FileList | null) {
    if (!list || list.length === 0) return
    setError('')
    try {
      const next = await readFilesFromList(list)
      const merged = { ...files, ...next }
      const paths = Object.keys(merged).sort()
      setFiles(merged)
      setFilePaths(paths)
      const htmlPages = listHtmlPages(paths)
      const nextPreview = previewPage && merged[previewPage]
        ? previewPage
        : pickDefaultPage(htmlPages)
      setPreviewPage(nextPreview)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not read files')
    }
  }

  useEffect(() => {
    let cancelled = false
    let urls: Record<string, string> = {}

    async function run() {
      if (!previewPage || !files[previewPage]) {
        setPreviewHtml('')
        return
      }
      urls = buildPreviewUrlMap(files)
      try {
        const html = await htmlWithRewrittenAssets(previewPage, files, urls)
        if (!cancelled) setPreviewHtml(html)
      } catch (err) {
        if (!cancelled) {
          setPreviewHtml('')
          setError(err instanceof Error ? err.message : 'Preview failed')
        }
      }
    }

    void run()
    return () => {
      cancelled = true
      revokeUrlMap(urls)
    }
  }, [previewPage, files])

  async function handleSave(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    setError('')
    setNotice('')

    try {
      const cleanTitle = title.trim()
      const cleanClient = clientName.trim()
      const cleanSlug = slugify(slug || cleanTitle)
      if (!cleanTitle) throw new Error('Give this share a title.')
      if (!cleanClient) throw new Error('Add a client name.')
      if (!cleanSlug) throw new Error('Add a URL slug.')
      if (pages.length === 0) {
        throw new Error('Upload at least one HTML page (file or folder).')
      }

      const now = new Date().toISOString()
      const meta: ShareMeta = {
        id: editingId || crypto.randomUUID(),
        slug: cleanSlug,
        title: cleanTitle,
        clientName: cleanClient,
        createdAt: editingId
          ? shares.find((item) => item.id === editingId)?.createdAt || now
          : now,
        updatedAt: now,
        pages,
        defaultPage: pickDefaultPage(pages),
        fileCount: filePaths.length,
      }

      await saveLocalShare(meta, files)
      await refresh()
      setEditingId(meta.id)
      setSlug(meta.slug)
      setNotice(
        `Saved “${meta.title}”. Publish the zip, extract into public/shares/, commit, and push — then share ${sharePublicUrl(meta.slug)}`,
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save share')
    } finally {
      setSaving(false)
    }
  }

  async function handlePublish(share: ShareMeta) {
    setError('')
    setNotice('')
    try {
      const stored = await getLocalShareFiles(share.id)
      if (Object.keys(stored).length === 0) {
        throw new Error('No files found for this share. Re-upload and save first.')
      }
      await exportShareZip(share, stored)
      setNotice(
        `Downloaded 306-share-${share.slug}.zip. Extract so public/shares/manifest.json and public/shares/${share.slug}/ are updated, then git add, commit, and push. Client link: ${sharePublicUrl(share.slug)}`,
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Publish failed')
    }
  }

  async function handleDelete(share: ShareMeta) {
    if (!window.confirm(`Remove local share “${share.title}”?`)) return
    await deleteLocalShare(share.id)
    await refresh()
  }

  function copyLink(slugValue: string) {
    const url = sharePublicUrl(slugValue)
    void navigator.clipboard.writeText(url)
    setNotice(`Copied ${url}`)
  }

  if (!ready) {
    return (
      <main className="section">
        <div className="section-inner">
          <p className="muted-copy">Loading…</p>
        </div>
      </main>
    )
  }

  if (!isAdmin) {
    return (
      <main className="section">
        <div className="section-inner">
          <p className="section-label">Admin</p>
          <h1 className="section-title">Client shares</h1>
          <p className="section-lead">
            Sign in with Admin to create private preview links for client
            websites.
          </p>
          <button className="btn btn-dark" type="button" onClick={openSignIn}>
            Sign in
          </button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <section className="page-hero share-admin-hero">
        <div className="section-inner">
          <p className="section-label">Admin</p>
          <h1 className="page-title page-title-sm">Client shares</h1>
          <p className="page-lead">
            Upload a website file or folder, publish it, then send your client a
            private preview link.
          </p>
          <div className="cta-row" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" type="button" onClick={openCreate}>
              New client share
            </button>
            <Link className="btn btn-ghost" to="/">
              Back to site
            </Link>
          </div>
        </div>
      </section>

      <section className="section share-admin">
        <div className="section-inner">
          {notice ? <p className="form-notice">{notice}</p> : null}
          {error ? <p className="form-error">{error}</p> : null}
          {loading ? <p className="muted-copy">Loading shares…</p> : null}

          {!loading && shares.length === 0 ? (
            <p className="muted-copy">
              No shares yet. Create one and upload the HTML site you built for a
              client.
            </p>
          ) : null}

          <div className="share-admin-list">
            {shares.map((share) => (
              <article className="share-admin-item" key={share.id}>
                <div>
                  <h2>{share.title}</h2>
                  <p>
                    {share.clientName} · /share/{share.slug} · {share.pages.length}{' '}
                    page{share.pages.length === 1 ? '' : 's'} · {share.fileCount}{' '}
                    files
                  </p>
                </div>
                <div className="share-admin-actions">
                  <button
                    className="btn btn-dark"
                    type="button"
                    onClick={() => copyLink(share.slug)}
                  >
                    Copy link
                  </button>
                  <button
                    className="btn btn-outline"
                    type="button"
                    onClick={() => navigate(`/share/${share.slug}`)}
                  >
                    Open
                  </button>
                  <button
                    className="btn btn-outline"
                    type="button"
                    onClick={() => void handlePublish(share)}
                  >
                    Publish zip
                  </button>
                  <button
                    className="btn btn-outline"
                    type="button"
                    onClick={() => void openEdit(share)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline"
                    type="button"
                    onClick={() => void handleDelete(share)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="share-dialog"
        aria-labelledby={titleId}
        onClose={() => setEditorOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setEditorOpen(false)
        }}
      >
        <form className="share-dialog-form" onSubmit={handleSave}>
          <div className="drill-dialog-head">
            <div>
              <p className="section-label">Share</p>
              <h2 id={titleId}>{editingId ? 'Edit share' : 'New client share'}</h2>
            </div>
            <button
              className="drill-dialog-close"
              type="button"
              onClick={() => setEditorOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <p className="admin-form-lead">
            Upload one HTML file or a whole exported website folder. After you
            publish and push, send the client their /share/… link.
          </p>

          <label className="field">
            <span>Project title</span>
            <input
              type="text"
              value={title}
              onChange={(event) => {
                const value = event.target.value
                setTitle(value)
                if (!slugTouched) setSlug(slugify(value))
              }}
              placeholder="Acme website draft"
              required
            />
          </label>

          <label className="field">
            <span>Client name</span>
            <input
              type="text"
              value={clientName}
              onChange={(event) => setClientName(event.target.value)}
              placeholder="Acme Ltd"
              required
            />
          </label>

          <label className="field">
            <span>Link slug</span>
            <input
              type="text"
              value={slug}
              onChange={(event) => {
                setSlugTouched(true)
                setSlug(slugify(event.target.value))
              }}
              placeholder="acme-website"
              required
            />
            <span className="field-hint">yoursite.com/share/{slug || '…'}</span>
          </label>

          <div className="share-upload-row">
            <label className="field">
              <span>Upload files</span>
              <input
                type="file"
                multiple
                accept=".html,.htm,.css,.js,.json,.png,.jpg,.jpeg,.gif,.svg,.webp,.woff,.woff2,.txt"
                onChange={(event) => void handleFilesSelected(event.target.files)}
              />
            </label>
            <label className="field">
              <span>Or upload folder</span>
              <input
                type="file"
                multiple
                ref={(input) => {
                  if (input) {
                    input.setAttribute('webkitdirectory', '')
                    input.setAttribute('directory', '')
                  }
                }}
                onChange={(event) => void handleFilesSelected(event.target.files)}
              />
            </label>
          </div>

          {filePaths.length > 0 ? (
            <p className="upload-file-meta">
              {filePaths.length} file{filePaths.length === 1 ? '' : 's'} ·{' '}
              {pages.length} HTML page{pages.length === 1 ? '' : 's'}
            </p>
          ) : null}

          {pages.length > 0 ? (
            <label className="field">
              <span>Preview page</span>
              <select
                value={previewPage}
                onChange={(event) => setPreviewPage(event.target.value)}
              >
                {pages.map((page) => (
                  <option key={page.path} value={page.path}>
                    {page.label} ({page.path})
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          {previewHtml ? (
            <div className="share-preview-frame">
              <iframe title="Share preview" srcDoc={previewHtml} />
            </div>
          ) : null}

          {error ? <p className="form-error">{error}</p> : null}
          {notice ? <p className="form-notice">{notice}</p> : null}

          <div className="cta-row">
            <button className="btn btn-dark" type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Save share'}
            </button>
            {editingId ? (
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => {
                  const share = shares.find((item) => item.id === editingId)
                  if (share) void handlePublish(share)
                }}
              >
                Publish zip
              </button>
            ) : null}
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => setEditorOpen(false)}
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
    </main>
  )
}
