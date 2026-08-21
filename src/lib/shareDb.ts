import type { ShareFileMap, ShareMeta } from './shareTypes'

const DB_NAME = '306-client-shares'
const DB_VERSION = 1
const META_STORE = 'meta'
const FILE_STORE = 'files'

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onerror = () => reject(request.error ?? new Error('Could not open shares database'))
    request.onsuccess = () => resolve(request.result)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE, { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains(FILE_STORE)) {
        db.createObjectStore(FILE_STORE, { keyPath: 'id' })
      }
    }
  })
}

function requestToPromise<T>(request: IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'))
  })
}

export async function listLocalShareMeta(): Promise<ShareMeta[]> {
  const db = await openDb()
  const tx = db.transaction(META_STORE, 'readonly')
  const store = tx.objectStore(META_STORE)
  const rows = await requestToPromise(store.getAll() as IDBRequest<ShareMeta[]>)
  return rows.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )
}

export async function getLocalShareMeta(id: string) {
  const db = await openDb()
  const tx = db.transaction(META_STORE, 'readonly')
  return requestToPromise(tx.objectStore(META_STORE).get(id) as IDBRequest<ShareMeta | undefined>)
}

export async function getLocalShareFiles(id: string): Promise<ShareFileMap> {
  const db = await openDb()
  const tx = db.transaction(FILE_STORE, 'readonly')
  const row = await requestToPromise(
    tx.objectStore(FILE_STORE).get(id) as IDBRequest<{ id: string; files: ShareFileMap } | undefined>,
  )
  return row?.files ?? {}
}

export async function saveLocalShare(meta: ShareMeta, files: ShareFileMap) {
  const db = await openDb()
  const tx = db.transaction([META_STORE, FILE_STORE], 'readwrite')
  await Promise.all([
    requestToPromise(tx.objectStore(META_STORE).put(meta)),
    requestToPromise(tx.objectStore(FILE_STORE).put({ id: meta.id, files })),
  ])
}

export async function deleteLocalShare(id: string) {
  const db = await openDb()
  const tx = db.transaction([META_STORE, FILE_STORE], 'readwrite')
  await Promise.all([
    requestToPromise(tx.objectStore(META_STORE).delete(id)),
    requestToPromise(tx.objectStore(FILE_STORE).delete(id)),
  ])
}
