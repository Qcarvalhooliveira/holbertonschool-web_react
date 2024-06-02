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

describe('App Component', () => {
  let wrapper;

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should contain Notifications component with displayDrawer as false', () => {
    expect(wrapper.find(Notifications).prop('displayDrawer')).toEqual(false);
  });

  it('should contain Header component', () => {
    expect(wrapper.containsMatchingElement(<Header />)).toBe(true);
  });

  it('should contain Footer component', () => {
    expect(wrapper.containsMatchingElement(<Footer />)).toBe(true);
  });

  describe('User Authentication', () => {
    it('should contain Login component when user is not logged in', () => {
      wrapper.setState({ user: { isLoggedIn: false, email: '' } });
      expect(wrapper.containsMatchingElement(<Login />)).toBe(true);
    });

    it('should not display CourseList when user is not logged in', () => {
      wrapper.setState({ user: { isLoggedIn: false, email: '' } });
      expect(wrapper.containsMatchingElement(<CourseList />)).toBe(false);
    });

    it('should update the user state correctly on logOut', () => {
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

    it('should update the user state correctly on logIn', () => {
      wrapper.instance().logIn('test@example.com', 'password');
      expect(wrapper.state('user')).toEqual({
        email: 'test@example.com',
        password: 'password',
        isLoggedIn: true,
      });
    });

    describe('when user is logged in', () => {
      beforeEach(() => {
        wrapper.setState({ user: { isLoggedIn: true, email: 'test@example.com' } });
      });

      it('should not include the Login component', () => {
        expect(wrapper.find(Login).exists()).toBe(false);
      });

      it('should include the CourseList component', () => {
        expect(wrapper.find(CourseList).exists()).toBe(true);
      });
    });
  });

  describe('Notification Management', () => {
    it('should remove a notification from the list on markNotificationAsRead', () => {
      const initialNotifications = [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' }
      ];
      wrapper = mount(<App />);
      wrapper.setState({ listNotifications: initialNotifications });
      expect(wrapper.state('listNotifications').length).toBe(2);

      wrapper.instance().markNotificationAsRead(1);
      wrapper.update();

      expect(wrapper.state('listNotifications').length).toBe(1);
      expect(wrapper.state('listNotifications')[0].id).toBe(2);
    });
  });

  describe('Interaction', () => {
    it('should handle displayDrawer state changes correctly', () => {
      wrapper.instance().handleDisplayDrawer();
      expect(wrapper.state('displayDrawer')).toBe(true);
      wrapper.instance().handleHideDrawer();
      expect(wrapper.state('displayDrawer')).toBe(false);
    });

    describe('Keyboard events', () => {
      it('calls logOut and updates state when "control" and "h" keys are pressed', () => {
        const mockLogOut = jest.fn();
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
        const wrapper = mount(
          <AppContext.Provider value={{ user: { isLoggedIn: true, email: 'test@example.com' }, logOut: mockLogOut }}>
            <App />
          </AppContext.Provider>
        );
    
        const event = new KeyboardEvent('keydown', {
          key: 'h',
          ctrlKey: true,
        });
        document.dispatchEvent(event);
    
        expect(mockAlert).toHaveBeenCalledWith('Logging you out');
        expect(mockLogOut).toHaveBeenCalled();
        expect(wrapper.state('user').isLoggedIn).toBe(false);  
        mockAlert.mockRestore();
      });
    });
  });
});
