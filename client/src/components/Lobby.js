import React, { Component, useState } from 'react'
import {Button, Spinner} from 'reactstrap';
import Board from './Board';
import Stats from './Stats';
import Announcement from './Announcement';
import socket from './../apis';


export default class Lobby extends Component {
    
    constructor(props){
      super(props);
      this.state = {
        isPlayerX:this.props.isPlayerX,
        code: this.props.code,
        gamestate: this.props.gamestate
      }
    }



    componentDidMount=()=>{
      socket.on("update",(gamestate)=> {
        this.setState({gamestate: gamestate})
        
      })
    }


    
    render=()=>{
      const gamestate = this.state.gamestate;
      
      return(
        <div>
          {this.props.waiting && <Waiting code={this.state.code}/>}
          {!this.props.waiting && <Game gamestate={gamestate} isPlayerX={this.props.isPlayerX}/>}
        </div>
      )
    }
}

class Waiting extends Component{
  render(){
    return (
        <div className="waiting-lobby" >
            <h5>Waiting for someone to join</h5>
            <Spinner color="dark"></Spinner>
            <h6>Click to Copy Session Code:</h6>
            <Button onClick={()=> {navigator.clipboard.writeText(this.props.code)}}>{this.props.code}</Button>
            
        </div>
    )
  }
}


class Game extends Component{

  state={
    announcement: false,
    message: "",
    OpponentDisconnected: false
  }

  


  componentDidMount=()=> {
    socket.on("announcement", (text)=>{
      switch (text){
        case "player_one":
          if(this.props.isPlayerX){
            this.setState({
              announcement:true,
              message: "You Won!"
            });
          }
          else{
            this.setState({
              announcement:true,
              message: "You Lost"
            }
            );
          }
          break;
        case "player_two":
          if(this.props.isPlayerX){
            this.setState({
              announcement:true,
              message: "You Lost"
            });
          }
          else{
            this.setState({
              announcement:true,
              message: "You Won!"
            });
          }
          break;
        case "tie":
          this.setState({
            announcement:true,
            message: "Tie"
          });
          break;
        
      }
      setTimeout(()=>{
        this.setState({announcement: false});
      }, 1250);
    })

    socket.on("user-disconnected", ()=>{
      this.setState({OpponentDisconnected:true});
    })
  }
  
  render(){
    const gamestate = this.props.gamestate;
    return(
      <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"100%"}}>
      {this.state.OpponentDisconnected &&
       
          <div style={{display:"flex", alignItems:"center", justifyContent:"center",height:"100%",position:"absolute",left:"0%",top:"0%",width:"100%"}}>
            <h6>Opponent Disconnected :( </h6>
          </div>
      }
      {!this.state.OpponentDisconnected && 
      <div className="game">
        <div className="board-container">
          <Board gamestate={gamestate} isPlayerX={this.props.isPlayerX}/>
          
        </div>
        <div className="stats-container">
          {this.state.announcement && <Announcement>{this.state.message}</Announcement>}
          {!this.state.announcement && <Stats gamestate={gamestate} isPlayerX={this.props.isPlayerX}/>}
        </div>
      </div>
      }
      </div>
    )
    
  }
}
