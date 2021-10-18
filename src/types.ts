import { App } from 'vue'
import { Router } from 'vue-router'
import { Store } from 'vuex'
import { RootState } from './store'

export interface AppContext {
  app: App
  router: Router
  store: Store<RootState>
}
