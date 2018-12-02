<template>
  <div id="checkerboardContainer">
    <div id="checkerboard">
      <div class="row">
        <div class="square white"></div>
        <div class="square black "></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
      </div>
      <div class="row">
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
      </div>
      <div class="row">
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
      </div>
      <div class="row">
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
      </div>
      <div class="row">
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
      </div>
      <div class="row">
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
      </div>
      <div class="row">
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
      </div>
      <div class="row">
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Game from './Game.js'

  export default {
    name: 'game',
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
      },

      clearBoard () {
        // TODO: Necessary?
      }
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
