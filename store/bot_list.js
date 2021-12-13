export const state = () => ({
  list_new: [],
  list_like: [],
})

export const getters = {
  getNew: state => {
    return state.list_new[0]
  },
  getLike: state => {
    return state.list_like[0]
  }
}

export const mutations = {
  registNew(state, data) {
    state.list_new = []
    state.list_new.push(data)
  },
  registLike(state, data) {
    state.list_like = []
    state.list_like.push(data)
  }
}

export const actions = {
  async fetchNew({ commit }, page) {
    try {
      let data = await this.$axios.$get(`/api/bots/?page=${page}&ordering=-created_at,-likes`)
      commit('registNew', data)
    } catch (err) {
      // pass
    }
  },
  async fetchLike({ commit }, page) {
    try {
      let data = await this.$axios.$get(`/api/bots/?page=${page}`)
      commit('registLike', data)
    } catch (err) {
      // pass
    }
  }
}
