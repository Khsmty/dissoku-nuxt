export const state = () => ({
  list_update: [],
  list_tag: [],
})

export const getters = {
  getUpdate: state => {
    return state.list_update[0]
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
  registTag(state, data) {
    state.list_tag = []
    state.list_tag.push(data)
  }
}

export const actions = {
  async fetchUpdate({ commit }) {
    try {
      let data = await this.$axios.$get(`/api/userprofiles/?page_size=24&ordering=-upped_at`)
      commit('registUpdate', data)
    } catch (err) {
      // pass
    }
  },
  async fetchTag({ commit }) {
    try {
      let data = await this.$axios.$get(`/api/usertags/?limit=75&ordering=-count`)
      commit('registTag', data)
    } catch (err) {
      // pass
    }
  }
}
