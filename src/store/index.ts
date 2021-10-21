import { createStore as baseCreateStore, useStore as baseUseStore, Store } from 'vuex'
import { InjectionKey } from 'vue'

import state, { RootState } from './state'
import mutations from './mutations'
import actions from './actions'

export const key: InjectionKey<Store<RootState>> = Symbol()

export function useStore() {
  return baseUseStore(key)
}

export function createStore() {
  const store = baseCreateStore<RootState>({
    state,
    mutations,
    actions,
  })

  return store
}
