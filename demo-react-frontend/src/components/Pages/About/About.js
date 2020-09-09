import React, {Component} from "react";
import './About.css'

class About extends Component{

    render() {
        return(
            <div className="about-section">
                <div className="inner-container">
                    <h1 style={{color:'black'}}>Save your time</h1>
                    <p className="text">
                        Who still calls to make appointments? Our website BookInn offers YOU the users to book an appointment to any services you want! Sign up for free and book an appointment to any service you want starting today!
                    </p>
                    <div className="skills">
                        <span>Services</span>
                        <span>Booking Appointments</span>
                        <span>All-Online</span>
                    </div>
                    <a href="#">
                    <div className="StartNow" onClick="/#">Start Now</div>
                    </a>
                </div>
            </div>
        );
    }
}
export default About;