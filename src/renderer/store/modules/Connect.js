const address = require('network-address')

const state = {
  clientSocket: null,
  host: {
    // addr: '127.0.0.1',
    addr: address(),    // Gets external facing network address of this machine.
    port: 9381
  },
  peers: []
}

const mutations = {
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
