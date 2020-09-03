import React from 'react';
import './Appointments.css';
import * as IoIcons from 'react-icons/io';
import { IconContext } from 'react-icons';

const url = '/api/appointment/all';

class Appointments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            appointmentIdentifier: '',
            appointmentName: '',
            description:'',
            appointmentOwner:''
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
                this.setState({ appointments:json });
            });
    }
    componentDidMount() {
        this.fetchData();
    }
    
    render() {
        return (
            <div classname='container' style={{marginLeft:'400px'}}>
                <h1><IoIcons.IoIosPaper /> Appointments</h1>
                <table style={{width: '700px'}}>
                    <thead>
                        <tr>
                            <td> User Email</td>
                            <td> Appointment</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.appointments.map(a => 
                                    <tr key={a.appointmentIdentifier}>

                                        <td> {a.appointmentOwner}</td>
                                        <td> {a.appointmentName}</td>
                                    </tr>
                                )}
                    </tbody>
                </table>

            </div>

        )
    }
}

export default Appointments