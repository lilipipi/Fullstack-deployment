import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import DashboardOwner from "./components/Pages/Business-Owner/OwnerDashboard.js";
import HeaderNew from "./components/Layout/Navbar/Navbar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import Login from "./components/Login/Login";
import SignUp from"./components/Project/SignUp";
import Business_Admin from "./components/Project/Business_Admin";
import About from "./components/Pages/About/About";
import serviceDash from "./components/Pages/User/ServiceDash.js";
import UserAppo from "./components/Pages/User/UserDash.js";
import AppoDetails from "./components/Pages/User/AppoDetails.js";
import CreateAppo from "./components/Pages/User/CreateAppo.js";
import Profile_Details from "./components/Layout/Profile-Details/Profile_Details.";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <HeaderNew />
          <Route exact path="/dashboard" component={Dashboard} />
          
          <Route exact path="/dashboardOwner" component={DashboardOwner} />

          <Route exact path="/UserAppo" component={UserAppo} />
          <Route exact path="/CreateAppo" component={CreateAppo} />
          <Route exact path="/appointment/:id" component={AppoDetails} />

          <Route exact path="/serviceDash" component={serviceDash} />

          <Route exact path="/addProject" component={AddProject} />
          <Route exact path="/updateProject/:id" component={UpdateProject} />

          <Route exact path="/login.html" component={Login} />
          <Route exact path="/register.html" component={SignUp} />
          <Route exact path="/home_a" component={Business_Admin} />
          <Route exact path="/about" component={About} />
          <Route exact path="/profile.html" component={Profile_Details} />

        </div>
      </Router>
    </Provider>
  );
}

export default App;
