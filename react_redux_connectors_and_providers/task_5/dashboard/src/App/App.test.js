import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import { App, mapStateToProps } from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { StyleSheetTestUtils } from 'aphrodite';

describe('App Component', () => {
  let wrapper;
  const mockStore = configureStore([]);
  const initialState = fromJS({
    ui: {
      isUserLoggedIn: false,
      isNotificationDrawerVisible: false,
    },
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
    wrapper = shallow(
      <App
        isLoggedIn={false}
        displayDrawer={false}
        displayNotificationDrawer={jest.fn()}
        hideNotificationDrawer={jest.fn()}
        loginRequest={jest.fn()}
        logout={jest.fn()}
      />
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

    describe('when user is logged in', () => {
      beforeEach(() => {
        const loggedInState = fromJS({
          ui: {
            isUserLoggedIn: true,
            isNotificationDrawerVisible: false,
          },
        });
        store = mockStore(loggedInState);
        wrapper = shallow(
          <App
            isLoggedIn={true}
            displayDrawer={false}
            displayNotificationDrawer={jest.fn()}
            hideNotificationDrawer={jest.fn()}
            loginRequest={jest.fn()}
            logout={jest.fn()}
          />
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
        { id: 2, type: 'urgent', value: 'New resume available' },
      ];
      const wrapperInstance = shallow(
        <App
          isLoggedIn={false}
          displayDrawer={false}
          displayNotificationDrawer={jest.fn()}
          hideNotificationDrawer={jest.fn()}
          loginRequest={jest.fn()}
          logout={jest.fn()}
        />
      ).instance();
      wrapperInstance.setState({ listNotifications: initialNotifications });
      expect(wrapperInstance.state.listNotifications.length).toBe(2);

      wrapperInstance.markNotificationAsRead(1);
      expect(wrapperInstance.state.listNotifications.length).toBe(1);
      expect(wrapperInstance.state.listNotifications[0].id).toBe(2);
    });
  });

  describe('mapStateToProps', () => {
    it('should return the correct isLoggedIn state', () => {
      const state = fromJS({
        ui: {
          isUserLoggedIn: true,
          isNotificationDrawerVisible: false,
        },
      });
      const expectedProps = {
        isLoggedIn: true,
        displayDrawer: false,
      };
      expect(mapStateToProps(state)).toEqual(expectedProps);
    });
  });
});
