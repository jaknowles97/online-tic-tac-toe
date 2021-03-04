import React, { Component, useEffect, useState } from 'react'
import  Button  from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Board from './Board';
import Stats from './Stats';
import Announcement from './Announcement';
import socket from './../apis';


const Lobby = props => {
  const [isPlayer_one, setIsPlayer_one] = useState(props.isPlayer_one);
  const [code, setCode] = useState(props.code);
  const [gamestate, setGamestate] = useState(props.gamestate);
    
    // constructor(props){
    //   super(props);
    //   this.state = {
    //     isPlayer_one:this.props.isPlayer_one,
    //     code: this.props.code,
    //     gamestate: this.props.gamestate
        
    //   }
    // }



    useEffect(()=>{
      socket.on("update",(gamestate)=> {
        setGamestate(gamestate)
        
      })
    }, [gamestate] );
      
      return(
        <div>
          {props.waiting && <Waiting code={props.code}/>}
          {!props.waiting && <Game gamestate={gamestate} isPlayer_one={props.isPlayer_one}/>}
        </div>
      )
    
}
export default Lobby;

const Waiting = props => {
  
    return (
        <div className="waiting-lobby" >
            <h5>Waiting for someone to join</h5>
            <CircularProgress color="dark"></CircularProgress>
            <h6>Click to Copy Session Code:</h6>
            <Button onClick={()=> {navigator.clipboard.writeText(props.code)}}>{props.code}</Button>
            
        </div>
    )
  
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
          if(this.props.isPlayer_one){
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
          if(this.props.isPlayer_one){
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
          <Board gamestate={gamestate} isPlayer_one={this.props.isPlayer_one}/>
          
        </div>
        <div className="stats-container">
          {this.state.announcement && <Announcement>{this.state.message}</Announcement>}
          {!this.state.announcement && <Stats gamestate={gamestate} isPlayer_one={this.props.isPlayer_one}/>}
        </div>
      </div>
      }
      </div>
    )
    
  }
}
