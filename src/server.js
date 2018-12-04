const net = require('net')

const host = 'localhost'
const port = 9381

let clients = []
let clientNum = 0

net.createServer((socket) => {
  
  socket.nickname = `Client ${clientNum}`

  clients.push(socket)
  clientNum++

  let clientName = socket.nickname
  console.log(`${clientName} has connected`)

  socket.on('end', () => {
    console.log(`${clientName} has disconnected`)
  })

  socket.on('data', (data) => {
    console.log(JSON.parse(data))
    
    clients.forEach((client) => {
      client.write(data)
    })
  })
}).listen(port, host)

console.log(`Listening on ${host}:${port}`)