import React, { Component } from "react";
import { Button, Form, Container, Col, Alert} from "react-bootstrap";
import './SignUp.css';
import urlAddress from '../../ip.json';

const url = 'http://' + urlAddress.ip + ':8080/api/';


class SignUp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            type: 'customer',
            businessName: ''
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
                confirmPassword: this.state.confirmPassword
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
                businessName: this.state.businessName
            })
        };

        fetch('http://localhost:8080/api/users/BusinessRegister', requestOptions)
            .then(response => {
                console.log(response)
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
                <form onSubmit={this.onSubmit}>

                    <div className="form-group-register">
                        <br/>
                        <input id="txtEmail" type="email" placeholder="Enter Email" 
                            name="email" value={this.state.email} onChange={this.onChange}></input>
                    </div>

                    <div className="form-group-register">
                        <br/>
                        <input id="txtPass" type="text" placeholder="Enter Password" 
                            name="password" value={this.state.password} onChange={this.onChange}></input>
                    </div>

                    <div className="form-group-register">
                        <br/>
                        <input type="text" placeholder="Re-enter Password" 
                            name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChange}></input>
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
                                
                                <br/>
                                <input type="text" name="businessName" placeholder="Enter Business Name"
                                    value={this.state.businessName} onChange={this.onChange}></input>
                                </div>
                        : <br/>
                    }

                    <Button id="submitD" type="submit" value="Submit" className="logbtn" href="/login">
                            Register
                    </Button>
                </form>
           </Container>
       )
    }
}

export default SignUp;