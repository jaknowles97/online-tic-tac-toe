import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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

            <Button className="session-btn" color="primary" size="md" onClick={toggleCreate} >Create Session</Button>
            <Modal isOpen={create_modal} toggle={toggleCreate}>
                <ModalHeader toggle={toggleCreate}></ModalHeader>
                <ModalBody>
                    <CreateSession />
                </ModalBody>
            </Modal>


            <Button className="session-btn" color="primary" size="md" onClick={toggleJoin}>Join Session</Button>
            <Modal isOpen={join_modal} toggle={toggleJoin}>
                <ModalHeader toggle={toggleJoin}></ModalHeader>
                <ModalBody>
                    <JoinSession />
                </ModalBody>
            </Modal>

        </div>
    )

}

export default Landing;