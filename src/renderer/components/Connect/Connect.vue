<template>
  <h1 @click="connect">Connect to an opponent Player!</h1>
</template>

<script>
import Game from '../Game/Game'

export default {
  name: 'connect',
  data () {
    return {
      host: '127.0.0.1',
      port: 3000,
      client: null
    }
  },
  methods: {
    connect () {
      const net = require('net')
      const client = new net.Socket()
      this.client = client

      client.connect(this.port, this.host, () => {
        console.log('CONNECTED TO: ' + this.host + ':' + this.port)
        client.write(Game.game)
      })

      client.on('data', (data) => {
        console.log('DATA: ' + data)
      })

      client.on('close', () => console.log('Connection closed'))
    }
  }
}
</script>
