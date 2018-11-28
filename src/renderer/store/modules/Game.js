class Game {
  constructor () {
    this.inProgress = false
    this.winner = null
    this.currTurn = null
    this.squares = new Array(64).fill.map(square => new Square())
  }

  // TODO: Finish move
  move(possIndex, currIndex) {
    if (this.inProgress && isValidMove(possIndex, currIndex)) {
      this.squares[possIndex].value = this.currentTurn


      this.checkEndGame()

      if (this.canAttack()) {
        this.squares[possIndex].canAttack = true
      }

      this.currentTurn = (this.currentTurn === Game.red) ? Game.white : Game.red
    }
  }

  // TODO: Finish valid move check
  isValidMove(possIndex, currIndex) {
    valid = false
    // if possIndex empty and within one row and at most 1 square diag left or right
    if () {
      valid = true
    }
    // can attack
    else if () {

    }

    return valid
  }

  canAttack(currIndex) {
    if (this.squares[currIndex].isKing === false) {

    } else {

    }
  }

  checkEndGame() {
    whitePieces = 0;
    blackPieces = 0;

    squares.forEach(s => {
      if (s.value === Game.white)
        redPieces++
      if (s.value === Game.red)
        blackPieces++
    })

    if (redPieces === 0 || blackPieces === 0) {
      this.inProgress = false
      this.winner = (whitePieces < blackPieces) ? Game.white : Game.red
    }
  }

  loadBoard() {
    for (i = 0; i < 64; i++) {
      //setting squares as valid, putting pieces "on" board
      if ((Math.floor(i / 8) % 2 === 0 && (i % 2) === 0) ||
        (Math.floor(i / 8) % 2 === 1 && (i % 2) === 1)) {
        this.squares[i].isValid = true
        if (i <= 31)
          this.squares[i].value = Game.white
        if (i <= 48)
          this.squares[i].value = Game.red
      }
    }
  }


  startGame() {
    this.inProgress = true
    this.currTurn = Game.black
    this.loadBoard()
    this.printBoard()
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

Game.white = 'w'
Game.black = 'b'