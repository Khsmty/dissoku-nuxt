export const state = () => ({
  name: '',
  id: '',
  isActive: false
})

export const mutations = {
  setData(state, payload) {
    state.name = payload.name
    state.id = payload.id
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
