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

        if (value) {
          localStorage.setItem('space:dark', 'true')
          document.querySelector('html')?.classList.add('dark')
        }

        if (!value) {
          localStorage.removeItem('space:dark')
          document.querySelector('html')?.classList.remove('dark')
        }
      },
    },
  })

  return store
}
