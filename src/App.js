import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";
import CustomNavbar from './components/CustomNavbar';

import Departamentos from './components/Departamentos';
import Empleados from './components/Empleados';

function App() {
    return (
        <div>
            <Router>
                
                <CustomNavbar />
            
                <Switch>
                    <Route path="/" exact component={Empleados}></Route>
                    <Route path="/empleados">
                        <Empleados />
                    </Route>
                    <Route path="/departamentos">
                        <Departamentos />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;