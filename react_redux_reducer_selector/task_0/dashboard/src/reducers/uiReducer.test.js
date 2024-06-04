import uiReducer from './uiReducer';
import { DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SELECT_COURSE } from '../actions/uiActionTypes'; 

describe('uiReducer', () => {
  it('returns initial state', () => {
    const expectedState = {
      isNotificationDrawerVisible: false,
      isUserLoggedIn: false,
      user: {},
    };
    expect(uiReducer(undefined, {})).toEqual(expectedState);
  });

  it('handles irrelevant action', () => {
    const initialState = {
      isNotificationDrawerVisible: true,
      isUserLoggedIn: true,
      user: { name: 'John Doe' },
    };
    const expectedState = initialState;
    expect(uiReducer(initialState, { type: SELECT_COURSE })).toEqual(expectedState);
  });

  it('handles DISPLAY_NOTIFICATION_DRAWER', () => {
    const expectedState = {
      isNotificationDrawerVisible: true,
      isUserLoggedIn: false,
      user: {},
    };
    expect(uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER })).toEqual(expectedState);
  });

  it('handles HIDE_NOTIFICATION_DRAWER', () => {
    const initialState = {
      isNotificationDrawerVisible: true,
      isUserLoggedIn: false,
      user: {},
    };
    const expectedState = {
      isNotificationDrawerVisible: false,
      isUserLoggedIn: false,
      user: {},
    };
    expect(uiReducer(initialState, { type: HIDE_NOTIFICATION_DRAWER })).toEqual(expectedState);
  });

  it('handles LOGIN_SUCCESS', () => {
    const userData = { name: 'John Doe', email: 'johndoe@example.com' };
    const expectedState = {
      isNotificationDrawerVisible: false,
      isUserLoggedIn: true,
      user: userData,
    };
    expect(uiReducer(undefined, { type: LOGIN_SUCCESS, payload: userData })).toEqual(expectedState);
  });

  it('handles LOGIN_FAILURE and LOGOUT', () => {
    const initialState = {
      isNotificationDrawerVisible: false,
      isUserLoggedIn: true,
      user: { name: 'Jane Doe' },
    };
    const expectedState = {
      isNotificationDrawerVisible: false,
      isUserLoggedIn: false,
      user: {},
    };
    expect(uiReducer(initialState, { type: LOGIN_FAILURE })).toEqual(expectedState);
    expect(uiReducer(initialState, { type: LOGOUT })).toEqual(expectedState);
  });
});
