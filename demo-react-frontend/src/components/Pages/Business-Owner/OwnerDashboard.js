import React, { Component } from "react";
import Sidebar from '../../Layout/Sidebar/Sidebar.js';
import Appointments from './Appointments.js';

class OwnerDashboard extends Component {
    render() {
        return (
            <>
            <Sidebar/>
            <Appointments/>
            </>
        );
    }
}

export default OwnerDashboard;
