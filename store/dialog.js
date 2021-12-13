export const state = () => ({
  message: '',
  color: '',
  isActive: false
})

export const mutations = {
  setData(state, payload) {
    state.message = payload.message
    state.color = payload.color
  },
  active(state) {
    state.isActive = true
  },
  deactive(state) {
    state.isActive = false
  }
}

export const actions = {
  openDialog({ commit }, payload) {
    commit('setData', payload)
    commit('active')
  },
  closeDialog({ commit }) {
    commit('deactive')
  }
}