import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-table/react-table.css'
import { Route, NavLink } from 'react-router-dom';

import Home from './components/Home/Home';
import Results from './components/Admin/Results';
import CodeSubmit from './components/codesubmit/CodeSubmission';
import './App.css';
import {Navbar,Nav,NavItem} from 'react-bootstrap';


class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        	<Navbar inverse collapseOnSelect>
            <Nav>
              <NavItem componentClass="span">
                <NavLink exact  to="/" className="links" activeClassName="active">Home</NavLink>
              </NavItem>
              <NavItem componentClass="span">
                <NavLink exact to="/results" className="links" activeClassName="active">Admin</NavLink>
              </NavItem>
            </Nav>
	        </Navbar>
          <Route exact path='/' component={Home}/>
          <Route path={"/code/:id"} component={CodeSubmit} />
          <Route exact path="/results" component={Results} />


      </div>
    );
  }
}

export default App;
