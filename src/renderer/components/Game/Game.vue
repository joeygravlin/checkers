<template>
  <div>
    <h1>GAME!</h1>
    <!-- TODO: Build build board here (idea: for(each) square in this.game.squares make a div to represent the square) -->
    <div id="checkerboard">
      <!-- FIXME -->
      <div class="row">
        <square v-for="square in game.squares.slice(0,7)" v-bind:initialSquare="square"></square>
      </div>
      <div class="row">
        <square v-for="square in game.squares.slice(8,15)" v-bind:initialSquare="square"></square>
      </div>
      <div class="row">
        <square v-for="square in game.squares.slice(16,23)" v-bind:initialSquare="square"></square>
      </div>
      <div class="row">
        <square v-for="square in game.squares.slice(24,31)" v-bind:initialSquare="square"></square>
      </div>
      <div class="row">
        <square v-for="square in game.squares.slice(32,39)" v-bind:initialSquare="square"></square>
      </div>
      <div class="row">
        <square v-for="square in game.squares.slice(40,47)" v-bind:initialSquare="square"></square>
      </div>
      <div class="row">
        <square v-for="square in game.squares.slice(48,55)" v-bind:initialSquare="square"></square>
      </div>
      <div class="row">
        <square v-for="square in game.squares.slice(56,63)" v-bind:initialSquare="square"></square>
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

  #checkerboard
    width: 480px
    height: 480px
    border: 1px solid #000000

    .row
      height: 60px
      width: 480px
      display: flex
      flex-direction: row

      .square
        height: 60px
        width: 60px

        &.white
            background: #ffffff

        &.black
            background: #000000

</style>
