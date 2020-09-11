import React, {Component} from "react";
import {Button, Col, Container, Form} from "react-bootstrap";

class CreateChangePassButton extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            newPassword: '',
            confirmNewPassword: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e) {
           e.preventDefault();
           const changePass =
           {
              password: this.state.password,
              newPassword: this.state.newPassword,
              confirmNewPassword: this.state.confirmNewPassword,
           }
           alert("Password successfully changed");
           console.log(changePass);
        }

        render(){

          return (              
          <Container>             
            <div>
            <Form action="/action_page.php" class="was-validated" onSubmit={this.onSubmit}>
          <Form.Row>
            <Form.Group>
               <Col>
                <Form.Label>Password</Form.Label>
                <input 
                    type="password"
                    className="form-control form-control"
                    name="password"
                    value="1234"
                    onSubmit={this.onSubmit}
                />
                </Col>
              </Form.Group>
                <Form.Group>
                   <Col>               
                    <Form.Label for="NewPassword">Change Password</Form.Label>
                        <input
                           id="newPassword"
                            type="password"
                            className="form-control form-control"
                            name="newPassword"
                            placeholder="New Password"
                            value={this.state.newPassword}
                            onChange={this.onChange}
                        />
                    </Col>
                  </Form.Group>
                    <Form.Group>
                    {/* <div className="invalid-feedback">Please fill out this field.</div>          */}
                    <Col>
                    <Form.Label for="ConfirmNewPassword">Confirm new Password</Form.Label>
                        <input
                            id="ConfirmNewPassword"
                            type="password"
                            className="form-control form-control"
                            name="ConfirmNewPassword"
                            placeholder="Re-confirm new password"
                            value={this.setState.confirmNewPassword}
                            onChange={this.onChange}
                        />
                    </Col>
                  </Form.Group>
            </Form.Row>
             <p></p>
            <div >
               <Button id="pButton " type="submit" value="Submit"  >
                      Change Password
                </Button>
            </div>
                </Form>      
              </div> 
          </Container>
            
            );
    }
  } 
         



export default CreateChangePassButton;