import React, { Component } from 'react';
import './AdminDashboard.css';
import axios from 'axios';
import NavBar from "./NavBar";
class AdminDashboard extends Component {

    constructor() {
        super();
        this.state = {
            roleName: ''
        }
        console.log(">>>>>>>>>>>UserName=" ,sessionStorage.getItem('UserName'));
        console.log(">>>>>>>>>>>RoleId=" , sessionStorage.getItem('RoleId'));
        console.log(">>>>>>>>>>>userID=" , sessionStorage.getItem('userID'));
    }
    componentWillMount() {
        axios.get("http://localhost:8080/getRole/" + sessionStorage.getItem('RoleId'))
            .then(response => {
                this.setState({ roleName: response.data.roleName })
            });
    }
    render() {
        return (
            <div>
                <NavBar></NavBar>
            </div>
        );
    }
}

export default AdminDashboard;