import React from 'react';
import { shallow } from "enzyme";
import { Home } from "./Home";

describe('Test Home Entry point', function () {
  it('should have a header tag with CREATE', function () {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find("h1").text()).toEqual("CREATE");
  });
});
describe('Addition', () => {
    it('knows that 2 and 2 make 4', () => {
      expect(2 + 2).toBe(4);
    });
  });