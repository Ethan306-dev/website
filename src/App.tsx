import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { About } from './pages/About'
import { AdminShares } from './pages/AdminShares'
import { Contact } from './pages/Contact'
import { DrillLibrary } from './pages/DrillLibrary'
import { Home } from './pages/Home'
import { ProjectPage } from './pages/ProjectPage'
import { ShareViewer } from './pages/ShareViewer'
import { VolleyCanvas } from './pages/VolleyCanvas'

export default function App() {
  return (
    <Routes>
      <Route path="share/:slug" element={<ShareViewer />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work/volleycanvas" element={<VolleyCanvas />} />
        <Route path="work/volleycanvas/drills" element={<DrillLibrary />} />
        <Route path="work/:slug" element={<ProjectPage />} />
        <Route path="admin/shares" element={<AdminShares />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
