import React, { useEffect, useState } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import socket from "./../apis/";
import io from "socket.io-client";

const JoinSession = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [invalid, setInvalid] = useState(false);

  const submitForm = () => {
    if (code !== "" && name !== "") {
      socket.emit("join-session", code, name);
    }
    // TODO: else give a prompt
  };

  useEffect(() => {
    socket.on("invalid-code", () => {
      setInvalid(!invalid);
    });
  });

  return (
    <div className="session-page">
      <DialogContent>
        <DialogContentText>
          to join a lobby please enter a user name and session code.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="pl_two_name"
          label="username"
          type="username"
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="session-code"
          label="session code"
          type="text"
          fullWidth
          onChange={(e) => setCode(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          className="session-btn"
          color="primary"
          onClick={() => submitForm()}
        >
          Create & Join
        </Button>
      </DialogActions>

      {invalid && (
        <div>
          <p style={{ color: "red" }}>Invalid Session Code</p>
        </div>
      )}
    </div>
  );
};

export default JoinSession;