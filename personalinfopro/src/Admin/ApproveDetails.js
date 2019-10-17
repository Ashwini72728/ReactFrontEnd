import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { Table, Button, Form, FormGroup ,Row, Col} from 'reactstrap';
class ApprovalDetails extends Component {
    constructor() {
        super();
        this.state = {
            approvalList: [],
            role: [],
            roleId: '',
            search:'',
            searchResult: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        console.log(">>>>>>>>>>>RoleId", sessionStorage.getItem('RoleId'));

    }
    componentWillMount() {

        axios.get("http://localhost:8080/getAllRole")
            .then(response => {
                this.setState({ role: response.data })
            });
    }
    search(e){
        let target = e.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value
        });
        console.log("RRRRRRRRRRR", name, "value", value);
        if(value!=""){
        axios.post("http://localhost:8080/searchEditedUser/" + value)
            .then(response => {
                console.log("search Result", response.data);
                this.setState({ approvalList: response.data })
            });
        }
    }
    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value
        });
        this.setState({search:""});
        console.log("RRRRRRRRRRR", name, "value", value, this.state.roleId);
        axios.get("http://localhost:8080/getAllUserDetails/" + value)
            .then(response => {
                console.log("AllUser", response.data);
                this.setState({ approvalList: response.data })
            });

    }
    handleSubmit(e, key) {
        e.preventDefault();
        const data = {
            userName: this.state.approvalList[key].userName,
            password: this.state.approvalList[key].password,
            email: this.state.approvalList[key].email,
            mobileNo: this.state.approvalList[key].mobileNo,
            roleId: this.state.approvalList[key].roleId,
            userId: this.state.approvalList[key].userId,
            approved: this.state.approvalList[key].approved
        };

        console.log("handleSubmit===>" + JSON.stringify(data));
        axios.put("http://localhost:8080/approvedDetails", data)
            .then(response => {
                if (response.data === "Success") {
                    this.props.history.push('/adminDashboard');
                }
                if (response.data === "Not approved") {
                    // document.getElementById("Warning").style.visibility = "visible";
                }
            });

    }

    render() {

        this.state.approvalList.map(v => {
            console.log(v);
        });
        if (this.state.search != "") {
            return (
                <div className="approvalRequest">
                    <NavBar></NavBar>
                    <div>
                        <Form className="approvalRequest_select" onSubmit={this.handleSubmit}>
                            <br />
                            <FormGroup>
                                <Row>
                                <Col lg={1}>
                                <select type="select" id="roleId" name="roleId" onChange={this.handleChange} className="approv_select" required>
                                    <option hidden disabled selected value>--Select Role--</option>
                                    {this.state.role.map(v => {
                                        if (v.roleId !== 1) {
                                            return <option value={v.roleId}>{v.roleName}</option>;
                                        }
                                    })}
                                </select>
                                </Col>
                                <Col>
                                  <label htmlFor="search">Enter First name to Search</label>
                                  <input type="text" id="search" placeholder="Enter name" name="search" onChange={this.search}></input>
                                </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                    </div>
    
                    <div className="approveDetails_table">
                        <Table hover>
                            <thead>
                                <tr>
                                    <th className="approve_item">Name</th>
                                    <th className="approve_item">Email</th>
                                    <th className="approve_item">Mobile</th>
                                    <th className="approve_item">Authorized</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.approvalList.map((data, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className="approve_item">{data.firstName}</td>
                                            <td className="approve_item">{data.email}</td>
                                            <td className="approve_item">{data.mobileNo}</td>
                                            <td className="approve_item"><Button className="signIn_btn" onClick={(e) => this.handleSubmit(e, key)}>Approve</Button></td>
                                        </tr>
                                    )
    
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            );
        }
        if(this.state.roleId!=""){
            return (
                <div className="approvalRequest">
                    <NavBar></NavBar>
                    <div>
                        <Form className="approvalRequest_select" onSubmit={this.handleSubmit}>
                            <br />
                            <FormGroup>
                                <Row>
                                <Col lg={1}>
                                <select type="select" id="roleId" name="roleId" onChange={this.handleChange} className="approv_select" required>
                                    <option hidden disabled selected value>--Select Role--</option>
                                    {this.state.role.map(v => {
                                        if (v.roleId !== 1) {
                                            return <option value={v.roleId}>{v.roleName}</option>;
                                        }
                                    })}
                                </select>
                                </Col>
                                <Col>
                                  <label htmlFor="search">Enter First name to Search</label>
                                  <input type="text" id="search" placeholder="Enter name" name="search" onChange={this.search}></input>
                                </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                    </div>
    
                    <div class="approveDetails_table">
                        <Table hover>
                            <thead>
                                <tr>
                                    <th className="approve_item">Name</th>
                                    <th className="approve_item">Email</th>
                                    <th className="approve_item">Mobile</th>
                                    <th className="approve_item">Authorized</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.approvalList.map((data, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className="approve_item">{data.firstName}</td>
                                            <td className="approve_item">{data.email}</td>
                                            <td className="approve_item">{data.mobileNo}</td>
                                            <td className="approve_item"><Button className="signIn_btn" onClick={(e) => this.handleSubmit(e, key)}>Approve</Button></td>
                                        </tr>
                                    )
    
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            );
        }
        else{
            return (
            <div className="approvalRequest">
                    <NavBar></NavBar>
                    <div>
                        <Form className="approvalRequest_select" onSubmit={this.handleSubmit}>
                            <br />
                            <FormGroup>
                                <Row>
                                <Col lg={1}>
                                <select type="select" id="roleId" name="roleId" onChange={this.handleChange} className="approv_select" required>
                                    <option hidden disabled selected value>--Select Role--</option>
                                    {this.state.role.map(v => {
                                        if (v.roleId !== 1) {
                                            return <option value={v.roleId}>{v.roleName}</option>;
                                        }
                                    })}
                                </select>
                                </Col>
                                <Col>
                                  <label htmlFor="search">Enter First name to Search</label>
                                  <input type="text" id="search" placeholder="Enter name" name="search" onChange={this.search}></input>
                                </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                    </div>
            </div>
            );
        }
        
    }
}

export default ApprovalDetails;