export const setLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = <T>(key: string): T | null => {
  const storedValue = localStorage.getItem(key)
  return storedValue ? (JSON.parse(storedValue) as T) : null
}

export const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key)
}
