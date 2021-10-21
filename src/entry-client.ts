import { AppOptions, createApp } from './main'

const options: AppOptions = {
  vuex: true,
  router: true,
}

createApp(options).then(({ app }) => app.mount('#app'))
