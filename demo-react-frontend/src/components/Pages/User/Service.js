import React from 'react';
import './Services.css';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { FaBorderNone } from 'react-icons/fa';
import { Button } from "react-bootstrap";

const url = '/api/appointment/all';

// let ip = require("../../ip.json");
// const url = "http://" + ip.ip + ":8080/api/appointment/all";
class Service extends React.Component {
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

        return (
            <div classname='container' style={{ }}>
                <h1><BsIcons.BsCardChecklist /> Services</h1>
                <table style={{ width: '700px' }}>
                    <thead>
                        <tr>
                            <td> Name</td>
                            <td> Description</td>
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

export default Service