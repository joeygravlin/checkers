<template>
  <div id="checkerboardContainer">
    <div id="checkerboard">
        <div class="row" v-for="x in 8" :key=x>
            <square v-for="square in game.squares.slice(leftSlice[x-1],rightSlice[x-1])" v-bind:initialSquare="square" :key=square></square>
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
        rightSlice: [8, 16, 24, 32, 40, 48, 56, 64]
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
