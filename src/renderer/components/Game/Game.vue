<template>
  <div id="checkerboardContainer">
    <div id="checkerboard">
      <div class="row" v-for="(n, x) in 8" :key=x>
        <square v-for="square in game.squares.slice((x*8),(x*8)+8)"
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

  import {mapGetters} from 'vuex';
  // import {mapState} from 'vuex';

  export default {
    name: 'game',

    components: {
      Square
    },

    data () {
      return {
        currentSquareIndex: null,
        host: 'localhost',
        port: 9381,
        connection: null
      }
    },

    computed: {
      // localComputed () { /* ... */ },
      // mix this into the outer object with the object spread operator
      ...mapGetters([
        'clientSocket',
        'game'
      ])
    },

    methods: {
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
      console.log('Pre "INIT_GAME')
      this.$store.commit('INIT_GAME')
      console.log(`game: ${this.game}`)

      const net = require('net')
      const socket = new net.Socket()

      socket.connect(this.port, this.host, () => {
        console.log(`Connected to ${this.host}:${this.port}`)
        // send the board
        socket.write(JSON.stringify(this.game))
      })

      socket.on('data', (data) => {
        console.log(JSON.parse(data))
      })
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
