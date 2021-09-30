import express from 'express'
import http from 'http'
import { Server as socketio } from 'socket.io'
import createGame from './public/game.js'

const app = express()
const server = http.createServer(app)
const sockets = new socketio(server)

app.use(express.static("public"))

const game = createGame()

console.log(game.state)

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player ${socket.id} connected`)

    game.addPlayer({id: playerId})
    socket.emit("init", game.state)

    socket.on('disconnect', () => {
        console.log(`> Player ${playerId} disconnected`)
        game.removePlayer(playerId)
    })

})

server.listen(8080, () => {
    
})