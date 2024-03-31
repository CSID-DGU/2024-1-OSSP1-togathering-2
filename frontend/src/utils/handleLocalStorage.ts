export const saveLocalStorage = (key: string, value: string) => {
  localStorage.removeItem(key)
  localStorage.setItem(key, value)
  return
}

export const loadLocalStorage = (key: string) => {
  return localStorage.getItem(key)
}
