export const state = () => ({
  name: '',
  id: '',
  isActive: false
})

export const mutations = {
  setData(state, payload) {
    state.name = payload.extra_data.username
    state.id = payload.uid
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
