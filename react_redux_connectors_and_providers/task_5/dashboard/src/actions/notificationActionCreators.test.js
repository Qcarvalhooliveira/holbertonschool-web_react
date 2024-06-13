import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  setLoadingState,
  setNotifications,
  fetchNotifications,
} from './notificationActionCreators';
import {
  SET_LOADING_STATE,
  FETCH_NOTIFICATIONS_SUCCESS,
} from './notificationActionTypes';

const middlewares = [thunk]; 
const mockStore = configureMockStore(middlewares);

describe('notificationActionCreators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetchNotifications action creator dispatches correct actions on success', async () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
    ];

    fetchMock.getOnce('/notifications.json', {
      body: notifications,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: SET_LOADING_STATE, isLoading: true },
      { type: FETCH_NOTIFICATIONS_SUCCESS, notifications },
      { type: SET_LOADING_STATE, isLoading: false },
    ];

    const store = mockStore({});

    await store.dispatch(fetchNotifications());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetchNotifications action creator dispatches correct actions on failure', async () => {
    fetchMock.getOnce('/notifications.json', { status: 404 });

    const expectedActions = [
      { type: SET_LOADING_STATE, isLoading: true },
      { type: SET_LOADING_STATE, isLoading: false },
    ];

    const store = mockStore({});

    try {
      await store.dispatch(fetchNotifications());
    } catch (error) {

    }

    expect(store.getActions()).toEqual(expectedActions);
  });
});
