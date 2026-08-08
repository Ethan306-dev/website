import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { AdminGate } from './AdminGate'

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

  return (
    <div className="site" ref={rootRef}>
      <ScrollManager />
      <header className="nav">
        <Link className="nav-mark" to="/" aria-label="306. home">
          <img
            className="nav-logo"
            src="/brand/306-circle.png"
            alt=""
            width={36}
            height={36}
          />
          <span>306.</span>
        </Link>
        <div className="nav-right">
          <nav className="nav-links" aria-label="Primary">
            <Link to="/#work">Work</Link>
            <Link to="/about">About</Link>
            <Link className="nav-cta" to="/contact">
              Contact
            </Link>
          </nav>
          <AdminGate />
        </div>
      </header>

      <Outlet />

      <footer className="footer">
        <Link className="footer-mark" to="/">
          <img
            className="footer-logo"
            src="/brand/306-circle.png"
            alt=""
            width={28}
            height={28}
          />
          <span>306.</span>
        </Link>
        <nav className="footer-links" aria-label="Footer">
          <Link to="/#work">Work</Link>
          <Link to="/work/volleycanvas">VolleyCanvas</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <span>© {new Date().getFullYear()} Ethan Weeks</span>
      </footer>
    </div>
  )
}
