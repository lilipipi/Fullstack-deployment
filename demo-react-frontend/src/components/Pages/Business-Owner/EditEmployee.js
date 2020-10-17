import React, {Component} from "react";
import {Button, Container} from "react-bootstrap";
import Sidebar from "../../Layout/Sidebar/Sidebar.js";
import * as IoIcons from 'react-icons/io';
import urlAddress from '../../ip.json';

const url = 'http://' + urlAddress.ip + ':8080/api/worker';

class EditEmployee extends Component
{
    constructor(props) {
        super(props)

        this.state = {
            workerIdentifier: this.props.match.params.id,
            id: '',
            workerName: '',
            workerAge: '',
            serviceIdentifier:''
        }
        this.SaveData = this.SaveData.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAgeHandler = this.changeAgeHandler.bind(this);
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

        fetch(url + '/' + this.state.workerIdentifier, {
            method: 'GET',
            headers: h
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    id: json.id,
                    workerIdentifier: json.workerIdentifier,
                    workerName: json.workerName,
                    workerAge: json.workerAge,
                    serviceIdentifier: json.serviceIdentifier
                });

            });
    }
    changeNameHandler = (event) => {
        this.setState({ workerName: event.target.value });
    }
    changeAgeHandler = (event) => {
        this.setState({ workerAge: event.target.value });
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
                workerIdentifier: this.state.workerIdentifier,
                workerName: this.state.workerName,
                workerAge: this.state.workerAge,
                serviceIdentifier: this.state.serviceIdentifier
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
                    <h1><IoIcons.IoMdPeople /> Worker Id: {this.state.workerIdentifier}</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label> Name: </label>
                            <input type="text" placeholder="Name" name="workerName" className="form-control"
                                value={this.state.workerName} onChange={this.changeNameHandler} />
                        </div>
                        <div className="form-group">
                            <label> Age: </label>
                            <input placeholder="Age" name="Description" className="form-control"
                                value={this.state.workerAge}
                                onChange={this.changeAgeHandler} />
                        </div>
                        <Button
                            className="btn btn-success"
                            onClick={this.SaveData.bind(this, this.state.id)}
                            href="/EmployeesPage">Save</Button>
                    </form>

                </div>
            </Container>
        )
    }
}
        
      export default EditEmployee;
        