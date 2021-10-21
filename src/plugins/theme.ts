import { AppContext } from '../types'

export default async function boot({ store }: AppContext) {
  const dark = localStorage.getItem('space:dark')

  store.commit('setDark', dark)

  await store.dispatch('setSettings')
}
