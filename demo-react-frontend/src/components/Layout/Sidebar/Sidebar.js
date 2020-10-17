import React,{ Component } from 'react';
import './Sidebar.css';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';
import { IconContext } from 'react-icons';

class Sidebar extends Component{
    render() {
        var SidebarData = []
        if (window.sessionStorage.getItem('loggedIn') == 'true') { SidebarData = [
            {
                title: 'Appointments',
                path: '/UserAppo',
                icon: <IoIcons.IoIosPaper />,
                cName: 'nav-text'
            },
            {
                title: 'Book Appointment',
                path: '/serviceDash',
                icon: <BsIcons.BsPlusCircle />,
                cName: 'nav-text'
            },
            {
                title: 'Profile',
                path: '/profile',
                icon: <BsIcons.BsPersonFill />,
                cName: 'nav-text'
            }
        ]}
        else if (window.sessionStorage.getItem('business') == 'true'){
            SidebarData = [
                {
                    title: 'My Services',
                    path: '/BusinessServices',
                    icon: <BsIcons.BsCardChecklist />,
                    cName: 'nav-text'
                },
                {
                    title: 'Create Service',
                    path: '/CreateService',
                    icon: <BsIcons.BsPlusCircle />,
                    cName: 'nav-text'
                },
                {
                    title: 'Appointments',
                    path: '/dashboardOwner',
                    icon: <IoIcons.IoIosPaper />,
                    cName: 'nav-text'
                },

                {
                    title: 'Employees',
                    path: '/EmployeesPage',
                    icon: <IoIcons.IoMdPeople />,
                    cName: 'nav-text'
                },
            ]
        };
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