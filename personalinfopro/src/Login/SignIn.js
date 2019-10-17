import React, { Component } from 'react';
import './Login.css';
import SignUp from "./SignUp";
import { Alert, Form, Row, Col, FormGroup, Button } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            password: '',
            errors:{
                usernameError:"",
                passwordError:""
              }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    validate = () =>{
        let isError =false;
        let tempError =this.state.errors;
        if((this.state.userName.length) === 0){
          isError = true;
          tempError.usernameError = "Username should not be empty";
        }else{
          tempError.usernameError = "";
        }
        if((this.state.password.length) === 0){
          isError = true;
          tempError.passwordError = "Password should not be empty";
        }else{
          tempError.passwordError = "";
        }
        if(isError){
          this.setState({
            errors:tempError
        });
      }
        return isError;
      }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        const err = this.validate();
        if(!err){
        const data = {
            userName: this.state.userName,
            password: this.state.password
        };

        try {
            axios.post("http://localhost:8080/login", data)
                .then(response => {
                    console.log(response.data);
                    if (response.data === "Not Match") {
                        this.setState({errors:[]})
                        document.getElementById("Warning").style.visibility = "visible";
                    }
                    else {
                        sessionStorage.setItem('userId', "");
                        sessionStorage.setItem('UserName', "");
                        sessionStorage.setItem('RoleId', "");
                        sessionStorage.setItem('userID', response.data.userId);
                        sessionStorage.setItem('UserName', response.data.userName);
                        sessionStorage.setItem('RoleId', response.data.roleId);
                        this.props.history.push('/adminDashboard');
                    }
                });

        } catch (error) {
            this.setState({errors:[]})
            document.getElementById("Warning").style.visibility = "visible";
            sessionStorage.setItem('UserName', "");
            sessionStorage.setItem('RoleId', "");
            sessionStorage.setItem('userID', "");
        }
    }

    }
    render() {
        const style = {
            visibility: 'hidden',

        };
        return (
            <div className="signIn">

                <div className="PageSwitcher">
                    <NavLink exact to="/" activeClassName="PageSwitcher_Active" className="PageSwitcher__Item">Sign In</NavLink>
                    <NavLink to="/signUp" activeClassName="PageSwitcher_Active" className="PageSwitcher__Item ">Sign Up</NavLink>
                </div>

                <div className="FormTitle FormField__Label">
                   <h3>Sign In</h3>
                </div>


                <div className="FormCenter">
                    <Form className="FormFields" onSubmit={this.handleSubmit} noValidate>
                        <Row>
                            <Col lg={12}>
                                <Row>
                                    <Col lg={4}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="userName">User Name</label>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={6}>
                                        <FormGroup>
                                            <input type="text" id="userName" className="FormField__input" placeholder="Enter User Name" name="userName" value={this.state.userName} onChange={this.handleChange} required></input>
                                            <span style={{color: "orange"}}>{this.state.errors.usernameError}</span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={4}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="password">Password</label>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={6}>
                                        <FormGroup>
                                            <input type="password" id="password" className="FormField__input" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.handleChange} required></input>
                                            <span  style={{color: "orange"}}>{this.state.errors.passwordError}</span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12}>
                                        <FormGroup>
                                            <Alert color="danger" id="Warning" className="warning" style={style}>
                                                Please Enter Correct User Name and Password
                                            </Alert>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={4}>
                                        <FormGroup>
                                            <Button className="signIn_btn">Submit</Button>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={6}>
                                        <FormGroup>
                                            <Link to="/signUp" className="FormField__Link">Create New User</Link>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Form>
                </div>
            </div>
        );
    }
}


export default SignIn;