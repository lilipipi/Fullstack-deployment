import React, { Component } from "react";
import Sidebar from "../../Layout/Sidebar/Sidebar.js";
import * as BsIcons from 'react-icons/bs';
import { Button } from "react-bootstrap";
import urlAddress from '../../ip.json';

const url = 'http://' + urlAddress.ip + ':8080/api/service/';
console.log(urlAddress.ip)

class MyServices extends Component {

    constructor(props) {
        super(props)

        this.state = {
            services: [],
        }
        this.editService = this.editService.bind(this);
    }
    editService(id) {
        this.props.history.push(`/services/${id}`);
    }
    fetchData() {
        let email = window.sessionStorage.getItem('email');
        //encrypted password
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr('keyword');
        let encryptedString = window.sessionStorage.getItem('encrypted');
        const decryptedString = cryptr.decrypt(encryptedString);
        console.log(decryptedString);
        let encoded = window.btoa(email + ':' + decryptedString);
        let auth = 'Basic ' + encoded;
        let h = new Headers();
        h.append('Accept', 'application/json');
        h.append('Authorization', auth);
        h.append("Access-Control-Allow-Origin", "*")



        fetch(url + 'all', {
            method: 'GET',
            headers: h
        })
            .then(res => res.json())
            .then(json => {
                this.setState({ services: json });

            })
    }
    delete(id) {
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
        if (window.confirm('Do you want to delete?')) {
            fetch(url + id, {
                method: 'delete',
                headers: h
            })
                .then(json => this.fetchData())
                .then(function (response) {
                    console.log('Authenticated')
                });
        }
    }


    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <>
                <Sidebar />
                <div style={{ marginLeft: '25%' }}>
                    <h1><BsIcons.BsCardChecklist /> My Services</h1>
                    <table style={{ width: '700px' }} >
                        <thead>
                            <tr>
                                <td> ID</td>
                                <td> Name</td>
                                <td> Description</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.services.map(s =>
                                <tr

                                    className='appo'
                                    key={s.serviceIdentifier} >

                                    <td> {s.serviceIdentifier}</td>
                                    <td> {s.serviceName}</td>
                                    <td> {s.serviceDescription}</td>
                                    <td className='edt'>
                                        <Button
                                            href={`/services/${s.serviceIdentifier}`}
                                            onClick={() => this.editService(s.serviceIdentifier)}
                                            style={{ marginRight: '10px' }}>Edit</Button>
                                        <Button variant="danger" onClick={this.delete.bind(this, s.serviceIdentifier)}>
                                            Delete
                                    </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </>
        )
    }
}

export default MyServices;