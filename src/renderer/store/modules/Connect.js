const state = {
  clientSocket: null
}

const mutations = {
  CONNECT (state, clientSocket) {
    state.clientSocket = clientSocket
  }
}

const actions = {
}

const getters = {
  clientSocket (state) {
    return state.clientSocket
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
