import React, { Component } from 'react';
import {InputGroup, InputGroupAddon, Input, InputGroupAddongroupText, Button} from 'reactstrap';

import socket from './../apis';

class CreateSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xPlayer_name: ''
        };
    }

    updateForm = e => {
        this.setState({ xPlayer_name: e.target.value });
    }

    createSession = e => {
       if( this.state.xPlayer_name !== ''){
           console.log('TEST')
           socket.emit('create-session', this.state.xPlayer_name);
       } else {
           e.preventDefault();

       }
    }

    render() {
        return(
            <div>
                <InputGroup style={{width:"95%", margin:"0 auto"}}>
                    <Input placeholder="username" onChange={this.updateForm}/>
                </InputGroup>
                
                <Button className="session-btn" color="primary" onClick={this.createSession}>Create & Join</Button>
            </div>
        )
    }
}

export default CreateSession;