import React, { Component } from 'react';
import io from 'socket.io-client';
import Landing from './Landing';

const port = '/';
const socket = io(port);

class Main extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            landing: true,
            lobby: false,
            xPlayer_name: '',
            oPlayer_name: '',
            lobbyCode: '',
            isPlayerX: false
        }
    }

    componentDidMount() {
        socket.on('session-created', (name, code) => {
            this.setState({
                landing: false,
                lobby: true,
                xPlayer_name: name,
                lobbyCode: code,
                isPlayerX: true
            })
        })
    }

    render() {
        return(
            <div>
                <Landing />
                {
                   // this.state.landing ?
                   // <Landing /> : <Lobby /> to do..
                }
            </div>
        )
    }
}

export default Main;