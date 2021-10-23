import { Store } from 'vuex'
import { RootState } from './store/state'
import moment from 'moment'

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<RootState>
    $moment: typeof moment
  }
}
