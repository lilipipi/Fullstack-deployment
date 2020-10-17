import React, { Component } from "react";
import { Button, Form, Container, Col, Alert} from "react-bootstrap";
import './SignUp.css';
import urlAddress from '../../ip.json';
import axios from "axios";
// import  './Profile_Details/Profile_Details.js';

const url = 'http://' + urlAddress.ip + ':8080/api/';


class SignUp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            type: 'customer',
            companyName: '',
            fullname:'',
            address:'',
            phoneNumber: ''
        };
        

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        if(this.state.type === "business") {
            this.businessSignUp();
        }
        else if(this.state.type === "customer") {
            this.customerSignUp();
        }
    }

    customerSignUp() {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                fullname: this.state.fullname,
                address:this.state.address,
                phoneNumber: this.state.phoneNumber 

            })
        };

        fetch(url+'users/register', requestOptions)
            .then(response => {
                console.log(response.json());
                if(response.status === 200 || response.status === 201) {
                    alert("Account successfully created")
                }
                else {
                    
                }
            })
            .catch(error =>{
                console.log(error)
            })

    }
    businessSignUp() {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                companyName: this.state.companyName,

            })
        };

        fetch(url +'businessOwners/register', requestOptions)
            .then(response => {
                console.log(response.json());
                if(response.status === 200 || response.status === 201) {
                    alert("Account successfully created")
                }
                else {
                    
                }
            })
            .catch(error =>{
                console.log(error)
            })
    }

    

    render () {
       return (
           <Container className="register">
                <br/>
                <h1>Register</h1>
                <form  id="regForm" action=''>

                    <div className="form-group-register">
                        <input id="txtEmail" type="email" placeholder="Enter Email" 
                            name="email" value={this.state.email} onChange={this.onChange}></input>
                    </div>

                    <div className="form-group-register">
                        <input id="txtName" type="text" placeholder="Enter Password" 
                            name="password" value={this.state.password} onChange={this.onChange}></input>
                    </div>

                    <div className="form-group-register">
                        <input type="text" placeholder="Re-enter Password" 
                            name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChange}></input>
                    </div>

                    <div className="form-group-register">
                        <input type="text" placeholder="Full Name" 
                            name="fullname" value={this.state.fullname} onChange={this.onChange}></input>
                    </div>

                    <div className="form-group-register">
                        <input type="phone" placeholder="Phone Number" 
                            name="phoneNumber" value={this.state.phoneNumber} onChange={this.onChange}></input>
                    </div>

                    <div className="form-group-register">
                        <input type="text" placeholder="Home Address" 
                            name="address" value={this.state.address} onChange={this.onChange}></input>
                    </div>

                    <div className="form-group-acc">
                    <label>Account Type: </label>
                    
                        <select className="select-type" name="type" value={this.state.value} onChange={this.onChange} style={{float:'right'}}>
                            <option value="customer">Customer</option>
                            <option value="business">Business</option>
                        </select>
                    </div>

                    {
                        this.state.type === "" ? 
                        <div className="default"></div>
                        : this.state.type === "business" ?
                            <div className="form-group-business">
                                
                                <input type="text" name="companyName" placeholder="Enter Business Name"
                                    value={this.state.companyName} onChange={this.onChange}></input>
                                </div>
                        : <br/>
                    }

                   <Button id="submitD"onClick={this.onSubmit} type="submit" value="Submit" className="logbtn">
                       Register
                    </Button>
                </form>
           </Container>
       )
    }
}

export default SignUp;