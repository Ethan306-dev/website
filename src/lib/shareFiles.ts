import JSZip from 'jszip'
import {
  loadPublishedManifest,
  normalizeUploadPath,
  type ShareFileMap,
  type ShareManifest,
  type ShareMeta,
} from './shareTypes'

function guessMime(path: string) {
  const lower = path.toLowerCase()
  if (lower.endsWith('.html') || lower.endsWith('.htm')) return 'text/html'
  if (lower.endsWith('.css')) return 'text/css'
  if (lower.endsWith('.js') || lower.endsWith('.mjs')) return 'text/javascript'
  if (lower.endsWith('.json')) return 'application/json'
  if (lower.endsWith('.svg')) return 'image/svg+xml'
  if (lower.endsWith('.png')) return 'image/png'
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg'
  if (lower.endsWith('.gif')) return 'image/gif'
  if (lower.endsWith('.webp')) return 'image/webp'
  if (lower.endsWith('.woff')) return 'font/woff'
  if (lower.endsWith('.woff2')) return 'font/woff2'
  return 'application/octet-stream'
}

function dirname(path: string) {
  const index = path.lastIndexOf('/')
  return index === -1 ? '' : path.slice(0, index)
}

function resolveRelative(fromPath: string, relative: string) {
  if (!relative || relative.startsWith('data:') || relative.startsWith('blob:')) {
    return relative
  }
  if (/^(https?:|mailto:|tel:|#|\/\/)/i.test(relative)) return relative

  const baseDir = dirname(fromPath)
  const stack = baseDir ? baseDir.split('/') : []
  for (const part of relative.split('/')) {
    if (!part || part === '.') continue
    if (part === '..') stack.pop()
    else stack.push(part)
  }
  return stack.join('/')
}

export function buildPreviewUrlMap(files: ShareFileMap) {
  const urls: Record<string, string> = {}
  for (const [path, buffer] of Object.entries(files)) {
    const blob = new Blob([new Uint8Array(buffer)], { type: guessMime(path) })
    urls[path] = URL.createObjectURL(blob)
  }
  return urls
}

export function revokeUrlMap(urls: Record<string, string>) {
  for (const url of Object.values(urls)) URL.revokeObjectURL(url)
}

export async function htmlWithRewrittenAssets(
  htmlPath: string,
  files: ShareFileMap,
  urlMap: Record<string, string>,
) {
  const buffer = files[htmlPath]
  if (!buffer) throw new Error(`Missing file: ${htmlPath}`)

  let html = new TextDecoder().decode(buffer)

  html = html.replace(
    /(href|src)=["']([^"']+)["']/gi,
    (full, attr: string, value: string) => {
      const resolved = resolveRelative(htmlPath, value)
      const mapped = urlMap[resolved]
      if (!mapped) return full
      return `${attr}="${mapped}"`
    },
  )

  // Basic CSS url(...) rewrite inside inline styles is rare; skip for MVP.
  return html
}

export async function readFilesFromList(fileList: FileList | File[]) {
  const files: ShareFileMap = {}

  for (const file of Array.from(fileList)) {
    const path = normalizeUploadPath(file)
    if (!path || path.includes('..')) continue
    files[path] = await file.arrayBuffer()
  }

  return files
}

export async function exportShareZip(meta: ShareMeta, files: ShareFileMap) {
  const published = await loadPublishedManifest()
  const nextShares = [
    meta,
    ...published.shares.filter((share) => share.slug !== meta.slug && share.id !== meta.id),
  ]
  const manifest: ShareManifest = { shares: nextShares }

  const zip = new JSZip()
  zip.file('manifest.json', JSON.stringify(manifest, null, 2))

  const folder = zip.folder(meta.slug)
  if (!folder) throw new Error('Could not create zip folder')

  for (const [path, buffer] of Object.entries(files)) {
    folder.file(path, buffer)
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `306-share-${meta.slug}.zip`
  anchor.click()
  URL.revokeObjectURL(url)
}
