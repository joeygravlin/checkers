const state = {
  board: [],
  winner: null
}

const mutations = {
  SET_BOARD (state, board) {
    state.board = board
  },
  WIN_GAME (state, winner) {
    state.winner = winner
  }
}

const actions = {
  send_turn ({ commit }, board) {
    // do something async
    commit('SET_BOARD', board)
  }
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
