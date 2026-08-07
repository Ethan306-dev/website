export type DrillRecord = {
  id: string
  name: string
  difficulty: number
  filename: string
  size: number
  uploadedAt: string
  content: unknown
}

export type DrillLibraryFile = {
  drills: DrillRecord[]
}

const LOCAL_KEY = '306-drill-library'

function emptyLibrary(): DrillLibraryFile {
  return { drills: [] }
}

export async function loadPublicLibrary(): Promise<DrillLibraryFile> {
  try {
    const response = await fetch(`/drills/library.json?ts=${Date.now()}`)
    if (!response.ok) return emptyLibrary()
    const data = (await response.json()) as DrillLibraryFile
    return {
      drills: Array.isArray(data.drills) ? data.drills : [],
    }
  } catch {
    return emptyLibrary()
  }
}

export function loadLocalLibrary(): DrillLibraryFile {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (!raw) return emptyLibrary()
    const data = JSON.parse(raw) as DrillLibraryFile
    return {
      drills: Array.isArray(data.drills) ? data.drills : [],
    }
  } catch {
    return emptyLibrary()
  }
}

export function saveLocalLibrary(library: DrillLibraryFile) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(library))
}

/** Public file is the shared source; localStorage holds unpublished admin uploads. */
export async function loadMergedLibrary(): Promise<DrillLibraryFile> {
  const published = await loadPublicLibrary()
  const local = loadLocalLibrary()
  const byId = new Map<string, DrillRecord>()

  for (const drill of published.drills) byId.set(drill.id, drill)
  for (const drill of local.drills) byId.set(drill.id, drill)

  return {
    drills: [...byId.values()].sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
    ),
  }
}

export function createDrill(input: {
  name: string
  difficulty: number
  filename: string
  content: unknown
}): DrillRecord {
  const serialized = JSON.stringify(input.content)
  return {
    id: crypto.randomUUID(),
    name: input.name.trim() || 'Untitled drill',
    difficulty: Math.min(5, Math.max(1, Math.round(input.difficulty))),
    filename: input.filename.toLowerCase().endsWith('.json')
      ? input.filename
      : `${input.filename || 'drill'}.json`,
    size: new Blob([serialized]).size,
    uploadedAt: new Date().toISOString(),
    content: input.content,
  }
}

export function downloadDrillJson(drill: DrillRecord) {
  const blob = new Blob([JSON.stringify(drill.content, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = drill.filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export function downloadLibraryFile(library: DrillLibraryFile) {
  const blob = new Blob([JSON.stringify(library, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'library.json'
  anchor.click()
  URL.revokeObjectURL(url)
}
