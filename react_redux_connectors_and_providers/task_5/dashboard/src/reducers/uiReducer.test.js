import { Map } from 'immutable';
import uiReducer from './uiReducer';
import { DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, LOGIN, SELECT_COURSE } from '../actions/uiActionTypes';

describe('uiReducer', () => {
  const initialState = Map({
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: Map({
      isLoggedIn: false,
      email: ''
    }),
  });

  it('returns initial state', () => {
    const expectedState = {
      isNotificationDrawerVisible: false,
      isUserLoggedIn: false,
      user: { isLoggedIn: false, email: '' },
    };
    expect(uiReducer(undefined, {}).toJS()).toEqual(expectedState);
  });

  it('handles irrelevant action', () => {
    const state = Map({
      isNotificationDrawerVisible: true,
      isUserLoggedIn: true,
      user: Map({ name: 'John Doe', isLoggedIn: true, email: 'john@example.com' }),
    });
    expect(uiReducer(state, { type: SELECT_COURSE }).toJS()).toEqual(state.toJS());
  });

  it('handles DISPLAY_NOTIFICATION_DRAWER', () => {
    const expectedState = {
      isNotificationDrawerVisible: true,
      isUserLoggedIn: false,
      user: { isLoggedIn: false, email: '' },
    };
    expect(uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER }).toJS()).toEqual(expectedState);
  });

  it('handles HIDE_NOTIFICATION_DRAWER', () => {
    const state = Map({
      isNotificationDrawerVisible: true,
      isUserLoggedIn: false,
      user: Map({ isLoggedIn: false, email: '' }),
    });
    const expectedState = {
      isNotificationDrawerVisible: false,
      isUserLoggedIn: false,
      user: { isLoggedIn: false, email: '' },
    };
    expect(uiReducer(state, { type: HIDE_NOTIFICATION_DRAWER }).toJS()).toEqual(expectedState);
  });

  it('handles LOGIN_SUCCESS', () => {
    const userData = { name: 'John Doe', email: 'johndoe@example.com' };
    const expectedState = {
      isNotificationDrawerVisible: false,
      isUserLoggedIn: true,
      user: { isLoggedIn: true, email: userData.email },
    };
    expect(uiReducer(undefined, { type: LOGIN_SUCCESS, payload: userData }).toJS()).toEqual(expectedState);
  });

  it('handles LOGIN', () => {
    const userData = { email: 'johndoe@example.com', password: 'password' };
    const expectedState = {
      isNotificationDrawerVisible: false,
      isUserLoggedIn: true,
      user: { isLoggedIn: true, email: userData.email },
    };
    expect(uiReducer(undefined, { type: LOGIN, user: userData }).toJS()).toEqual(expectedState);
  });

  it('handles LOGIN_FAILURE and LOGOUT', () => {
    const state = Map({
      isNotificationDrawerVisible: false,
      isUserLoggedIn: true,
      user: Map({ name: 'Jane Doe', isLoggedIn: true, email: 'jane@example.com' }),
    });
    const expectedState = {
      isNotificationDrawerVisible: false,
      isUserLoggedIn: false,
      user: { isLoggedIn: false, email: '' },
    };
    expect(uiReducer(state, { type: LOGIN_FAILURE }).toJS()).toEqual(expectedState);
    expect(uiReducer(state, { type: LOGOUT }).toJS()).toEqual(expectedState);
  });
});
