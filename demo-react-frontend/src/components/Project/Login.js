import React, { Component } from "react";
import { Button, Form, Container, Row } from "react-bootstrap";
import { FormGroup, FormControl, FormLabel} from "react-bootstrap";

class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email:'',
            password:''
        };

    }

    handleClick(event) {
        const owner = "owner@email.com";
        const user = "user@email.com";
        const pass = "password";

        const email = this.state.email;
        const password = this.state.password;


        if(email.match(owner) && password.match(pass)) {
            console.log("Business Owner");
            this.props.history.push('/home_a');
        }
        else if (email.match(user) && password.match(pass)) {
            this.props.history.push('/Dashboard.html');
        }
        else {
            this.toggleAlert();
        }
    }

    toggleAlert(event) {
        alert("Error: User name or password does not match")
    }


    render() {
        const email = "";
        const password="";
        return (
            <Container>
            <div>
            <h1>Login</h1>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange = {(event) => this.setState({email:event.target.value})}/>
                        <Form.Text className="text-muted" >
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange = {(event) => this.setState({password:event.target.value})} />
                    </Form.Group>
                    <Row className="text-center">
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