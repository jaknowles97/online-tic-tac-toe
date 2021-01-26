import React, { Component, useState } from 'react';
import {InputGroup, InputGroupAddon, Input, InputGroupAddongroupText, Button} from 'reactstrap';

import socket from './../apis';

const CreateSession = props =>{

    const [player1_name, setPlayer1_name] = useState('');
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         xPlayer_name: ''
    //     };
    // }

    const updateForm = e => {
        setPlayer1_name(e.target.value)
    }

    const createSession = e => {
       if( player1_name !== ''){
           socket.emit('create-session', player1_name);
       } else {
           e.preventDefault();
       }
    }

        return(
            <div>
                <InputGroup style={{width:"95%", margin:"0 auto"}}>
                    <Input placeholder="username" onChange={updateForm}/>
                </InputGroup>
                
                <Button className="session-btn" color="primary" onClick={createSession}>Create & Join</Button>
            </div>
        )
    
}

export default CreateSession;