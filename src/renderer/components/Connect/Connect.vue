<template>
  <div>
    <h1>Connect to an opponent Player!</h1>
    <div>
      <h2>Host Info</h2>
      <p>Host address: {{host.addr}}</p>
      <p>Host port: {{host.port}}</p>
    </div>
    <div>
      <h2>Peers</h2>
      <label for="peerHost">Host Address: </label>
      <input v-model="peerManual.addr" id="peerHost" placeholder="enter opponent's host address">
      <label for="peerPort">Port: </label>
      <input v-model="peerManual.port" id="peerPort" placeholder="enter opponent's listening port">
      <button @click="addPeer">Add to peers list</button>

      <h3>Select a peer from list to connect to</h3>
      <select v-model="selectedPeer">
        <option disabled value="">Please select one</option>
        <option v-for="peer in peers" v-bind:value="peer">
          {{ peer.addr+':'+peer.port }}
        </option>
      </select>
      <span>Selected Peer: {{ selectedPeer }}</span>
      <button @click="connect">Connect to peer!</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'connect',
  // props: {
  //   host: String,
  //   port: Number
  // },
  data () {
      return {
        peerManual: {
          addr: '',
          port: null
        },
        selectedPeer: null
        // host: {
        //   // addr: '127.0.0.1',
        //   // addr: '10.0.10.13',
        //   addr: address(),
        //   port: 9381
        // }
      }
  },
  computed: {
    // peer () {
    //   return {addr: this.host.addr, port: this.host.port}
    //   // peers: [{addr: '127.0.0.1', port: 9381}]
    // },
    // localComputed () { /* ... */ },
    // mix this into the outer object with the object spread operator
    ...mapGetters([
      'clientSocket',
      'host',
      'peers',
      'game'
    ])
  },
  methods: {
      addPeer () {
        this.$store.commit('ADD_PEER', this.peerManual)
      },
      connect () {
        const net = require('net')
        const socket = new net.Socket()

        console.log(`Connecting to ${this.selectedPeer.addr}:${this.selectedPeer.port}...`)
        socket.connect(this.selectedPeer.port, this.selectedPeer.addr, () => {
          console.log(`Connected to ${this.selectedPeer.addr}:${this.selectedPeer.port}`)
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
  },
  created () {
    // Let's just push up to 5 peers for now, just to see that the commits are working...
    if (this.peers.length < 5) {
      // FIXME: we manually populate the peers[], assuming another client will be running on this machine. Later, we will discover peers via mdns...
      this.$store.commit('ADD_PEER', {addr: this.host.addr, port: this.host.port})
    }
  }
}
</script>
