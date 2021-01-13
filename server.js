const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = 6000 || process.env.PORT;

// multiplayer lobby logic
const lobbyEvents = socket => {
    // create a lobby if none exist
    socket.on('create-session', name => {
        // create a code to so player 2 can join the session
        const code = Math.floor(Math.random() * 1000000000)

        socket.emit('lobby created', name, code)

    })
}

io.on('connection', lobbyEvents);

server.listen(PORT, () => console.log(`server running on port: ${PORT}`));