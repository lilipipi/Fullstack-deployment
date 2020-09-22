import React, { Component } from "react";
import  { Redirect } from 'react-router-dom'
import { Button, Form, Container, Row } from "react-bootstrap";
import { FormGroup, FormControl, FormLabel} from "react-bootstrap";
import './Login.css';
import urlAddress from '../../ip.json';

const url = 'http://' + urlAddress.ip + ':8080/api/';

class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username:'',
            password:'',
            account:''
        };

    }
    
    handleClick(event) {
        console.log(this.state);
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: this.state.username,
                password: this.state.password,
            })
        };
        
        if(this.state.account === "") {
            alert("Please Select Account Type");
        }
        else if(this.state.account === "customer") {
            fetch('http://localhost:8080/api/users/login', requestOptions)
            .then(response => {
                if(response.status === 200) {
                    response.json().then(data => {
                        //console.log(data.token);
                        window.sessionStorage.setItem("token", data.token);
                        window.sessionStorage.setItem("loggedIn", true);
                        window.sessionStorage.setItem("email", this.state.username);

                        const Cryptr = require('cryptr');
                        const cryptr = new Cryptr('keyword');

                        const encryptedString = cryptr.encrypt(this.state.password);
                        window.sessionStorage.setItem("encrypted", encryptedString);

                        this.props.history.push('/UserAppo')
                        window.location.reload(true);
                        //return <Redirect to='/UserAppo' />
                      });
                }
                else {
                    alert("Invalid Username or Password")
                }
            })
            .catch(error =>{
                alert("Error contacting server")
            })
        }
        else if(this.state.account === "business") {
            fetch(url+'users/OwnerLogin', requestOptions)
            .then(response => {
                console.log(response.status)
                console.log(response.json())
                if(response.status === 200) {
                    response.json().then(data => {
                        console.log(data.token);
                        window.sessionStorage.setItem("token", data.token);
                        window.sessionStorage.setItem("loggedIn", true);
                        this.props.history.push('/dashboardOwner')
                        window.location.reload(true);
                      }); 
                }
                else {
                    alert("Invalid Username or Password")
                }
            })
            .catch(error =>{
                alert("Error contacting server")
            })
        }
    }

    render() {
        return (
            <Container>
            <div>
                <Form className='login-form'>
                    <h1>Login</h1>
                    
                    <Form.Group controlId="formBasicEmail" className='txtb'>
                        <Form.Control type="email" placeholder="Enter email" onChange = {(event) => this.setState({ username:event.target.value })}/>
                        <Form.Text className="text-muted" >
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className='txtb'>
                        <Form.Control type="password" placeholder="Password" onChange = {(event) => this.setState({ password:event.target.value })} />
                    </Form.Group>

                    <Form.Group>
                        <Row className="acc-type">
                            <Form.Label>Account:</Form.Label>
                                <Form.Check className="acc-type" type="radio" label="Customer" name="accountType" value="customer"
                                onChange = {(event) => this.setState({ account:event.target.value })}/>
                                <Form.Check className="acc-type" type="radio" label="Business" name="accountType" value="business"
                                onChange = {(event) => this.setState({ account:event.target.value })}/>
                        </Row>
                    </Form.Group>
                
                    <Row>
                        <Button variant="primary" onClick={(event) => this.handleClick(event)} className='logbtn'>
                            Login
                        </Button>
                            <div class="bottom-text">
                                Don't have account? 
                                <a href="/register" style={{textDecoration:'none'}}> Sign up </a>
                            </div>
                    </Row>
                </Form>
            </div>
            </Container>
        )
    }
}

export default Login