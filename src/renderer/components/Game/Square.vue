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

  square
    height: 60px
    width: 60px

    &.white
        background: #ffffff

    &.black
        background: #000000

</style>
