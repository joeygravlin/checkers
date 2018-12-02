<template>
  <div id="checkerboardContainer">
    <div id="checkerboard">
      <!-- FIXME -->
      <div class="row">
        <square v-for="square in game.squares.slice(0,8)" v-bind:initialSquare="square"></square>
      </div>
      <div class="row">
        <square v-for="square in game.squares.slice(8,16)" v-bind:initialSquare="square"></square>
      </div>
      <div class="row">
        <square v-for="square in game.squares.slice(16,24)" v-bind:initialSquare="square"></square>
      </div>
      <div class="row">
        <square v-for="square in game.squares.slice(24,32)" v-bind:initialSquare="square"></square>
      </div>
      <div class="row">
        <square v-for="square in game.squares.slice(32,40)" v-bind:initialSquare="square"></square>
      </div>
      <div class="row">
        <square v-for="square in game.squares.slice(40,48)" v-bind:initialSquare="square"></square>
      </div>
      <div class="row">
        <square v-for="square in game.squares.slice(48,56)" v-bind:initialSquare="square"></square>
      </div>
      <div class="row">
        <square v-for="square in game.squares.slice(56,64)" v-bind:initialSquare="square"></square>
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
        game: null
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
