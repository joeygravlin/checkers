class Game {
  constructor () {
    this.inProgress = true
    this.winner = null
    this.currentTurn = null
    this.squares = new Array(64).fill().map(s => new Square())
  }

  // TODO: Finish move
  move(finalIndex, currIndex) {
    if (this.inProgress && this.isValidMove(finalIndex, currIndex) && this.currentTurn === this.squares[currIndex].value) {
      this.squares[finalIndex].value = this.currentTurn
      this.squares[currIndex].value = null
      this.squares[currIndex].selected = false

      this.checkEndGame()

      this.currentTurn = (this.currentTurn === Game.black) ? Game.white : Game.black

      this.printBoard()
    } else {
      console.log('Move not valid!')
    }
  }

  // TODO: Finish valid move check
  isValidMove(finalIndex, currIndex) {
    let valid = false

    if (this.squares[finalIndex].isValid === true &&
      this.squares[finalIndex].value === null) {
      // if finalIndex is a valid/playable square AND no piece is there
      if (this.squares[currIndex].value === Game.white){
        // if the piece at curr index is white
        if (Math.floor(finalIndex / 8) - Math.floor(currIndex / 8) === 1 &&
            Math.abs((finalIndex % 8) - (currIndex % 8)) === 1) {
          // if the piece is moving down one row AND over one column
          valid = true
        } else if (Math.floor(finalIndex / 8) - Math.floor(currIndex / 8) === 2 &&
                  Math.abs((finalIndex % 8) - (currIndex % 8)) === 2 &&
                  this.canAttack(finalIndex, currIndex) === true) {
          // if the player can attack and is moving up
          valid = true
        }
      } else if (this.squares[currIndex].value === Game.black){
        if (Math.floor(finalIndex / 8) - Math.floor(currIndex / 8) === -1 &&
            Math.abs((finalIndex % 8) - (currIndex % 8)) === 1) {
          // if the piece is moving up one row AND over one column
          valid = true
        } else if (Math.floor(finalIndex / 8) - Math.floor(currIndex / 8) === -2 &&
                  Math.abs((finalIndex % 8) - (currIndex % 8)) === 2 &&
                  this.canAttack(finalIndex, currIndex) === true) {
          valid = true
        }
      } else if (this.square[currIndex].isKing === true) {
        if (Math.abs(Math.floor(finalIndex / 8) - Math.floor(currIndex / 8)) === 1) {
          valid = true
        } else if (Math.abs(Math.floor(finalIndex / 8) - Math.floor(currIndex / 8)) === 2 &&
                  this.canAttack(finalIndex, currIndex) === true) {
          valid = true
        }
      }
    }
    return valid
  }

  canAttack (finalIndex, currIndex) {
    let result = false

    if (Math.abs(finalIndex - currIndex) === 18) {
      if (this.squares[currIndex].value === Game.white) {
        if (this.squares[finalIndex - 9].value === Game.black) {
          result = true
          this.squares[finalIndex - 9].value = null
        }
      } else if (this.squares[currIndex].value === Game.black) {
        if (this.squares[finalIndex + 9].value === Game.white) {
          result = true
          this.squares[finalIndex + 9].value = null
        }
      }
    } else if(Math.abs(finalIndex - currIndex) === 14){
      if (this.squares[currIndex].value === Game.white) {
        if (this.squares[finalIndex - 7].value === Game.black) {
          result = true
          this.squares[finalIndex - 7].value = null
        }
      } else if (this.squares[currIndex].value === Game.black) {
        if (this.squares[finalIndex + 7].value === Game.white) {
          result = true
          this.squares[finalIndex + 7].value = null
        }
      }
    }
    return result
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
      }
    }
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
      if(this.squares[i].value === null){
        board += ' |  '
      } else {
        board += ' | ' + this.squares[i].value
      }

      if (i % 8 === 7) {
        board += ' |\n'
        board += '----------------------------------\n'
      }
    }
    console.log(board)
  }
}

Game.white = 'w'
Game.black = 'b'
