import React, { Component } from "react";
import './Navbar.css'
import Logo from './icon.png'
import {Button} from "./Button"
class Navbar extends Component {
    state = {click: false}
    handleClick = () => {
        this.setState({click: !this.state.click})
    }
    jj

    isLoggedIn() {
        return false;
    }

    render() {
        const loggedIn = this.isLoggedIn();
        const MenuItems = [
            {
                title: 'Home',
                url: '/dashboard',
                cName: 'nav-links',
            },
            {
                title: 'About',
                url: '/about',
                cName: 'nav-links',
            },
            {
                title: 'Services',
                url: '/dashboard',
                cName: 'nav-links',
            },
            {
                title: 'Team',
                url: '#',
                cName: 'nav-links',
            },
            {
                title: 'Contact',
                url: '#',
                cName: 'nav-links',
            }/*,
            {
                title: 'Login',
                url: '/login.html',
                cName: 'nav-links',
            },
            {
                title: 'Register',
                url: '/register.html',
                cName: 'nav-links',
            }*/
        ]
        return (
            <nav className="NavbarItems">
                <h1 className="navbar-logo"><img className="logo" src={Logo}></img>BookInn</h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.click ? 'fas fa-times': 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.click ? 'nav-menu active':'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}> 
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}

                    {
                        loggedIn === true ? 
                            <li>
                                <p>User</p>
                            </li>
                        : loggedIn === false ?
                            <>
                            <li><a className="nav-links" href="/register.html">Sign Up</a></li>
                            <li><a className="nav-links" href="/login.html">Login</a></li>
                            </>
                        : <br/>
                    }
                </ul>
            </nav>
        );
    }
}

export default Navbar;
