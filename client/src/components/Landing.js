import React, { useState } from 'react';
import  Button  from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import DialogTitle from '@material-ui/core/DialogTitle';

import CreateSession from './CreateSession';
import JoinSession from './JoinSession';

const Landing = props => {

    const [create_modal, toggleModal] = useState(false);

    const [join_modal, settoggleJoin] = useState(false);
    const toggleCreate  = () => toggleModal( !create_modal);
    const toggleJoin  = () => settoggleJoin( !join_modal);

    return (
        <div>
            <h1 className="title">Online Tic-Tac-Toe</h1>
            <div>
            <Button type="button"className="session-btn" variant="contained" color="primary" onClick={toggleCreate} >Create Session</Button>
            <Dialog  open={create_modal} onClose={toggleCreate}>
                <DialogTitle> Create a Session</DialogTitle>
                <CreateSession />
            </Dialog>
            </div>

            <div>
            <Button type="button"className="session-btn" variant="contained" color="primary" onClick={toggleJoin} >Join Session</Button>
            <Dialog  open={join_modal} onClose={toggleJoin}>
                <DialogTitle> join a Session</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        to create a lobby please enter a user name and session code to join.
                    </DialogContentText>
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        id="pl_one_name"
                        label="username"
                        type="username"
                        fullWidth
                    /> */}
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={toggleCreate} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={toggleCreate} color="primary">
                        Create Session
                    </Button>
                </DialogActions> */}
                <JoinSession />
            </Dialog>
            </div>

{/* 
            <Button className="session-btn" variant="contained" color="primary" size="md" onClick={toggleJoin}>Join Session</Button>
            <Modal isOpen={join_modal} onClose={toggleJoin}>
                <JoinSession />
            </Modal> */}

        </div>
    )

}

export default Landing;