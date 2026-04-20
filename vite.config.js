import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// @vue/devtools-kit reads localStorage at module-evaluation time, which
// doesn't work in Node (it's either undefined, or — on Node 22+ — a getter
// that throws without --experimental-webstorage). Replace it unconditionally
// with a tiny in-memory shim so config-loading doesn't crash.
function ensureLocalStorageShim() {
  const store = new Map()
  const shim = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
    clear: () => store.clear(),
    key: (i) => Array.from(store.keys())[i] ?? null,
    get length() {
      return store.size
    },
  }
  try {
    if (typeof globalThis.localStorage?.getItem === 'function') return
  } catch {
    // property access itself threw — fall through and install the shim
  }
  Object.defineProperty(globalThis, 'localStorage', {
    value: shim,
    writable: true,
    configurable: true,
  })
}

// https://vite.dev/config/
export default defineConfig(async ({ command }) => {
  // `vite build` doesn't need devtools at all; skip the import entirely.
  // `vite` (dev) and `vite preview` both load the config, so shim localStorage
  // before dynamic-importing the plugin.
  let devtoolsPlugins = []
  if (command === 'serve') {
    ensureLocalStorageShim()
    devtoolsPlugins = [(await import('vite-plugin-vue-devtools')).default()]
  }

  return {
    plugins: [vue(), ...devtoolsPlugins],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
