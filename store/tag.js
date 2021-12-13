export const state = () => ({
    tag: [],
    search_tag: [],
    category_tag: []
})

export const getters = {
  getTag: state => {
    return state.tag[0]
  },
  getSearchTag: state => {
    return state.search_tag[0]
  },
  getCategoryTag: state => {
    return state.category_tag[0]
  }
}

export const mutations = {
  registTag(state, data) {
    state.tag = []
    state.tag.push(data)
  },
  registSearchTag(state, data) {
    state.search_tag = []
    state.search_tag.push(data)
  },
  registCategoryTag(state, data) {
    state.category_tag = []
    state.category_tag.push(data)
  }
}

export const actions = {
  async fetchSearchTag({ commit }) {
    try {
      let data = await this.$axios.$get(`/api/tags/category_key/`)
      commit('registSearchTag', data)
    } catch (err) {
      // pass
    }
  },
  async fetchCategoryTag({ commit }, order) {
    try {
      let tag_data  = await this.$axios.$get(`/api/tags/?name=${encodeURIComponent(order)}`)
      let data = await this.$axios.$get(`/api/tags/?category=${encodeURIComponent(tag_data[0].category)}&limit=15`)
      commit('registTag', tag_data[0])
      commit('registCategoryTag', data)
    } catch (err) {
      // pass
    }
  }
}
