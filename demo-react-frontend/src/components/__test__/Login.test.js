import React from 'react';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from "../Login/Login.js";

Enzyme.configure( { adapter: new Adapter()} );

describe("<Login /> component Unit Test", () => {
    it("Should render one component", ()=> {
        const component = shallow(<Login />);
        expect(component).toHaveLength(1);
    })

    it('POST API call when button pressed form filled in', () => {
        const mockFn = jest.fn();
        const props = {
            handleClick: mockFn,
            username: "email@email.com",
            password: "password",
            account:'customer'
        };
        const component = shallow(<Login { ...props } />);
        const button = component.find('Button')
        
        button.simulate('click');
        expect(mockFn).toHaveBeenCalled();
    })

    it('POST API call with no email', () => {
        const mockFn = jest.fn();
        const props = {
            handleClick: mockFn,
            username: "",
            password: "password",
            account:'customer'
        };
        const component = shallow(<Login { ...props } />);
        const button = component.find('Button')
        
        button.simulate('click');
        expect(mockFn).not.toHaveBeenCalled();
    })
    
    it('POST API call with no password', () => {
        const mockFn = jest.fn();
        const props = {
            handleClick: mockFn,
            username: "email@email.com",
            password: "",
            account:'customer'
        };
        const component = shallow(<Login { ...props } />);
        const button = component.find('Button')
        
        button.simulate('click');
        expect(mockFn).not.toHaveBeenCalled();
    })

    it('POST API call with account type not selected', () => {
        const mockFn = jest.fn();
        const props = {
            handleClick: mockFn,
            username: "email@email.com",
            password: "password",
            account:''
        };
        const component = shallow(<Login { ...props } />);
        const button = component.find('Button')
        
        button.simulate('click');
        expect(mockFn).not.toHaveBeenCalled();
    })
    
})