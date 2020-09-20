import React from 'react';
import Navbar from '../components/Layout/Navbar/Navbar.js';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("<Navbar /> Navigation bar Unit Test", () => {
    it('should render to About page', () => {
        const component = mount(<Navbar />);
        const button = component.find('li').first().children(0)
        console.log(button)
        button.simulate('click');

        expect(component.find('ul > li > a').at(0).prop('href')).toBe('/about');

        // const login = mount(<UApt />);
        // const text = login.find('h1');
        // expect(text.text()).toBe(' Appointments');
        // console.log(text.text());
    });
    it('should render to Services page', () => {
        const component = mount(<Navbar />);
        const button = component.find('li').first().children(0)
        console.log(button)
        button.simulate('click');

        expect(component.find('ul > li > a').at(1).prop('href')).toBe('/serviceDash');
    });
    it('should render to Contact page', () => {
        const component = mount(<Navbar />);
        const button = component.find('li').first().children(0)
        console.log(button)
        button.simulate('click');

        expect(component.find('ul > li > a').at(2).prop('href')).toBe('/contact');
    });
    it('should render to Login page', () => {
        const component = mount(<Navbar />);
        const button = component.find('li').first().children(0)
        console.log(button)
        button.simulate('click');

        expect(component.find('ul > li > a').at(3).prop('href')).toBe('/login');
    });
});
