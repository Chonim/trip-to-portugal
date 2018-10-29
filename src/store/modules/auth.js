export default {
  namespaced: true,
  actions: {
    changeUsername ({ commit }, username) {
      commit('changeUsername', username)
    }
  },
  mutations: {
    changeUsername (state, username) {
      state.username = username
    }
  },
  state: {
    username: ''
  },
  getters: {
    getUsername: state => {
      return state.username
    }
  }
}
