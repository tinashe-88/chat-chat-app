const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

// Express server setup
const app = express()
const server = http.createServer(app)

// Configure Socket.io to work with server
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

// Serve up publicDirectoryPath
app.use(express.static(publicDirectoryPath))

io.on('connection', () => {
    console.log('Finally! New WebSocket connection')
})

// Listen on port 3000
server.listen(port, () => {
    console.log(`Server now running on: ${port}`)
})