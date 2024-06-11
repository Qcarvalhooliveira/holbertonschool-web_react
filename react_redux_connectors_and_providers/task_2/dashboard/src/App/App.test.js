import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import App, { mapStateToProps } from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { StyleSheetTestUtils } from 'aphrodite';
import AppContext, { defaultUser } from './AppContext';

describe('App Component', () => {
  let wrapper;
  const mockStore = configureStore([]);
  const initialState = fromJS({
    isUserLoggedIn: false,
    isNotificationDrawerVisible: false,
    user: defaultUser,
  });
  let store;

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it('should contain Notifications component with displayDrawer as false', () => {
    expect(wrapper.find(Notifications).prop('displayDrawer')).toEqual(false);
  });

  it('should contain Header component', () => {
    expect(wrapper.find(Header).exists()).toBe(true);
  });

  it('should contain Footer component', () => {
    expect(wrapper.find(Footer).exists()).toBe(true);
  });

  describe('User Authentication', () => {
    it('should contain Login component when user is not logged in', () => {
      expect(wrapper.find(Login).exists()).toBe(true);
    });

    it('should not display CourseList when user is not logged in', () => {
      expect(wrapper.find(CourseList).exists()).toBe(false);
    });

    it('should update the user state correctly on logOut', () => {
      const appInstance = wrapper.find('App').instance();
      appInstance.logOut();
      wrapper.update();
      expect(store.getActions()).toContainEqual({ type: 'LOGOUT' });
    });

    it('should update the user state correctly on logIn', () => {
      const appInstance = wrapper.find('App').instance();
      appInstance.logIn('test@example.com', 'password');
      wrapper.update();
      expect(store.getActions()).toContainEqual({ type: 'LOGIN_SUCCESS', payload: { email: 'test@example.com', password: 'password' } });
    });

    describe('when user is logged in', () => {
      beforeEach(() => {
        const loggedInState = fromJS({
          isUserLoggedIn: true,
          isNotificationDrawerVisible: false,
          user: { email: 'test@example.com', isLoggedIn: true }
        });
        store = mockStore(loggedInState);
        wrapper = mount(
          <Provider store={store}>
            <App />
          </Provider>
        );
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
      const appInstance = wrapper.find('App').instance();
      appInstance.setState({ listNotifications: initialNotifications });
      expect(appInstance.state.listNotifications.length).toBe(2);

      appInstance.markNotificationAsRead(1);
      wrapper.update();

      expect(appInstance.state.listNotifications.length).toBe(1);
      expect(appInstance.state.listNotifications[0].id).toBe(2);
    });
  });

  describe('Keyboard events', () => {
    it('calls logOut and updates state when "control" and "h" keys are pressed', () => {
      const mockLogOut = jest.fn();
      const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

      const wrapper = mount(
        <Provider store={store}>
          <AppContext.Provider value={{ user: { isLoggedIn: true, email: 'test@example.com' }, logOut: mockLogOut }}>
            <App />
          </AppContext.Provider>
        </Provider>
      );

      const event = new KeyboardEvent('keydown', {
        key: 'h',
        ctrlKey: true,
      });
      document.dispatchEvent(event);

      expect(mockAlert).toHaveBeenCalledWith('Logging you out');
      expect(mockLogOut).toHaveBeenCalled();
      mockAlert.mockRestore();
    });
  });

  describe('mapStateToProps', () => {
    it('should return the correct isLoggedIn state', () => {
      const state = fromJS({
        isUserLoggedIn: true,
        isNotificationDrawerVisible: false,
      });
      const expectedProps = {
        isLoggedIn: true,
        displayDrawer: false,
      };
      expect(mapStateToProps(state)).toEqual(expectedProps);
    });
  });
});
