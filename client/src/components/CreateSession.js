import React, { Component, useState } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import socket from "./../apis";

const CreateSession = (props) => {
  const [player1_name, setPlayer1_name] = useState("");

  const updateForm = (e) => {
    setPlayer1_name(e.target.value);
  };

  const createSession = (e) => {
    if (player1_name !== "") {
      socket.emit("create-session", player1_name);
    } else {
      e.preventDefault();
    }
  };

  return (
    <div>
      <DialogContent>
        <DialogContentText>
          to create a lobby please enter a user name and click create.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="pl_one_name"
          label="username"
          type="username"
          fullWidth
          onChange={e => updateForm(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button className="session-btn" color="primary" onClick={(e) => createSession(e)}>
          Create & Join
        </Button>
      </DialogActions>
    </div>
  );
};

export default CreateSession;
