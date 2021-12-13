export const state = () => ({
  list_new: [],
  list_like: [],
  list_tag: [],
})

export const getters = {
  getNew: state => {
    return state.list_new[0]
  },
  getLike: state => {
    return state.list_like[0]
  },
  getTag: state => {
    return state.list_tag[0]
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
  },
  registTag(state, data) {
    state.list_tag = []
    state.list_tag.push(data)
  }
}

export const actions = {
  async fetchNew({ commit }) {
    try {
      let data = await this.$axios.$get(`/api/bots/?page_size=15&ordering=-created_at`)
      commit('registNew', data)
    } catch (err) {
      // pass
    }
  },
  async fetchLike({ commit }) {
    try {
      let data = await this.$axios.$get(`/api/bots/?page_size=15`)
      commit('registLike', data)
    } catch (err) {
      // pass
    }
  },
  async fetchTag({ commit }) {
    try {
      let data = await this.$axios.$get(`/api/bottags/?limit=50&ordering=-count`)
      commit('registTag', data)
    } catch (err) {
      // pass
    }
  }
}
