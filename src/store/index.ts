import { createStore as baseCreateStore, useStore as baseUseStore, Store } from 'vuex'
import { InjectionKey } from 'vue'

export interface RootState {
  dark: boolean
}

export const key: InjectionKey<Store<RootState>> = Symbol()

export function useStore() {
  return baseUseStore(key)
}

export function createStore() {
  const store = baseCreateStore<RootState>({
    state: {
      dark: false,
    },
    mutations: {
      setDark(state, value: boolean) {
        state.dark = value
        document.querySelector('body')?.classList.toggle('dark')
      },
    },
  })

  return store
}
