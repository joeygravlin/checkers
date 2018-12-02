export default class Square {
  constructor () {
    this.value = null
    this.isSelected = false
    this.canAttack = false
    this.isKing = false
    this.isValid = false
    this.isValidMove = false
    this.validMoves = []
  }
}
