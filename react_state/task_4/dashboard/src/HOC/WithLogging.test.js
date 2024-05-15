import React from 'react';
import { mount } from 'enzyme';
import WithLogging from './WithLogging';

describe('WithLogging HOC', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should call console.log on mount and unmount with "Component" when the wrapped element is pure HTML', () => {
    const Element = () => <p>Test</p>;
    const WrappedElement = WithLogging(Element);

    const wrapper = mount(<WrappedElement />);
    expect(consoleSpy).toHaveBeenCalledWith('Component Element is mounted');
    wrapper.unmount();
    expect(consoleSpy).toHaveBeenCalledWith('Component Element is going to unmount');
  });

  it('should call console.log on mount and on unmount with the name of the component when the wrapped element is the Login component', () => {
    const Login = () => <div>Login component</div>;
    Login.displayName = 'Login';

    const WrappedLogin = WithLogging(Login);

    const wrapper = mount(<WrappedLogin />);
    expect(consoleSpy).toHaveBeenCalledWith('Component Login is mounted');
    wrapper.unmount();
    expect(consoleSpy).toHaveBeenCalledWith('Component Login is going to unmount');
  });
});
