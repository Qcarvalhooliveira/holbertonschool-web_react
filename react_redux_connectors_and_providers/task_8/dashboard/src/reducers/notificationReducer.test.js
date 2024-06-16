import { Map } from 'immutable';
import notificationReducer from './notificationReducer';
import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_LOADING_STATE } from '../actions/notificationActionTypes';

describe('notificationReducer', () => {
  it('handles FETCH_NOTIFICATIONS_SUCCESS', () => {
    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', value: 'New data available' },
      ],
    };

    const expectedState = Map({
      filter: 'DEFAULT',
      "isLoading": false,
      notifications: Map({
        1: Map({ id: 1, isRead: false, type: 'default', value: 'New course available' }),
        2: Map({ id: 2, isRead: false, type: 'urgent', value: 'New resume available' }),
        3: Map({ id: 3, isRead: false, type: 'urgent', value: 'New data available' }),
      }),
    });

    expect(notificationReducer(undefined, action).toJS()).toEqual(expectedState.toJS());
  });

  it('handles MARK_AS_READ', () => {
    const initialState = Map({
      filter: 'DEFAULT',
      notifications: Map({
        1: Map({ id: 1, isRead: false, type: 'default', value: 'New course available' }),
        2: Map({ id: 2, isRead: false, type: 'urgent', value: 'New resume available' }),
        3: Map({ id: 3, isRead: false, type: 'urgent', value: 'New data available' }),
      }),
    });

    const action = {
      type: MARK_AS_READ,
      index: 2,
    };

    const expectedState = initialState.setIn(['notifications', 2, 'isRead'], true);

    expect(notificationReducer(initialState, action).toJS()).toEqual(expectedState.toJS());
  });
  it('handles SET_LOADING_STATE', () => {
    const initialState = Map({
      filter: 'DEFAULT',
      isLoading: false,
      notifications: Map({}),
    });

    const action = {
      type: SET_LOADING_STATE,
      isLoading: true,
    };

    const expectedState = initialState.set('isLoading', true);

    expect(notificationReducer(initialState, action).toJS()).toEqual(expectedState.toJS());
  });
});
