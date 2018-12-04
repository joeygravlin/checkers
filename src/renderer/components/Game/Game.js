import Square from './Square'

export default class Game {
  constructor () {
    this.inProgress = true
    this.winner = null
    this.currentTurn = null
    this.attacked = false
    this.squares = new Array(64).fill().map(s => new Square())
  }

  // TODO: Finish move
  move (currIndex, finalIndex) {
    if (this.inProgress &&
        this.currentTurn === this.squares[currIndex].value &&
        this.squares[currIndex].validMoves.indexOf(finalIndex) > -1) {
      let diff = finalIndex - currIndex

      this.movePiece(currIndex, finalIndex)

      // king me
      this.isKing()

      // player is attacking
      if (Math.abs(diff) > 9) {
        this.playerAttacked(currIndex, finalIndex)
      }

      this.checkEndGame()
      this.turnChange(finalIndex)
      this.printBoard()
    } else {
      console.log('Move not valid!')
    }
  }

  movePiece(currIndex, finalIndex) {
    // move the piece
    this.squares[finalIndex].isKing = this.squares[currIndex].isKing
    this.squares[finalIndex].value = this.currentTurn
    this.squares[currIndex].value = null
    this.squares[currIndex].selected = false
    this.squares[currIndex].canAttack = false
    this.squares[currIndex].isKing = false
    this.squares[currIndex].isSelected = false
  }

  turnChange (finalIndex) {
    // turn change
    if (!this.squares[finalIndex].canAttack) {
      this.attacked = false
      this.squares.forEach(s => {
        s.isSelected = false
        s.isValidMove = false
        s.canAttack = false
        s.validMoves = []
      })
      this.attacked = false
      this.currentTurn = (this.currentTurn === Game.black) ? Game.white : Game.black
    }
  }

  playerAttacked (currIndex, finalIndex) {
    let diff = finalIndex - currIndex
    // remove the captured index
    this.squares[currIndex + (diff / 2)].value = null
    this.squares[currIndex + (diff / 2)].canAttack = false
    this.squares[currIndex + (diff / 2)].isKing = false
    this.squares[currIndex].validMoves = []
    this.attacked = true
    this.select(finalIndex)
  }

  checkRegularMove(currIndex, offset) {
    // if that currIndex + offset is also 1 rows back, and 1 cols to the left
    // needed for edge detection of the 2d representation of the board
    if ((currIndex + offset) >= 0 && (currIndex + offset) < 64) {
      if (Math.abs(Math.floor((currIndex + offset) / 8) - Math.floor(currIndex / 8)) === 1 &&
        Math.abs(((currIndex + offset) % 8) - (currIndex % 8)) === 1) {
        // if the destination square is alse empty
        if (this.squares[currIndex + offset].value === null) {
          this.squares[currIndex].validMoves.push(currIndex + offset)
        }
      }
    }
  }

  checkAttackMove(currIndex, offset) {
    if ((currIndex + offset) >= 0 && (currIndex + offset) < 64) {
      if (this.squares[currIndex + (offset / 2)].value !== null &&
        this.squares[currIndex + (offset / 2)].value !== this.squares[currIndex].value) {
        // if that currIndex + offset is also 2 rows up, and 2 cols to the right
        // needed for edge detection of the 2d representation of the board
        if (Math.abs(Math.floor((currIndex + offset) / 8) - Math.floor(currIndex / 8)) === 2 &&
          Math.abs(((currIndex + offset) % 8) - (currIndex % 8)) === 2) {
          // if the destination, square is also empty
          if (this.squares[currIndex + offset].value === null) {
            this.squares[currIndex].validMoves.push(currIndex + offset)
            this.squares[currIndex].canAttack = true
          }
        }
      }
    }
  }

