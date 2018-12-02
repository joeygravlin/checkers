<template>
  <div class="square" v-bind:class="square.value == 'w' ? 'white' : 'black'"></div>
</template>

<script>
  // import Square from 'Square.js'

  export default {
    name: 'square',

    props: [
      'initialSquare'
    ],

    data () {
      return {
        square: this.initialSquare
      }
    },

    methods: {
      // TODO
    },

    mounted () {
      console.log(this.square)
    }
  }
</script>

<style lang="sass" scoped>

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
