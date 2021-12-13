export const state = () => ({
  list_update: [],
  list_active: [],
  list_tag: []
})

export const getters = {
  getUpdate: state => {
    return state.list_update[0]
  },
  getActive: state => {
    return state.list_active[0]
  },
  getTag: state => {
    return state.list_tag[0]
  }
}

export const mutations = {
  registUpdate(state, data) {
    state.list_update = []
    state.list_update.push(data)
  },
  registActive(state, data) {
    state.list_active = []
    state.list_active.push(data)
  },
  registTag(state, data) {
    state.list_tag = []
    state.list_tag.push(data)
  }
}

export const actions = {
  async fetchUpdate({ commit }) {
    try {
      let data = await this.$axios.$get(`/api/guilds/?page_size=15`)
      commit('registUpdate', data)
    } catch (err) {
      // pass
    }
  },
  async fetchActive({ commit }) {
    try {
      let data = await this.$axios.$get(`/api/guilds/?page_size=15&ordering=-exp,-upped_at`)
      commit('registActive', data)
    } catch (err) {
      // pass
    }
  },
  async fetchTag({ commit }) {
    try {
      let data = await this.$axios.$get(`/api/tags/?limit=35&ordering=-count`)
      commit('registTag', data)
    } catch (err) {
      // pass
    }
  }
}
