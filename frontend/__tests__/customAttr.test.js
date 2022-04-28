import MusicPage from '../src/components/MusicPage.js';
import React from 'react';
import { mount } from 'enzyme';
import { ExpansionPanelActions } from '@material-ui/core';

test('custom attribute component is rendered', () => {
    const attr = {id: 1, done: false};
    const wrapper = mount(addCustom(attr));

    const p = wrapper.find(attr);
    p.simulate('coding');
    expect(doneChange).toBeCalledWith(1); 
});