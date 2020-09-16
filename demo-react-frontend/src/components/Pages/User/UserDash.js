import React, { Component } from "react";
import Sidebar from '../../Layout/Sidebar/Sidebar.js';
import Appointments from './UApt.js';
import { Container } from "react-bootstrap";
import Navbar from "../../Layout/Navbar/Navbar.js";

class UserDash extends Component {
    render() {
        return (
            <Container fluid style={{padding:'0rem'}}>
                <Navbar/>
                <Sidebar/>
                <div style={{marginLeft:'25%'}}>
                <Appointments/>
                </div>
            </Container>
        );
    }
}

export default UserDash;
