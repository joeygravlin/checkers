<template>
  <div>
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
    <div>
      <div v-if="!game.inProgress">
        <div v-if="!game.winner === this.color">
          <p class="gameEndMessage">Yeet, you won</p>
        </div>
        <div v-else>
          <p class="gameEndMessage">Ope, you lost</p>
        </div>
      </div>
    </div>
    <div>
      <info></info>
    </div>
  </div>
</template>

<script>
  import Game from './Game.js'
  import Square from './Square.vue'
  import Info from '../Info/Info'
  import {mapGetters} from 'vuex'
  // import {mapState} from 'vuex'

  export default {
    name: 'game',

    components: {
      Square,
      Info
    },

    data () {
      return {
        currentSquareIndex: null
      }
    },

    computed: {
      // localComputed () { /* ... */ },
      // mix this into the outer object with the object spread operator
      ...mapGetters([
        'clientSocket',
        'game',
        'color'
      ])
    },

    methods: {
      clearBoard () {
        // TODO: Necessary?
      },
      selectSquare (event) {
        if (this.game.attacked === false &&
            event.value === this.game.currentTurn &&
            this.color === event.value) {
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
            let payload = {
              moveCoodinates: {currIndex: this.currentSquareIndex,
                              finalIndex: event.index}
            }
            this.clientSocket.write(JSON.stringify(payload))
            console.log(`Payload to send: ${JSON.stringify(payload)}`)
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
    }
  }
</script>

<style lang="sass" scoped>

    #checkerboardContainer
        display: flex
        justify-content: center
        margin-top: 21px

        .gameEndMessage
            position: absolute
            bottom: 0
            left: 45%
            font-size: 24px

        #checkerboard
            width: 479.8px
            height: 479.8px
            border: 4px solid #000000

            .row
                height: 60px
                width: 480px
                display: flex
                flex-direction: row
</style>
