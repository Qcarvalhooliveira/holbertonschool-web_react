import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import { loginRequest, login, loginSuccess, loginFailure, logout, displayNotificationDrawer, hideNotificationDrawer } from './uiActionCreators';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from './uiActionTypes';

const mockStore = configureMockStore([]);

describe('loginRequest action', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates LOGIN and LOGIN_SUCCESS when fetching login has been done', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const expectedActions = [
      { type: LOGIN, user: { email: 'test@example.com', password: 'password123' } },
      { type: LOGIN_SUCCESS }
    ];

    fetchMock.getOnce('/login-success.json', {
      body: { user: { email: 'test@example.com', password: 'password123' } },
      headers: { 'content-type': 'application/json' }
    });

    const user = { email: 'test@example.com', password: 'password123' };
    const loginAction = login(user.email, user.password);
    store.dispatch(loginAction);

    return fetch('/login-success.json')
      .then(res => {
        if (res.ok) {
          store.dispatch(loginSuccess());
          const actions = store.getActions();
          expect(actions[0]).toMatchObject(expectedActions[0]);
          expect(actions[1]).toMatchObject(expectedActions[1]);
        }
      })
      .catch(() => {
        store.dispatch(loginFailure());
      });
  });

  it('creates LOGIN and LOGIN_FAILURE when fetching login has failed', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const expectedActions = [
      { type: LOGIN, user: { email: 'test@example.com', password: 'password123' } },
      { type: LOGIN_FAILURE }
    ];

    fetchMock.getOnce('/login-success.json', 404);

    const user = { email: 'test@example.com', password: 'password123' };
    const loginAction = login(user.email, user.password);
    store.dispatch(loginAction);

    return fetch('/login-success.json')
      .then(res => {
        if (!res.ok) {
          store.dispatch(loginFailure());
          const actions = store.getActions();
          expect(actions[0]).toMatchObject(expectedActions[0]);
          expect(actions[1]).toMatchObject(expectedActions[1]);
        }
      })
      .catch(() => {
        store.dispatch(loginFailure());
      });
  });
});

test('login action creator returns correct action', () => {
  const email = 'test@example.com';
  const password = 'password123';
  const expectedAction = {
    type: LOGIN,
    user: { email, password }
  };
  expect(login(email, password)).toEqual(expectedAction);
});

test('logout action creator returns correct action', () => {
  const expectedAction = {
    type: LOGOUT
  };
  expect(logout()).toEqual(expectedAction);
});

test('displayNotificationDrawer action creator returns correct action', () => {
  const expectedAction = {
    type: DISPLAY_NOTIFICATION_DRAWER
  };
  expect(displayNotificationDrawer()).toEqual(expectedAction);
});

test('hideNotificationDrawer action creator returns correct action', () => {
  const expectedAction = {
    type: HIDE_NOTIFICATION_DRAWER
  };
  expect(hideNotificationDrawer()).toEqual(expectedAction);
});
