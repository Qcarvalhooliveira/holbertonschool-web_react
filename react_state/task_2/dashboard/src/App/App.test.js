import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { StyleSheetTestUtils } from 'aphrodite';
import AppContext from './AppContext';

describe('App', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('contains Notifications component with displayDrawer as false', () => {
    expect(wrapper.find(Notifications).prop('displayDrawer')).toEqual(false);
  });

  it('contains Header component', () => {
    expect(wrapper.containsMatchingElement(<Header />)).toEqual(true);
  });

  it('contains Login component when isLoggedIn is false', () => {
    wrapper.setState({ user: { isLoggedIn: false, email: '' } });
    expect(wrapper.containsMatchingElement(<Login />)).toEqual(true);
  });

  it('contains Footer component', () => {
    expect(wrapper.containsMatchingElement(<Footer />)).toEqual(true);
  });

  it('does not display CourseList when isLoggedIn is false', () => {
    wrapper.setState({ user: { isLoggedIn: false, email: '' } });
    expect(wrapper.containsMatchingElement(<CourseList />)).toEqual(false);
  });

  it('default state for displayDrawer is false', () => {
    expect(wrapper.state('displayDrawer')).toBe(false);
  });

  it('handleDisplayDrawer changes displayDrawer state to true', () => {
    wrapper.instance().handleDisplayDrawer();
    expect(wrapper.state('displayDrawer')).toBe(true);
  });

  it('handleHideDrawer changes displayDrawer state to false', () => {
    wrapper.instance().handleDisplayDrawer();
    wrapper.instance().handleHideDrawer();
    expect(wrapper.state('displayDrawer')).toBe(false);
  });

  it('logOut updates the state correctly', () => {
    wrapper.setState({
      user: {
        email: 'test@example.com',
        password: 'password',
        isLoggedIn: true,
      },
    });
    wrapper.instance().logOut();
    expect(wrapper.state('user')).toEqual({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  });

  it('logIn updates the state correctly', () => {
    wrapper.instance().logIn('test@example.com', 'password');
    expect(wrapper.state('user')).toEqual({
      email: 'test@example.com',
      password: 'password',
      isLoggedIn: true,
    });
  });

  describe('when isLoggedIn is true', () => {
    it('does not include the Login component', () => {
      wrapper.setState({ user: { isLoggedIn: true, email: 'test@example.com' } });
      expect(wrapper.find(Login).exists()).toEqual(false);
    });

    it('includes the CourseList component', () => {
      wrapper.setState({ user: { isLoggedIn: true, email: 'test@example.com' } });
      expect(wrapper.find(CourseList).exists()).toEqual(true);
    });
  });

  describe('Keyboard events', () => {
    it('calls logOut and updates state when "control" and "h" keys are pressed', () => {
      const mockLogOut = jest.fn();
      const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
      wrapper = mount(
        <AppContext.Provider value={{ user: { isLoggedIn: true, email: 'test@example.com' }, logOut: mockLogOut }}>
          <App />
        </AppContext.Provider>
      );

      const event = new KeyboardEvent('keydown', {
        key: 'h',
        ctrlKey: true,
      });

      wrapper.instance().componentDidMount();
      window.dispatchEvent(event);

      expect(mockAlert).toHaveBeenCalledWith('Logging you out');
      expect(mockLogOut).toHaveBeenCalled();
      expect(wrapper.state('user')).toEqual({
        email: '',
        password: '',
        isLoggedIn: false,
      });

      mockAlert.mockRestore();
    });
  });
});
