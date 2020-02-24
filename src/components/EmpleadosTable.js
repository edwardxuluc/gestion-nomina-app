import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, ButtonToolbar, Table, Modal, Form, Dropdown } from 'react-bootstrap';

const EmpleadosTable = ( props ) => {
    
    const { count, rows, onClickEdit, onClickDelete } = props;

    return (
        <Container>
            <Row>
                <Col>
                    <h4>Se han encontrado {count} empleados registrados</h4>
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th width="15%">Número de identificación</th>
                            <th width="10%">Departamento</th>
                            <th width="10%">Nombre completo</th>
                            <th width="10%">Teléfono</th>
                            <th width="10%">Dirección</th>
                            <th width="20%">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((item, index) => (
                            <tr key={index}>
                                <td>{item.numero_identificacion}</td>
                                <td>{item.Departamento ? item.Departamento.nombre : 'N/A'}</td>
                                <td>{item.nombre} {item.apellidos}</td>
                                <td>{item.telefono}</td>
                                <td>{item.direccion}</td>
                                <td style={{textAlign: 'center'}}>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                            Acciones
                                                </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { onClickEdit(item); }}>
                                                Editar
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => { onClickDelete(item); }}>
                                                Eliminar
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}

                        {!rows.length && (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center' }}>
                                    No se han encontrado registros disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Row>
        </Container>
    )    
};

export default EmpleadosTable;