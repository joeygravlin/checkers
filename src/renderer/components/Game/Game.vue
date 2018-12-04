<template>
  <div id="checkerboardContainer">
    <div id="checkerboard">
<<<<<<< HEAD
        <div class="row" v-for="(n, x) in 8" :key=x>
            <square v-for="square in game.squares.slice((x*8),(x*8)+8)"
                    :key=square.index
=======
        <div class="row" v-for="x in 8" :key=x>
            <square :key=square.index
                    v-for="square in game.squares.slice(leftSlice[x-1],rightSlice[x-1])"
>>>>>>> af06f121f7e30ff59dd4235bf05f09a4fa94055c
                    v-bind:initialSquare="square"
                    @select-square="selectSquare"
            ></square>
        </div>
    </div>
  </div>
</template>

<script>
  import Game from './Game.js'
  import Square from './Square.vue'

  export default {
    name: 'game',

    components: {
      Square
    },

    data () {
      return {
        // TODO: Should discuss
        game: null,
        currentSquareIndex: null
      }
    },

    methods: {
      start () {
        this.clearBoard()
        this.game = new Game()
        // TODO: moar?
        this.game.startGame()
      },

      clearBoard () {
        // TODO: Necessary?
      },
      selectSquare (event) {
        if (this.game.attacked === false && event.value === this.game.currentTurn) {
          if (event.value === this.game.currentTurn) {
            this.game.select(event.index)
            this.currentSquareIndex = event.index
          } else {
            this.game.unselect()
            this.currentSquareIndex = null
          }
        } else if (this.currentSquareIndex !== null) {
          if (this.game.squares[this.currentSquareIndex].validMoves.includes(event.index)) {
            this.game.move(this.currentSquareIndex, event.index)
            if (this.game.attacked) {
              this.currentSquareIndex = event.index
              this.game.select(event.index)
            } else {
              this.currentSquareIndex = null
            }
          }
        }
      }
    },

    created () {
      // Init the game on component creation for now...
      // Later, we will init on opponent connect via network.
      this.start()
    }
  }
</script>

<style lang="sass" scoped>

    #checkerboardContainer
        display: flex
        justify-content: center
        margin-top: 21px

        #checkerboard
            width: 479.8px
            height: 479.8px
            border: 1px solid #000000

            .row
                height: 60px
                width: 480px
                display: flex
                flex-direction: row

</style>
