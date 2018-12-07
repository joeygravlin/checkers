<template>
    <div id="menu">
        <ul>
            <li :class="{ active: setUsersTurn() }" tag="li"><a :class="{ active: setUsersTurn() }">{{ userColor() }}</a><br><a>Me</a></li>
            <li :class="{ active: !setUsersTurn() }" tag="li"><a :class="{ active: !setUsersTurn() }">{{ opponentColor() }}</a><br><a>Them</a></li>
        </ul>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Info',

  data () {
    return {
      usersTurn: true
    }
  },

  computed: {
      // localComputed () { /* ... */ },
      // mix this into the outer object with the object spread operator
      ...mapGetters([
        'game',
        'color'
      ])
    },

    methods: {
      setPlayerColor () {
        if (this.color === 'w') {
          userColor = 'White'
          opponetColor = 'Black'
        }
      },
      setUsersTurn () {
        return (this.game.currentTurn === this.color) ? true : false
      },
      userColor() {
        return (this.color === 'b') ? 'Black' : 'White'
      },
      opponentColor() {
        return (this.color === 'b') ? 'White' : 'Black'
      }
    }
}
</script>

<style lang="sass" scoped>

    #menu
        ul
            list-style-type: none
            margin: 0 auto
            padding: 0
            display: flex
            justify-content: center
            width: 500px

            li
                padding: 5px
                margin: 5px
                box-shadow: 3px 2px 6px #000000
                transition: hover 1s
                user-select: none
                text-align: center

                &:active
                    box-shadow: 1px 0px 4px #000000

                a
                    padding: 5px
                    color: #000000
                    text-decoration: none
                    text-align: center

                &.active
                    background-color: #8BC34A

</style>


