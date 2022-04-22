import MusicPage from '../src/components/MusicPage.js';
import React from 'react';
import { mount } from 'enzyme';
import { ExpansionPanelActions } from '@material-ui/core';

test('Add Attribute component is rendered', () => {
    const td = {id: 1, done: false};
    const wrapper = mount(addAttr(td));

    const p = wrapper.find(td);
    p.simulate('id: 138297');
    expect(doneChange).toBeCalledWith(1); 
});