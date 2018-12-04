<template>
  <div id="checkerboardContainer">
    <div id="checkerboard">
        <div class="row" v-for="x in 8" :key=x>
            <square v-for="square in game.squares.slice(leftSlice[x-1],rightSlice[x-1])"
                    :key=square.index
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
  import Connect from '../Connect/Connect.vue'

  export default {
    name: 'game',

    components: {
      Square
    },

    data () {
      return {
        // TODO: Should discuss
        game: null,
        moveStack: null,
        leftSlice: [0, 8, 16, 24, 32, 40, 48, 56],
        rightSlice: [8, 16, 24, 32, 40, 48, 56, 64],
        HOST: '127.0.0.1',
        PORT: 3000
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
        if (this.moveStack !== null) {
          if (this.game.squares[this.moveStack].validMoves.includes(event.index)) {
            this.game.move(this.moveStack, event.index)
            // Now send the new board to the server
            const net = require('net')
            const client = new net.Socket()

            client.connect(this.PORT, this.HOST, () => {
              console.log('CONNECTED TO: ' + this.HOST + ':' + this.PORT)
              client.write(JSON.stringify(this.game.squares))
            })

            client.on('data', (data) => {
              console.log(JSON.parse(data))
            })

            client.on('close', () => console.log('Connection closed'))
          }
          this.moveStack = null
        } else if (event.value === this.game.currentTurn) {
          this.game.select(event.index)
          this.moveStack = event.index
        } else {
          this.game.unselect()
          this.moveStack = null
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
