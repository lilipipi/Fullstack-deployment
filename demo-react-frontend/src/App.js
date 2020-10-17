import React from "react";
import "./App.css";
import DashboardOwner from "./components/Pages/Business-Owner/Appointments.js";
import HeaderNew from "./components/Layout/Navbar/Navbar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Pages/Login/Login";
import SignUp from"./components/Pages/SingUp/SignUp";
import About from "./components/Pages/About/About";
import Aboutpage from "./components/Pages/About/aboutpage";
import serviceDash from "./components/Pages/Services/Service.js";
import UserAppo from "./components/Pages/User/UApt.js";
import AppoDetails from "./components/Pages/User/AppoDetails.js";
import CreateAppo from "./components/Pages/User/CreateAppo.js";
import Profile_Details from "./components/Pages/Profile_Details/Profile_Details";
import Edit_Profile from "./components/Pages/Profile_Details/Edit_Profile";
import Services from "./components/Pages/Business-Owner/MyServices"
import Contact from './components/Pages/Contact/Contact.js';
import LogOut from './components/Pages/Login/LogOut.js';
import EmployeesPage from './components/Pages/Business-Owner/EmployeesPage.js';
import CreateService from './components/Pages/Business-Owner/CreateService.js';
import EditService from './components/Pages/Business-Owner/EditService.js';
import AddEmployee from './components/Pages/Business-Owner/AddEmployee.js';
import EditEmployee from './components/Pages/Business-Owner/EditEmployee.js';
import ADetails from "./components/Pages/Business-Owner/ADetails.js";

function App() {

  return (
    <>
    <Provider store={store}>
      <Router>
        <div className="App">
          <HeaderNew loggedIn={ window.sessionStorage.getItem('loggedIn') }/>
          
          <Route exact path="/dashboardOwner" component={DashboardOwner} />
          <Route exact path="/BusinessServices" component={Services} />
          <Route exact path="/CreateService" component={CreateService} />
          <Route exact path="/UserAppo" component={UserAppo} />
          <Route exact path="/CreateAppo/:id" component={CreateAppo} />
          <Route exact path="/appointment/:id" component={AppoDetails} />
          <Route exact path="/businessAppo/:id" component={ADetails} />
          <Route exact path="/services/:id" component={EditService} />
          <Route exact path="/serviceDash" component={serviceDash} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/" component={About} />
          <Route exact path="/about" component={Aboutpage} />
          <Route exact path="/profile" component={Profile_Details} />
          <Route exact path="/profile/Edit" component={Edit_Profile} />
          
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/LogOut" component={LogOut} />
          <Route exact path="/EmployeesPage" component={EmployeesPage} />
          <Route exact path="/AddEmployee" component={AddEmployee} />
          <Route exact path="/EmployeeList/:id" component={EditEmployee} />




        </div>
      </Router>
    </Provider>
    </>
  );
}

export default App;
