import React from 'react';
import { shallow, mount } from 'enzyme';
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
    mount(<Login />);
  });

  it('renders 2 input tags and 2 label tags', () => {
    const wrapper = mount(<Login />);
    expect(wrapper.find('input').length).toEqual(3);
    expect(wrapper.find('label').length).toEqual(2);
  });

  it('submit button is disabled by default', () => {
    const wrapper = mount(<Login />);
    const submitButton = wrapper.find('input[type="submit"]');
    expect(submitButton.prop('disabled')).toBe(true);
  });

  it('submit button is enabled after changing the value of the two inputs', () => {
    const wrapper = mount(<Login />);
    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');

    emailInput.simulate('change', { target: { value: 'test@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });

   
    wrapper.update();

    const submitButton = wrapper.find('input[type="submit"]');
    expect(submitButton.prop('disabled')).toBe(false);
  });
});

