export const state = () => ({
  isActive: false
})

export const mutations = {
  active(state) {
    state.isActive = true
  },
  deactive(state) {
    state.isActive = false
  }
}

export const actions = {
  startLoading({ commit }) {
    commit('active')
  },
  endLoading({ commit }) {
    commit('deactive')
  }
}