export type SharePage = {
  path: string
  label: string
}

export type ShareMeta = {
  id: string
  slug: string
  title: string
  clientName: string
  createdAt: string
  updatedAt: string
  pages: SharePage[]
  defaultPage: string
  fileCount: number
}

export type ShareManifest = {
  shares: ShareMeta[]
}

export type ShareFileMap = Record<string, ArrayBuffer>

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export function pageLabelFromPath(path: string) {
  const name = path.split('/').pop() || path
  const base = name.replace(/\.html?$/i, '')
  if (!base || base.toLowerCase() === 'index') return 'Home'
  return base
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function normalizeUploadPath(file: File) {
  const raw = (file as File & { webkitRelativePath?: string }).webkitRelativePath
  if (raw && raw.includes('/')) {
    const parts = raw.split('/')
    // Drop the root folder name so shares/{slug}/index.html works
    return parts.slice(1).join('/') || parts[parts.length - 1]
  }
  return file.name
}

export function listHtmlPages(paths: string[]): SharePage[] {
  return paths
    .filter((path) => /\.html?$/i.test(path))
    .sort((a, b) => {
      const aIndex = /index\.html?$/i.test(a) ? 0 : 1
      const bIndex = /index\.html?$/i.test(b) ? 0 : 1
      if (aIndex !== bIndex) return aIndex - bIndex
      return a.localeCompare(b)
    })
    .map((path) => ({ path, label: pageLabelFromPath(path) }))
}

export function pickDefaultPage(pages: SharePage[]) {
  return (
    pages.find((page) => /index\.html?$/i.test(page.path))?.path ||
    pages[0]?.path ||
    ''
  )
}

export async function loadPublishedManifest(): Promise<ShareManifest> {
  try {
    const response = await fetch(`/shares/manifest.json?ts=${Date.now()}`)
    if (!response.ok) return { shares: [] }
    const data = (await response.json()) as ShareManifest
    return { shares: Array.isArray(data.shares) ? data.shares : [] }
  } catch {
    return { shares: [] }
  }
}

export function sharePublicUrl(slug: string) {
  if (typeof window === 'undefined') return `/share/${slug}`
  return `${window.location.origin}/share/${slug}`
}

export function publishedPageUrl(slug: string, path: string) {
  return `/shares/${slug}/${path.split('/').map(encodeURIComponent).join('/')}`
}
