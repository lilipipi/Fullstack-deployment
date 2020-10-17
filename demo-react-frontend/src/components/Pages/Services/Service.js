import React from 'react';
import './Services.css';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { FaBorderNone } from 'react-icons/fa';
import { Button } from "react-bootstrap";
import urlAddress from '../../ip.json';

const url = 'http://' + urlAddress.ip + ':8080/api/service/';

class Service extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            services: [],
        }
        this.viewService = this.viewService.bind(this);
    }
    viewService(id) {
        
        if (window.sessionStorage.getItem('loggedIn') == 'true'){
            this.props.history.push(`/CreateAppo/${id}`);
        }
        else {
            window.alert('Please login')
        }
    }
    fetchData() {
        
        let h = new Headers();
        h.append('Accept', 'application/json');
        h.append("Access-Control-Allow-Origin", "*")



        fetch(url + 'allServices', {
            method: 'GET',
            headers: h
        })
            .then(res => res.json())
            .then(json => {
                this.setState({ services: json });

            })
    }


    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <>
                <div style={{ marginLeft: '25%' }}>
                    <h1><BsIcons.BsCardChecklist /> Available Services</h1>
                    <table style={{ width: '700px' }} >
                        <thead>
                            <tr>
                                <td> Name</td>
                                <td> Description</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.services.map(s =>
                                <tr

                                    className='appo'
                                    key={s.serviceIdentifier} >
                                    <td> {s.serviceName}</td>
                                    <td> {s.serviceDescription}</td>
                                    <td className="edt">
                                        <Button
                                            onClick={() => this.viewService(s.serviceIdentifier)}
                                            style={{ float:'right' }}>Book Appointment</Button>
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

export default Service