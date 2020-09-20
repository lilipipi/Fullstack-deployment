import React, { Component } from "react";
import { Button, Form, Container, Col, Alert} from "react-bootstrap";

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
                if(response.status === 200) {
                    Alert("Account Successfully Created");
                }
                else {
                    Alert("Error Creating Account")
                }
            })
            .catch(error =>{
                console.log(error)
                Alert("Error Contacting Server")
            })

    }
    businessSignUp() {
        const requestOptions = {
            mode:'no-cors',
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

    response() {

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
                    <div className="form-group">
                    <label>Account Type</label>
                    <br/>
                        <select name="type" value={this.state.value} onChange={this.onChange}>
                            <option value="customer">Customer</option>
                            <option value="business">Business</option>
                        </select>
                    </div>
                    {
                        this.state.type === "" ? 
                        <div className="default"></div>
                        : this.state.type === "business" ?
                            <div className="form-group">
                                <label>Enter Business Details</label>
                                <br/>
                                <input type="text" name="businessName" placeholder="Enter Business Name"
                                    value={this.state.businessName} onChange={this.onChange}></input>
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