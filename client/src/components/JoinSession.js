import React, { Component } from 'react';
import {InputGroup,InputGroupAddon,Input,InputGroupText, Button} from 'reactstrap';

import socket from './../apis/';
import io from 'socket.io-client';

export default class JoinSession extends Component {
    state = {
        "code": "",
        "name": "",
        invalid: false
    }
    updateForm = (event) => {
        
        this.setState({
            [event.target.name]: event.target.value
        })
        
    }

    submitForm = () => {
        if(this.state["code"] !== "" && this.state["name"] !== "" ){
            socket.emit("join-session",this.state.code,this.state.name);
        }
        // TODO: else give a prompt
    }

    componentDidMount(){
        socket.on("invalid-code",()=>{
            this.setState({invalid:true});
        })
        
    }

    render() {
        return (
            
            <div className="session-page" >
                
                <InputGroup style={{width:"95%", margin:"0 auto"}}>
                    <Input onChange={this.updateForm} name="name" placeholder="username"/>
                </InputGroup>
                <InputGroup style={{width:"95%", margin:"0 auto"}}>
                    <Input onChange={this.updateForm} name="code" placeholder="session code"/>
                </InputGroup>
                <Button onClick={this.submitForm} className="session-btn" color="primary">Join Session</Button>
                
                {this.state.invalid &&
                <div>
                     <p style={{color:"red"}}>Invalid Session Code</p>
                </div>}
                
            </div>
            
        )
    }
}