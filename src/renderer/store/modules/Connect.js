const net = require('net')
const address = require('network-address')

const state = {
  server: {
    server: null,
    clients: [],
    clientNum: 0
  },
  clientSocket: null,
  host: {
    // addr: '127.0.0.1',
    addr: address(),    // Gets external facing network address of this machine.
    port: 9381
  },
  peers: []
}

const mutations = {
  START_SERVER (state) {
    state.server.server = net.createServer((socket) => {

      socket.nickname = `Client ${state.server.clientNum}`

      state.server.clients.push(socket)
      state.server.clientNum++

      let clientName = socket.nickname
      console.log(`${clientName} has connected`)

      socket.on('end', () => {
        console.log(`${clientName} has disconnected`)
      })

      socket.on('data', (data) => {
        console.log(JSON.parse(data))

        state.server.clients.filter(s => s !== socket)
         .forEach((client) => {
          console.log(`Writing to: ${client.nickname}`)
          client.write(data)
        })
      })
    }).listen(state.host.port, state.host.addr)

    console.log(`Listening on ${state.host.addr}:${state.host.port}`)
  },
  CONNECT (state, clientSocket) {
    state.clientSocket = clientSocket
  },
  ADD_PEER (state, peer) {
    state.peers.push(peer)
  },
  REMOVE_PEER (state, peer) {
    let index = state.peers.findIndex(p => p.addr===peer.addr && p.port===peer.port)
    // console.log(`Index: ${index}`)
    if (index >= 0) {
      state.peers.splice(index, 1)
      console.log(`Peer removed from peers: ${peer}`)
    }
  },

}

const actions = {
}

const getters = {
  server (state) {
    return state.server
  },
  clientSocket (state) {
    return state.clientSocket
  },
  host (state) {
    return state.host
  },
  peers (state) {
    return state.peers
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
