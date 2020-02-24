import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ButtonToolbar, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ModalDelete = props => {

    const { show, handleClose, handleDelete } = props;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Está seguro que quiere eliminar este registro?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleDelete}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDelete;