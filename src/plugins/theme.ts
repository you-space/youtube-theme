import { AppContext } from '../types'

export default function boot({ store }: AppContext) {
  const dark = localStorage.getItem('space:dark')

  store.commit('setDark', dark)
}
