import React, { Component } from 'react';
import io from 'socket.io-client';
import Landing from './Landing';
import socket from './../apis';
import Lobby from './Lobby';
class Main extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            landing: true,
            lobby: false,
            xPlayer_name: '',
            lobbyWaiting: true,
            oPlayer_name: '',
            code: '',
            isPlayerX: false,
            gameState: {            
                p1_name: "",
                p2_name: "",
                p1_score: 0,
                p2_score: 0,
                ties: 0,
                p1_turn: true,
                grid: [0,0,0,
                    0,0,0,
                    0,0,0]
        
            }
        }
    }

    componentDidMount() {
        socket.on('session-created', (name, code) => {
            this.setState({
                landing: false,
                lobby: true,
                xPlayer_name: name,
                code: code,
                isPlayerX: true
            })
        })

        socket.on("valid-code",(gameState)=>{
            this.setState({
                lobby_waiting: false,
                landing:false,
                lobby:true,
            
                gameState: gameState
            })

        })
    }
    
    
    

    render() {
        const gamestate = this.state.gameState;
        return(
            <div>
                {this.state.landing && <Landing/>}
         
         {this.state.lobby && <Lobby gamestate={gamestate} waiting={this.state.lobbyWaiting} code={this.state.code} isPlayerX={this.state.isPlayerX} /> }
            </div>
        )
    }
}

export default Main;