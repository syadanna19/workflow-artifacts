import '@testing-library/jest-dom/vitest'

// Node 25+ defines a global localStorage that is undefined without --localstorage-file and shadows jsdom's.
if (typeof window.localStorage === 'undefined') {
  const store = new Map()
  const storage = {
    get length() {
      return store.size
    },
    key: (index) => [...store.keys()][index] ?? null,
    getItem: (key) => (store.has(String(key)) ? store.get(String(key)) : null),
    setItem: (key, value) => {
      store.set(String(key), String(value))
    },
    removeItem: (key) => {
      store.delete(String(key))
    },
    clear: () => {
      store.clear()
    },
  }
  Object.defineProperty(globalThis, 'localStorage', {
    value: storage,
    configurable: true,
    writable: true,
  })
}
