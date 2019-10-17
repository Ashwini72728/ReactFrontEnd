import React, { Component } from 'react';
import './Login.css';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Alert, Form, Row, Col, FormGroup, Button } from 'reactstrap';
class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            userName: '',
            password: '',
            email: '',
            mobileNo: '',
            roles: [],
            errors: {
                userNameError: "",
                passwordError: "",
                emailError: "",
                mobileNoError: ''

            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
    }

    validate = () => {
        let isError = false;
        let tempError = this.state.errors;
        if ((this.state.userName.length) === 0) {
            isError = true;
            tempError.userNameError = "Username should not be empty";
        } else {
            tempError.userNameError = "";
        }
        if ((this.state.password.length) === 0) {
            isError = true;
            tempError.passwordError = "Password should not be empty";
        } else {
            tempError.passwordError = "";
        }
        if (this.state.email.length===0) {
            isError = true;
            tempError.emailError = "Email should not be empty";
        }
        else if (!this.state.email.match('@')) {
            isError = true;
            tempError.emailError = "Please include @ in the email address";
        } else {
            tempError.emailError = "";
        }
        if(isNaN(this.state.mobileNo)){
            isError = true;
            tempError.mobileNoError = "Invalid mobile number";
        }
        else if ((this.state.mobileNo.length) !== 10) {
            isError = true;
            tempError.mobileNoError = "Mobile number should be 10 numbers";
        } else {
            tempError.mobileNoError = "";
        }

        if (isError) {
            this.setState({
                errors: tempError
            });
        }
        return isError;
    }
    componentWillMount() {
        axios.get("http://localhost:8080/getAllRole")
            .then(response => {
                console.log("Roles=",response.data);
                this.setState({ roles: response.data })
            });
    }
    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value
        });

    }
    handleSubmitSignUp(e) {
        e.preventDefault();
        const err = this.validate();
        if(!err){
        const data = {
            userName: this.state.userName,
            password: this.state.password,
            email: this.state.email,
            mobileNo: this.state.mobileNo,
            roleId: this.state.roleId
        };
        console.log(">>>>>>>>>>>>>>>signUp" , JSON.stringify(data));
        axios.post("http://localhost:8080/signUp", data)
            .then(response => {
                console.log("signUp",response);
                if (response.data === "Not Saved") {
                    document.getElementById("Warning").style.visibility = "visible";
                }
               else {
                    alert("Details Submitted");
                    this.props.history.push('/');
                }
                
            });

    }
    }
    render() {

        const style = {
            color: 'white'

        };
        const style1 = {
            color: 'black'

        };
        const style2 = {
            visibility: 'hidden'

        };
        return (
            <div className="signUp">

                <div className="PageSwitcher">
                    <NavLink exact to="/" activeClassName="PageSwitcher_Active" className="PageSwitcher__Item">Sign In</NavLink>
                    <NavLink to="/signUp" activeClassName="PageSwitcher_Active" className="PageSwitcher__Item ">Sign Up</NavLink>
                </div>

                <div className="FormTitle FormField__Label">
                   <h3>Create Account</h3>
                </div>

                <div className="FormCenter">
                    <Form className="FormFields" onSubmit={this.handleSubmitSignUp} noValidate>
                        <Row>
                            <Col lg={12}>
                                <Row>
                                    <Col lg={3}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="userName">User Name</label>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={6}>
                                        <FormGroup>
                                            <input type="text" id="userName" className="FormField__input" placeholder="Enter User Name" name="userName" onChange={this.handleChange} required></input>
                                            <span style={{color: "orange"}}>{this.state.errors.userNameError}</span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="email">Email Address</label>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={6}>
                                        <FormGroup>
                                            <input type="email" id="email" className="FormField__input" placeholder="Enter Email Address" name="email" onChange={this.handleChange} required ></input>
                                            <span style={{color: "orange"}}>{this.state.errors.emailError}</span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="mobileNo">Mobile Number</label>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={6}>
                                        <FormGroup>
                                            <input type="text" id="mobileNo" className="FormField__input" pattern= "[0-9]" placeholder="Enter Mobile Number" name="mobileNo" onChange={this.handleChange} required ></input>
                                            <span style={{color: "orange"}}>{this.state.errors.mobileNoError}</span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="password">Password</label>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={6}>
                                        <FormGroup>
                                            <input type="password" id="password" className="FormField__input" placeholder="Enter Password" name="password" onChange={this.handleChange} required></input>
                                            <span style={{color: "orange"}}>{this.state.errors.passwordError}</span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="roleId">Role</label>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={6}>
                                        <FormGroup>
                                            <select type="select" id="roleId" name="roleId" onChange={this.handleChange} className="FormField_select" required style={style}>
                                                <option hidden disabled selected value style={style1}>Please Select role</option>
                                                {this.state.roles.map(v => {
                                                    return <option value={v.roleId} style={style1}>{v.roleName}</option>;
                                                })}
                                            </select>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12}>
                                        <FormGroup>
                                            <Alert color="danger" id="Warning" className="warning" style={style2}>
                                                User Name is already used
                                            </Alert>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3}>
                                        <FormGroup>
                                            <Button className="signIn_btn">Create</Button>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={6}>
                                        <FormGroup>
                                            <Link exact to="/" className="FormField__Link">Already a Member</Link>
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


export default SignUp;