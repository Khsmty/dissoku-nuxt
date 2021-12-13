export const state = () => ({
  list: []
})

export const getters = {
  getById: (state) => (id) => {
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
  async fetch({ commit }, id) {
    let data = await this.$axios.$get(`/api/bots/${id}/`)
    data.id = id
    data.type = "bot"
    commit('add', data)
  }
}
