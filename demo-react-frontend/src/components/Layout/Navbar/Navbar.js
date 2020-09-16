import React, { Component } from "react";
import './Navbar.css'
import * as Icons from 'react-icons/bs';
import Logo from './icon.png'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: false,
            loggedIn: this.props.loggedIn
        }
    }
    
    handleClick = () => {
        this.setState({click: !this.state.click})
    }

    render() {
        /*
        const MenuItems = [
            {
                title: 'Home',
                url: '/UserAppo',
                cName: 'nav-links',
            },
            {
                title: 'About',
                url: '/about',
                cName: 'nav-links',
            },
            {
                title: 'Services',
                url: '/serviceDash',
                cName: 'nav-links',
            },
            {
                title: 'Contact us',
                url: '#',
                cName: 'nav-links',
            },
            {
                title: 'Login',
                url: '/login.html',
                icon: <Icons.BsPeopleCircle />,
                cName: 'nav-links-login',
            }
        ]
        */
        var MenuItems = []
        if (this.state.loggedIn) {
            MenuItems = [
                {
                    title: 'Home',
                    url: '/UserAppo',
                    cName: 'nav-links',
                },
                {
                    title: 'About',
                    url: '/about',
                    cName: 'nav-links',
                },
                {
                    title: 'Services',
                    url: '/serviceDash',
                    cName: 'nav-links',
                },
                {
                    title: 'Contact us',
                    url: '#',
                    cName: 'nav-links',
                },
                {
                    title: 'Logout',
                    url: '#',
                    icon: <Icons.BsBoxArrowRight />,
                    cName: 'nav-links-logout',
                }
            ]
        }
        else {
            MenuItems = [
                {
                    title: 'About',
                    url: '/about',
                    cName: 'nav-links',
                },
                {
                    title: 'Services',
                    url: '/serviceDash',
                    cName: 'nav-links',
                },
                {
                    title: 'Contact us',
                    url: '#',
                    cName: 'nav-links',
                },
                {
                    title: 'Login',
                    url: '/login.html',
                    icon: <Icons.BsPeopleCircle />,
                    cName: 'nav-links-login',
                }
            ]
        }

        return (
            <nav className="NavbarItems">
                <a href='/about'>
                    <h1 className="navbar-logo">
                        <img className="logo" src={Logo} />
                        BookInn
                    </h1>
                </a>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.click ? 'fas fa-times': 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.click ? 'nav-menu active':'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}> 
                                <a className={item.cName} href={item.url}>
                                    {item.icon} {item.title}
                                </a>
                            </li>
                        )
                    })}

                </ul>
            </nav>
        );
    }
}

export default Navbar;
