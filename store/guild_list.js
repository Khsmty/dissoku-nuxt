export const state = () => ({
  list: [],
})

export const getters = {
  get: state => {
    return state.list[0]
  }
}

export const mutations = {
  regist(state, data) {
    state.list = []
    state.list.push(data)
  },
}

export const actions = {
  async fetchSearch({ commit }, {q, page}) {
    try {
      let data = await this.$axios.$get(`/api/guilds/search/?q=${encodeURIComponent(q)}&page=${page}`)
      commit('regist', data)
    } catch (err) {
      // pass
    }
  },
  async fetchByTag({ commit }, {order, page}) {
    try {
      let data = await this.$axios.$get(`/api/guilds/?tags__name=${encodeURIComponent(order)}&page=${page}`)
      commit('regist', data)
    } catch (err) {
      // pass
    }
  },
  async fetchUpdate({ commit }, page) {
    try {
      let data = await this.$axios.$get(`/api/guilds/?page=${page}`)
      commit('regist', data)
    } catch (err) {
      // pass
    }
  },
  async fetchOrder({ commit }, {order, page}) {
    try {
      let parameters = { 'member': '-membernum,-upped_at', 'like': '-likes,-upped_at', 'rank': '-exp,-upped_at'}
      let url = `/api/guilds?ordering=${encodeURIComponent(parameters[order])}&page=${page}`
      let data = await this.$axios.$get(url)
      commit('regist', data)
    } catch (err) {
      // pass
    }
  }
}
