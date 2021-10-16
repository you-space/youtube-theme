import { createApp as baseCreateApp } from 'vue'
import App from './App.vue'

import { boot } from './plugins'

import { createRouter } from './router'

async function createApp() {
  const app = baseCreateApp(App)
  const router = createRouter()

  await boot({ app, router })

  app.use(router)

  return app
}

createApp().then((app) => app.mount('#app'))
