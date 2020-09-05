import React from 'react';
import './Appointments.css';
import * as IoIcons from 'react-icons/io';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { FaBorderNone } from 'react-icons/fa';
import { Button } from "react-bootstrap";

const url = '/api/appointment/all';

class ADetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            appointmentIdentifier: '',
            appointmentName: '',
            description: '',
            appointmentOwner: ''
        };
    }



    fetchData() {

        let h = new Headers();
        h.append('Accept', 'application/json');

        let encoded = window.btoa('email@email.com:password');
        let auth = 'Basic ' + encoded;
        h.append('Authorization', auth);

        fetch(url, {
            method: 'GET',
            headers: h
        })
            .then(res => res.json())
            .then(json => {
                this.setState({ appointments: json });

            });
    }
    componentDidMount() {
        this.fetchData();
    }

    render() {
        let ap = Object.entries(this.state.appointments);

        return (
            <div classname='container' style={{ marginLeft: '400px' }}>
                <h1><IoIcons.IoIosPaper /> Appointments</h1>
                <table style={{ width: '700px' }}>
                    <thead>
                        <tr>
                            <td> User Email</td>
                            <td> Appointment</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.appointments.map(a =>
                            <tr
                                className='appo'
                                key={a.appointmentIdentifier} >

                                <td> {a.appointmentOwner}</td>
                                <td> {a.appointmentName}</td>
                                <td className='edt'>
                                    <Button
                                        href={`/appointment/${a.appointmentIdentifier}`}
                                        style={{ float: 'right' }}>Edit</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>

        )
    }
}

export default ADetails