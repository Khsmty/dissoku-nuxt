export const state = () => ({
  title: '',
  message: '',
  func: '',
  isActive: false
})

export const mutations = {
  setMessage(state, payload) {
    state.title = payload.title
    state.message = payload.message
  },
  setFunc(state, func) {
    state.func = func
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
    commit('setMessage', payload)
    commit('active')
  },
  setFunction({ commit }, func) {
    commit('setFunc', func)
    commit('active')
  },
  closeDialog({ commit }) {
    commit('deactive')
    commit('setMessage', '')
  }
}
