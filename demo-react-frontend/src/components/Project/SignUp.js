import React, { Component } from "react";
import { Button, Form, Container, Col} from "react-bootstrap";

class SignUp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
        console.log(this.state.type);
        if(this.state.type === "business") {
            alert("Business acount");
        }
    }

    render () {
        return (
            <Container>
            <div>
                <h1>Register</h1>
                <p>Enter Details</p>
                <div>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Reconfirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control placeholder="First name" />
                            </Col>
                            <Col>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control placeholder="Last name" />
                            </Col>
                            <Col>
                                <Form.Label>Date Of Birth</Form.Label>
                                <input
                                    type="date"
                                    className="form-control form-control"
                                    name="dateOfBirth"
                                    value={this.state.startDate}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </Form.Row>
                        <br/>
                        <Form.Label>Account Type</Form.Label>
                        <Form.Control as="select" name="type" value={this.state.value} onChange={this.onChange}>
                            <option value="customer">Customer</option>
                            <option value="business">Business</option>
                            <option value="worker">Worker</option>
                        </Form.Control>                     
                        <br/>
                        {
                            this.state.type === "" ? 
                            <div className="default"></div>
                            : this.state.type === "business" ?
                                <Form.Group>
                                    <Form.Label>Enter Business Details</Form.Label>
                                    <Form.Control></Form.Control>
                                    <Form.Label>Business Name</Form.Label>
                                    <Form.Control></Form.Control>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control></Form.Control>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control></Form.Control>
                                </Form.Group>

                            :this.state.type === "worker" ?
                            <div>
                                <Form.Group>
                                    <Form.Label>Enter Business ID</Form.Label>
                                    <Form.Control></Form.Control>
                                </Form.Group>
                            </div>
                            : <br/>
                        }

                        <Button type="submit" value="Submit">
                            Register
                        </Button>
                        
                    </Form>
                </div>
            </div>
            </Container>
        )
    }
}

export default SignUp;