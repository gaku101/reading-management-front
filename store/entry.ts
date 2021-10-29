import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  entry: {
    id: 0,
    amount: 0,
  } as EntryState,
})
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  entry: (state) => state.entry,
}

export const mutations: MutationTree<RootState> = {
  setUser(state, entry: EntryState): void {
    Object.assign(state.entry, entry)
    console.debug('state.entry', state.entry)
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async setEntry({ commit }, entry: EntryState) {
    commit('setUser', entry)
    console.debug('actions', entry)
  },
}
