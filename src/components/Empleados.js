import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmpleadosTable from './EmpleadosTable';
import ModalDelete from './ModalDelete';
import { apiUrl, getErrorMessage } from '../utils/Config';


const Departamento = (props) => {

    const [empleadosRows, setEmpleadosRows] = useState([]);
    const [empleadosCount, setEmpleadosCount] = useState(0);
    const [departamentos, setDepartamentos] = useState([]);
    const [departamentoId, setDepartamentoId] = useState(null);

    const [dataModal, setDataModal] = useState({});
    const [showModalForm, setShowModalForm] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    useEffect(() => {
        
        refreshData()
    }, []);

    const refreshData = async () => {
        try {

            let query = '';
            
            if( departamentoId ){
                query += `departamento_id=${departamentoId}`;
            }

            const response_empleados = await axios.get(`${apiUrl}/empleados?${query}`);
            const response_departamentos = await axios.get(`${apiUrl}/departamentos`);

            setEmpleadosCount(response_empleados.data.data.count);
            setEmpleadosRows(response_empleados.data.data.rows);
            setDepartamentos(response_departamentos.data.data.rows);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };
    
    const guardarEmpleado = async (event) => {
        try {
            const form = event.currentTarget;
            event.preventDefault();
            event.stopPropagation();

            if (form.checkValidity()) {

                let response = null;

                if (dataModal.id) {
                    response = await axios.put(`${apiUrl}/empleados/${dataModal.id}`, dataModal);
                } else {
                    response = await axios.post(`${apiUrl}/empleados`, dataModal);
                }

                toast.success(response.data.message);
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

    const eliminarEmpleado = async () => {
        try {
            if (dataModal.id) {
                const response = await axios.delete(`${apiUrl}/empleados/${dataModal.id}`);
                
                toast.success(response.data.message);

                setShowModalDelete(false);
                refreshData();
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <Container>
            <Row>
                <Col style={{ textAlign: 'right', marginTop: 20 }}>
                    <Button variant="primary" onClick={() => {
                        setDataModal({});
                        setShowModalForm(true); 
                    }}>
                        Nuevo empleado
                    </Button>
                </Col>
            </Row>            

            <Row style={{ marginTop: 20 }}>
                <Col sm={10} md={10} lg={10}>
                    <Form.Group>
                        <Form.Control 
                            as="select" 
                            onChange={event => {
                                setDepartamentoId(event.target.value);
                            }}
                        >
                            <option value={''}>Selecciona el departamento a filtrar</option>
                            {departamentos.map((item, index) => (
                                <option value={item.id} key={index}>{item.nombre}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col sm={2} md={2} lg={2}>
                    <Button variant="primary" onClick={() => refreshData()}>
                        Filtrar
                    </Button>
                </Col>
            </Row>

            <Row style={{ marginTop: 20 }}>
                <EmpleadosTable
                    rows={empleadosRows}
                    count={empleadosCount}
                    onClickEdit={(item) => {
                        setDataModal(item);
                        setShowModalForm(true);
                    }}
                    onClickDelete={(item) => {
                        setDataModal(item);
                        setShowModalDelete(true);
                    }}
                />
            </Row>

            <Modal show={showModalForm} onHide={() => {
                setShowModalForm(false);
                setDataModal({});
            }}>
                <Form noValidate onSubmit={guardarEmpleado}>
                    <Modal.Header closeButton>
                        <Modal.Title>{dataModal.id ? 'Editar' : 'Nuevo'} empleado</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group>
                            <Form.Label>Número de identificación</Form.Label>
                            <Form.Control
                                type="text"
                                // placeholder="Número de identificación"
                                required
                                value={dataModal.numero_identificacion}
                                onChange={event => {
                                    setDataModal({ ...dataModal, numero_identificacion: event.target.value });
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Departamento</Form.Label>
                            <Form.Control as="select" 
                                value={dataModal.departamento_id}
                                onChange={event => {
                                    setDataModal({ ...dataModal, departamento_id: event.target.value });
                                }}
                            >
                                <option value="">Selecciona el departamento</option>
                                { departamentos.map((item, index) => (
                                    <option value={item.id} key={index}>{item.id} {item.nombre}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                // placeholder="Nombre"
                                required
                                value={dataModal.nombre}
                                onChange={event => {
                                    setDataModal({ ...dataModal, nombre: event.target.value });
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control
                                type="text"
                                // placeholder="Apellidos"
                                required
                                value={dataModal.apellidos}
                                onChange={event => {
                                    setDataModal({ ...dataModal, apellidos: event.target.value });
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                // placeholder="Teléfono"
                                required
                                value={dataModal.telefono}
                                onChange={event => {
                                    setDataModal({ ...dataModal, telefono: event.target.value });
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                // placeholder="Dirección"
                                required
                                value={dataModal.direccion}
                                onChange={event => {
                                    setDataModal({ ...dataModal, direccion: event.target.value });
                                }}
                            />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            setShowModalForm(false);
                            setDataModal({});
                        }}>
                            Cerrar
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
                    eliminarEmpleado();
                }}
            />

            <ToastContainer />
        </Container>
    )
};

export default Departamento;
