import React, { Component } from 'react'
import './Services.css';
import { Button,Container } from "react-bootstrap";
import * as IoIcons from 'react-icons/io';
import Sidebar from '../../Layout/Sidebar/Sidebar';
import urlAddress from '../../ip.json';
import TimeField from 'react-simple-timefield';

const url = 'http://' + urlAddress.ip + ':8080/api/appointment';

class UApt extends Component {
    constructor(props) {
        super(props)

        this.state = {
            appointmentIdentifier: this.props.match.params.id,
            id:'',
            appointmentName: '',
            description: '',
            appointmentDate: '',
            appointmentOwner: '',
            serviceIdentifier:'',
            workerIdentifier:''
        }
        this.SaveData = this.SaveData.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDesHandler = this.changeDesHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeEventHandler = this.changeEventHandler.bind(this)
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

        fetch(url + '/' + this.state.appointmentIdentifier, {
            method: 'GET',
            headers: h
        })
            .then(res => res.json())
            .then(json => {
                this.setState({ 
                    id: json.id,
                    appointmentIdentifier: json.appointmentIdentifier,
                    appointmentName: json.appointmentName,
                    description: json.description,
                    appointmentDate: json.appointmentDate,
                    appointmentTime: json.appointmentTime,
                    serviceIdentifier: json.serviceIdentifier,
                    workerIdentifier: json.workerIdentifier
                 });

            });
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
    changeEventHandler = (event) => {
        this.setState({ [event.target.name] : event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
    }
    SaveData(){
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
                serviceIdentifier: this.state.serviceIdentifier,
                workerIdentifier: this.state.workerIdentifier,
                appointmentIdentifier: this.state.appointmentIdentifier,
                appointmentDate: this.state.appointmentDate,
                appointmentName: this.state.appointmentName,
                description: this.state.description,
                appointmentTime: this.state.appointmentTime
             })
        }).then(json => this.fetchData()).then(console.log(this.state))
    }
    componentDidMount() {
        this.fetchData();
    }

    render() {
        
        return (
            <Container fluid style={{ padding: '0rem' }}>
            <Sidebar/>
            <div style={{ marginLeft: '25%' }}>
                <h1><IoIcons.IoIosPaper /> Appointment Id: {this.state.appointmentIdentifier}</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label> Name: </label>
                            <input type="text" placeholder="Name" name="appointmentName" className="form-control"
                                value={this.state.appointmentName} onChange={this.changeNameHandler} />
                        </div>
                        <div className="form-group">
                            <label> Description: </label>
                            <input placeholder="Description" name="Description" className="form-control"
                                value={this.state.description}
                                onChange={this.changeDesHandler}  />
                        </div>
                        <div className="form-group">
                            <label> Date: </label>
                            <input type="date" placeholder="Date" name="Date" className="form-control"
                                value={this.state.appointmentDate}
                                onChange={this.changeDateHandler} />
                        </div>
                        <div className="form-group">
                            <label> Time: </label>

                            <TimeField
                                value="00:00:00"
                                onChange={this.changeEventHandler}
                                input={
                                    <input
                                        type='text'
                                        name="appointmentTime"
                                        className="form-control"
                                        value={this.state.appointmentTime} />
                                }
                                showSeconds
                            />
                        </div>
                        <Button 
                        className="btn btn-success" 
                        onClick={this.SaveData.bind(this, this.state.id)}
                        href="/UserAppo">Save</Button>
                    </form>

            </div>
            </Container>
        )
    }
}

export default UApt