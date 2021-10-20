import { Store } from 'vuex'
import { RootState } from './store';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State extends RootState {}

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}