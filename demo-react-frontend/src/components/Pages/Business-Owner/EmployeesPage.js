import React, {Component} from "react";
import * as IoIcons from 'react-icons/io';
import './EmployeesPage.css';
import { Button } from "react-bootstrap";
import CreateAddEmployeeButton from './CreateAddEmployeeButton.js';
import Sidebar from "../../Layout/Sidebar/Sidebar.js";
import urlAddress from '../../ip.json';

const url = 'http://' + urlAddress.ip + ':8080/api/worker/';

class EmployeesPage extends Component
{
    constructor(props) {
        super(props)

        this.state = {
            employees: [],
        }
        this.editEmployee = this.editEmployee.bind(this);
    }
    editEmployee(id) {
        this.props.history.push(`/EmployeeList/${id}`);
    }
    fetchData() {
        let email = window.sessionStorage.getItem('email');
        //encrypted password
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr('keyword');
        let encryptedString = window.sessionStorage.getItem('encrypted');
        const decryptedString = cryptr.decrypt(encryptedString);
        console.log(decryptedString);
        let encoded = window.btoa(email + ':' + decryptedString);
        let auth = 'Basic ' + encoded;
        let h = new Headers();
        h.append('Accept', 'application/json');
        h.append('Authorization', auth);
        h.append("Access-Control-Allow-Origin", "*")



        fetch(url + 'all', {
            method: 'GET',
            headers: h
        })
            .then(res => res.json())
            .then(json => {
                this.setState({ employees: json });

            })
    }
    delete(id) {
        let h = new Headers();
        let email = window.sessionStorage.getItem('email');
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr('keyword');
        let encryptedString = window.sessionStorage.getItem('encrypted');
        const decryptedString = cryptr.decrypt(encryptedString);
        console.log(decryptedString);
        let encoded = window.btoa(email + ':' + decryptedString);
        let auth = 'Basic ' + encoded;

        h.append('Accept', 'application/json');
        h.append('Authorization', auth);
        if (window.confirm('Do you want to delete?')) {
            fetch(url + id, {
                method: 'delete',
                headers: h
            })
                .then(json => this.fetchData())
                .then(function (response) {
                    console.log('Authenticated')
                });
        }
    }


    componentDidMount() {
        this.fetchData();
        console.log(this.state.employees);
    }

    render() {
        return (
            <>
                <Sidebar />
                <CreateAddEmployeeButton/>
                <div style={{ marginLeft: '25%' }}>
                    <h1><IoIcons.IoMdPeople /> Employees</h1>
                    <table style={{ width: '700px' }} >
                        <thead>
                            <tr>
                                <td> ID</td>
                                <td> Name</td>
                                <td> Age</td>
                                <td> Works For</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map(s =>
                                <tr

                                    className='appo'
                                    key={s.workerIdentifier} >

                                    <td> {s.workerIdentifier}</td>
                                    <td> {s.workerName}</td>
                                    <td> {s.workerAge}</td>
                                    <td>{s.serviceName}</td>
                                    <td className='edt'>
                                        <Button
                                            href={`/EmployeeList/${s.workerIdentifier}`}
                                            onClick={() => this.editEmployee(s.workerIdentifier)}
                                            style={{ marginRight: '10px' }}>Edit</Button>
                                        <Button variant="danger" onClick={this.delete.bind(this, s.workerIdentifier)}>
                                            Delete
                                    </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </>
        )
    }
}

         
      export default EmployeesPage;
        


