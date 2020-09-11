import React, {Component} from "react";
import {Button, Col, Container, Form} from "react-bootstrap";
import { FormGroup, FormControl, FormLabel} from "react-bootstrap";
import './Profile_Details.css'
import { connect } from "react-redux";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

     class Profile_Details extends Component
     {
         constructor(props) {
             super(props);
             this.state = {
                 email: '',
                 fName: '',
                 lName: '',
                 dateOfBirth: '',
                 address: '',
                 phone: '',
                //  password: '',
                // newPassword: '',
                //  confirmPassword:  '',
             };

             this.onChange = this.onChange.bind(this);
             this.onSubmit = this.onSubmit.bind(this);

         }

         onChange(e) {
             this.setState({[e.target.name]: e.target.value});
         }
         onSubmit(e) {
                e.preventDefault();
                const changeDetails =
                {
                    email: this.state.email,
                    fName:  this.state.fName,
                    lName:  this.state.lName,
                    dateOfBirth: this.state.dateOfBirth,
                    address: this.state.address,
                    phone: this.state.phone,
                    // password: this.state.password,
                    // confirmnewPassword: this.state.newPassword,
                    // newPassword: this.state>newPassword
                }
                alert("Details successfully updated");
                console.log(changeDetails);

             }
         
         render(){

             return ( 
                
               <Container fluid style={{paddingLeft:'0rem', paddingRight:'0rem'}}>
                <Sidebar />
                 <div className="body">
                     <h1>Profile Details</h1>
                     <h3>Personal information</h3>
                     <div>
                       <Form id="myForm"  onSubmit={this.onSubmit}>
                            <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <input
                                type="email"
                                className="form-control form-control"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicAddress">
                        <Form.Label>Address</Form.Label>
                            <input
                                type="address"
                                className="form-control form-control"
                                name="address"
                                value={this.state.address}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPhone">
                            <Form.Label>Phone number</Form.Label>
                                 <input
                                     type="phone"
                                     className="form-control form-control"
                                     name="phone"
                                     value={this.state.phone}
                                     onChange={this.onChange}
                                    />
                            </Form.Group>
                                <Form.Row>
                                   <Form.Group controlId="formBasicFname">
                                        <Col>
                                        <Form.Label for="firstName">First Name</Form.Label>
                                        <input
                                            id="firstName"
                                            type="fName"
                                            className="form-control form-control"
                                            name="fName"
                                            value={this.setState.fName}
                                            onChange={this.onChange}

                                        />
                                        </Col> 
                                    </Form.Group>
                                    <Form.Group controlId="formBasicLame">
                                    <Col>
                                    <Form.Label for="lastName">Last Name</Form.Label>
                                        <input
                                            id= "lastName"
                                            type="LName"
                                            className="form-control form-control"
                                            name="lName"
                                            value={this.setState.lName}
                                            onChange={this.onChange}
                                        />
                                    </Col>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicDob">
                                    <Col>
                                    <Form.Label>Date Of Birth</Form.Label>
                                        <input
                                            type="date"
                                            className="form-control form-control"
                                            name="dateOfBirth"
                                            value={this.state.dateOfBirth}
                                            onChange={this.onChange}
                                        />
                                        </Col>
                                        </Form.Group>
                                </Form.Row>

                             <br/>
                             <Button id="updateButton" type="submit">
                                 Update
                             </Button>
                             {/* <input type="submit" className="btn btn-primary btn-block mt-4" /> */}
                         </Form>
                     </div>
                 </div>
               </Container>
             );
             
         }

    
        }
   
     export default Profile_Details;
