import React, { Component } from "react";
import Sidebar from '../../Layout/Sidebar/Sidebar.js';
import Appointments from './UApt.js';

class UserDash extends Component {
    render() {
        return (
            <>
                <Sidebar />
                <Appointments/>
            </>
        );
    }
}

export default UserDash;
