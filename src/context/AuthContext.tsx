import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  isAdminSession,
  setAdminSession,
  validateAdminCredentials,
} from '../lib/admin'

type AuthContextValue = {
  isAdmin: boolean
  ready: boolean
  signInOpen: boolean
  openSignIn: () => void
  closeSignIn: () => void
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [ready, setReady] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)

  useEffect(() => {
    setIsAdmin(isAdminSession())
    setReady(true)
  }, [])

  function openSignIn() {
    setSignInOpen(true)
  }

  function closeSignIn() {
    setSignInOpen(false)
  }

  async function signIn(username: string, password: string) {
    if (!validateAdminCredentials(username, password)) {
      throw new Error('Invalid username or password.')
    }
    setAdminSession(true)
    setIsAdmin(true)
    setSignInOpen(false)
  }

  function signOut() {
    setAdminSession(false)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        ready,
        signInOpen,
        openSignIn,
        closeSignIn,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return value
}
