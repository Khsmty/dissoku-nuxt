export const state = () => ({
  list: []
})

function getDefaultElement() {
  return {
    next: null,
    previous: null,
    count: 0,
    total_pages: 1,
    current_page: 1,
    results: [],
    page_size: 1,
    range_first: 1,
    range_last: 0
  }
}

export const getters = {
  getById: (state) => (id) => {
    return state.list.find(ele => ele.id === id)
  }
}

export const mutations = {
  regist(state, data) {
    if (!state.list.find(ele => ele.id == data.id)) {
      state.list.push(data)
    }
  },
  add(state, data) {
    let target = state.list.find(ele => ele.id == data.id)
    let existing_result = target.results
    state.list = state.list.filter(ele => ele.id !== data.id)
    data.results = existing_result.concat(data.results)
    state.list.push(data)
  }
}

export const actions = {
  async fetch({ commit }, id) {
    try {
      let data = await this.$axios.$get(`/api/guildreviews/?guild=${id}&page=1`)
      data.id = id
      commit('regist', data)
    } catch (err) {
      let data = getDefaultElement()
      data.id = id
      commit('add', data)
    }
  },
  async more({ commit }, payload) {
    let data = await this.$axios.$get(payload.url)
    data.id = payload.id
    commit('add', data)
  }
}
