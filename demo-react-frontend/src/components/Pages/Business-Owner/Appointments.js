import React, {Component} from 'react';
import './Appointments.css';
import * as IoIcons from 'react-icons/io';
import urlAddress from '../../ip.json';
import Sidebar from '../../Layout/Sidebar/Sidebar';

const url = 'http://' + urlAddress.ip + ':8080/api/service/';
console.log(urlAddress.ip)


class Appointments extends Component {

        constructor(props) {
            super(props)

            this.state = {
                services: []
            }
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
    

        componentDidMount() {
            this.fetchData();
        }

        render() {
            return (
                <>
                    <Sidebar />
                    <div style={{ marginLeft: '25%' }}>
                        <h1><IoIcons.IoIosPaper /> Appointments</h1>
                        {this.state.services.map(s =>
                            <table key={s.serviceIdentifier}>
                                <thead>
                                    <tr>
                                        <td>Service Name</td>
                                        <td>Employee</td>
                                        <td>Customer Email</td>
                                        <td>Name</td>
                                        <td>Date</td>
                                        <td>Time</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {s.appointments.map(a =>
                                        <tr
                                            key={a.appointmentIdentifier} >
                                            <td>{s.serviceName}</td>
                                            <td>{a.workerName}</td>
                                            <td> {a.appointmentOwner}</td>
                                            <td> {a.appointmentName}</td>
                                            <td>{a.appointmentDate}</td>
                                            <td>{a.appointmentTime}</td>
                                        </tr>
                                    )}
                                </tbody>
                                <br></br>
                            </table>
                            )}
                    </div>
                </>
            )
        }
    }

export default Appointments