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
  async fetchUpdate({ commit }, page) {
    try {
      let data = await this.$axios.$get(`/api/userprofiles/?page=${page}&ordering=-upped_at`)
      commit('regist', data)
    } catch (err) {
      // pass
    }
  },
  async fetchByTag({ commit }, {params, page}) {
    try {
      let data = await this.$axios.$get(`/api/userprofiles/?tags__name=${encodeURIComponent(params.order)}&page=${page}`)
      commit('regist', data)
    } catch (err) {
      console.log(err)
      // pass
    }
  }
}
