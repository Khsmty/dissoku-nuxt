export const state = () => ({
  list: []
})

export const getters = {
  get: (state) => {
    return state.list[0]
  }
}

export const mutations = {
  regist(state, data) {
    state.list = []
    state.list.push(data)
  }
}

export const actions = {
  async fetch({ commit }, id) {
    try {
      let data = await this.$axios.$get(`/api/userprofiles/${id}/`)
      commit('regist', data)
    } catch(err) {
      // pass
    }
  }
}
