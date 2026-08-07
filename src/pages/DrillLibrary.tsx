import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { DifficultyMeter } from '../components/DifficultyMeter'
import { useAuth } from '../context/AuthContext'
import {
  createDrill,
  downloadDrillJson,
  downloadLibraryFile,
  loadMergedLibrary,
  loadPublicLibrary,
  saveLocalLibrary,
  type DrillRecord,
} from '../lib/drills'

function formatBytes(size: number) {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function DrillLibrary() {
  const { isAdmin } = useAuth()
  const [drills, setDrills] = useState<DrillRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [difficulty, setDifficulty] = useState(3)
  const [file, setFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState('')
  const [uploadPending, setUploadPending] = useState(false)
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState('')
  const [showUpload, setShowUpload] = useState(false)
  const [pendingAdd, setPendingAdd] = useState(false)

  useEffect(() => {
    document.title = 'Drill Library — VolleyCanvas'
    return () => {
      document.title = '306. — Web, Apps & Software'
    }
  }, [])

  useEffect(() => {
    if (isAdmin && pendingAdd) {
      setShowUpload(true)
      setPendingAdd(false)
      requestAnimationFrame(() => {
        document.getElementById('add-drill')?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [isAdmin, pendingAdd])

  function handleAddDrill() {
    if (isAdmin) {
      setShowUpload(true)
      requestAnimationFrame(() => {
        document.getElementById('add-drill')?.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }
    setPendingAdd(true)
    window.dispatchEvent(new Event('306:admin-signin'))
  }

  async function loadDrills() {
    setLoading(true)
    setError('')
    try {
      const data = await loadMergedLibrary()
      setDrills(data.drills)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load drills')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadDrills()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return drills
    return drills.filter(
      (drill) =>
        drill.name.toLowerCase().includes(q) ||
        drill.filename.toLowerCase().includes(q),
    )
  }, [drills, query])

  async function handleUpload(event: FormEvent) {
    event.preventDefault()
    setUploadError('')
    setNotice('')
    setUploadPending(true)

    try {
      if (!file) throw new Error('Choose a JSON file to upload.')
      if (!name.trim()) throw new Error('Give the drill a name.')

      const text = await file.text()
      let content: unknown
      try {
        content = JSON.parse(text)
      } catch {
        throw new Error('That file is not valid JSON.')
      }

      const drill = createDrill({
        name: name.trim(),
        difficulty,
        filename: file.name,
        content,
      })

      const next = [drill, ...drills]
      setDrills(next)
      saveLocalLibrary({ drills: next })

      setName('')
      setDifficulty(3)
      setFile(null)
      setNotice(
        'Drill saved. Click “Publish library file”, then replace public/drills/library.json and push to GitHub so everyone can download it.',
      )
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploadPending(false)
    }
  }

  function handleDelete(id: string) {
    if (!window.confirm('Remove this drill from the library?')) return
    const next = drills.filter((drill) => drill.id !== id)
    setDrills(next)
    saveLocalLibrary({ drills: next })
    setNotice(
      'Drill removed locally. Publish the library file and push to update the live site for everyone.',
    )
  }

  async function handlePublish() {
    setNotice('')
    // Prefer the current on-screen library (includes local edits).
    downloadLibraryFile({ drills })
    setNotice(
      'Downloaded library.json — replace public/drills/library.json in your project, commit, and push. After Vercel redeploys, everyone will see these drills.',
    )
  }

  async function handleResetLocal() {
    const published = await loadPublicLibrary()
    saveLocalLibrary(published)
    setDrills(published.drills)
    setNotice('Local library reset to the published site file.')
  }

  return (
    <main>
      <section className="page-hero drill-hero">
        <div className="section-inner reveal">
          <p className="section-label">VolleyCanvas</p>
          <h1 className="page-title page-title-sm">Drill Library</h1>
          <p className="page-lead">
            Browse and download VolleyCanvas drill JSON files. Import them into
            the app to run animated plays on the court.
          </p>
          <div className="cta-row" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" type="button" onClick={handleAddDrill}>
              Add new drill
            </button>
            <Link className="btn btn-ghost" to="/work/volleycanvas">
              Back to VolleyCanvas
            </Link>
          </div>
        </div>
      </section>

      {isAdmin && showUpload ? (
        <section className="section drill-upload" id="add-drill">
          <div className="section-inner">
            <div className="reveal">
              <p className="section-label">Admin</p>
              <h2 className="section-title">Add a new drill</h2>
              <p className="section-lead">
                Name it, set the difficulty, then publish the library file to
                GitHub so anyone can download the drills.
              </p>
            </div>

            <form className="upload-form reveal" onSubmit={handleUpload}>
              <label className="field">
                <span>Drill name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Serve receive — rotation 1"
                  required
                />
              </label>

              <div className="field">
                <span>Difficulty</span>
                <DifficultyMeter
                  value={difficulty}
                  interactive
                  onChange={setDifficulty}
                />
              </div>

              <label className="field">
                <span>JSON file</span>
                <input
                  type="file"
                  accept="application/json,.json"
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                  required
                />
              </label>

              {file ? (
                <p className="upload-file-meta">
                  Selected: {file.name} · {formatBytes(file.size)}
                </p>
              ) : null}

              {uploadError ? <p className="form-error">{uploadError}</p> : null}
              {notice ? <p className="form-notice">{notice}</p> : null}

              <div className="cta-row">
                <button
                  className="btn btn-dark"
                  type="submit"
                  disabled={uploadPending}
                >
                  {uploadPending ? 'Saving…' : 'Save drill'}
                </button>
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={() => void handlePublish()}
                >
                  Publish library file
                </button>
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={() => void handleResetLocal()}
                >
                  Reset local
                </button>
              </div>
            </form>
          </div>
        </section>
      ) : null}

      <section className="section drill-library">
        <div className="section-inner">
          <div className="drill-library-head reveal">
            <div>
              <p className="section-label">Library</p>
              <h2 className="section-title">Available drills</h2>
            </div>
            <div className="drill-library-tools">
              <button
                className="btn btn-dark"
                type="button"
                onClick={handleAddDrill}
              >
                Add new drill
              </button>
              <label className="field drill-search">
                <span>Search</span>
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name"
                />
              </label>
            </div>
          </div>

          {loading ? <p className="muted-copy reveal">Loading drills…</p> : null}
          {error ? <p className="form-error reveal">{error}</p> : null}

          {!loading && !error && filtered.length === 0 ? (
            <p className="muted-copy reveal">
              No drills published yet. Sign in as admin to upload the first one.
            </p>
          ) : null}

          <div className="drill-list reveal">
            {filtered.map((drill) => (
              <article className="drill-item" key={drill.id}>
                <div className="drill-item-main">
                  <h3>{drill.name}</h3>
                  <p>
                    {drill.filename} · {formatBytes(drill.size)} ·{' '}
                    {formatDate(drill.uploadedAt)}
                  </p>
                  <DifficultyMeter value={drill.difficulty} />
                </div>
                <div className="drill-item-actions">
                  <button
                    className="btn btn-dark"
                    type="button"
                    onClick={() => downloadDrillJson(drill)}
                  >
                    Download JSON
                  </button>
                  {isAdmin ? (
                    <button
                      className="btn btn-outline"
                      type="button"
                      onClick={() => handleDelete(drill.id)}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
