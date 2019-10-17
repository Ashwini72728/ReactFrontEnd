import React, { Component } from 'react';
import '../Login/Login.css';
import axios from 'axios';
import { Alert, Form, Row, Col, FormGroup, Button } from 'reactstrap';
import NavBar from "./NavBar";
class CreateUser extends Component {
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
                console.log(response.data);
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
        const approve = false;
        console.log("RoleID",sessionStorage.getItem('RoleId'));
        if(sessionStorage.getItem('RoleId')==1){
           this.approve = "true";
           console.log("Approve=",this.approve);
        }
        if(!err){
        const data = {
            userName: this.state.userName,
            password: this.state.password,
            email: this.state.email,
            mobileNo: this.state.mobileNo,
            approved: this.approve,
            roleId: this.state.roleId
        };
        console.log(">>>>>>>>>>>>>>>Create" + JSON.stringify(data));
        axios.post("http://localhost:8080/signUp", data)
            .then(response => {
                console.log(response.data);
                if (response.data === "Not Saved") {
                    document.getElementById("Warning").style.visibility = "visible";
                    sessionStorage.setItem("NewUser","");
                }
                else {
                    alert("Details Submitted");
                    sessionStorage.setItem("NewUser","");
                    sessionStorage.setItem("NewUser",response.data.userId);
                    this.props.history.push('/registration');
                    
                }
            });

    }
    }
    render() {

        const style2 = {
            visibility: 'hidden',

        };
        const style = {
            color: 'white'

        };
        const style1 = {
            color: 'black'

        };
        return (
            <div><NavBar></NavBar>
            <div className="createUser">
                <div className="FormTitle">
                     <h2>Create new User</h2>
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
                                            <input type="text" id="mobileNo" className="FormField__input" placeholder="Enter Mobile Number" name="mobileNo" onChange={this.handleChange} required ></input>
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
                                    <Col>
                                        <FormGroup>
                                            <Button className="createUser_btn">Create</Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Form>
                </div>
                </div>
            </div>
        );
    }
}


export default CreateUser;