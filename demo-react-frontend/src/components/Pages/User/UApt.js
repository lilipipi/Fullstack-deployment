import React, { Component } from 'react'
import './Services.css';
import { Button } from "react-bootstrap";
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io';
import axios from 'axios';

const url = '/api/appointment/';

class UApt extends Component {
    constructor(props) {
        super(props)

        this.state = {
            appointments: []
        }
        this.editAppointment = this.editAppointment.bind(this);
    }
    editAppointment(id) {
        this.props.history.push(`/appointment/${id}`);
    }
    fetchData() {

        let h = new Headers();
        let auth = window.sessionStorage.getItem('token');
        h.append('Accept', 'application/json');
        h.append('Authorization', auth);

        fetch(url + 'all', {
            method: 'GET',
            headers: h
        })
            .then(res => res.json())
            .then(json => {
                this.setState({ appointments: json });

            })
            .then(console.log(window.sessionStorage.getItem('token')))
    }
    delete(id) {
        let h = new Headers();
        let auth = window.sessionStorage.getItem('token');
        
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
            <div >
                <h1><IoIcons.IoIosPaper /> Appointments</h1>
                <table style={{ width: '700px' }} >
                    <thead>
                        <tr>
                            <td> Appointment</td>
                            <td> Date</td>
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

        )
    }
}

export default UApt