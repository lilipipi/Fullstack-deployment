import React, { Component, Redirect } from "react";
import { Button, Form, Container, Row } from "react-bootstrap";
import { FormGroup, FormControl, FormLabel} from "react-bootstrap";


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
                        console.log(data.token);
                        window.sessionStorage.setItem("token", data.token);
                        this.props.history.push('/dashboard')
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
            fetch('http://localhost:8080/api/users/OwnerLogin', requestOptions)
            .then(response => {
                console.log(response.status)
                console.log(response.json())
                if(response.status === 200) {
                    response.json().then(data => {
                        console.log(data.token);
                        window.sessionStorage.setItem("token", data.token);
                        this.props.history.push('/dashboardOwner')
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
            <h1>Login</h1>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange = {(event) => this.setState({ username:event.target.value })}/>
                        <Form.Text className="text-muted" >
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange = {(event) => this.setState({ password:event.target.value })} />
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Form.Label>Account:    </Form.Label>
                            <Form.Check type="radio" label="Customer" name="accountType" value="customer"
                                onChange = {(event) => this.setState({ account:event.target.value })}/>
                            <Form.Check type="radio" label="Business" name="accountType" value="business"
                                onChange = {(event) => this.setState({ account:event.target.value })}/>
                        </Row>
                    </Form.Group>
                
                    <Row>
                        <Button variant="primary" onClick={(event) => this.handleClick(event)}>
                            Login
                        </Button>
                        <a className="nav-link " href="register.html">
                            Sign Up
                        </a>
                    </Row>
                </Form>
            </div>
            </Container>
        )
    }
}

export default Login