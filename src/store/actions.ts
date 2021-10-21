import { ActionTree } from 'vuex'
import { RootState } from './state'
import space from 'space'

const actions: ActionTree<RootState, RootState> = {
  async setSettings({ commit }) {
    const meta = await space.emit('meta:show', 'youtube-theme:settings:slide')

    if (meta) {
      commit('setSlideSettings', meta)
    }
  },
}

export default actions
