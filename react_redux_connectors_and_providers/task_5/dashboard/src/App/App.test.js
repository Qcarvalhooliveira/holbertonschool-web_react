import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import { App, mapStateToProps } from './App';
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
    notifications: {
      notifications: [],
      fetchNotifications: jest.fn(), 
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
        fetchNotifications={initialState.getIn(['notifications', 'fetchNotifications'])} 
        
      />,
      { context: { store } }
    );
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
          notifications: {
            notifications: [],
            fetchNotifications: jest.fn(),    },
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
            fetchNotifications={loggedInState.getIn(['notifications', 'fetchNotifications'])} // Passando fetchNotifications do estado de usuário logado
          />,
          { context: { store } }
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

  describe('mapStateToProps', () => {
    it('should return the correct isLoggedIn state and listCourses', () => {
      const state = fromJS({
        ui: {
          isUserLoggedIn: true,
          isNotificationDrawerVisible: false,
        },
        notifications: {
          notifications: [],
          fetchNotifications: jest.fn(),
        },
      });

      const expectedProps = {
        isLoggedIn: true,
        displayDrawer: false,
        listCourses: [ 
          { id: 1, name: 'ES6', credit: 60 },
          { id: 2, name: 'Webpack', credit: 20 },
          { id: 3, name: 'React', credit: 40 }
        ],
      };
      expect(mapStateToProps(state)).toEqual(expectedProps);
    });
  });
});
