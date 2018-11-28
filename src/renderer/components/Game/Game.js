class Game {
  constructor () {
    this.inProgress = true
    this.winner = null
    this.currentTurn = null
    this.squares = new Array(64).fill.map(square => new Square())
  }

  // TODO: Finish move
  move(finalIndex, currIndex) {
    if (this.inProgress && isValidMove(finalIndex, currIndex)) {
      this.squares[finalIndex].value = this.currentTurn
      this.squares[currIndex].value = null
      this.squares[currIndex].selected = false

      this.checkEndGame()

      // NOT SURE WE WANT THIS IN THIS FORM
      if (this.canAttack(finalIndex)) {
        this.squares[finalIndex].canAttack = true
        this.squares[finalIndex].selected = true

      }
      else {
        this.currentTurn = (this.currentTurn === Game.black) ? Game.white : Game.black
      }
    }
  }

  // TODO: Finish valid move check
  isValidMove(finalIndex, currIndex) {
    valid = false

    // if squares[finalIndex] is empty
    // AND
    // if squares[finalIndex] is valid
    // AND
    // if the absolute diff between squares[finalIndex] % 8 and squares[currIndex] % 8 is 1 (ie is it moving diagonally)
    if (this.squares[finalIndex].isValid === true &&
      this.squares[finalIndex].value === null &&
      Math.abs((finalIndex % 8) - (currIndex % 8)) === 1) {

      // if players piece is NOT a king
      if (this.squares[currIndex].isKing === false) {

        // if player is moving in the right direction (ie if it piece is white is it moving to the next row down (eg to an index in the next (printed) row)
        // OR
        // if piece is white is moving to the previous row down (eg to an index in the previous (printed) row))
        if ((this.squares[currIndex].value === Game.white &&
          Math.floor(finalIndex / 8) - Math.floor(currIndex / 8) === 1) ||
          (this.squares[currIndex].value === Game.black &&
            Math.floor(finalIndex / 8) - Math.floor(currIndex / 8) === -1)) {
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
    canAttack = false

    //diag direction Game.white
    diagLeft = 7
    diagRight = 9

    //diag direction Game.black
    if (this.currentTurn === Game.black) {
      diagLeft = -9
      diagRight = -7
    }

    // if either square in the "forward" direction does not equal the current players turn and is not null
    // OR
    // if either square in the "backwards" direction does not equal the current players turn and is not null AND players piece is a king:
    // --> CAN ATTACK
    if ((this.squares[currIndex + diagLeft].value != this.currentTurn
      && this.squares[currIndex + diagLeft].value != null) ||
      (this.squares[currIndex + diagRight].value != this.currentTurn
        && this.squares[currIndex + diagRight].value != null) ||
      (this.squares[currIndex].isKing === true &&
        ((this.squares[currIndex - diagLeft].value != this.currentTurn &&
          this.squares[currIndex - diagLeft].value != null) ||
          (this.squares[currIndex - diagRight].value != this.currentTurn &&
            this.squares[currIndex - diagRight].value != null)))) {
      this.canAttack = true
    }

    return canAttack
  }

  checkEndGame() {
    whitePieces = 0
    blackPieces = 0

    squares.forEach(s => {
      if (s.value === Game.white)
        whitePieces++
      if (s.value === Game.black)
        blackPieces++
    })

    if (whitePieces === 0 || blackPieces === 0) {
      this.inProgress = false
      this.winner = (whitePieces < blackPieces) ? Game.white : Game.black
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
          this.squares[i].value = Game.black
      }
    }
  }

  startGame() {
    this.inProgress = true
    this.currentTurn = Game.black
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