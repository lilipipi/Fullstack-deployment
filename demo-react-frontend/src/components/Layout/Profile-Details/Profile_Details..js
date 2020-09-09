import React, {Component} from "react";
import {Button, Col, Container, Form} from "react-bootstrap";
// eslint-disable-next-line no-unused-vars
import { FormGroup, FormControl, FormLabel} from "react-bootstrap";
import './Profile_Details.css'
import { connect } from "react-redux";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
 var loader = require('path');


     class Profile_Details extends Component
     {
         constructor(props) {
             super(props);
             this.state = {
                 email: 'email@com',
                 password: 'password',
                 fName: 'Sara',
                 lName: 'Ropert',
                 dateOfBirth: '12/09/2020',
                 address: '22 Swanston st',
                 phone: '043221547',
                 saveButton: 'save'
             };

             this.onChange = this.onChange.bind(this);
             this.onSubmit = this.onSubmit.bind(this);

         }

         onChange(e) {
             this.setState({[e.target.name]: e.target.value});
         }


         onSubmit(e) {
             e.preventDefault();
             console.log(this.state.save);
             if (this.state === "save") {
                 alert("Details successfully updated");


             }
         }


         render()
         {

             return ( <Container>
                    <div>
                     <h1>Profile Details</h1>
                     <p>Personal information</p>
                     <div>
                         <Form id="myForm">
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
                                 <Col>
                                     <Form.Label>First Name</Form.Label>
                                     <input
                                         type="FName"
                                         className="form-control form-control"
                                         name="name"
                                         value={this.state.fName}
                                         onChange={this.onChange}
                                     />
                                 </Col>
                                 <Col>
                                     <Form.Label>Last Name</Form.Label>
                                     <input
                                         type="LName"
                                         className="form-control form-control"
                                         name="LName"
                                         value={this.state.lName}
                                         onChange={this.onChange}
                                     />
                                 </Col>
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
                             </Form.Row>
                             <br/>

                             <Button id="updateButton" type="submit">
                                 Update
                             </Button>
                             <t>      </t>
                             <Button id="saveButton" type="submit" value="Submit">
                                 Save
                             </Button>
                            <t>>  </t>
                             <Form.Group controlId="formBasicPassword">
                                 <Form.Label>Password</Form.Label>
                                 <input
                                     type="password"
                                     className="form-control form-control"
                                     name="password"
                                     value={this.state.password}
                                 />
                             </Form.Group>

                             <Form.Group>
                                 <Form.Group controlId="updateBasicPassword">
                                     <Form.Label>Change Password</Form.Label>
                                     <Form.Control type="password" placeholder="New Password"/>
                                 </Form.Group>
                                 <Form.Group controlId="updateBasicPassword">
                                     <Form.Label>Reconfirm new Password</Form.Label>
                                     <Form.Control type="password" placeholder="New Password"/>
                                 </Form.Group>

                                 <Button id="pButton " type="submit" value="Submit">
                                     Save New password
                                 </Button>
                             </Form.Group>
                         </Form>
                     </div>
                 </div>
              </Container>
             );

         }

     }

     export default Profile_Details


//
// function showPasswordField(p_id){
//     document.getElementById(p_id).style.visibility="visible";
//
// }

// let saveChanges = document.getElementById('saveButton');
// let updateChanges = document.getElementById('updateButton');
// updateChanges.addEventListener('click', ()=> {
//     if (!updateChanges.click()) saveChanges.style.display = 'none';
//     else saveChanges.style.display = null;
// })


// function showSaveButton() {
//     document.getElementById('saveButton').style.visibility = "visible";

// }