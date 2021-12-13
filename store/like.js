export const state = () => ({
  list: []
})

export const mutations = {
  add(state, data) {
    state.list = state.list.filter(ele => !(ele.type==data.type && ele.id==data.id))
    state.list.push({count: data.likes, is_like: data.is_like, type:data.type, id:data.id, url:`/api/${data.type}s/${data.id}/like/`})
  },
  toggle(state, like) {
    like.count += like.is_like ? -1 : 1
    like.is_like = !like.is_like
  }
}

export const actions = {
  setData({ commit }, data) {
    commit('add', data)
  }
}
