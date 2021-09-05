import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  username: '',
})
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  username: (state) => state.username,
}

export const mutations: MutationTree<RootState> = {
  setUser(state, username: string): void {
    state.username = username
    console.debug('state.user', state.username)
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async setUser({ commit }, username: string) {
    commit('setUser', username)
  },
  async signOut({ commit }) {},
  async getUser({ commit }, username: string) {},
}
