import React, { Component } from 'react'
import './Services.css';
import { Button } from "react-bootstrap";
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io';
import Sidebar from '../../Layout/Sidebar/Sidebar';

const url = '/api/appointment';

class CreateAppo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            appointmentIdentifier: Math.floor(10000 + Math.random() * 90000),
            appointmentName: '',
            description: '',
            appointmentDate: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDesHandler = this.changeDesHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
    }
    changeNameHandler = (event) => {
        this.setState({ appointmentName: event.target.value });
    }
    changeDesHandler = (event) => {
        this.setState({ description: event.target.value });
    }
    changeDateHandler = (event) => {
        this.setState({ appointmentDate: event.target.value });
    }
    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
        }
    }
    SaveData() {
        let h = new Headers();
        let auth = window.sessionStorage.getItem('token');
        h.append('Content-Type', 'application/json');
        h.append('Accept', 'application/json');
        h.append('Authorization', auth);

        fetch(url, {
            method: 'post',
            headers: h,
            body: JSON.stringify({
                appointmentIdentifier: this.state.appointmentIdentifier,
                appointmentDate: this.state.appointmentDate,
                appointmentName: this.state.appointmentName,
                description: this.state.description
            })
        }).then(console.log(this.state))
    }
    componentDidMount() {
        console.log(this.state.appointmentIdentifier);
    }

    render() {

        return (
            <>
                <Sidebar />
                <div style={{ marginLeft: '25%' }}>
                    <h1><IoIcons.IoIosPaper /> Book an Appointment: </h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label> Appointment Id: </label>
                            <input type="text" placeholder="appointmentIdentifier" name="appointmentIdentifier" className="form-control"
                                value={this.state.appointmentIdentifier}/>
                        </div>
                        <div className="form-group">
                            <label> Name: </label>
                            <input type="text" placeholder="Name" name="appointmentName" className="form-control"
                                value={this.state.appointmentName} onChange={this.changeNameHandler} />
                        </div>
                        <div className="form-group">
                            <label> Description: </label>
                            <input placeholder="Description" name="Description" className="form-control"
                                value={this.state.description} onChange={this.changeDesHandler} />
                        </div>
                        <div className="form-group">
                            <label> Date: </label>
                            <input type='date' placeholder="Date" name="Date" className="form-control"
                                value={this.state.appointmentDate} onChange={this.changeDateHandler} />
                        </div>
                        <Button
                            className="btn btn-success"
                            onClick={this.SaveData.bind(this)}
                            href='/UserAppo'
                            >Save</Button>
                    </form>
                </div>
            </>
        )
    }
}

export default CreateAppo