import React, { Component } from 'react';
import { Alert, Form, Row, Col, FormGroup, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import NavBar from './NavBar';
import './AdminDashboard.css';
class Role extends Component {
    constructor() {
        super();
        this.state = {
            roleName: '',
            roleError: ''
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

    validate = () => {
        let isError = false;
        if ((this.state.roleName.length) === 0) {
            isError = true;
            this.setState({roleError:"Role name should not be empty"})
        } else {
            this.setState({roleError:""})
        }
        
        return isError;
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        const err = this.validate();
        if (!err) {
            const data = {
                roleName: this.state.roleName
            };

            try {
                axios.post("http://localhost:8080/role", data)
                    .then(response => {
                        console.log("*************",response.data);
                        if (response.data === "Not Save") {
                            console.log("*************" + response.data);
                            document.getElementById("Warning").style.visibility = "visible";
                        }
                        else {
                            this.props.history.push('/adminDashboard');
                            sessionStorage.setItem('UserName', response.data.userName);
                        }
                    });

            } catch (error) {
                console.log("Error");
            }
        }
    }
    render() {
        const style2 = {
            visibility: 'hidden'

        };
        return (
            <div className="roleCreate">
                <NavBar></NavBar>
                <Form className="createRole" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col lg={12}>
                            <Row>
                                <Col lg={3}>
                                    <FormGroup>
                                        <label className="roleName_label" htmlFor="roleName">Role Name</label>

                                    </FormGroup>
                                </Col>

                                <Col lg={7}>
                                    <FormGroup>
                                        <input type="text" id="roleName" className="role__Input"
                                            placeholder="Enter Role name"
                                            name="roleName" value={this.state.roleName} onChange={this.handleChange} />
                                            <span style={{ color: "orange" }}>{this.state.roleError}</span>
                                    </FormGroup>
                                </Col>
                                <Col lg={2}>
                                    <FormGroup>
                                        <Button className="form_btn" color="primary">Submit</Button>
                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row>
                                <FormGroup>
                                    <Alert color="danger" id="Warning" className="warning" style={style2}>
                                        Role name is already used
                                    </Alert>
                                </FormGroup>
                            </Row>
                        </Col>
                    </Row>

                </Form>
            </div>

        );
    }
}

export default Role;