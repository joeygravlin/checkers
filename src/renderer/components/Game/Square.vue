<template>
  <div class="square white"></div>
</template>

<script>
  // import Square from 'Square.js'

  export default {
    name: 'square',
    data () {
      return {
        square: null
      }
    },
    methods: {
      // TODO
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
