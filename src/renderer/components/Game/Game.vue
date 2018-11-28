<template>
  <div>
    <!-- TODO: Build build board here (idea: for(each) square in this.game.squares make a div to represent the square) -->
  </div>
</template>

<script>
  import Game from "./Game.js";
  import Square from "./Square.js";

  export default {
    name: "game",

    data() {
      return {
        // TODO: Should discuss
      };
    },

    methods: {
      start() {
        this.clearBoard();
        this.game = new Game();
        //TODO: moar?
      },

      clearBoard() {
        //TODO: Necessary?
      }
    }
  };
</script>
