import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { StyleSheetTestUtils } from 'aphrodite';

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
    expect(wrapper.containsMatchingElement(<Login />)).toEqual(true);
  });

  it('contains Footer component', () => {
    expect(wrapper.containsMatchingElement(<Footer />)).toEqual(true);
  });

  it('does not display CourseList when isLoggedIn is false', () => {
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
  

  describe('when isLoggedIn is true', () => {
    beforeEach(() => {
      wrapper = shallow(<App isLoggedIn={true} />);
    });

    it('does not include the Login component', () => {
      expect(wrapper.containsMatchingElement(<Login />)).toEqual(false);
    });

    it('includes the CourseList component', () => {
      expect(wrapper.find(CourseList).exists()).toEqual(true);
    });
  });

  describe('Keyboard events', () => {
    let mockLogOut, mockAlert;

    beforeEach(() => {
      mockLogOut = jest.fn();
      mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
      wrapper = shallow(<App logOut={mockLogOut} />);
    });

    afterEach(() => {
      mockAlert.mockRestore();
    });

    it('calls logOut and alert when "control" and "h" keys are pressed', () => {
      const event = { ctrlKey: true, key: 'h', preventDefault: jest.fn() };
      wrapper.instance().handleKeyDown(event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockAlert).toHaveBeenCalledWith('Logging you out');
      expect(mockLogOut).toHaveBeenCalled();
    });
  });
});
