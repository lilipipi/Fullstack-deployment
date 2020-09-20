import React from 'react';
import Sidebar from '../components/Layout/Sidebar/Sidebar.js';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("<Sidebar /> Side bar Unit Test", () => {
    it('should render to User appointment page', () => {
        const component = mount(<Sidebar />);
        const button = component.find('li').first().children(0)
        console.log(button)
        button.simulate('click');

        expect(component.find('ul > li > a').at(0).prop('href')).toBe('/UserAppo');
    });
    it('should render to Create appointment page', () => {
        const component = mount(<Sidebar />);
        const button = component.find('li').first().children(0)
        console.log(button)
        button.simulate('click');

        expect(component.find('ul > li > a').at(1).prop('href')).toBe('/CreateAppo');
    });
    it('should render to User appointment page', () => {
        const component = mount(<Sidebar />);
        const button = component.find('li').first().children(0)
        console.log(button)
        button.simulate('click');

        expect(component.find('ul > li > a').at(2).prop('href')).toBe('/employee');
    });
    it('should render to User appointment page', () => {
        const component = mount(<Sidebar />);
        const button = component.find('li').first().children(0)
        console.log(button)
        button.simulate('click');

        expect(component.find('ul > li > a').at(3).prop('href')).toBe('/profile');
    });
});
