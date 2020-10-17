import React, {Component} from "react";
import {Button,  Container} from "react-bootstrap";
import Sidebar from '../../Layout/Sidebar/Sidebar.js';
import './Profile_Details.css';
import urlAddress from "../../ip.json";
import jwt_decode from "jwt-decode";
import * as BsIcons from 'react-icons/bs';

const url = 'http://'+urlAddress.ip+':8080/api/users/';
console.log(urlAddress.ip);



class Edit_Profile extends Component
{
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            username: '',
            password:'',
            fullname: '',
            address:'',
            phoneNumber: '',
        }
        this.SaveData = this.SaveData.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
    }

    
    changeNameHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });    }

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
        }
    }
    fetch(){
        var token = window.sessionStorage.getItem('token');
        var decoded = jwt_decode(token);

        const Cryptr = require('cryptr');
        const cryptr = new Cryptr('keyword');
        let encryptedString = window.sessionStorage.getItem('encrypted');
        const decryptedString = cryptr.decrypt(encryptedString);

        let h = new Headers();
        h.append('Accept', 'application/json');
        h.append("Access-Control-Allow-Origin", "*")

        fetch(url + decoded.id, {
            method: 'GET',
            headers: h
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    id: json.id,
                    username: json.username,
                    fullname: json.fullname,
                    password: decryptedString,
                    confirmPassword: decryptedString,
                    phoneNumber: json.phoneNumber,
                    address: json.address
                });

            })
    }
    SaveData() {
        let h = new Headers();

        h.append('Content-Type', 'application/json');
        h.append('Accept', 'application/json');

        var msg = window.confirm("Are you sure you want to update the details?");
        if (msg)
         {
            alert("Personal Details successfully updated");
            fetch(url + 'register', {
                method: 'post',
                headers: h,
                body: JSON.stringify({
                    id: this.state.id,
                    username: this.state.username,
                    password: this.state.password,
                    confirmPassword: this.state.password,
                    fullname: this.state.fullname,
                    address:this.state.address,
                    phoneNumber: this.state.phoneNumber 
                })
            })
    }
        console.log(this.state);
    }
    componentDidMount() {
        this.fetch();
    }

    render() {

        return (
            <Container fluid style={{ padding: '0rem' }}>
                <Sidebar />
                <div style={{ marginLeft: '25%' }}>
                    <h1><BsIcons.BsPersonFill /> Profile: {this.state.id}</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label> Name: </label>
                            <input type="text" placeholder="Name" name="fullname" className="form-control"
                                value={this.state.fullname} onChange={this.changeNameHandler} />
                        </div>
                        <div className="form-group">
                            <label> Phone: </label>
                            <input type="text" placeholder="valid phone number" name="phoneNumber" className="form-control"
                                value={this.state.phoneNumber} onChange={this.changeNameHandler} />
                        </div>

                        <div className="form-group">
                            <label> Address: </label>
                            <input type="text" placeholder="Address" name="address" className="form-control"
                                value={this.state.address} onChange={this.changeNameHandler} />
                        </div>
                        
                        <Button
                            className="btn btn-success"
                            onClick={this.SaveData.bind(this)}
                             href="/profile"
                             >
                            Save
                        </Button>
                    </form>

                </div>
            </Container>
        )
    }
}

         
      export default Edit_Profile;
        


