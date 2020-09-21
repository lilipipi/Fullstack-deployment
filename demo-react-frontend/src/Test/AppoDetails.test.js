import React from 'react';
import AppoDetails from '../components/Pages/User/AppoDetails.js';
import UApts from '../components/Pages/User/UApt.js';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("<AppoDetails /> Display details", () => {
    it('Api test case', async function () {

        const component = mount(<UApts />);
        const button = component.find('tr').first().children(0)
        expect(component.find('ul > li > a').at(0).prop('href')).toBe('/UserAppo');

    });
});
