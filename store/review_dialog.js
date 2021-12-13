export const state = () => ({
  message: '',
  score: 1,
  func: '',
  isActive: false
})

export const mutations = {
  setData(state, payload) {
    state.message = payload.message
    state.score = payload.score
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
    commit('setData', payload)
    commit('active')
  },
  setFunction({ commit }, func) {
    commit('setFunc', func)
    commit('active')
  },
  closeDialog({ commit }) {
    commit('deactive')
    commit('setData', '')
  }
}