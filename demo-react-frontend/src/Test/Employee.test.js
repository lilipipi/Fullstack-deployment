import React from 'react';
import Employee from '../components/Pages/Business-Owner/EmployeesPage.js';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("<Employee /> Employee Unit Test", () => {
    it('should have employee Alex', () => {
        const component = mount(<Employee />);
        expect(component.find('tbody > tr > td').at(0).equals('Alex'));
    });
    
});
