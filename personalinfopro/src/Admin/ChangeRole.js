import React, { Component } from 'react';
import { Table, Button, Form, FormGroup, Row, Col } from 'reactstrap';
import axios from 'axios';
import NavBar from './NavBar';
class ChangeRole extends Component {
    constructor() {
        super();
        this.state = {
            approvalList: [],
            roleId: '',
            roles: [],
            rows: []
                };

        this.handleChange = this.handleChange.bind(this);
        let a = this.state.rows.slice(); //creates the clone of the state
a[1] = 1;
this.setState({rows: a});
    }
    componentWillMount() {
        axios.get("http://localhost:8080/getAllRole")
        .then(response => {
            this.setState({ roles: response.data })
        });
        axios.get("http://localhost:8080/getAllUser")
            .then(response => {
                console.log("AllUser", response.data);
                this.setState({ approvalList: response.data })
            });
    }
    
    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });

        console.log("!!!",name,"!!!",value)

    }
    handleSubmit(e, key) {
        e.preventDefault();
        const data = {
            userName: this.state.approvalList[key].userName,
            password: this.state.approvalList[key].password,
            email: this.state.approvalList[key].email,
            mobileNo: this.state.approvalList[key].mobileNo,
            roleId: this.state.roleId,
            userId: this.state.approvalList[key].userId,
            approved: this.state.approvalList[key].approved
        };

        console.log("handleSubmit===>" + JSON.stringify(data));
        axios.post("http://localhost:8080/changeRole", data)
            .then(response => {
                console.log("|||||||||",response);
                if (response.data === "Success") {
                    this.props.history.push('/adminDashboard');
                }
                if (response.data === "Not changed") {
                    // document.getElementById("Warning").style.visibility = "visible";
                }
            });

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
            <div className="approvalRequest">
                <NavBar></NavBar>
                <Form className="approvalRequest_menu">
                    <br />
                    <div class="approve_table">
                        <Table hover>
                            <thead>
                                <tr>
                                    <th className="approve_item">Name</th>
                                    <th className="approve_item">Email</th>
                                    <th className="approve_item">Mobile</th>
                                    <th className="approve_item">Change Role</th>
                                    <th className="approve_item">Submit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.approvalList.map((data, key) => {
                                    if (data.userName !== "Admin") {
                                    return (
                                        <tr key={key}>
                                            <td className="approve_item">{data.userName}</td>
                                            <td className="approve_item">{data.email}</td>
                                            <td className="approve_item">{data.mobileNo}</td>
                                            <td className="approve_item">
                                                <select type="select" id="roleId" name="roleId" onChange={this.handleChange} value={this.state.rows[key]} className="FormField_select" style={style}>
                                                <option value="" style={style1}>--Select--</option>
                                                {this.state.roles.map(v => {
                                                    return <option value={v.roleId} style={style1}>{v.roleName}</option>;
                                                })}
                                               </select>
                                            </td>
                                            <td><Button className="signIn_btn" onClick={(e) => this.handleSubmit(e, key)}>Submit</Button></td>
                                        </tr>
                                    )
                                 }
                                })}
                            </tbody>
                        </Table>
                    </div>
                </Form>
            </div>
        );
    }
}


export default ChangeRole;