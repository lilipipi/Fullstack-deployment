import React, { Component } from 'react'
import './Services.css';
import { Button } from "react-bootstrap";
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io';
import Sidebar from '../../Layout/Sidebar/Sidebar';

const url = '/api/appointment';

class UApt extends Component {
    constructor(props) {
        super(props)

        this.state = {
            details: [],
            id: this.props.match.params.id,
            appointmentName: '',
            description: '',
            appointmentDate: '',
            appointmentOwner: ''
        }
        this.SaveData = this.SaveData.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
    }
   
    fetchData() {

        let h = new Headers();
        h.append('Accept', 'application/json');

        let encoded = window.btoa('email@email.com:password');
        let auth = 'Basic ' + encoded;
        h.append('Authorization', auth);

        fetch(url + '/' + this.state.id, {
            method: 'GET',
            headers: h
        })
            .then(res => res.json())
            .then(json => {
                this.setState({ details: json });

            });
    }
    changeNameHandler = (event) => {
        this.setState({ appointmentName: event.target.value });
    }
    validate = () => {
        let nameError = '';
        let desError = '';
        let dateError = '';
      

        if (!this.state.appointmentName) {
            nameError = "*This field is empty";
        }
        if (!this.state.description) {
            desError = "*This field is empty";
        }
        if (!this.state.appointmentDate) {
            dateError = "*This field is empty";
        }
        

        if (nameError || desError || dateError) {
            this.setState({ nameError, desError, dateError });
            return false
        }
        return true
    }
    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
        }
    }
    SaveData(){
        let h = new Headers();
        h.append('Accept', 'application/json');

        let encoded = window.btoa('email@email.com:password');
        let auth = 'Basic ' + encoded;
        h.append('Authorization', auth);
        fetch(url + '/' + this.state.id, {
            method: 'put',
            headers: h,
            body: JSON.stringify({ })
        }).then(json => this.fetchData())
    }
    componentDidMount() {
        this.fetchData();
    }

    render() {
        
        return (
            <>
            <Sidebar/>
            <div style={{ marginLeft: '400px' }}>
                <h1><IoIcons.IoIosPaper /> Appointment Id: {this.state.id}</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label> Name: </label>
                            <input type="text" placeholder="Name" name="appointmentName" className="form-control"
                                value={this.state.details.appointmentName} onChange={this.changeNameHandler} />
                        </div>
                        <div className="form-group">
                            <label> Description: </label>
                            <input placeholder="Description" name="Description" className="form-control"
                                value={this.state.details.description}  />
                        </div>
                        <div className="form-group">
                            <label> Date: </label>
                            <input placeholder="Date" name="Date" className="form-control"
                                value={this.state.details.appointmentDate} />
                        </div>
                        <Button className="btn btn-success" onClick={this.SaveData}>Save</Button>
                    </form>

            </div>
            </>
        )
    }
}

export default UApt