import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  user: {
    id: 0,
    username: '',
  } as UserState,
})
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  user: (state) => state.user,
  username: (state) => state.user.username,
}

export const mutations: MutationTree<RootState> = {
  setUser(state, user: UserState): void {
    Object.assign(state.user, user)
    console.debug('state.user', state.user)
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async setUser({ commit }, user: UserState) {
    commit('setUser', user)
    console.debug('actions', user)
  },
}
