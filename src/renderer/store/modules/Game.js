import Game from '../../components/Game/Game'

const state = {
  clientSocket: null,
  game: null
}

const mutations = {
  CONNECT (state, clientSocket) {
    state.clientSocket = clientSocket
  },
  INIT_GAME (state) {
    console.log('INIT_GAME')
    state.game = new Game()
    state.game.startGame()
    console.log(state.game)
  },
  SET_BOARD (state, payload) {
    state.game.select(payload.moveCoodinates.currIndex)
    state.game.move(payload.moveCoodinates.currIndex,
                         payload.moveCoodinates.finalIndex)
    state.game.printBoard()

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
  clientSocket (state) {
    return state.clientSocket
  },
  game (state) {
    console.log('Getting game from store.')
    console.log(state.game)
    return state.game
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
