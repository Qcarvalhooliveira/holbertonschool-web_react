import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import { StyleSheetTestUtils } from 'aphrodite';

describe('Login', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });
  it('renders without crashing', () => {
    shallow(<Login />);
  });

  it('renders 2 input tags (email and password) and 2 label tags', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('input[type="email"]').length).toEqual(1);
    expect(wrapper.find('input[type="password"]').length).toEqual(1);
    expect(wrapper.find('label').length).toEqual(2);
  });

  it('submit button is disabled by default', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
  });
  it('submit button is enabled after changing the value of the two inputs', () => {
    const wrapper = shallow(<Login />);
    wrapper.find('input[type="email"]').simulate('change', { target: { value: 'test@example.com' } });
    wrapper.find('input[type="password"]').simulate('change', { target: { value: 'password123' } });
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(false);
  });
});
