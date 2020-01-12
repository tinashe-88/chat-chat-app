const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')

// Express server setup
const app = express()
const server = http.createServer(app)

// Configure Socket.io to work with server
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

// Serve up publicDirectoryPath
app.use(express.static(publicDirectoryPath))

io.on('connection', socket => {
    console.log('Finally! New WebSocket connection')

    socket.on('join', ({ username, chatroom }) => {
        socket.join(chatroom)

        socket.emit('message', generateMessage('Welcome to Chat-chat!'))
        socket.broadcast.to(chatroom).emit('message', generateMessage(`${username} has joined!`))
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)){
            return callback('Profanity is not permitted!')
        }

        io.emit('message', generateMessage(message))
        callback()
    })

    socket.on('shareLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('User has left the chat.'))
    })

})

// Listen on port 3000
server.listen(port, () => {
    console.log(`Server now running on: ${port}`)
})