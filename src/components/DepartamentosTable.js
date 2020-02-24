import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Table, Modal, Form, Dropdown } from 'react-bootstrap';

const DepartamentosTable = ( props ) => {

    const {count, rows, onClickEdit, onClickDelete} = props;
    
    return (
        <Container>
            <Row>
                <Col>
                    <h4>Se han encontrado {count || 0} departamentos registrados</h4>
                </Col>
            </Row>

            <Row>
                <Col style={{marginTop: '20px', borderWidth: 1, borderColor: 'red'}}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th width="80%">Nombre</th>
                                <th width="20%">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nombre}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                Acciones
                                                    </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => onClickEdit(item)}>
                                                    Editar
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => onClickDelete(item)}>
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
                </Col>
            </Row>
        </Container>
    )    
};

export default DepartamentosTable;