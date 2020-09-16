import React from 'react';
import UApt from '../Pages/User/UApt.js';
import Navbar from '../Layout/Navbar/Navbar.js';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import About from '../Pages/About/aboutpage.js';

Enzyme.configure({ adapter: new Adapter() });

describe("<Navbar /> Navigatio bar Unit Test", () => {
    it('should render to Appointments page', () => {
        const component = mount(<Navbar />);
        const button = component.find('li').first().children(0)
        console.log(button)
        button.simulate('click');

        expect(component.find('ul > li > a').at(0).prop('href')).toBe('/UserAppo');

        // const login = mount(<UApt />);
        // const text = login.find('h1');
        // expect(text.text()).toBe(' Appointments');
        // console.log(text.text());
    });
    it('should render to Main page', () => {
        const component = mount(<Navbar />);
        const button = component.find('li').first().children(0)
        console.log(button)
        button.simulate('click');

        expect(component.find('ul > li > a').at(1).prop('href')).toBe('/about');
    });
    it('should render to Service page', () => {
        const component = mount(<Navbar />);
        const button = component.find('li').first().children(0)
        console.log(button)
        button.simulate('click');

        expect(component.find('ul > li > a').at(2).prop('href')).toBe('/serviceDash');
    });
    it('should render to Contact page', () => {
        const component = mount(<Navbar />);
        const button = component.find('li').first().children(0)
        console.log(button)
        button.simulate('click');

        expect(component.find('ul > li > a').at(3).prop('href')).toBe('/Contact');
    });
});
