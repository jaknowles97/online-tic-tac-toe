import React, { useState, useEffect } from "react";
import Landing from "./Landing";
import CreateSessionPage from "./CreateSession";
import JoinSession from "./JoinSession";
import Lobby from "./Lobby";
import socket from "./../apis/";
import io from "socket.io-client";

const Main = (props) => {
  const [landing, setLanding] = useState(true);
  const [lobby, setLobby] = useState(false);
  const [pl_one_name, setPl_one_name] = useState("");
  const [lobby_waiting, setLobby_waiting] = useState(true);
  const [code, setCode] = useState("");
  const [isPlayer_one, setIsPlayer_one] = useState(false);
  const [gameState, setGameState] = useState({
    p1_name: "",
    p1_score: 0,
    p2_name: "",
    p2_score: 0,
    ties: 0,
    p1_turn: true,
    grid: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  });
  // this.state = {
  //     landing:true,
  //     lobby:false,

  //     pl_one_name:"",
  //     lobby_waiting:true,
  //     code:"",
  //     isPlayer_one:false,

  //     gameState: {
  //         p1_name: "",
  //         p2_name: "",
  //         p1_score: 0,
  //         p2_score: 0,
  //         ties: 0,
  //         p1_turn: true,
  //         grid: [0,0,0,
  //             0,0,0,
  //             0,0,0]

  //     }

  // }

  useEffect(() => {
    socket.on("session-created", (name, code) => {
      console.log(name)
      setLanding(!landing);
      setLobby(!lobby);
      setPl_one_name(name);
      setCode(code);
      setIsPlayer_one(!isPlayer_one);
    
    });

    socket.on("valid-code", (gamestate) => {
      setLobby_waiting(!lobby_waiting);
      setLanding(!landing);
      setLobby(!lobby);
      setGameState( gamestate);
    });
  }, []);

  // const gamestate = this.state.gameState;

  return (
    <div>
      {landing && <Landing />}

      {lobby && (
        <Lobby
          gamestate={gameState}
          waiting={lobby_waiting}
          code={code}
          isPlayer_one={isPlayer_one}
        />
      )}
    </div>
  );
};

export default Main;