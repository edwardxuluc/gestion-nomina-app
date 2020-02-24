import React, {useState, useEffect} from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";


const CustomNavbar = ( props ) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">Sistema para la gestion de nominas</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/empleados">Empleados</Nav.Link>
                    <Nav.Link as={Link} to="/departamentos">Departamentos</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )    
};

export default CustomNavbar;