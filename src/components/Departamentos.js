import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import DepartamentosTable from './DepartamentosTable';
import { apiUrl, getErrorMessage } from '../utils/Config';
import ModalDelete from './ModalDelete';

const Departamento = (props) => {

    const [departamentosRows, setDepartamentosRows] = useState([]);
    const [departamentosCount, setDepartamentosCount] = useState(0);
    
    const [dataModal, setDataModal] = useState({});
    const [showModalForm, setShowModalForm] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = async () => {
        try {
            
            const response = await axios.get(`${apiUrl}/departamentos`);
                        
            setDepartamentosRows(response.data.data.rows);
            setDepartamentosCount(response.data.data.count);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const guardarDepartamento = async (event) => {
        try {
            const form = event.currentTarget;
            event.preventDefault();
            event.stopPropagation();

            if (form.checkValidity()) {

                if (dataModal.id) {
                    await axios.put(`${apiUrl}/departamentos/${dataModal.id}`, dataModal);
                } else {
                    await axios.post(`${apiUrl}/departamentos`, dataModal);
                }

                setShowModalForm(false);
                setDataModal({});
                refreshData();
            } else {
                toast.warn('Completa el formulario para continuar');
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const eliminarDepartamento = async () => {
        try {
            if( dataModal.id ){
                const response = await axios.delete(`${apiUrl}/departamentos/${dataModal.id}`);

                toast.success(response.data.message);


                setShowModalDelete(false);
                setDataModal({});
                refreshData();
            }            
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <Container>
            <Row>
                <Col style={{textAlign:'right', marginTop: 20}}>                    
                    <Button variant="primary" onClick={() => {
                        setShowModalForm(true);
                        setDataModal({});
                    }}>
                        Nuevo departamento
                    </Button>
                </Col>
            </Row>

            <Row>
                <DepartamentosTable
                    rows={departamentosRows}
                    count={departamentosCount}
                    onClickEdit={item => {
                        setDataModal(item);
                        setShowModalForm(true);
                    }}
                    onClickDelete={item => {
                        setDataModal(item);
                        setShowModalDelete(true);
                    }}
                />
            </Row>

            <Modal show={showModalForm} onHide={() => setShowModalForm(false)}>
                <Form noValidate onSubmit={guardarDepartamento}>
                    <Modal.Header closeButton>
                        <Modal.Title>{dataModal.id ? 'Editar' : 'Nuevo'} departamento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                required
                                value={dataModal.nombre}
                                onChange={event => {
                                    setDataModal({ ...dataModal, nombre: event.target.value });
                                }}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={ () => setShowModalForm(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="primary">
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            
            <ModalDelete 
                show={showModalDelete}
                handleClose={() => {
                    setShowModalDelete(false);
                }}
                handleDelete={() => {
                    eliminarDepartamento();
                }}
            />

            <ToastContainer />
        </Container>
    )
};

export default Departamento;
