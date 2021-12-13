export const state = () => ({
  list: []
})

export const getters = {
  getGuildById: (state) => (id) => {
    return state.list.find(ele => ele.id === id)
  }
}

export const mutations = {
  add(state, data) {
    state.list = state.list.filter(ele => ele.id !== data.id)
    state.list.push(data)
  }
}

export const actions = {
  async fetchGuild({ commit }, id) {
    let data = await this.$axios.$get(`/api/guilds/${id}/`)
    data.id = id
    data.type = "guild"
    commit('add', data)
  }
}
