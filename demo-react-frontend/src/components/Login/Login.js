import React, { Component } from "react";
import { Button, Form, Container, Row } from "react-bootstrap";
import { FormGroup, FormControl, FormLabel} from "react-bootstrap";

class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username:'',
            password:'',
        };

    }
    
    handleClick(event) {
        
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

        fetch('http://localhost:8080/api/users/login', requestOptions)
            .then(response => {
                console.log(response.status)
                console.log(response.json())
                if(response.status === 200) {
                    this.props.history.push('/home_a')
                }
                else {
                    alert("Invalid Username or Password")
                }
            })
            .catch(error =>{
                alert("Error contacting server")
            })
        
    }



    render() {
        return (
            <Container>
            <div>
            <h1>Login</h1>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange = {(event) => this.setState({username:event.target.value})}/>
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