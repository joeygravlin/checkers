<template>
  <div>
    <h1>Connect to an opponent Player!</h1>
    <label for="host">Host Address: </label>
    <input v-model="host" id="host" placeholder="enter opponent's host address">
    <label for="port">Port: </label>
    <input v-model="port" id="port" placeholder="enter opponent's listening port">
    <button @click="connect">Connect to an opponent Player!</button>
  </div>
</template>

<script>
import Game from '../Game/Game'

import {mapGetters} from 'vuex'

export default {
  name: 'connect',
  // props: {
  //   host: String,
  //   port: Number
  // },
  data () {
      return {
        host: '127.0.0.1',
        port: 9381
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
      connect () {
        const net = require('net')
        const socket = new net.Socket()

        socket.connect(this.port, this.host, () => {
          console.log(`Connected to ${this.host}:${this.port}`)
        })

        this.$store.commit('CONNECT', socket)

        socket.on('data', (data) => {
          let payload = JSON.parse(data)
          console.log(`Data from client: `)//${payload}`)
          console.log(payload)
          // console.log(`Payload to commit${payload}`)
          this.$store.commit('SET_BOARD', payload)
        })
      }
  }
}
</script>
