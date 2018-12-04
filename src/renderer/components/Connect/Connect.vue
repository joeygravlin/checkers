<template>
  <div>
    <h1>Connect to an opponent Player!</h1>
    <button @click="connect">Connect</button>
  </div>
</template>

<script>
import Game from '../Game/Game'

export default {
  name: 'connect',
  data () {
      return {
          HOST: '127.0.0.1',
          PORT: 3000
      }
  },
  methods: {
      connect () {
        const net = require('net')
        const client = new net.Socket()

        client.connect(this.PORT, this.HOST, () => {
          console.log('CONNECTED TO: ' + this.HOST + ':' + this.PORT)
          client.write(Game.game)
        })
      }
  }
}
</script>