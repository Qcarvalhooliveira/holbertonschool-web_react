import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import { Map } from 'immutable';
import NotificationsContainer from './NotificationsContainer';
import { fetchNotifications } from '../actions/notificationActionCreators';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../actions/notificationActionCreators', () => ({
  fetchNotifications: jest.fn(),
  markAsRead: jest.fn(),
  setNotificationFilter: jest.fn(),
}));

describe('NotificationsContainer', () => {
  let store;

  beforeEach(() => {
    store = mockStore(Map({
      notifications: Map({
        filter: 'DEFAULT',
        notifications: Map(),
      }),
      ui: Map({
        isNotificationDrawerVisible: false,
      }),
    }));
    store.dispatch = jest.fn();
  });

  it('fetches notifications on mount', () => {
    mount(
      <Provider store={store}>
        <NotificationsContainer />
      </Provider>
    );
    expect(store.dispatch).toHaveBeenCalledWith(fetchNotifications());
  });
});
