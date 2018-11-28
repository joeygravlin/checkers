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
      this.squares[currIndex].value = null


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
    // if squares[possIndex] is empty AND
    // if squares[possIndex] is valid AND
    // if the diff between squares[possIndex] % 8 and squares[currIndex] is 1 (ie is it moving diagonally)
    if (this.squares[possIndex].isValid === true &&
      this.squares[possIndex].value === null &&
      Math.abs((possIndex % 8) - (currIndex % 8)) === 1) {
      // if players piece is NOT a king
      if (this.squares[currIndex].isKing === false) {
        // if player is moving in the right direction (ie if it piece is white is it moving to the next row down (eg to an index in the next (printed) row) OR
        //if it piece is red is moving to the previous row down (eg to an index in the previous (printed) row))
        if ((this.squares[currIndex].value === Game.white &&
          Math.floor(possIndex / 8) - Math.floor(currIndex / 8) === 1) ||
          (this.squares[currIndex].value === Game.red &&
            Math.floor(possIndex / 8) - Math.floor(currIndex / 8) === -1)) {
          valid = true
        }
      }
      else {
        valid = true
      }
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