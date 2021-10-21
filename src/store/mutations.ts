import { MutationTree } from 'vuex'
import { RootState } from './state'

const mutations: MutationTree<RootState> = {
  setDark(state, value: RootState['dark']) {
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
  setSlideSettings(state, value: RootState['slide']) {
    state.slide = value
  },
}

export default mutations
