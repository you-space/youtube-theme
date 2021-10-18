import { createApp as baseCreateApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'

import { boot } from './plugins'

import { createRouter } from './router'
import { createStore, key } from './store'

async function createApp() {
  const app = baseCreateApp(App)
  const router = createRouter()
  const store = createStore()

  app.use(store, key)

  app.use(router)

  await boot({ app, router, store })

  return app
}

createApp().then((app) => app.mount('#app'))
