import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export function Layout() {
  const rootRef = useReveal()
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  return (
    <div className="site" ref={rootRef}>
      <ScrollManager />
      <header className="nav">
        <Link className="nav-mark" to="/" aria-label="306. home">
          306.
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link to={onHome ? '/#work' : '/work/volleycanvas'}>Work</Link>
          <Link to="/about">About</Link>
          <Link className="nav-cta" to="/contact">
            Contact
          </Link>
        </nav>
      </header>

      <Outlet />

      <footer className="footer">
        <Link className="footer-mark" to="/">
          306.
        </Link>
        <nav className="footer-links" aria-label="Footer">
          <Link to="/work/volleycanvas">VolleyCanvas</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <span>© {new Date().getFullYear()} Ethan Weeks</span>
      </footer>
    </div>
  )
}
