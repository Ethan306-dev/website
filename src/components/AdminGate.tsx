import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useAuth } from '../context/AuthContext'

export function AdminGate() {
  const {
    isAdmin,
    ready,
    signInOpen,
    openSignIn,
    closeSignIn,
    signIn,
    signOut,
  } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (signInOpen && !dialog.open) dialog.showModal()
    if (!signInOpen && dialog.open) dialog.close()
  }, [signInOpen])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setPending(true)
    try {
      await signIn(username, password)
      setUsername('')
      setPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      {ready ? (
        isAdmin ? (
          <button className="admin-btn is-live" type="button" onClick={signOut}>
            Sign out
          </button>
        ) : (
          <button className="admin-btn" type="button" onClick={openSignIn}>
            Admin
          </button>
        )
      ) : (
        <button className="admin-btn" type="button" disabled>
          Admin
        </button>
      )}

      <dialog
        ref={dialogRef}
        className="admin-dialog"
        aria-labelledby={titleId}
        onClose={closeSignIn}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeSignIn()
        }}
      >
        <form className="admin-form" onSubmit={handleSubmit}>
          <p className="section-label">Admin</p>
          <h2 id={titleId}>Sign in</h2>
          <p className="admin-form-lead">
            Upload VolleyCanvas drills to the public library.
          </p>

          <label className="field">
            <span>Username</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <div className="cta-row">
            <button className="btn btn-primary" type="submit" disabled={pending}>
              {pending ? 'Signing in…' : 'Sign in'}
            </button>
            <button
              className="btn btn-outline"
              type="button"
              onClick={closeSignIn}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}
