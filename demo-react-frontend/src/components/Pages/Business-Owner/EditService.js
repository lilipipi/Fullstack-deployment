import React, { Component } from 'react'
import './Appointments.css';
import { Button, Container } from "react-bootstrap";
import * as BsIcons from 'react-icons/bs';
import Sidebar from '../../Layout/Sidebar/Sidebar';
import urlAddress from '../../ip.json';

const url = 'http://' + urlAddress.ip + ':8080/api/service';

class EditService extends Component {
    constructor(props) {
        super(props)

        this.state = {
            serviceIdentifier: this.props.match.params.id,
            id: '',
            serviceName: '',
            serviceDescription: ''
        }
        this.SaveData = this.SaveData.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDesHandler = this.changeDesHandler.bind(this);
    }

    fetchData() {

        let h = new Headers();

        let email = window.sessionStorage.getItem('email');
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr('keyword');
        let encryptedString = window.sessionStorage.getItem('encrypted');
        const decryptedString = cryptr.decrypt(encryptedString);
        console.log(decryptedString);
        let encoded = window.btoa(email + ':' + decryptedString);
        let auth = 'Basic ' + encoded;
        h.append('Accept', 'application/json');
        h.append('Authorization', auth);

        fetch(url + '/' + this.state.serviceIdentifier, {
            method: 'GET',
            headers: h
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    id: json.id,
                    serviceIdentifier: json.serviceIdentifier,
                    serviceName: json.serviceName,
                    serviceDescription: json.serviceDescription
                });

            });
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

        fetch(url + '/', {
            method: 'post',
            headers: h,
            body: JSON.stringify({
                id: this.state.id,
                serviceIdentifier: this.state.serviceIdentifier,
                serviceName: this.state.serviceName,
                serviceDescription: this.state.serviceDescription
            })
        }).then(json => this.fetchData()).then(console.log(this.state))
    }
    componentDidMount() {
        this.fetchData();
    }

    render() {

        return (
            <Container fluid style={{ padding: '0rem' }}>
                <Sidebar />
                <div style={{ marginLeft: '25%' }}>
                    <h1><BsIcons.BsCardChecklist /> Service Id: {this.state.serviceIdentifier}</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label> Name: </label>
                            <input type="text" placeholder="Name" name="serviceName" className="form-control"
                                value={this.state.serviceName} onChange={this.changeNameHandler} />
                        </div>
                        <div className="form-group">
                            <label> Description: </label>
                            <input placeholder="Description" name="Description" className="form-control"
                                value={this.state.serviceDescription}
                                onChange={this.changeDesHandler} />
                        </div>
                        <Button
                            className="btn btn-success"
                            onClick={this.SaveData.bind(this, this.state.id)}
                            href="/BusinessServices">Save</Button>
                    </form>

                </div>
            </Container>
        )
    }
}

export default EditService