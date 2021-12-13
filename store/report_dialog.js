export const state = () => ({
  name: '',
  id: '',
  target: '',
  isActive: false
})

export const mutations = {
  setData(state, payload) {
    state.name = payload.name
    state.id = payload.id
    state.target = payload.target
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