  getValidMoves (currIndex) {
    let diagLeft = 7
    let diagRight = 9

    if (this.squares[currIndex].value === Game.black) {
      diagLeft = -9
      diagRight = -7
    }

    this.squares[currIndex].validMoves = []
    this.getAttacks(currIndex)

    // if the piece can't attack, look for valid non-attack moves
    if (!this.squares[currIndex].canAttack) {
      // if the piece is a king
      if (this.squares[currIndex].isKing) {
        this.checkRegularMove(currIndex, -diagLeft)
        this.checkRegularMove(currIndex, -diagRight)
      }
      this.checkRegularMove(currIndex, diagLeft)
      this.checkRegularMove(currIndex, diagRight)
    }
  }

  getAttacks (currIndex) {
    let diagLeft = 14
    let diagRight = 18

    if (this.squares[currIndex].value === Game.black) {
      diagLeft = -18
      diagRight = -14
    }

    if (this.squares[currIndex].isKing) {
      this.checkAttackMove(currIndex, -diagLeft)
      this.checkAttackMove(currIndex, -diagRight)
    }
    this.checkAttackMove(currIndex, diagLeft)
    this.checkAttackMove(currIndex, diagRight)
  }

  isKing () {
    let i
    for (i = 0; i < 8; i++) {
      if (this.squares[i].value === Game.black) {
        this.squares[i].isKing = true
      }
    }
    for (i = 56; i <= 63; i++) {
      if (this.squares[i].value === Game.white) {
        this.squares[i].isKing = true
      }
    }
  }

  checkEndGame () {
    let whitePieces = 0
    let blackPieces = 0

    this.squares.forEach(s => {
      if (s.value === Game.white) {
        whitePieces++
      }
      if (s.value === Game.black) {
        blackPieces++
      }
    })

    if (whitePieces === 0 || blackPieces === 0) {
      this.inProgress = false
      this.winner = (whitePieces < blackPieces) ? Game.white : Game.black
    }
  }

  loadBoard () {
    var i
    for (i = 0; i < 64; i++) {
      this.squares[i].index = i
      // setting squares as valid, putting pieces "on" board
      if ((Math.floor(i / 8) % 2 === 0 && (i % 2) === 0) ||
        (Math.floor(i / 8) % 2 === 1 && (i % 2) === 1)) {
        this.squares[i].isValid = true
        if (i <= 23) {
          this.squares[i].value = Game.white
        }
        if (i >= 40) {
          this.squares[i].value = Game.black
        }
        this.squares[i].color = 'white'
      } else {
        this.squares[i].color = 'black'
      }
    }
  }

  select (currIndex) {
    if (this.squares[currIndex].value === this.currentTurn) {
      // reset valid moves and any previously selected sqaures to false
      this.squares.forEach(s => {
        s.isValidMove = false
        s.isSelected = false
      })

      // select current square
      this.squares[currIndex].isSelected = true

      // get the valid moves
      this.getValidMoves(currIndex)

      // set moves as valid
      this.squares[currIndex].validMoves.forEach(validMoveIndex => {
        this.squares[validMoveIndex].isValidMove = true
      })

      this.printBoard()
    } else {
      console.log('Invalid selection!')
    }
  }

  unselect () {
    this.squares.forEach(s => {
      s.isSelected = false
      s.canAttack = false
      s.isValidMove = false
      s.validMoves = []
    })
  }

  startGame () {
    this.inProgress = true
    this.currentTurn = Game.black
    this.loadBoard()
    this.printBoard()
  }

  // testing
  printBoard () {
    var i
    var board = ''
    for (i = 0; i < 64; i++) {
      if (this.squares[i].value === null) {
        if (this.squares[i].isValidMove) {
          board += ' | *'
        } else {
          board += ' |  '
        }
      } else {
        board += ' | ' + this.squares[i].value
      }
      if (i % 8 === 7) {
        board += ' |\n'
        board += '-----------------------------------\n'
      }
    }
    console.log(board)
  }
}

Game.white = 'w'
Game.black = 'b'
