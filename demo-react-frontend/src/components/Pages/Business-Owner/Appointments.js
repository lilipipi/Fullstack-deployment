import React from 'react';

const url = '/api/appointment/all';

class Appointments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            appointmentIdentifier: '',
            appointmentName: '',
            description:'',
            appointmentOwner:''
        };
    }
    
    

    fetchData() {

        let h = new Headers();
        h.append('Accept', 'application/json');

        let encoded = window.btoa('email@email.com:password');
        let auth = 'Basic ' + encoded;
        h.append('Authorization', auth);

        fetch(url, {
            method: 'GET',
            headers: h
        })
            .then(res => res.json())
            .then(json => {
                this.setState({ appotinments:json });
            });
    }
    componentDidMount() {
        this.fetchData();
    }
    
    render() {
        return (
            <div>
                <h1 className="text-center" style={{ marginLeft: "300px" }}> Users List</h1>
                <table className="table table-striped" style={{ marginLeft: "400px", width: '500px'}}>
                    <thead>
                        <tr>
                            <td> User Id</td>
                            <td> User Email</td>
                            <td> User Name</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.appointments.map(a => 
                                    <tr key={a.appointmentIdentifier}>
                                        <td> {a.appointmentIdentifier}</td>
                                        <td> {a.appointmentOwner}</td>
                                        <td> {a.appointmentName}</td>
                                    </tr>
                                )}
                    </tbody>
                </table>

            </div>

        )
    }
}

export default Appointments