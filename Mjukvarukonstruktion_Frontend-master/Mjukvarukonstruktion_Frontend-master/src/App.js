import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { ButtonGroup, ToggleButton, Form, Button, Navbar, Nav, FormControl, NavDropdown, Modal } from 'react-bootstrap';
import Log from './sites/Log.js';
import Messages from './sites/Messages.js';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      displayName: 'Home',
      isOnLogPage: false,
      isOnMessagePage: true,
      inputUpdated: false,
      showLogin: false,
      showLogout: true,
      notLoggedIn: false,
    }
  }

  setToken(token, displayName){
     this.setState({token: token, showLogin:false, notLoggedIn: false, displayName: displayName});
  }

   logedInState(username){
     this.resetStates();
     this.setState({showLogin: false, showLogout: true, displayName: username, notLoggedIn: false})
     this.showMessagesPage();
   }

  updateInputChanges(){
    this.setState({inputUpdated: true});
  }

  resetStates() {
    if (this.state.isOnLogPage){
      this.state.isOnLogPage = false;
    }
    if (this.state.isOnMessagePage){
      this.state.isOnMessagePage = false;
    }
  }

  showLogPage(){
    this.setState({isOnMessagePage: false});
    this.resetStates();
    this.setState({
      isOnLogPage: !this.state.isOnLogPage
    })
  }

  showMessagesPage(){
    this.setState({isOnLogPage: false});
    this.resetStates();
    this.setState({
      isOnMessagePage: !this.state.isOnMessagePage
    })
  }

  doLogout(){
    this.props.keycloak.logout();
  }


  render(){
    return (
      <div className="App">
      {!this.state.notLoggedIn?
      <div class = "navBar">
        <Navbar bg="#00202D" color="white" expand="lg">
          <Navbar.Brand href="#Log" color="white" onClick = {() => this.showLogPage()}>{this.state.displayName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href='#UserLogs' color="white" onClick = {() => this.showLogPage()}>Local Storage</Nav.Link>
              <Nav.Link href='#messages' color="white" onClick = {() => this.showMessagesPage()}>Send Message</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Nav class="nav navvar-nav navbar-right">
          {this.state.showLogout?
            <Nav.Link href='#logout' onClick = {() => this.doLogout()}>Logout</Nav.Link>
          :null}
          </Nav>
        </Navbar>
      </div>
:null}

      {this.state.isOnMessagePage?
        <div>
          <h1> Here we can send input over kafka </h1>

          <Messages/>
        </div>
      :null}

      {this.state.isOnLogPage?
        <div>
          <h1> This is the locally saved files </h1>

          <Log/>
        </div>
      :null}
      </div>
    );
  }
}

export default App;
