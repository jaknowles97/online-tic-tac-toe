import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Landing = props => {

    const [create_modal, toggleModal] = useState(false);
    // const [join_modal, toggleJoin] = useState(false);
    const toggleCreate  = () => toggleModal( !create_modal);

    return (
        <div>
            <h1 className="title">Online Tic-Tac-Toe</h1>

            <Button className="session-btn" color="primary" size="md" onClick={toggleCreate} >Create Session</Button>
            <Modal isOpen={create_modal} toggle={toggleCreate}>
                <ModalHeader toggle={toggleCreate}></ModalHeader>
                <ModalBody>
                    create session.
                </ModalBody>
            </Modal>

{/* 
            <Button className="session-btn" color="primary" size="md" onClick={join_toggle}>Join Session</Button>
            <Modal isOpen={modal_join} toggle={join_toggle}>
                <ModalHeader toggle={join_toggle}></ModalHeader>
                <ModalBody>

                </ModalBody>
            </Modal> */}

        </div>
    )

}

export default Landing;