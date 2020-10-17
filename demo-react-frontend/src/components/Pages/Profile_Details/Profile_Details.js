import React, { Component } from 'react';
import {Container, Button} from "react-bootstrap";
import Sidebar from '../../Layout/Sidebar/Sidebar.js';
import urlAddress from "../../ip.json";
import './Profile_Details.css';
import jwt_decode from "jwt-decode";



const url = 'http://'+urlAddress.ip+':8080/api/users/';
console.log(urlAddress.ip);

     class Profile_Details extends Component{
        constructor() {
            super()
        this.state = {
            id:'',
            userID:'',
            username:'',
            fullname:'',
            phoneNumber:'',
            address:'',
            errorMsg:'',

        }
    }
    delete() {
        let h = new Headers();
        var token = window.sessionStorage.getItem('token');
        var decoded = jwt_decode(token);
        h.append('Accept', 'application/json');
        if (window.confirm('Do you want to delete?')) {
            fetch(url + decoded.id, {
                method: 'delete',
                headers: h
            })
                .then(json => this.fetchData())
                .then(function (response) {
                    console.log('Authenticated')
                });
        }
        window.sessionStorage.clear();
        window.location.reload(true);
    }
    componentDidMount(){
        var token = window.sessionStorage.getItem('token');
        var decoded = jwt_decode(token);
        let h = new Headers();
        h.append('Accept', 'application/json');
        h.append("Access-Control-Allow-Origin", "*")

        fetch(url + decoded.id, {
            method: 'GET',
            headers: h
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    username: json.username,
                    fullname: json.fullname,
                    phoneNumber: json.phoneNumber,
                    address: json.address
                });

            })
    }

  
    render () {
        return (      
           <Container fluid style={{paddingLeft:'0rem', paddingRight:'0rem'}}>
            <Sidebar/>
                <div className="body" style={{ marginLeft:'25%'}}>
                <h1>Profile Details</h1>  
                    <table style={{ width: '700px' }} >
                        <thead>
                            <tr>
                                <td> Email</td>
                                <td> Full name</td>
                                <td> Phone number</td>
                                <td>Personal address</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> {this.state.username}</td>
                                <td> {this.state.fullname}</td>
                                <td> {this.state.phoneNumber}</td>
                                <td>{this.state.address}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <Button
                        className='btnEdt'
                        href={'/profile/Edit'}
                        style={{ marginRight: '10px' }}>Edit</Button>
                    <Button
                        className='btnDel'
                        onClick = {this.delete.bind(this)}
                        href='/login'>
                        Delete
                    </Button>
             </div> 
          </Container>
            
        );
     }
         
       
}
    


     export default Profile_Details;

