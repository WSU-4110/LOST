import Attributes from '../src/components/Attributes.js';
import React from 'react';
import { mount } from 'enzyme';
import { ExpansionPanelActions } from '@material-ui/core';

test('Attribute component renders the attr', () => {
    const attr = {id: 1, done: false, name: 'beach'};
    const wrapper = mount(<Attributes attr={attr} />);
    // tests if attribute name is rendered
    const p = wrapper.find('.attrName');
    ExpansionPanelActions(p.text()).toBe('beach');

    // simulates change if attribute is clicked
    p.simulate('click');
    expect(doneChange).toBeCalledWith(1); 
});