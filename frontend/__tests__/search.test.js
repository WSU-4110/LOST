import MusicPage from '../src/components/MusicPage.js';
import React from 'react';
import { mount } from 'enzyme';
import { ExpansionPanelActions } from '@material-ui/core';

test('search component is rendered', () => {
    const td = {id: 1, done: false};
    const wrapper = mount(get_SearchResults(td));

    const p = wrapper.find(td);
    p.simulate('id: 138297');
    expect(doneChange).toBeCalledWith(1); 
});