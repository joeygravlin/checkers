// server starter code
const net = require('net')
const HOST = '127.0.0.1'
const PORT = 3000
net.createServer((socket) => {
  console.log(`CONNECTED: ${socket.remoteAddress}:${socket.remotePort}`)
  socket.on('data', (data) => {
    console.log(`DATA  ${socket.remoteAddress}:${data}`)
    socket.write(`You said "${data}"`)
  })
  socket.on('close', (data) => {
    console.log(`Closed: ${socket.remoteAddress}:${socket.remotePort}`)
  })
}).listen(PORT, HOST)
console.log(`Server listening on ${HOST}:${PORT}`)