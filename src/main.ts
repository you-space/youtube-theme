import { createApp as baseCreateApp } from 'vue'
import App from './App.vue'
import { boot } from '@/plugins'

import { createRouter } from '@/router'
import { createStore, key } from '@/store'

export interface AppOptions {
  router?: boolean
  vuex?: boolean
  plugins?: string[]
}

export async function createApp(options: AppOptions) {
  const app = baseCreateApp(App)
  let router
  let store

  if (options.router) {
    router = createRouter()
    app.use(router)
  }

  if (options.vuex) {
    store = createStore()
    app.use(store, key)
  }

  await boot({ app, router, store }, options.plugins)

  return { app, router, store }
}
