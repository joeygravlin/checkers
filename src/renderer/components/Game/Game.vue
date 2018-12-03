<template>
  <div id="checkerboardContainer">
    <div id="checkerboard">
        <div class="row" v-for="x in 8" :key=x>
            <square v-for="square in game.squares.slice(leftSlice[x-1],rightSlice[x-1])"
                    :key=square.index
                    v-bind:initialSquare="square"
                    @select-square="selectSquare"
                    @move="move"
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
        leftSlice: [0, 8, 16, 24, 32, 40, 48, 56],
        rightSlice: [8, 16, 24, 32, 40, 48, 56, 64],
        currentIndex: null,
        finalIndex: null,
        firstClick: null
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
        console.log(event)
        console.log(this.game.select(event.index))

        if (!this.firstClick) {
          this.currentIndex = event.index
          this.firstClick = true
        } else {
          this.finalIndex = event.index
          this.firstClick = false
        }
      },
      move (event) {
        console.log(this.game.move(this.currentIndex, this.finalIndex))
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
