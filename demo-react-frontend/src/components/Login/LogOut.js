import React, { Component } from "react";
import  { Redirect } from 'react-router-dom'

class LogOut extends Component {

    componentDidMount() {
        window.sessionStorage.clear();
        window.location.reload(true);
    }

    render() {
        return(
            <>
                <Redirect to='/login' />                
            </>
        );
    }
}

export default LogOut;