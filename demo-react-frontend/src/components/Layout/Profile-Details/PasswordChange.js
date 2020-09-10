import React, {Component} from "react";
import {Button, Col, Container, Form} from "react-bootstrap";
import { FormGroup, FormControl, FormLabel} from "react-bootstrap";
import { connect } from "react-redux";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';


class passwordChange extends Component
{
    constructor(props) {
        super(props);
        this.state = {
        
            password: '',
           newPassword: '',
            confirmPassword:  '',
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
               password: this.state.password,
               confirmnewPassword: this.state.newPassword,
               newPassword: this.state>newPassword
           }
           alert("Password successfully updated");
           console.log(changeDetails);

        }

        render(){
              
            <Container>
            <div>

            {/* <Form.Row> */}
                {/* <Col>
                <Form.Label>Password</Form.Label>
                <input
                    type="password"
                    className="form-control form-control"
                    name="password"
                    value={this.state.password}
                    // onSubmit={this.onSubmit}

                />
                </Col> */}
                    {/* <Col>               
                    <Form.Label>Change Password</Form.Label>
                        <input
                            type="password"
                            className="form-control form-control"
                            name="NewPassword"
                            placeholder="New Password"
                            value={this.state.Newpassword}
                            onChange={this.onChange}
                        />
                    </Col>
                    <Col>           
                    <Form.Label>Confirm new Password</Form.Label>
                        <input
                            type="password"
                            className="form-control form-control"
                            name="Confirmpassword"
                            placeholder="Re-confirm New Password"
                            value={this.state.confirmPassword}
                            onChange={this.onChange}
                        />
                    </Col>
            </Form.Row> */}
            {/* </Form.Group> */}
            {/* <p></p>
            <div >
                    <Button id="pButton " type="submit" value="Submit"  >
                        Save New password
                    </Button>
                    </div> */}
                      
               </Container>
                 </div>
        }                                 

        export default passwordChange;