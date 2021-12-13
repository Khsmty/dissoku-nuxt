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
  async fetchNew({ commit }, page) {
    try {
      let data = await this.$axios.$get(`/api/bots/?page=${page}&ordering=-created_at,-likes`)
      commit('regist', data)
    } catch (err) {
      // pass
    }
  },
  async fetchLike({ commit }, page) {
    try {
      let data = await this.$axios.$get(`/api/bots/?page=${page}`)
      commit('regist', data)
    } catch (err) {
      // pass
    }
  },
  async fetchByTag({ commit }, {params, page}) {
    try {
      let data = await this.$axios.$get(`/api/bots/?tags__name=${encodeURIComponent(params.name)}&page=${page}`)
      commit('regist', data)
    } catch (err) {
      // pass
    }
  }
}
