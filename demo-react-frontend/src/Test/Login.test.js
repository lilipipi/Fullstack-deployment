import React from 'react';
// import 'react-native';
import {shallow, mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import Login from "./components/Login/Login";


Enzyme.configure( { adapter: new Adapter()} );

describe("<Login /> component Unit Test", () => {
    const mockFn = jest.fn();
    const props = {
        onClick: mockFn,
        username: "email@email.com",
        password: "password"
    };

    it("Should render one component", ()=> {
        const component = shallow(<Login { ...props } />);
        expect(component).toHaveLength(1);
    })
})