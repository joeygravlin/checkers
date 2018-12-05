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
    console.log('SET_BOARD')
    state.game.movePiece(payload.moveCoodinates.currIndex,
                         payload.moveCoodinates.finalIndex)
    // // state.game.squares = payload.squares
    // state.game.squares = []
    // state.game.squares.push(...payload.squares)
    //
    // Vue Reactivity is Wiggity-Wack...
    // https://vuejs.org/v2/guide/list.html#Caveats
    for (var i = state.game.squares.length - 1; i >= 0; i--) {
      state.game.squares[i].index = payload.squares[i].index
      state.game.squares[i].value = payload.squares[i].value
      state.game.squares[i].color = payload.squares[i].color
      state.game.squares[i].isSelected = payload.squares[i].isSelected
      state.game.squares[i].canAttack = payload.squares[i].canAttack
      state.game.squares[i].isKing = payload.squares[i].isKing
      state.game.squares[i].isValid = payload.squares[i].isValid
      state.game.squares[i].isValidMove = payload.squares[i].isValidMove
      state.game.squares[i].validMoves = payload.squares[i].validMoves
    }
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
