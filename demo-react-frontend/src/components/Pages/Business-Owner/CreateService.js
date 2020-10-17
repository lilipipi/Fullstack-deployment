import React, { Component } from 'react'
import './Appointments.css';
import { Button } from "react-bootstrap";
import * as BsIcons from 'react-icons/bs';
import Sidebar from '../../Layout/Sidebar/Sidebar';
import urlAddress from '../../ip.json';

const url = 'http://' + urlAddress.ip + ':8080/api/service';

class CreateService extends Component {
    constructor(props) {
        super(props)

        this.state = {
            serviceIdentifier: "s"+Math.floor(10000 + Math.random() * 9000),
            serviceName: '',
            serviceDescription: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDesHandler = this.changeDesHandler.bind(this);
        
    }
    changeNameHandler = (event) => {
        this.setState({ serviceName: event.target.value });
    }
    changeDesHandler = (event) => {
        this.setState({ serviceDescription: event.target.value });
    }
    handleSubmit = event => {
        event.preventDefault();
    }
    SaveData() {
        let h = new Headers();
        let email = window.sessionStorage.getItem('email');
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr('keyword');
        let encryptedString = window.sessionStorage.getItem('encrypted');
        const decryptedString = cryptr.decrypt(encryptedString);
        console.log(decryptedString);
        let encoded = window.btoa(email + ':' + decryptedString);
        let auth = 'Basic ' + encoded;
        h.append('Content-Type', 'application/json');
        h.append('Accept', 'application/json');
        h.append('Authorization', auth);

        fetch(url, {
            method: 'post',
            headers: h,
            body: JSON.stringify({
                serviceIdentifier: this.state.serviceIdentifier,
                serviceName: this.state.serviceName,
                serviceDescription: this.state.serviceDescription
            })
        }).then(console.log(this.state))
    }
    componentDidMount() {
        console.log(this.state.serviceIdentifier);
    }

    render() {

        return (
            <>
                <Sidebar />
                <div style={{ marginLeft: '25%' }}>
                    <h1><BsIcons.BsCardChecklist /> Create a new Service: </h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label> Service Id: </label>
                            <input type="text" placeholder="serviceIdentifier" name="serviceIdentifier" className="form-control"
                                value={this.state.serviceIdentifier} />
                        </div>
                        <div className="form-group">
                            <label> Name: </label>
                            <input type="text" placeholder="Name" name="serviceName" className="form-control"
                                value={this.state.serviceName} onChange={this.changeNameHandler} />
                        </div>
                        <div className="form-group">
                            <label> Description: </label>
                            <input placeholder="serviceDescription" name="serviceDescription" className="form-control"
                                value={this.state.serviceDescription} onChange={this.changeDesHandler} />
                        </div>
                        <Button
                            className="btn btn-success"
                            onClick={this.SaveData.bind(this)}
                            href='/BusinessServices'
                        >Save</Button>
                    </form>
                </div>
            </>
        )
    }
}

export default CreateService