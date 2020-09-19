import React, { Component } from "react";
import { Button, Form, Container, Col} from "react-bootstrap";

class SignUp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            fName: '',
            lName: '',
            dateOfBirth: '',
            type: 'customer'
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
            alert("Business acount");
        }
        else if(this.state.type === "customer") {
            this.customerSignUp();
        }
        else if(this.state.type === "worker") {
            alert("Worker acount");
        }
    }

    customerSignUp() {
        const requestOptions = {
            mode:'no-cors',
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

        fetch('http://localhost:8080/api/users/register', requestOptions)
            .then(response => {
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })

    }
    businessSignUp() {

    }
    workerSignUp() {

    }

    render () {
       return (
           <Container>
                <br/>
                <h1>Register</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <br/>
                        <input type="email" placeholder="Enter Email" 
                            name="email" value={this.state.email} onChange={this.onChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <br/>
                        <input type="text" placeholder="Enter Password" 
                            name="password" value={this.state.password} onChange={this.onChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <br/>
                        <input type="text" placeholder="Re-enter Password" 
                            name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChange}></input>
                    </div>
                    {/*
                    <div className="form-group">
                        <div class="row">
                            <div class="col-sm">
                                <label>First Name</label>
                                <br/>
                                <input type="text" placeholder="First Name" 
                                    name="fName" value={this.state.fName} onChange={this.onChange}></input>
                            </div>
                            <div class="col-sm">
                                <label>Last Name</label>
                                <br/>
                                <input type="text" placeholder="Last Name" 
                                    name="lName" value={this.state.lName} onChange={this.onChange}></input>
                            </div>  
                            <div class="col-sm">
                                <label>Date of Birth</label>
                                <br/>
                                <input form-control type="date" 
                                    name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.onChange}></input>
                            </div>       
                        </div> 
                    </div>
                    <div className="form-group">
                    <label>Account Type</label>
                    <br/>
                        <select name="type" value={this.state.value} onChange={this.onChange}>
                            <option value="customer">Customer</option>
                            <option value="business">Business</option>
                            <option value="worker">Worker</option>
                        </select>
                    </div>
                    */}
                    {
                            this.state.type === "" ? 
                            <div className="default"></div>
                            : this.state.type === "business" ?
                                <div className="form-group">
                                    <label>Enter Business Details</label>

                                    <input type="text" name="businessID"></input>
                                </div>
                            :this.state.type === "worker" ?
                            <div>
                            <div className="form-group">
                                    <label>Enter Business ID</label>
                                    <input type="text" name="businessID"></input>
                                </div>
                            </div>
                            : <br/>
                        }

                    <Button type="submit" value="Submit">
                            Register
                    </Button>
                </form>
           </Container>
       )
    }
}

export default SignUp;