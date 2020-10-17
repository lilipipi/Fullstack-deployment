import React, { Component } from 'react'
import './Services.css';
import { Button } from "react-bootstrap";
import * as IoIcons from 'react-icons/io';
import Sidebar from '../../Layout/Sidebar/Sidebar';
import urlAddress from '../../ip.json';
import TimeField from 'react-simple-timefield';

const url = 'http://'+urlAddress.ip+':8080/api/appointment';
const urlWorker = 'http://' + urlAddress.ip + ':8080/api/worker/allWorkers';

class CreateAppo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            appointmentIdentifier: Math.floor(10000 + Math.random() * 90000),
            serviceIdentifier: this.props.match.params.id,
            worker: [],
            employee: [],
            workerIdentifier: '',
            appointmentName: '',
            description: '',
            appointmentDate: '',
            appointmentTime:''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDesHandler = this.changeDesHandler.bind(this);
        this.changeTimeHandler = this.changeTimeHandler.bind(this);
        this.changeWorkerHandler = this.changeWorkerHandler.bind(this);
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
    changeTimeHandler = (event) => {
        this.setState({ appointmentTime: event.target.value });
    }
    changeWorkerHandler = (event) => {
        this.setState({ workerIdentifier: event.target.value });
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

        fetch(url, {
            method: 'post',
            headers: h,
            body: JSON.stringify({
                appointmentIdentifier: this.state.appointmentIdentifier,
                serviceIdentifier: this.state.serviceIdentifier,
                appointmentDate: this.state.appointmentDate,
                appointmentName: this.state.appointmentName,
                description: this.state.description,
                appointmentTime: this.state.appointmentTime,
                workerIdentifier: this.state.workerIdentifier
            })
        }).then(console.log(this.state))
    }
    fetchWorker(){
        let h = new Headers();
        h.append('Accept', 'application/json');
        h.append("Access-Control-Allow-Origin", "*")

        fetch(urlWorker, {
            method: 'GET',
            headers: h
        })
            .then(res => res.json())
            .then(json => {
                this.setState({ worker: json });
            })
    }
    componentDidMount() {
        this.fetchWorker();
        console.log(this.state.appointmentIdentifier);
        console.log(this.state.serviceIdentifier);
    }

    render() {
        const employee = this.state.worker.filter(
            w => {
                return w.serviceIdentifier.startsWith(this.state.serviceIdentifier);
            }
        );
        return (
            <>
                <Sidebar />
                <h1 style={{ marginLeft: '25%' }}><IoIcons.IoIosPaper /> Book an Appointment: </h1>
                <div className="container" style={{ marginLeft: '25%' }}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label> Appointment Id: {this.state.appointmentIdentifier}</label>
                        </div>
                        <div className="form-group">
                            <label> Service Id: {this.state.serviceIdentifier}</label>
                        </div>
                        <div className="form-group" >
                            <label> Your Name: </label>
                            <input type="text" placeholder="Name" name="appointmentName" className="form-control"
                                value={this.state.appointmentName} onChange={this.changeNameHandler} />
                        </div>
                        <div className="form-group">
                            <label> Description: </label>
                            <input placeholder="Description" name="Description" className="form-control"
                                value={this.state.description} onChange={this.changeDesHandler} />
                        </div>
                        <div className="form-group" style={{ float: 'left', marginRight: '10px' }}>
                            <label> Date: </label>
                            <input type='date' placeholder="Date" name="Date" className="form-control"
                                value={this.state.appointmentDate} onChange={this.changeDateHandler} />
                        </div>
                        <div className="form-group">
                            <label> Time: </label>
                            
                            <TimeField
                                value="00:00:00"
                                onChange={this.changeTimeHandler}
                                input={
                                <input 
                                type='text' 
                                placeholder="Date" 
                                name="Date" 
                                className="form-control"
                                value={this.state.appointmentTime}/>
                                }
                                showSeconds
                            />
                        </div>
                        <div className="form-group">
                            <label style={{marginRight:'10px'}}> Employee: </label>    
                            <select id="employee id" name="employee" className="employee" onChange={this.changeWorkerHandler}>
                                <option>Choose an Employee</option>
                                {employee.map(e =>
                                    <option value={e.workerIdentifier} >{e.workerName}</option>
                                )}
                            </select>
                        </div>
                        <Button
                            className="btn btn-success"
                            onClick={this.SaveData.bind(this)}
                            href='/UserAppo'
                            >Book Appointment</Button>
                    </form>
                </div>
            </>
        )
    }
}

export default CreateAppo