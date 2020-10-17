import React, { Component } from 'react'
import './Services.css';
import { Button } from "react-bootstrap";
import * as IoIcons from 'react-icons/io';
import urlAddress from '../../ip.json';
import Sidebar from '../../Layout/Sidebar/Sidebar.js';

const url = 'http://'+urlAddress.ip+':8080/api/appointment/';
console.log(urlAddress.ip)


class UApt extends Component {
    constructor(props) {
        super(props)

        this.state = {
            appointments: [],
        }
        this.editAppointment = this.editAppointment.bind(this);
    }
    editAppointment(id) {
        this.props.history.push(`/appointment/${id}`);
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
                this.setState({ appointments: json });

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
            fetch(url+id, {
                method: 'delete',
                headers: h
            })
            .then(json => this.fetchData())
            .then(function (response) {
            console.log('Authenticated')});
        }
    }


    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <>
            <Sidebar/>
            <div style={{ marginLeft: '25%' }}>
                <h1><IoIcons.IoIosPaper /> Appointments</h1>
                <table style={{ width: '700px' }} >
                    <thead>
                        <tr>
                            <td> Appointment</td>
                            <td> Date</td>
                            <td> Time</td>
                            <td> With</td>
                            <td> Service</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.appointments.map(a =>
                            <tr
                                    
                                className='appo'
                                key={a.appointmentIdentifier} >
                                
                                <td> {a.appointmentName}</td>
                                <td> {a.appointmentDate}</td>
                                <td> {a.appointmentTime}</td>
                                <td> {a.workerName}</td>
                                <td> {a.serviceName}</td>
                                <td className='edt'>
                                    <Button
                                        href={`/appointment/${a.appointmentIdentifier}`}
                                        onClick={() => this.editAppointment(a.appointmentIdentifier)}
                                        style={{ marginRight:'10px' }}>Edit</Button>
                                    <Button variant="danger" onClick={this.delete.bind(this, a.appointmentIdentifier)}>
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

export default UApt