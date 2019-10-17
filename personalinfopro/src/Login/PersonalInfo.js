import React, { Component } from 'react';
import './Login.css';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import { Alert, Table, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Input, Lable } from 'reactstrap';
import axios from 'axios';
import { Form, Row, Col, FormGroup, Button } from 'reactstrap';
import Nav from '../Admin/NavBar';
class PersonalInfo extends Component {
    constructor() {
        super();

        this.state = {
            userName:'',
            userId:'',
            firstName: '',
            middleName: '',
            lastName: '',
            address: '',
            gender: '',
            dob: '',
            age: '',
            city: '',
            state: '',
            pinCode: '',
            educationalStatus: '',
            birthSign: '',
            physicalDisability: '',
            maritalStatus: '',
            email:'',
            mobileNo: '',
            roleId: '',
            roles: [],
            errors: {
                firstNameError: "",
                lastNameError: "",
                addressError: '',
                cityError:'',
                mobileNoError: '',
                emailError:''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
    }
    validate = () => {
        let isError = false;
        let tempError = this.state.errors;
        if (this.state.firstName ==null) {
            isError = true;
            tempError.firstNameError = "First Name should not be empty";
        } else {
            tempError.firstNameError = "";
        }
        if (this.state.lastName ===null) {
            isError = true;
            tempError.lastNameError = "Last Name should not be empty";
        } else {
            tempError.lastNameError = "";
        }
        if (this.state.email ===null) {
            isError = true;
            tempError.emailError = "Email should not be empty";
        }
        else if (!this.state.email.match('@') ) {
            isError = true;
            tempError.emailError = "Please include @ in the email address";
        } else {
            tempError.emailError = "";
        }
        if (String(this.state.mobileNo).length !== 10) {
            isError = true;
            tempError.mobileNoError = "Mobile number should be 10 numbers";
        } else {
            tempError.mobileNoError = "";
        }
        if (this.state.address ===null) {
            isError = true;
            tempError.addressError = "Address should not be empty";
        } else {
            tempError.addressError = "";
        }
        if (this.state.city ===null) {
            isError = true;
            tempError.cityError = "City should not be empty";
        } else {
            tempError.cityError = "";
        }
        if (isError) {
            this.setState({
                errors: tempError
            });
        }
        return isError;
    }
    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }
   
    componentWillMount() {
        axios.get("http://localhost:8080/getAllRole")
            .then(response => {
                this.setState({ roles: response.data })
            });
          axios.get("http://localhost:8080/getUserDetail/"+sessionStorage.getItem('userID'))
            .then(response => {
               if(response.data.dob!=null){
                response.data.dob = this.convertdate(response.data.dob);
               }
                this.setState(response.data);
               
           })
           .catch(error => {
            
           });
    }

    convertdate(dob){
        return dob.toString().substring(0,10);
    }
    handleSubmitSignUp(e) {
        e.preventDefault();
        const err = this.validate();
        if(!err){
        const approv = "false";
        if(sessionStorage.getItem('RoleId')==1){
            console.log("RegistrationroleID=="+sessionStorage.getItem('RoleId'));
           this.approv = "true";
        }
        console.log(this.approv)
        const data = {
            
            userId:sessionStorage.getItem('userID'),
            email:this.state.email,
            mobileNo:this.state.mobileNo,
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            address: this.state.address,
            gender: this.state.gender,
            dob: this.state.dob,
            age: this.state.age,
            city: this.state.city,
            state: this.state.state,
            pinCode: this.state.pinCode,
            educationalStatus: this.state.educationalStatus,
            birthSign: this.state.birthSign,
            physicalDisability: this.state.physicalDisability,
            maritalStatus: this.state.maritalStatus,
            roleId: this.state.roleId,
            approved:this.approv
        };
        console.log(">>>>>>>CREATE====="+JSON.stringify(data));
        axios.post("http://localhost:8080/saveUserDetails", data)
            .then(response => {
                if (response.data === "Not Save") {
                     document.getElementById("Warning").style.visibility = "visible";
                }
                else {
                    sessionStorage.setItem("NewUser","")
                    this.props.history.push('/user');
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
            <div className="register">
                <Nav></Nav>


                <div className="registerForm">
                    <Form className="FormFields" onSubmit={this.handleSubmitSignUp} noValidate>
                        <Row>
                            <Col lg={12}>
                                <Row>
                                    <Col lg={12}>
                                        <FormGroup>
                                            <h1 className="h1_register">User Details</h1>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="firstName">First Name</label>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={2}>
                                        <FormGroup>
                                            <input type="text" id="firstName" className="FormField__input" placeholder="Enter First Name" value={this.state.firstName} name="firstName" onChange={this.handleChange} required></input>
                                            <span style={{color: "orange"}}>{this.state.errors.firstNameError}</span>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="middleName">Middle Name</label>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={2}>
                                        <FormGroup>
                                            <input type="text" id="middleName" className="FormField__input" placeholder="Enter MiddleName" value={this.state.middleName } name="middleName" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="lastName">Last Name</label>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <input type="text" id="lastName" className="FormField__input" placeholder="Enter Last Name" value={this.state.lastName} name="lastName" onChange={this.handleChange} required></input>
                                            <span style={{color: "orange"}}>{this.state.errors.lastNameError}</span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="address">Address </label>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={10}>
                                        <FormGroup>
                                            <textarea id="address" className="FormField_textarea" placeholder="Enter Flat No,Society Name, Area Name/Street Name" value={this.state.address} name="address" onChange={this.handleChange} required></textarea>
                                            <span style={{color: "orange"}}>{this.state.errors.addressError}</span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="gender">Gender</label>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <input type="radio" value="MALE" name="gender" required onChange={this.handleChange} checked={this.state.gender === "MALE" ? true : false} style={{ marginRight: "2px" }} /> <span style={{ color: "white", marginRight: "2px" }}>Male</span>
                                            <input type="radio" value="FEMALE" name="gender" onChange={this.handleChange} checked={this.state.gender === "FEMALE" ? true : false} style={{ marginRight: "2px" }} /> <span style={{ color: "white" }}> Female</span>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="dob">Date Of Birth</label>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={2}>
                                        <FormGroup>
                                            <input type="date" id="dob" className="FormField__input" placeholder="Enter dd/mm/yy" value={this.state.dob} name="dob" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="age">Age</label>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={2}>
                                        <FormGroup>
                                            <input type="text" id="age" className="FormField__input" placeholder="Enter Age" value={this.state.age === 0 ? "":this.state.age} name="age" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                    </Col>
                                </Row>


                                <Row>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="city">City</label>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={2}>
                                        <FormGroup>
                                            <input type="text" id="city" className="FormField__input" placeholder="Enter City" value={this.state.city} name="city" onChange={this.handleChange} required></input>
                                            <span style={{color: "orange"}}>{this.state.errors.cityError}</span>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="state">State</label>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={2}>
                                        <FormGroup>
                                            <input type="text" id="state" className="FormField__input" placeholder="Enter State" value={this.state.state} name="state" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="pinCode">Pincode</label>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={2}>
                                        <FormGroup>
                                            <input type="text" id="pinCode" className="FormField__input" placeholder="Enter Pincode" value={this.state.pinCode  === 0 ? "":this.state.pinCode} name="pinCode" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="educationalStatus">Education</label>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <input type="text" id="educationalStatus" className="FormField__input" placeholder="Enter Education" value={this.state.educationalStatus} name="educationalStatus" onChange={this.handleChange} required></input>
                                        </FormGroup>                           </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="birthSign">Birth Sign</label>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <input type="text" id="birthSign" className="FormField__input" placeholder="Enter Birth Sign" value={this.state.birthSign} name="birthSign" onChange={this.handleChange} required></input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="mobileNo">Mobile Number</label>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <input type="text" id="mobileNo" className="FormField__input" placeholder="Enter MobileNo" value={this.state.mobileNo} name="mobileNo" onChange={this.handleChange} required></input>
                                            <span style={{color: "red"}}>{this.state.errors.mobileNoError}</span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="maritalStatus">Marital Status </label>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <select id="maritalStatus" name="maritalStatus" className="FormField_select" onChange={this.handleChange} required style={style} value={this.state.maritalStatus}>

                                                <option value="">--Select--</option>
                                                <option value="Married" style={style1}>Married</option>
                                                <option value="Unmarried" style={style1}>Unmarried</option>
                                                <option value="Divorced" style={style1}>Divorced</option>
                                                <option value="Widow" style={style1}>Widow</option>
                                                <option value="Widower" style={style1}>Widower</option>
                                            </select>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="roleId">Role</label>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <select type="select" id="roleId" name="roleId" value={this.state.roleId} onChange={this.handleChange} className="FormField_select" disabled style={style}>
                                                <option value="" style={style1}>--Select--</option>
                                                {this.state.roles.map(v => {
                                                    return <option value={v.roleId} style={style1}>{v.roleName}</option>;
                                                })}
                                            </select>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <label className="FormField__Label" htmlFor="physicalDisability">Physical Disability </label>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <select id="physicalDisability" name="physicalDisability" onChange={this.handleChange} className="FormField_select" required style={style} value={this.state.physicalDisability}>
                                                <option value="" style={style}>--Select--</option>
                                                <option value="Yes" style={style1}>Yes</option>
                                                <option value="No" style={style1}>No</option>
                                            </select>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                <Col lg={2}>
                                        <FormGroup>
                                        <label className="FormField__Label" htmlFor="email">Email Address</label>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <input type="email" id="email" className="FormField__input"  value={this.state.email} placeholder="Enter Email Address" name="email" onChange={this.handleChange} required ></input>
                                            <span style={{color: "orange"}}>{this.state.errors.emailError}</span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12}>
                                        <FormGroup>
                                            <Button className="register_btn">Submit</Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12}>
                                        <FormGroup>
                                            <Alert color="danger" id="Warning" className="warning" style={style2}>
                                                Not Saved
                                            </Alert>
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


export default PersonalInfo;