import React, { Component } from 'react';
import './AdminDashboard.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
class NavBar extends Component {

    constructor() {
        super();
        this.state = {
          roleName: ''
      }
      console.log(">>>>>UserName>>>>>>" + sessionStorage.getItem('UserName'));
      console.log(">>>>>RoleId>>>>>>" + sessionStorage.getItem('RoleId'));
  }
  componentWillMount() {
      axios.get("http://localhost:8080/getRole/" + sessionStorage.getItem('RoleId'))
          .then(response => {
              this.setState({ roleName: response.data.roleName })
          });
  }
    render() {
          console.log(">>>>>>>>>roleName=>>"+this.state.roleName)
          if(this.state.roleName ==="Administrator"){
            return (
              <div className="adminDashboard">
                   <Nav horizontal>
                   <NavItem className="navItem">
                         <NavLink exact to="/user" activeClassName="Admin__Link__Active" className="Admin__Link">Create User</NavLink>
                     </NavItem>
                     <NavItem className="navItem">
                         <NavLink exact to="/role" activeClassName="Admin__Link__Active" className="Admin__Link">Create Role</NavLink>
                     </NavItem>
                     <NavItem className="navItem_Appove">
                        <NavLink to="/approval" activeClassName="Admin__Link__Active" className="Admin__Link">Users</NavLink>
                     </NavItem>
                     <NavItem className="navItem">
                       <NavLink to="/personalInfo" activeClassName="Admin__Link__Active" className="Admin__Link">Personal Info</NavLink>
                     </NavItem>
                     <NavItem className="navItem_AppoveDetails">
                         <NavLink exact to="/approve" activeClassName="Admin__Link__Active" className="Admin__Link">Approve Details</NavLink>
                     </NavItem>
                     <NavItem className="navItem_changeRole">
                         <NavLink exact to="/changeRole" activeClassName="Admin__Link__Active" className="Admin__Link">Change Role</NavLink>
                     </NavItem>
                     <NavItem className="sessionUserName ml-auto">
                        <h2 className="sessionUserName">Welcome {sessionStorage.getItem('UserName')}</h2>
                     </NavItem>
                     <NavItem className="navItem_logOut">
                        <NavLink to="/" activeClassName="Admin__Link__Active" className="Admin__Link">Log Out</NavLink>
                     </NavItem>
                     </Nav>
                     <Nav>
                     <NavItem className="roleType ml-auto">
                        <h2 className="roleType">Role Type={this.state.roleName}</h2>
                     </NavItem>
                     </Nav>
              </div>
          );
          }
          else if(this.state.roleName==="Operation"){
            return (
              <div className="adminDashboard">
                   <Nav horizontal>
                   <NavItem className="navItem">
                         <NavLink exact to="/user" activeClassName="Admin__Link__Active" className="Admin__Link">Create User</NavLink>
                     </NavItem>
                     <NavItem className="navItem_Appove">
                        <NavLink to="/approval" activeClassName="Admin__Link__Active" className="Admin__Link">Users</NavLink>
                     </NavItem>
                     <NavItem className="navItem">
                       <NavLink to="/personalInfo" activeClassName="Admin__Link__Active" className="Admin__Link">Personal Info</NavLink>
                     </NavItem>
                     <NavItem className="sessionUserName ml-auto">
                        <h2 className="sessionUserName">Welcome {sessionStorage.getItem('UserName')}</h2>
                     </NavItem>
                     <NavItem className="navItem_logOut">
                        <NavLink to="/" activeClassName="Admin__Link__Active" className="Admin__Link">Log Out</NavLink>
                     </NavItem>
                     </Nav>
                     <Nav>
                     <NavItem className="roleType ml-auto">
                        <h2 className="roleType">Role Type={this.state.roleName}</h2>
                     </NavItem>
                     </Nav>
              </div>
          );
          }
          else{
            return (
              <div className="adminDashboard">
                   <Nav horizontal>
                     <NavItem className="navItem_personal">
                       <NavLink to="/personalInfo" activeClassName="Admin__Link__Active" className="Admin__Link">Personal Information</NavLink>
                     </NavItem>
                     <NavItem className="sessionUserName ml-auto">
                        <h2 className="sessionUserName">Welcome {sessionStorage.getItem('UserName')}</h2>
                     </NavItem>
                     <NavItem className="navItem_logOut">
                        <NavLink to="/" activeClassName="Admin__Link__Active" className="Admin__Link">Log Out</NavLink>
                     </NavItem>
                     </Nav>
                     <Nav>
                     <NavItem className="roleType ml-auto">
                        <h2 className="roleType">Role Type={this.state.roleName}</h2>
                     </NavItem>
                     </Nav>
              </div>
          );
          }
    }
}

export default NavBar;