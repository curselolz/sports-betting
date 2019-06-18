import React from 'react';
import { shallow } from 'enzyme';
import ExampleContainer from '../Example/ExampleContainer';

describe('Example component', () => {
    it('should render correctly ', () => {
        const component = shallow(<ExampleContainer />);

        expect(component).toMatchSnapshot();
    });
});
