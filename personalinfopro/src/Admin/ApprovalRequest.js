import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { Table, Button, Form, FormGroup ,Row, Col } from 'reactstrap';
class ApprovalRequest extends Component {
    constructor() {
        super();
        this.state = {
            approvalList: [],
            roleName: '',
            search:'',
            searchResult: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        console.log(">>>>>>>>>>>RoleId" , sessionStorage.getItem('RoleId'));

    }
    componentWillMount() {
        axios.get("http://localhost:8080/getAllUser")
            .then(response => {
                console.log("AllUser",response.data);
                this.setState({ approvalList: response.data })
            });
        axios.get("http://localhost:8080/getRole/" + sessionStorage.getItem('RoleId'))
            .then(response => {
                this.setState({ roleName: response.data.roleName })
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
            axios.post("http://localhost:8080/searchUser/" + value)
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
        document.getElementById("search").value ="";
        console.log("RRRRRRRRRRR", name, "value", value, this.state.roleId);
        
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
        axios.put("http://localhost:8080/approved", data)
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

        console.log(">>>>>>>>>" + this.state.roleName)
        this.state.approvalList.map(v => {
            console.log(v);
        });
        if (this.state.search != "") {
            return (
                <div className="approvalRequest">
                    <NavBar></NavBar>
                    <Form className="approvalRequest_menu" >
                        <br />
                        <FormGroup>
                            <Row>
                            <Col lg={2}>
                            <select type="select" id="users" name="users" onChange={this.handleChange} className="approv_select" required >
                                <option hidden disabled selected value>Show Users</option>
                                <option value="All">All</option>
                                <option value="Authorized" >Authorized</option>
                                <option value="Unauthorized" >Unauthorized</option>
                            </select>
                            </Col>
                            <Col>
                            <label htmlFor="search">Enter Name to Search</label>
                            <input type="text" id="search" placeholder="Enter name" name="search" onChange={this.search}></input>
                            </Col>
                            </Row>
                        </FormGroup>
                        <div class="approve_table">
                        <Table hover>
                                <thead>
                                    <tr>
                                        <th className="approve_item">Name</th>
                                        <th className="approve_item">Email</th>
                                        <th className="approve_item">Mobile</th>
                                        {this.state.roleName === "Administrator" ?
                                            <th className="approve_item">Authorized</th> : ""}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.approvalList.map((data, key) => {
                                        if (data.userName !== "Admin") {
                                            if (this.state.roleName === "Administrator") {
                                                if (data.approved === true) {
                                                    return (
                                                        <tr key={key}>
                                                            <td className="approve_item">{data.userName}</td>
                                                            <td className="approve_item">{data.email}</td>
                                                            <td className="approve_item">{data.mobileNo}</td>
                                                            <td className="approve_item"></td>
                                                        </tr>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <tr key={key}>
                                                            <td className="approve_item">{data.userName}</td>
                                                            <td className="approve_item">{data.email}</td>
                                                            <td className="approve_item">{data.mobileNo}</td>
                                                            <td className="approve_item"><Button className="signIn_btn" onClick={(e) => this.handleSubmit(e, key)}>Approve</Button></td>
                                                        </tr>
                                                    )
                                                }

                                            }
                                            if (this.state.roleName === "Operation") {
                                                return (
                                                    <tr key={key}>
                                                        <td className="approve_item">{data.userName}</td>
                                                        <td className="approve_item">{data.email}</td>
                                                        <td className="approve_item">{data.mobileNo}</td>
                                                    </tr>
                                                )
                                            }
                                        }
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </Form>
                </div>
            );
        }
        if (this.state.users === "All") {
            return (
                <div className="approvalRequest">
                    <NavBar></NavBar>
                    <Form className="approvalRequest_menu">
                        <br />
                        <FormGroup>
                            <Row>
                            <Col lg={2}>
                            <select type="select" id="users" name="users" onChange={this.handleChange} className="approv_select" required >
                                <option hidden disabled selected value>Show Users</option>
                                <option value="All">All</option>
                                <option value="Authorized" >Authorized</option>
                                <option value="Unauthorized" >Unauthorized</option>
                            </select>
                            </Col>
                            <Col>
                            <label htmlFor="search">Enter Name to Search</label>
                            <input type="text" id="search" placeholder="Enter name" name="search" onChange={this.search}></input>
                            </Col>
                            </Row>
                        </FormGroup>
                        <div class="approve_table">
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th className="approve_item">Name</th>
                                        <th className="approve_item">Email</th>
                                        <th className="approve_item">Mobile</th>
                                        {this.state.roleName === "Administrator" ?
                                            <th className="approve_item">Authorized</th> : ""}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.approvalList.map((data, key) => {
                                        if (data.userName !== "Admin") {
                                            if (this.state.roleName === "Administrator") {
                                                if (data.approved === true) {
                                                    return (
                                                        <tr key={key}>
                                                            <td className="approve_item">{data.userName}</td>
                                                            <td className="approve_item">{data.email}</td>
                                                            <td className="approve_item">{data.mobileNo}</td>
                                                            <td className="approve_item"></td>
                                                        </tr>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <tr key={key}>
                                                            <td className="approve_item">{data.userName}</td>
                                                            <td className="approve_item">{data.email}</td>
                                                            <td className="approve_item">{data.mobileNo}</td>
                                                            <td className="approve_item"><Button className="signIn_btn" onClick={(e) => this.handleSubmit(e, key)}>Approve</Button></td>
                                                        </tr>
                                                    )
                                                }

                                            }
                                            if (this.state.roleName === "Operation") {
                                                return (
                                                    <tr key={key}>
                                                        <td className="approve_item">{data.userName}</td>
                                                        <td className="approve_item">{data.email}</td>
                                                        <td className="approve_item">{data.mobileNo}</td>
                                                    </tr>
                                                )
                                            }
                                        }
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </Form>
                </div>
            );
        }
        else if (this.state.users === "Authorized") {
            return (
                <div className="approvalRequest">
                    <NavBar></NavBar>
                    <Form className="approvalRequest_menu" onSubmit={this.handleSubmit}>
                        <br />
                        <FormGroup>
                            <Row>
                            <Col lg={2}>
                            <select type="select" id="users" name="users" onChange={this.handleChange} className="approv_select" required >
                                <option hidden disabled selected value>Show Users</option>
                                <option value="All">All</option>
                                <option value="Authorized" >Authorized</option>
                                <option value="Unauthorized" >Unauthorized</option>
                            </select>
                            </Col>
                            <Col>
                            <label htmlFor="search">Enter Name to Search</label>
                            <input type="text" id="search" placeholder="Enter name" name="search" onChange={this.search}></input>
                            </Col>
                            </Row>
                        </FormGroup>

                        <div className="approve_table">
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th className="approve_item">Name</th>
                                        <th className="approve_item">Email</th>
                                        <th className="approve_item">Mobile</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.approvalList.map((data, key) => {
                                        if (data.userName !== "Admin") {
                                            if (data.approved === true) {
                                                return (
                                                    <tr key={key}>
                                                        <td className="approve_item">{data.userName}</td>
                                                        <td className="approve_item">{data.email}</td>
                                                        <td className="approve_item">{data.mobileNo}</td>
                                                    </tr>
                                                )
                                            }
                                        }
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </Form>
                </div>
            );
        }
        else if (this.state.users === "Unauthorized") {
            return (
                <div className="approvalRequest">
                    <NavBar></NavBar>
                    <Form className="approvalRequest_menu" >
                        <br />
                        <FormGroup>
                            <Row>
                            <Col lg={2}>
                            <select type="select" id="users" name="users" onChange={this.handleChange} className="approv_select" required >
                                <option hidden disabled selected value>Show Users</option>
                                <option value="All">All</option>
                                <option value="Authorized" >Authorized</option>
                                <option value="Unauthorized" >Unauthorized</option>
                            </select>
                            </Col>
                            <Col>
                            <label htmlFor="search">Enter Name to Search</label>
                            <input type="text" id="search" placeholder="Enter name" name="search" onChange={this.search}></input>
                            </Col>
                            </Row>
                        </FormGroup>
                        <div className="approve_table">
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th className="approve_item">Name</th>
                                        <th className="approve_item">Email</th>
                                        <th className="approve_item">Mobile</th>
                                        {this.state.roleName === "Administrator" ?
                                            <th className="approve_item">Authorized</th> : ""}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.approvalList.map((data, key) => {
                                        if (data.userName !== "Admin") {
                                            if (data.approved === false) {
                                                if (this.state.roleName === "Administrator") {
                                                    return (
                                                        <tr key={key}>
                                                            <td className="approve_item">{data.userName}</td>
                                                            <td className="approve_item">{data.email}</td>
                                                            <td className="approve_item">{data.mobileNo}</td>
                                                            <td className="approve_item"><Button className="signIn_btn" onClick={(e) => this.handleSubmit(e, key)}>Approve</Button></td>
                                                        </tr>
                                                    )
                                                }
                                                if (this.state.roleName === "Operation") {
                                                    return (
                                                        <tr key={key}>
                                                            <td className="approve_item">{data.userName}</td>
                                                            <td className="approve_item">{data.email}</td>
                                                            <td className="approve_item">{data.mobileNo}</td>
                                                        </tr>
                                                    )
                                                }
                                            }
                                        }
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </Form>
                </div>
            );
        }
        else {
            return (
                <div className="approvalRequest">
                    <NavBar></NavBar>
                    <Form className="approvalRequest_select" onSubmit={this.handleSubmit}>
                        <br />
                        <FormGroup>
                            <Row>
                            <Col lg={1}>
                            <select type="select" id="users" name="users" onChange={this.handleChange} className="approv_select" required >
                                <option hidden disabled selected value>Show Users</option>
                                <option value="All">All</option>
                                <option value="Authorized" >Authorized</option>
                                <option value="Unauthorized" >Unauthorized</option>
                            </select>
                            </Col>
                            <Col>
                            <label htmlFor="search">Enter Name to Search</label>
                            <input type="text" id="search" placeholder="Enter name" name="search" onChange={this.search}></input>
                            </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </div>
            );
        }

    }
}

const unauthorized = () => {

}
export default ApprovalRequest;