import React, { Component } from 'react';
import './App.css';
import About from './About/About';
import SignIn from "./Login/SignIn";
import SignUp from "./Login/SignUp";
import Role from "./Admin/Role";
import AdminDashboard from "./Admin/AdminDashboard";
import ApprovalRequest from "./Admin/ApprovalRequest";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Registration  from "./Login/Registration";
import User from "./Admin/CreateUser";
import personalInfo from "./Login/PersonalInfo";
import ApprovalDetails from "./Admin/ApproveDetails";
import ChangeRole from "./Admin/ChangeRole";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            {/* <Route exact path="/" component={Login} /> */}
            <Route exact path="/" component={SignIn} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/about" component={About} />
            <Route path="/adminDashboard" component={AdminDashboard} />
            <Route path="/registration" component={Registration} />
            <Route path="/role" component={Role} />
            <Route path="/approval" component={ApprovalRequest} />
            <Route path="/user" component={User}/>
            <Route path="/personalInfo" component={personalInfo}/>
            <Route path="/approve" component={ApprovalDetails}/>
            <Route path="/changeRole" component={ChangeRole}/>
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;

