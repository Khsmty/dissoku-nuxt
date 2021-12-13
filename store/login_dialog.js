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
  openDialog({ commit }) {
    commit('active')
  },
  closeDialog({ commit }) {
    commit('deactive')
  }
}