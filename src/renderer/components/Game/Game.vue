<template>
  <div id="checkerboardContainer">
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

                .square
                    height: 60px
                    width: 60px
                    position: relative

                    &.white
                        background: #ffffff

                        &.hasWhitePiece
                            &:before
                                content: ''
                                border: 1px solid #000000
                                width: 40px
                                height: 40px
                                position: absolute
                                border-radius: 21px
                                top: 9px
                                left: 9px
                                background-color: #ffffff
                                box-shadow: 2px 2px 2px #000000
                                cursor: pointer

                        &.hasBlackPiece
                            &:before
                                content: ''
                                border: 1px solid #000000
                                width: 40px
                                height: 40px
                                position: absolute
                                border-radius: 21px
                                top: 9px
                                left: 9px
                                background-color: #000000
                                box-shadow: 2px 2px 2px #000000
                                cursor: pointer

                    &.black
                        background: #000000
</style>
