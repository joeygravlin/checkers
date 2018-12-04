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
  SET_BOARD (state, board) {
    console.log('SET_BOARD')
    // // state.game.squares = board
    // state.game.squares = []
    // state.game.squares.push(...board)
    //
    // Vue Reactivity is Wiggity-Wack...
    // https://vuejs.org/v2/guide/list.html#Caveats
    for (var i = state.game.squares.length - 1; i >= 0; i--) {
      state.game.squares[i].index = board[i].index
      state.game.squares[i].value = board[i].value
      state.game.squares[i].color = board[i].color
      state.game.squares[i].isSelected = board[i].isSelected
      state.game.squares[i].canAttack = board[i].canAttack
      state.game.squares[i].isKing = board[i].isKing
      state.game.squares[i].isValid = board[i].isValid
      state.game.squares[i].isValidMove = board[i].isValidMove
      state.game.squares[i].validMoves = board[i].validMoves
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
