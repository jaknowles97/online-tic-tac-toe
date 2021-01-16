const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const Session = require('./SessionObject').Session;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});
const PORT = 7789 || process.env.PORT;



var codeToSession = {}; //only for joining lobbies
var SocketToSession ={};

// multiplayer lobby logic
const lobbyEvents = socket => {
    // create a lobby if none exist
    socket.on('create-session', name => {
        // create a code to so player 2 can join the session
        const code = Math.floor(Math.random() * 1000000000).toString();
        const session = new Session(name,socket,code);

        codeToSession = {...codeToSession, [code]:session };

        SocketToSession = {...SocketToSession, [socket]:session};

        socket.emit('session-created', name, code);
        socket.on("disconnect", ()=> {
            try{
              SocketToSession[socket].player_two_socket.emit("user-disconnected");
            }
            catch(err){
                throw new Error(err)
            }
            
            delete codeToSession[code];
            delete SocketToSession[socket];   
        })
    })

    //join session (player 2)
    socket.on("join-session",(code,name)=>{

        //failed session code 
        if(codeToSession[code]===undefined){
            socket.emit("invalid-code");
        }
        else{
            codeToSession[code].JoinSession(name,socket);
            codeToSession[code].Broadcast("valid-code",codeToSession[code].gameState);
            SocketToSession = {...SocketToSession,
            [socket]: codeToSession[code]};

            delete codeToSession[code];
            socket.on("disconnect", ()=> {
                try{
                    SocketToSession[socket].player_one_socket.emit("user-disconnected");

                }
                catch(err){
                    throw new Error(err)
                }
                
                delete SocketToSession[socket];
            })
        }
    })

    //game logic
    socket.on("player-move", (index,value)=> {

        SocketToSession[socket].PlayerMove(index,value);
        
        switch(SocketToSession[socket].checkWinner()){
            case "player_one":
                SocketToSession[socket].Broadcast("announcement","player_one");
                break;
            case "player_two":
                SocketToSession[socket].Broadcast("announcement","player_two");
                break;
            case "tie":
                SocketToSession[socket].Broadcast("announcement","tie");
                break;
            case "ongoing":
                break;
            default:
                console.log("no switch cases hit");
        }
        
        //TODO: check winners before broadcasting
        SocketToSession[socket].Broadcast("update",SocketToSession[socket].gameState);
    })
}

io.on('connection', lobbyEvents);

server.listen(PORT, () => console.log(`server running on port: ${PORT}`));