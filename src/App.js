import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-table/react-table.css'
import { Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';


import Home from './components/Home/Home';
import Results from './components/Admin/Results';
import CodeSubmit from './components/codesubmit/CodeSubmission';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        	<Navbar inverse collapseOnSelect>
            <Nav>
              <NavItem componentClass="span">
                <Link to="/">Home</Link>
              </NavItem>
              <NavItem componentClass="span">
                <Link to="/results">Results</Link>
              </NavItem>
            </Nav>
	        </Navbar>
              <Route exact path='/' render={() => <Home />}/>
              <Route exact path="/results" render = { () => <Results />} />
              <Route path={"/code/:id"} component={CodeSubmit} />

      </div>
    );
  }
}

export default App;
