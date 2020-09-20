import React,{ Component } from 'react';
import './Sidebar.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

class Sidebar extends Component{
    render() {
        const SidebarData = [
            {
                title: 'Appointments',
                path: '/UserAppo',
                icon: <IoIcons.IoIosPaper />,
                cName: 'nav-text'
            },
            {
                title: 'Create',
                path: '/CreateAppo',
                icon: <BsIcons.BsPlusCircle />,
                cName: 'nav-text'
            },
            {
                title: 'Employees',
                path: '/',
                icon: <IoIcons.IoMdPeople />,
                cName: 'nav-text'
            },
            {
                title: 'Profile',
                path: '/profile',
                icon: <BsIcons.BsPersonFill />,
                cName: 'nav-text'
            }
        ];
        return (
            <div className='sidebar'>
                <IconContext.Provider value={{ color: '#fff' }}>
                    <nav>
                        <ul className='nav-menu-items'>
                            {SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <a href={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </IconContext.Provider>
            </div>
        );
    }
}

export default Sidebar;