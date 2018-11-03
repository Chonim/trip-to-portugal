export default {
  namespaced: true,
  actions: {
    changeUsername ({ commit }, username) {
      commit('changeUsername', username)
    },
    changeUserPhoto ({ commit }, photoUrl) {
      commit('changeUserPhoto', photoUrl)
    }
  },
  mutations: {
    changeUsername (state, username) {
      state.username = username
    },
    changeUserPhoto (state, photoUrl) {
      state.photoUrl = photoUrl
    }
  },
  state: {
    username: '',
    photoUrl: 'https://randomuser.me/api/portraits/men/85.jpg'
  },
  getters: {
    getUsername: state => state.username,
    getUserPhoto: state => state.photoUrl
  }
}
