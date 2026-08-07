export const ADMIN_USERNAME = 'EWeeks306'
export const ADMIN_PASSWORD = 'Primary13!'

const ADMIN_KEY = '306-admin-signed-in'

export function isAdminSession() {
  return sessionStorage.getItem(ADMIN_KEY) === '1'
}

export function setAdminSession(active: boolean) {
  if (active) sessionStorage.setItem(ADMIN_KEY, '1')
  else sessionStorage.removeItem(ADMIN_KEY)
}

export function validateAdminCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}
