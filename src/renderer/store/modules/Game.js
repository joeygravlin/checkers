class Game {
  constructor () {
    this.inProgress = true
    this.winner = null
    this.currTurn = Game.red
    this.squares = new Array(64).fill.map(square => new Square())
    this.loadBoard()
    this.printBoard
  }

  // TODO: Finish move
  move(possIndex, currIndex) {
    if (this.inProgress && isValidMove(possIndex, currIndex)) {
      this.squares[possIndex].value = this.currentTurn


      this.checkEndGame()

      if (this.canAttack()) {
        this.squares[possIndex].canAttack = true
      }

      this.currentTurn = (this.currentTurn === Game.red) ? Game.black : Game.red
    }
  }

  // TODO: Finish valid move check
  isValidMove(possIndex, currIndex) {
    valid = false
    // if possIndex empty and within one row and at most 1 square diag left or right
    if (!this.sqares[possIndex].value && [possIndex](-9 < (possIndex - currIndex) < 9) && (-1 <= ((possIndex % 8) - (currIndex % 8)) <= 1)) {
      valid = true
    }
    // can attack
    else if () {

    }

    return valid
  }

  canAttack(currIndex) {

  }

  checkEndGame() {
    redPieces = 0;
    blackPieces = 0;

    squares.forEach(s => {
      if (s.value === 'r')
        redPieces++
      if (s.value === 'b')
        blackPieces++
    })

    if (redPieces === 0 || blackPieces === 0) {
      this.inProgress = false
      this.winner = (redPieces < blackPieces) ? Game.black : Game.red
    }
  }

  loadBoard() {
    for (i = 0; i < 64; i++) {
      if (i <= 21 && i % 2 === 0) {
        this.squares[i].value = Game.black
      }
      if (i >= 40 && i % 2 === 1) {
        this.squares[i].value = Game.red
      }
    }
  }

  //testing
  printBoard() {
    for (i = 0; i < 64; i++) {
      console.log("| " + this.squares[i].value + " | ")
      if (i % 8 === 7)
        console.log("\n")
    }
  }
}

Game.red = 'r'
Game.black = 'b'